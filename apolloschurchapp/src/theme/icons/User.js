import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Circle, Path } from 'react-native-svg';

import { makeIcon } from '@apollosproject/ui-kit';

const Icon = makeIcon(({ size = 32, fill } = {}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={fill}
    viewBox="0 0 256 256"
  >
    <Circle
      cx="128"
      cy="96"
      r="64"
      fill="none"
      stroke={fill}
      strokeMiterlimit="10"
      strokeWidth="20"
    />
    <Path
      d="M30.989,215.99064a112.03731,112.03731,0,0,1,194.02311.002"
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="20"
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
