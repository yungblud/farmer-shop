import React from 'react';
import styles from './AfterList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const AfterList = ({afterPostList, itemId}) => {
  const postList = afterPostList.map(
    (post, i) => {
      return (
        <Link to={`/post/after/${itemId}/${post.get('id')}`} className={cx('row')} key={i}>
            <div className={cx('column-slim')}>
              {post.get('id')}
            </div>
            <div className={cx('column')}>
              {post.get('title')}
            </div>
            <div className={cx('column-slim')}>
              {post.get('createdAt')}
            </div>
            <div className={cx('column-slim')}>
              {post.get('username')}
            </div>
          </Link>
      )
    }
  )
  return (
    <div className={cx('list')}>
      {
        afterPostList.size !== 0 ? <div className={cx('list-contents')}>
                                      <div className={cx('thead')}>
                                        <div className={cx('column-slim')}>
                                          후기 번호
                                        </div>
                                        <div className={cx('column')}>
                                          제목
                                        </div>
                                        <div className={cx('column-slim')}>
                                          날짜
                                        </div>
                                        <div className={cx('column-slim')}>
                                          글쓴이
                                        </div>
                                      </div>
                                      <div className={cx('tbody')}>
                                        {
                                          postList
                                        }
                                      </div>
                                    </div>
                                    :
                                    <div className={cx('empty-after-post-list')}>
                                      <div className={cx('post-wrapper')}>
                                        현재 등록된 후기가 없습니다.
                                      </div>
                                    </div>
                                    }
                                  </div>
  );
}

export default AfterList;