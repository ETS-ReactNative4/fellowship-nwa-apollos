import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { gql, useQuery } from '@apollo/client';
import {
  ModalView,
  H3,
  H5,
  PaddedView,
  FeedView,
  DefaultCard,
} from '@apollosproject/ui-kit';

const GET_EVENTS = gql`
  query GetEvents($ministry: String) {
    getEvents(ministry: $ministry) {
      ...eventFragment
    }
  }

  fragment eventFragment on Event {
    id
    __typename
    name
    image {
      sources {
        uri
      }
    }
  }
`;

const MinistryEventList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data, loading, refetch } = useQuery(GET_EVENTS, {
    variables: { ministry: 'Children' },
    fetchPolicy: 'cache-and-network',
  });
  const content =
    data?.getEvents.map((event) => ({
      ...event,
      title: event.name,
      coverImage: event.image?.sources[0] || { uri: '' },
    })) || [];

  return (
    <ModalView>
      <PaddedView>
        <H5>Events by Ministry</H5>
        <H3>{route.params.ministry}</H3>
        <FeedView
          isLoading={loading}
          ListItemComponent={DefaultCard}
          content={content}
          refetch={refetch}
          onPressItem={({ id }) =>
            navigation.navigate('Event', { eventId: id })
          }
        />
      </PaddedView>
    </ModalView>
  );
};

export default MinistryEventList;
