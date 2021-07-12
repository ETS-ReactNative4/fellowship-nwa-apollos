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
      d="M119.99332,106.41921l-26-45.03332a20,20,0,0,1,34.641-20l40,69.282"
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <Path
      d="M89.35231,133.34742l-38-65.81793a20,20,0,1,1,34.641-20l34,58.88972"
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <Path
      d="M153.99332,165.30894a40,40,0,0,1,14.641-54.641l-10-17.32051a20,20,0,1,1,34.641-20l20,34.641a80,80,0,1,1-138.56406,80l-42-72.74613a20,20,0,0,1,34.641-20l22,38.10512"
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <Path
      d="M81.09415,240.0027A111.54975,111.54975,0,0,1,48,203.99065"
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <Path
      d="M176,31A51.97065,51.97065,0,0,1,221.0258,57.00434"
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
