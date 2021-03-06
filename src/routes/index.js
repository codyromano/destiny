/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import App from '../components/App';

// Child routes
import home from './home';
import game from './game';
import travel from './travel';
import orbit from './orbit';
import explore from './explore';
import rewards from './rewards';
import error from './error';
import cheat from './cheat';

export default {

  path: '/',

  children: [
    home,
    game,
    travel,
    rewards,
    orbit,
    explore,
    error,
    cheat
  ],

  async action({ next, render, context }) {
    const component = await next();
    if (component === undefined) return component;
    return render(
      <App context={context}>{component}</App>
    );
  },

};
