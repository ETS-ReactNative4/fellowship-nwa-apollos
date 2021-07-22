import { gql } from 'apollo-server';
import { ContentItem } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';

const schema = gql`
  ${ContentItem.schema}

  extend type ContentItemsConnection @cacheControl(scope: PRIVATE)
`;

const resolver = {
  ...ContentItem.resolver,
  WeekendContentItem: {
    ...ContentItem.resolver.WeekendContentItem,
    htmlContent: (item, _, { dataSources }) =>
      `${dataSources.ContentItem.createHtmlHeader(
        item
      )}${dataSources.ContentItem.createHTMLContent(
        item.attributeValues.summary?.value
      )}`,
  },
};

class dataSource extends ContentItem.dataSource {
  baseCursorByChild = this.getCursorByChildContentItemId;

  getCursorByChildContentItemId = async (id) => {
    const child = await this.getFromId(id);

    if (!child.attributeValues?.series?.value)
      return this.baseCursorByChild(id);

    return this.request().filter(
      `Guid eq guid'${child.attributeValues.series.value}'`
    );
  };

  getCursorByParentContentItemId = async (parentId) => {
    const { Auth, Campus } = this.context.dataSources;
    const person = await Auth.getCurrentPerson();
    const { name = '' } = await Campus.getForPerson({ id: person.id });
    const parent = await this.getFromId(parentId);

    // filter by series
    const seriesAttributes = await this.request('AttributeValues')
      .filter(`Value eq '${parent.guid}' and AttributeId eq 5225`)
      .get();
    const seriesItemIds = seriesAttributes.map(({ entityId }) => entityId);

    // filter by campus
    const campusAttributes = await this.request('AttributeValues')
      .filter(
        `Value eq '${name
          .toLowerCase()
          .replace(' ', '-')}' and AttributeId eq 8701`
      )
      .get();
    const campusItemIds = campusAttributes.map(({ entityId }) => entityId);

    // put them together
    const ids = seriesItemIds.filter((id) => campusItemIds.includes(id));
    return this.getFromIds(ids).sort(this.DEFAULT_SORT());
  };

  baseCursorBySibling = this.getCursorBySiblingContentItemId;

  getCursorBySiblingContentItemId = async (siblingId) => {
    const { Auth, Campus } = this.context.dataSources;
    const person = await Auth.getCurrentPerson();
    const { name = '' } = await Campus.getForPerson({ id: person.id });
    const sibling = await this.getFromId(siblingId);

    // filter by series
    const seriesAttributes = await this.request('AttributeValues')
      .filter(
        `Value eq '${
          sibling.attributeValues?.series?.value
        }' and AttributeId eq 5225`
      )
      .get();
    const seriesItemIds = seriesAttributes.map(({ entityId }) => entityId);

    // filter by campus
    const campusAttributes = await this.request('AttributeValues')
      .filter(
        `Value eq '${name
          .toLowerCase()
          .replace(' ', '-')}' and AttributeId eq 8701`
      )
      .get();
    const campusItemIds = campusAttributes.map(({ entityId }) => entityId);

    // put them together
    const ids = seriesItemIds.filter((id) => campusItemIds.includes(id));
    return this.getFromIds(ids).sort(this.DEFAULT_SORT());
  };

  getFeatures = async (item) => {
    const features = await super.getFeatures(item);
    const { Feature, Matrix, BinaryFiles } = this.context.dataSources;

    // scripture ref
    const reference = item.attributeValues.bookoftheBible?.value;
    if (reference) {
      features.push(
        Feature.createScriptureFeature({
          reference,
          id: `${item.attributeValues.bookoftheBible.id}`,
        })
      );
    }

    // relatedFilesorLinks
    const resources = await Matrix.getItemsFromGuid(
      item.attributeValues.relatedFilesorLinks?.value
    );
    if (!resources.length) return features;
    const actions = await Promise.all(
      resources.map(
        async ({ attributeValues: { linkName, linkUrl, file } }) => {
          let url = '';
          if (linkUrl.value) {
            url = ApollosConfig.ROCK.URL + linkUrl.value;
          } else if (file.value) {
            const blob = await BinaryFiles.request()
              .filter(`Guid eq guid'${file.value}'`)
              .first();
            url = blob.url;
          }
          return {
            title: linkName.value,
            relatedNode: { __typename: 'Url', url },
          };
        }
      )
    );
    features.push(
      Feature.createActionTableFeature({
        title: 'Resources',
        actions,
      })
    );

    return features;
  };

  createHtmlHeader = (item) => {
    let header = '';
    if (item.attributeValues.vimeoId?.value) {
      header = `${header}<a href="https://vimeo.com/${
        item.attributeValues.vimeoId?.value
      }">Play Sermon Video</a>`;
    } else if (item.attributeValues.youtubeId?.value) {
      header = `${header}<a href="https://www.youtube.com/watch?v=${
        item.attributeValues.youtubeId?.value
      }">Play Sermon Video</a>`;
    }

    if (header !== '') header = `<p>${header}</p>`;

    return header;
  };
}

export { schema, resolver, dataSource };
