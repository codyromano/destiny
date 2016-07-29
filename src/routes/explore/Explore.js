import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Explore.css';
import ImageHeader from '../../components/ImageHeader';

const title = 'Explore';

function Explore(props, context) {
  context.setTitle(title);

  let backLinkHref = `/orbit/`,
      backLinkText = `Back to Orbit`;
  
  return (
    <div className={s.root}>
      <div className={s.container}>
        <ImageHeader backLinkHref={backLinkHref} backLinkText={backLinkText} imageSrc={props.headerImageSrc} title={props.planetName}/>
        <p>...</p>
      </div>
    </div>
  );
}

Explore.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Explore);
