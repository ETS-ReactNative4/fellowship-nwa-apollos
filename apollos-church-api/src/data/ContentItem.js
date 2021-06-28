import { ContentItem } from '@apollosproject/data-connector-rock';

const { schema, resolver } = ContentItem;

class dataSource extends ContentItem.dataSource {
  superGetCursorByChildContentItemId = this.getCursorByChildContentItemId;

  superGetCursorByParentContentItemId = this.getCursorByParentContentItemId;

  superGetCursorBySiblingContentItemId = this.getCursorBySiblingContentItemId;

  getCursorByChildContentItemId = async (id) => {
    const item = await this.getFromId(id);

    if (!item.attributeValues?.series?.value)
      return this.superGetCursorByChildContentItemId(id);

    return this.request().filter(
      `Guid eq guid'${item.attributeValues.series.value}'`
    );
  };

  getCursorByParentContentItemId = async (id) => {
    const item = await this.getFromId(id);
    const attributeValues = await this.request('AttributeValues')
      .filter(`Value eq '${item.guid}' and Attribute/Id eq 5225`)
      .get();

    return this.getFromIds(
      attributeValues.map(({ entityId }) => entityId)
    ).sort(this.DEFAULT_SORT());
  };

  getCursorBySiblingContentItemId = async (id) => {
    const item = await this.getFromId(id);
    if (!item.attributeValues?.series?.value)
      return this.superGetCursorBySiblingContentItemId(id);

    const attributeValues = await this.request('AttributeValues')
      .filter(
        `Value eq '${
          item.attributeValues?.series?.value
        }' and Attribute/Id eq 5225`
      )
      .get();

    return this.getFromIds(
      attributeValues.map(({ entityId }) => entityId)
    ).sort(this.DEFAULT_SORT());
  };
}

export { schema, resolver, dataSource };
