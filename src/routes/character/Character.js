/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Character.css';

const title = 'Character';

function Character(props, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div>
        <h1>{title}</h1>
        <p>...</p>
      </div>
    </div>
  );
}

Character.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Character);
