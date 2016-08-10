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
import s from './Travel.css';

const title = 'Destiny';

function Travel({ planetName }, context) {
  let planetURI = "/explore/" + planetName;
  let videoSrc = `visit-${planetName}.mp4`;

  return (
    <div className={s.root}>
      <CutScene fadeOutSpeed="500" nextUrl={planetURI} videoSrc={videoSrc}/>
      <div className={s.container}></div>
    </div>
  );
}

/*
Travel.propTypes = {
  news: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    contentSnippet: PropTypes.string,
  })).isRequired,
};
Travel.contextTypes = { setTitle: PropTypes.func.isRequired };
*/

export default withStyles(s)(Travel);
