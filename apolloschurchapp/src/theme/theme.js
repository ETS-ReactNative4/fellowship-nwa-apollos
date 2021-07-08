import React from 'react';
import { Image } from 'react-native';
/* Add your custom theme definitions below. Anything that is supported in UI-Kit Theme can be
 overridden and/or customized here! */

/* Base colors.
 * These get used by theme types (see /types directory) to color
 * specific parts of the interface. For more control on how certain
 * elements are colored, go there. The next level of control comes
 * on a per-component basis with "overrides"
 */
const colors = {
  primary: '#707F75', // 27272E',
  secondary: '#707F75',
  tertiary: '#AFAFAF',

  screen: '#F8F8FB',
};
/* Base Typography sizing and fonts.
 * To control speicfic styles used on different type components (like H1, H2, etc), see "overrides"
 */
const typography = {
  baseFontSize: 18,
  baseLineHeight: 27, // 1.5 ratio
  sans: {
    regular: {
      default: 'ProximaNova-Regular',
      italic: 'ProximaNova-RegularIt',
    },
    medium: {
      default: 'ProximaNova-Medium',
      italic: 'ProximaNova-MediumIt',
    },
    bold: {
      default: 'ProximaNova-Semibold',
      italic: 'ProximaNova-SemiboldIt',
    },
    black: {
      default: 'ProximaNova-Bold',
      italic: 'ProximaNova-BoldIt',
    },
  },
};

/* Responsive breakpoints */
// export const breakpoints = {};

/* Base sizing units. These are used to scale
 * space, and size components relatively to one another.
 */
// export const sizing = {};

/* Base alpha values. These are used to keep transparent values across the app consistant */
// export const alpha = {};

/* Base overlays. These are used as configuration for LinearGradients across the app */
const overlays = ({ colors: themeColors }) => ({
  'background-gradient': ({ colors: customColors }) => ({
    colors: customColors || [
      themeColors.background.screen,
      themeColors.background.screen,
    ],
    // default props from `react-native-linear-gradient`
    start: { x: 0.5, y: 0.0 },
    end: { x: 0.5, y: 1.0 },
    locations: null,
  }),
});

/* Overrides allow you to override the styles of any component styled using the `styled` HOC. You
 * can also override the props of any component using the `withTheme` HOC. See examples below:
 * ```const StyledComponent = styled({ margin: 10, padding: 20 }, 'StyledComponent');
 *    const PropsComponent = withTheme(({ theme }) => ({ fill: theme.colors.primary }), 'PropsComponent');
 * ```
 * These componnents can have their styles/props overriden by including the following overrides:
 * ```{
 *   overides: {
 *     StyledComponent: {
 *       margin: 5,
 *       padding: 15,
 *     },
 *     // #protip: you even have access 👇to component props! This applies to style overrides too 💥
 *     PropsComponent: () => ({ theme, isActive }) => ({
 *       fill: isActive ? theme.colors.secondary : theme.colors.primary,
 *     }),
 *   },
 * }
 * ```
 */
// This is not right...yet.
const overrides = {
  // 'ui-onboarding.Features.BackgroundComponent.FullScreenImage': {
  //   source: '../onboarding/Welcome_2x.png',
  // },
  'ui-onboarding.Slide.SlideContent.Title': {
    alignSelf: 'center',
  },
  'ui-onboarding.Features': {
    description:
      "We'd like to help personalize your profile to make the most of your online experience.",
    BackgroundComponent: () => (
      <Image source={require('../onboarding/Welcome_2x.png')} />
    ),
  },
  'ui-onboarding.LocationFinder': {
    description:
      "We'll use your location to connect you with your nearby campus and community.",
  },
  'ui-onboarding.AskNotifications': {
    description:
      "We'll let you know when important things are happening and keep you in the loop.",
  },
};

export default {
  colors,
  overlays,
  overrides,
  typography,
};
