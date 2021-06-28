import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationService,
  withTheme,
  Icon,
  Touchable,
  H4,
  FlexedView,
} from '@apollosproject/ui-kit';
import { useApolloClient } from '@apollo/client';
import { createFeatureFeedTab } from '@apollosproject/ui-connected';
import { checkOnboardingStatusAndNavigate } from '@apollosproject/ui-onboarding';
import Connect from './connect';
import tabBarIcon from './tabBarIcon';

const HeaderLogo = withTheme(({ theme }) => ({
  fill: theme.colors.primary,
  size: 24,
  name: 'brand-icon',
}))(Icon);

const SearchIcon = withTheme(({ theme: { colors, sizing: { baseUnit } } }) => ({
  name: 'search',
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

const HeaderLeft = () => <HeaderLogo />;
const HeaderRight = () => {
  const navigation = useNavigation();
  return <SearchButton onPress={() => navigation.navigate('Search')} />;
};

const headerCenter = (title) => () => (
  <FlexedView>
    <H4>{title}</H4>
  </FlexedView>
);

const screenOptions = (title) => ({
  headerLeft: HeaderLeft,
  headerRight: HeaderRight,
  headerCenter: headerCenter(title),
  headerLargeTitle: false,
});

// we nest stack inside of tabs so we can use all the fancy native header features
const HomeTab = createFeatureFeedTab({
  options: screenOptions('Fellowship'),
  tabName: 'Home',
  feedName: 'HOME',
});

const EventsTab = createFeatureFeedTab({
  options: screenOptions('Events'),
  tabName: 'Events',
  feedName: 'READ',
});

const WatchTab = createFeatureFeedTab({
  options: screenOptions('Watch & Listen'),
  tabName: 'Watch',
  feedName: 'WATCH',
});

const { Navigator, Screen } = createBottomTabNavigator();

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
    <Navigator>
      <Screen
        name="Home"
        component={HomeTab}
        options={{ tabBarIcon: tabBarIcon('home') }}
      />
      <Screen
        name="Watch"
        component={WatchTab}
        options={{ tabBarIcon: tabBarIcon('video') }}
      />

      <Screen
        name="Events"
        component={EventsTab}
        options={{ tabBarIcon: tabBarIcon('calendar') }}
      />
      <Screen
        name="Connect"
        component={Connect}
        options={{ tabBarIcon: tabBarIcon('profile') }}
      />
    </Navigator>
  );
};

export default TabNavigator;
