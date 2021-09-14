import { Campus } from '@apollosproject/data-connector-rock';

const { schema, resolver } = Campus;

class dataSource extends Campus.dataSource {
  baseGetByLocation = this.getByLocation;

  getByLocation = async (args) => {
    const campuses = await this.baseGetByLocation(args);
    return campuses.filter(({ name }) =>
      [
        'Fellowship Fayetteville',
        'Fellowship Mosaic',
        'Fellowship Rogers',
        'Fellowship Bentonville',
      ].includes(name)
    );
  };
}

export { schema, resolver, dataSource };
