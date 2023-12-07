import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = () => {
  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      <img src="/assets/valsecLogo.png" alt="logo" height="100%" />
    </Link>
  );
};

export default Logo;
