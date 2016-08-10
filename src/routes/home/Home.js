/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import CutScene from '../../components/CutScene';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

const title = 'Destiny';

function Home({}, context) {
  return (
    <div className={s.root}>
      <CutScene fadeOutSpeed="500" nextUrl="/orbit"
      videoSrc="intro-edited.mp4"
      posterSrc="intro-edited-poster.jpg"/>
      <div className={s.container}></div>
    </div>
  );
}

export default withStyles(s)(Home);
