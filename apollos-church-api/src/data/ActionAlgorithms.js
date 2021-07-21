import { ActionAlgorithm } from '@apollosproject/data-connector-rock';

class dataSource extends ActionAlgorithm.dataSource {
  ACTION_ALGORITHMS = {
    ...this.ACTION_ALGORITHMS,
    // UPCOMING_EVENTS: this.upcomingEventsAlgorithm.bind(this),
  };

  // async upcomingEventsAlgorithm({ limit = 5 } = {}) {
  //   const { Event } = this.context.dataSources;

  //   // Get the first N items.
  //   const events = await Event.findRecent()
  //     .top(limit)
  //     .get();
  //   // Map them into specific actions.
  //   return events.map((event, i) => ({
  //     id: `${event.id}${i}`,
  //     title: Event.getName(event),
  //     subtitle: Event.getDateTime(event.schedule).start,
  //     relatedNode: { ...event, __type: 'Event' },
  //     image: Event.getImage(event),
  //     action: 'READ_EVENT',
  //     summary: '',
  //   }));
  // }

  async contentFeedAlgorithm({ channelIds = [], limit = 20, skip = 0 } = {}) {
    const { ContentItem, Auth, Campus } = this.context.dataSources;

    // custom, filter everything by campus
    const person = await Auth.getCurrentPerson();
    const { name = '', guid } = await Campus.getForPerson({ id: person.id });

    // 10 - Sermons
    // Congregation attribute returns the lowercase, hyphenated campus name
    const congregationChannels = channelIds.filter((id) => [10].includes(id));
    const congregationItems = congregationChannels.length
      ? await ContentItem.request(
          `Apollos/ContentChannelItemsByAttributeValue?attributeValues=${name
            .toLowerCase()
            .replace(' ', '-')}&attributeKey=Congregation`
        )
          .filterOneOf(
            congregationChannels.map((id) => `ContentChannelId eq ${id}`)
          )
          .andFilter(ContentItem.LIVE_CONTENT())
          .cache({ ttl: 60 })
          .orderBy('StartDateTime', 'desc')
          .top(limit)
          .skip(skip)
          .get()
      : [];

    // 19 - News Highlights
    // Campus attribute returns a string list of campus guids
    const campusChannels = channelIds.filter((id) => [19].includes(id));
    const attributeValues = await this.request('AttributeValues')
      .filter(`AttributeId eq 10878 and substringof('${guid}', Value)`)
      .top(limit)
      .skip(skip)
      .get();
    const campusItems = campusChannels.length
      ? await Promise.all(
          attributeValues.map(({ entityId }) =>
            ContentItem.request()
              .filterOneOf(
                campusChannels.map((id) => `ContentChannelId eq ${id}`)
              )
              .andFilter(`Id eq ${entityId}`)
              .first()
          )
        )
      : [];

    // generic items with no campus selector
    const noCampusChannels = channelIds.filter((id) => ![10, 19].includes(id));
    const noCampusItems = noCampusChannels.length
      ? await ContentItem.byContentChannelIds(noCampusChannels)
          .top(limit)
          .skip(skip)
          .get()
      : [];

    const items = noCampusItems.concat(congregationItems, campusItems);

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
