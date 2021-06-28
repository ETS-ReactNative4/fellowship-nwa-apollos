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
}

export { dataSource };
