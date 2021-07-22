import { PrayerRequest } from '@apollosproject/data-connector-rock';

const { schema, resolver } = PrayerRequest;

class dataSource extends PrayerRequest.dataSource {
  basePrayerCursor = this.byDailyPrayerFeed;

  byDailyPrayerFeed = async (args) => {
    const baseCursor = await this.basePrayerCursor(args);
    // filter on only prayers that were created by the app (apollos person ID)
    return baseCursor.andFilter(`ModifiedByPersonAliasId eq 114153`);
  };
}
export { schema, resolver, dataSource };
