import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

import { makeIcon } from '@apollosproject/ui-kit';

const Icon = makeIcon(({ size = 32, fill } = {}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={fill}
    viewBox="0 0 256 256"
  >
    <Path
      d="M133.65683,211.88227l81.0323-81.0322c19.9104-19.91038,22.84784-52.666,4.00583-73.59029a52.0026,52.0026,0,0,0-75.46451-2.02934L127.99994,70.46082,114.85007,57.3109C94.93972,37.40047,62.18409,34.463,41.25979,53.305a52.00261,52.00261,0,0,0-2.02934,75.46452l83.11268,83.11272A8,8,0,0,0,133.65683,211.88227Z"
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
