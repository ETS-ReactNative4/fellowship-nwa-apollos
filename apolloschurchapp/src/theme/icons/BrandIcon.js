import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

import { makeIcon } from '@apollosproject/ui-kit';

const Icon = makeIcon(({ size = 32, fill } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M11.0351 4.13805C11.0363 3.33735 10.8129 2.55235 10.3903 1.87228C9.80954 0.930569 8.87933 0.257341 7.8033 0V3.53315C7.8033 5.24105 8.67423 5.79575 9.63747 6.40924C10.0438 6.668 10.4665 6.93722 10.8472 7.30785C10.8626 7.32318 10.8823 7.33358 10.9036 7.33776C10.925 7.34194 10.9471 7.33969 10.9672 7.33131C10.9873 7.32294 11.0045 7.3088 11.0166 7.29068C11.0286 7.27256 11.0351 7.25128 11.0351 7.22951V4.13805ZM16.2795 6.90842C16.2807 7.75392 16.0317 8.58086 15.5639 9.28518C15.0156 10.1146 14.1963 10.7279 13.246 11.0204C13.1536 11.0485 12.9649 11.0655 12.9649 10.7856V4.20701C12.9647 3.23774 13.292 2.29682 13.8937 1.53689C14.4953 0.776951 15.3361 0.242568 16.2795 0.0204163V6.90842ZM22.1277 10.3903C21.4477 10.8129 20.6627 11.0363 19.862 11.0351H16.7705C16.7487 11.0351 16.7274 11.0286 16.7093 11.0165C16.6912 11.0045 16.6771 10.9873 16.6687 10.9672C16.6603 10.9471 16.6581 10.925 16.6622 10.9036C16.6664 10.8823 16.6768 10.8626 16.6922 10.8471C17.0628 10.4665 17.332 10.0438 17.5907 9.6375L17.5908 9.63747L17.5908 9.63746C18.2043 8.67422 18.759 7.80328 20.4669 7.80328H24C23.7427 8.87931 23.0694 9.80953 22.1277 10.3903ZM12.9649 19.8555C12.9637 20.6562 13.1871 21.4412 13.6097 22.1213C14.1904 23.063 15.1207 23.7362 16.1967 23.9935V20.4604C16.1967 18.7525 15.3257 18.1978 14.3625 17.5843C13.9562 17.3256 13.5335 17.0563 13.1528 16.6857C13.1374 16.6704 13.1177 16.66 13.0963 16.6558C13.075 16.6516 13.0528 16.6539 13.0327 16.6622C13.0127 16.6706 12.9955 16.6848 12.9834 16.7029C12.9713 16.721 12.9649 16.7423 12.9649 16.764V19.8555ZM17.0911 16.2731C16.2458 16.2741 15.419 16.0251 14.7148 15.5575C13.8854 15.0091 13.2721 14.1899 12.9796 13.2396C12.9515 13.1471 12.9345 12.9585 13.2144 12.9585H19.793C20.7623 12.9583 21.7032 13.2856 22.4631 13.8872C23.2231 14.4889 23.7574 15.3296 23.9796 16.2731H17.0911ZM4.13805 12.9586C3.33736 12.9573 2.55236 13.1807 1.87228 13.6033C0.930417 14.1842 0.25717 15.1147 0 16.191H3.53315C5.24104 16.191 5.79574 15.3201 6.40923 14.3568C6.668 13.9505 6.93722 13.5278 7.30785 13.1471C7.32317 13.1317 7.33358 13.112 7.33776 13.0906C7.34193 13.0693 7.33969 13.0471 7.33131 13.0271C7.32293 13.007 7.3088 12.9898 7.29068 12.9777C7.27256 12.9657 7.25128 12.9592 7.22951 12.9592L4.13805 12.9586ZM7.72045 17.0847C7.71943 16.2394 7.96842 15.4126 8.4361 14.7084C8.98448 13.8791 9.80373 13.2658 10.754 12.9732C10.8464 12.9451 11.0351 12.9281 11.0351 13.208V19.7866C11.0353 20.7558 10.708 21.6968 10.1063 22.4567C9.50467 23.2166 8.66392 23.751 7.72045 23.9732V17.0847ZM6.90842 7.72046C7.75392 7.71936 8.58086 7.96835 9.28518 8.43611C10.1145 8.98449 10.7278 9.80375 11.0204 10.754C11.0485 10.8465 11.0655 11.0351 10.7856 11.0351H4.20701C3.23774 11.0353 2.29682 10.708 1.53689 10.1063C0.776951 9.50469 0.242568 8.66394 0.0204163 7.72046H6.90842Z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
