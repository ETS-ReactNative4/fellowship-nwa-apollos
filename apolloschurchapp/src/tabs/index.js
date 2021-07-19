import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationService,
  withTheme,
  Icon,
  Touchable,
} from '@apollosproject/ui-kit';
import { useApolloClient } from '@apollo/client';
import { createFeatureFeedTab } from '@apollosproject/ui-connected';
import { checkOnboardingStatusAndNavigate } from '@apollosproject/ui-onboarding';
import Connect from './connect';
import tabBarIcon from './tabBarIcon';

// const HeaderLogo = withTheme(({ theme }) => ({
//   fill: theme.colors.primary,
//   size: 24,
//   name: 'brand-icon',
// }))(Icon);

const SearchIcon = withTheme(({ theme: { colors, sizing: { baseUnit } } }) => ({
  name: 'magnifying-glass',
  size: baseUnit * 2,
  fill: colors.primary,
}))(Icon);

// Home Tab Header Icon
const FellowshipIcon = withTheme(
  ({
    theme: {
      colors,
      sizing: { baseUnit },
    },
  }) => ({
    name: 'fellowship',
    size: baseUnit * 2,
    fill: colors.primary,
  })
)(Icon);

// Watch & Listen Tab Header Icon
const WatchListenIcon = withTheme(
  ({
    theme: {
      colors,
      sizing: { baseUnit },
    },
  }) => ({
    name: 'watch-listen',
    size: baseUnit * 2,
    fill: colors.primary,
  })
)(Icon);

// Events Tab Header Icon
const EventsIcon = withTheme(({ theme: { colors, sizing: { baseUnit } } }) => ({
  name: 'events',
  size: baseUnit * 2,
  fill: colors.primary,
}))(Icon);

const SearchButton = ({ onPress }) => (
  <Touchable onPress={onPress}>
    <SearchIcon />
  </Touchable>
);

SearchButton.propTypes = {
  onPress: PropTypes.func,
};

// const HeaderLeft = () => <HeaderLogo />;
const HeaderRight = () => {
  const navigation = useNavigation();
  return <SearchButton onPress={() => navigation.navigate('Search')} />;
};

// Blank HeaderCenter
const BlankHeaderCenter = () => null;

// we nest stack inside of tabs so we can use all the fancy native header features
const HomeTab = createFeatureFeedTab({
  options: {
    headerLeft: FellowshipIcon,
    headerRight: HeaderRight,
    headerCenter: BlankHeaderCenter,
    headerLargeTitle: false,
  },
  tabName: 'Home',
  feedName: 'HOME',
});

const EventsTab = createFeatureFeedTab({
  options: {
    headerLeft: EventsIcon,
    headerRight: HeaderRight,
    headerCenter: BlankHeaderCenter,
    headerLargeTitle: false,
  },
  tabName: 'Events',
  feedName: 'READ',
});

const WatchTab = createFeatureFeedTab({
  options: {
    headerLeft: WatchListenIcon,
    headerRight: HeaderRight,
    headerCenter: BlankHeaderCenter,
    headerLargeTitle: false,
  },
  tabName: 'Watch',
  feedName: 'WATCH',
});

const { Navigator, Screen } = createBottomTabNavigator();

const ThemedTabNavigator = withTheme(({ theme }) => ({
  tabBarOptions: {
    showLabel: false,
    activeTintColor: theme.type === 'dark' ? '#FFFFFF' : '#000000',
  },
}))(Navigator);

const TabNavigator = () => {
  const client = useApolloClient();
  // this is only used by the tab loaded first
  // if there is a new version of the onboarding flow,
  // we'll navigate there first to show new screens
  useEffect(
    () => {
      checkOnboardingStatusAndNavigate({
        client,
        navigation: NavigationService,
        navigateHome: false,
      });
    },
    [client]
  );

  return (
    <ThemedTabNavigator>
      <Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarIcon: tabBarIcon('house'),
        }}
      />
      <Screen
        name="Watch"
        component={WatchTab}
        options={{ tabBarIcon: tabBarIcon('play') }}
      />
      <Screen
        name="Events"
        component={EventsTab}
        options={{ tabBarIcon: tabBarIcon('calendar') }}
      />
      <Screen
        name="Connect"
        component={Connect}
        options={{ tabBarIcon: tabBarIcon('user') }}
      />
    </ThemedTabNavigator>
  );
};

export default TabNavigator;
