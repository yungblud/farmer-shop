import React from 'react';
import styles from './UserThumbnail.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const UserThumbnail = ({onClick}) => (
  <div className={cx('wrapper')} onClick={onClick}>
    <img src={`/api/uploads/image?default_thumbnail.png`}/>
  </div>
);

export default UserThumbnail;