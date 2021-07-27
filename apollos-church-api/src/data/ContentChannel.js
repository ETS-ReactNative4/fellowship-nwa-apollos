import { ContentChannel } from '@apollosproject/data-connector-rock';

const { schema, dataSource } = ContentChannel;

const resolver = {
  ...ContentChannel.resolver,
  ContentChannel: {
    ...ContentChannel.resolver.ContentChannel,
    childContentItemsConnection: async ({ id }, args, { dataSources }) =>
      dataSources.ContentItem.paginate({
        cursor: await dataSources.ContentItem.byContentChannelId(id),
        args,
      }),
  },
};

export { schema, resolver, dataSource };
