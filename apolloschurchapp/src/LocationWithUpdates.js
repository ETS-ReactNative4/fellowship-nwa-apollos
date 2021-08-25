import React from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { MapViewConnected as Location } from '@apollosproject/ui-mapview';
import { GET_FEATURE_FEED } from '@apollosproject/ui-connected';

const GET_TAB = gql`
  query GetTabFeatures($tab: Tab!, $campusId: ID) {
    tabFeedFeatures(tab: $tab, campusId: $campusId) {
      id
    }
  }
`;

const LocationWithUpdates = () => {
  const navigation = useNavigation();
  const client = useApolloClient();
  const updateTabs = async () => {
    const { data: watchTabData } = await client.query({
      query: GET_TAB,
      variables: { tab: 'WATCH' },
    });
    client.query({
      query: GET_FEATURE_FEED,
      variables: { featureFeedId: watchTabData?.tabFeedFeatures?.id },
      fetchPolicy: 'network-only',
    });
  };
  return <Location navigation={navigation} onChangeCampus={updateTabs} />;
};

export default LocationWithUpdates;
