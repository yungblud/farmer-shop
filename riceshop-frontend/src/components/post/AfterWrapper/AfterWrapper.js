import React from 'react';
import styles from './AfterWrapper.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const AfterWrapper = ({children, bought, itemTitle, itemId, getMoreAfterPostList, afterPostList, minId, lastId}) => (
  <div className={cx('wrapper')}>
  {
    bought && 
    <div className={cx('button-wrapper')}>
      <Link to={`/editor/after?id=${itemId}&title=${itemTitle}`} className={cx('button')} >
        후기 남기기
      </Link>
    </div>
  }
    {children}
    {
      (afterPostList.size !== 0 && parseInt(minId, 10) !== lastId) && <div className={cx('more-button-wrapper')}>
                                    <div className={cx('more-button')} onClick={getMoreAfterPostList}>
                                      후기 더보기
                                    </div>
                                  </div>
    }
  </div>
);

export default AfterWrapper;