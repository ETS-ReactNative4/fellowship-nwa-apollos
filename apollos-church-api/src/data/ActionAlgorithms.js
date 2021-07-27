import { ActionAlgorithm } from '@apollosproject/data-connector-rock';

class dataSource extends ActionAlgorithm.dataSource {
  ACTION_ALGORITHMS = {
    ...this.ACTION_ALGORITHMS,
  };

  async contentFeedAlgorithm({
    category = '',
    channelIds = [],
    limit = 20,
    skip = 0,
  } = {}) {
    const { ContentItem, Auth, Campus } = this.context.dataSources;

    // custom, filter everything by campus
    const person = await Auth.getCurrentPerson();
    const { name = '', guid: campusGuid } = await Campus.getForPerson({
      id: person.id,
    });

    // 10 - Sermons
    // Congregation attribute returns the lowercase, hyphenated campus name
    // Service attribute - we only want "adult" services
    const validSermonChannels = [10];
    const sermonChannels = channelIds.filter((id) =>
      validSermonChannels.includes(id)
    );
    const congregationAttributeValues = await this.request('AttributeValues')
      .filter(
        `AttributeId eq 8701 and Value eq '${name
          .toLowerCase()
          .replace(' ', '-')}'`
      )
      .cache({ ttl: 60 })
      .get();
    const serviceAttributeValues = await this.request('AttributeValues')
      .filter(`AttributeId eq 8702 and Value eq 'adults'`)
      .cache({ ttl: 60 })
      .get();
    const sermonAttributeValues = congregationAttributeValues.filter(
      ({ entityId }) =>
        serviceAttributeValues.map((attr) => attr.entityId).includes(entityId)
    );
    const sermonItems = (await Promise.all(
      sermonChannels.map((channelId) =>
        ContentItem.getFromIds(
          sermonAttributeValues.map((attr) => attr.entityId)
        )
          .andFilter(`ContentChannelId eq ${channelId}`)
          .cache({ ttl: 60 })
          .orderBy('StartDateTime', 'desc')
          .top(limit)
          .skip(skip)
          .get()
      )
    )).flat();

    // 19 - News Highlights
    // 11 - Website Promotions
    // Campus attribute (10878 for 19, 5083 for 11) returns a string list of campus guids
    // Category attribute returns a guid from the Website Promotion Category defined type
    const validCampusChannels = [19, 11];
    const campusChannels = channelIds.filter((id) =>
      validCampusChannels.includes(id)
    );
    const campusAttributeValues = await this.request('AttributeValues')
      .filter(
        `(AttributeId eq 10878 or AttributeId eq 5083) and substringof('${campusGuid}', Value)`
      )
      .cache({ ttl: 60 })
      .get();
    let attributeValues = [];
    if (category) {
      const categories = await this.request('DefinedValues')
        .filter('DefinedTypeId eq 136')
        .cache({ ttl: 60 })
        .get();
      const { guid } = categories.find(({ value }) => value === category);
      const categoryAttributeValues = await this.request('AttributeValues')
        .filter(`AttributeId eq 10269 and Value eq '${guid}'`)
        .cache({ ttl: 60 })
        .get();
      attributeValues = campusAttributeValues.filter(({ entityId }) =>
        categoryAttributeValues.map((attr) => attr.entityId).includes(entityId)
      );
    } else attributeValues = campusAttributeValues;
    const campusItems = (await Promise.all(
      campusChannels.map((channelId) =>
        ContentItem.getFromIds(attributeValues.map((attr) => attr.entityId))
          .andFilter(`ContentChannelId eq ${channelId}`)
          .cache({ ttl: 60 })
          .orderBy('StartDateTime', 'desc')
          .top(limit)
          .skip(skip)
          .get()
      )
    )).flat();

    // generic items with no campus selector
    const noCampusChannels = channelIds.filter(
      (id) => !validSermonChannels.concat(validCampusChannels).includes(id)
    );
    const noCampusItems = noCampusChannels.length
      ? await ContentItem.byContentChannelIds(noCampusChannels)
          .cache({ ttl: 60 })
          .top(limit)
          .skip(skip)
          .get()
      : [];

    const items = noCampusItems.concat(sermonItems, campusItems);

    return items.map((item, i) => ({
      id: `${item.id}${i}`,
      title: item.title,
      subtitle: item.contentChannel?.name,
      relatedNode: { ...item, __type: ContentItem.resolveType(item) },
      image: ContentItem.getCoverImage(item),
      action: 'READ_CONTENT',
      summary: ContentItem.createSummary(item),
    }));
  }
}

export { dataSource };
