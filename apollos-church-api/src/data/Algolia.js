/* eslint-disable no-await-in-loop */
import * as Search from '@apollosproject/data-connector-algolia-search';
import Queue from 'bull';

const { schema, resolver, jobs } = Search;

class dataSource extends Search.dataSource {
  async deltaIndex({ datetime }) {
    const { ContentItem } = this.context.dataSources;

    // loop through each active channel
    await Promise.all(
      ContentItem.activeChannelIds.map(async (channelId) => {
        let itemsLeft = true;
        const args = { after: null, first: 100 };

        while (itemsLeft) {
          const { edges } = await ContentItem.paginate({
            // NOTE custom, non-filtered channel cursor
            cursor: await ContentItem.byContentChannelId(
              channelId,
              '',
              false
            ).andFilter(
              `(CreatedDateTime gt datetime'${datetime}') or (ModifiedDateTime gt datetime'${datetime}')`
            ),
            args,
          });

          const result = await edges;
          const items = result.map(({ node }) => node);
          itemsLeft = items.length === 100;

          if (itemsLeft) args.after = result[result.length - 1].cursor;
          const indexableItems = await Promise.all(
            items.map((item) => this.mapItemToAlgolia(item))
          );

          await this.addObjects(indexableItems);
        }
      })
    );
  }

  async indexAll() {
    await new Promise((resolve, reject) =>
      this.index.clearIndex((err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      })
    );
    const { ContentItem } = this.context.dataSources;

    // loop through each active channel
    await Promise.all(
      ContentItem.activeChannelIds.map(async (channelId) => {
        let itemsLeft = true;
        const args = { after: null, first: 100 };

        while (itemsLeft) {
          const { edges } = await ContentItem.paginate({
            // NOTE custom, non-filtered channel cursor
            cursor: await ContentItem.byContentChannelId(channelId, '', false),
            args,
          });

          const result = await edges;
          const items = result.map(({ node }) => node);
          itemsLeft = items.length === 100;

          if (itemsLeft) args.after = result[result.length - 1].cursor;

          const indexableItems = await Promise.all(
            items.map((item) => this.mapItemToAlgolia(item))
          );

          await this.addObjects(indexableItems);
        }
      })
    );
  }
}

const customJobs = (args) => {
  const full = new Queue('algolia-full-index-queue');
  const delta = new Queue('algolia-delta-index-queue');
  full.clean(5000);
  full.clean(5000, 'failed');
  full.empty();
  delta.clean(5000);
  delta.clean(5000, 'failed');
  delta.empty();
  jobs(args);
};

export { schema, resolver, dataSource, customJobs as jobs };
