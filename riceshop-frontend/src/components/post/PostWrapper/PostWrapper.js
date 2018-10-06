import React from 'react';
import styles from './PostWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PostWrapper = ({postInfo, postBody}) => (
  <div className={cx('post-wrapper')}>
    <div className={cx('post-info')}>
      {postInfo}
    </div>
    <div className={cx('post-body')}>
      {postBody}
    </div>
  </div>
);

export default PostWrapper;