import React from 'react';
import Content from './Content';

export default {
  path: '*',
  action({ path }) { // eslint-disable-line react/prop-types
    return <Content/>;
  }
};
