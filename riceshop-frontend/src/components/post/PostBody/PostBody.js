import React from 'react';
import styles from './PostBody.scss';
import classNames from 'classnames/bind';
import MarkdownRender from 'components/common/MarkdownRender';
import AfterWrapper from 'components/post/AfterWrapper';
import AfterList from 'components/post/AfterList';

const cx = classNames.bind(styles);

const PostBody = ({markdown, markdownVisible, afterVisible, paybackVisible, showMarkdown, showAfter, showPayback, bought, itemTitle, itemId, afterPostList, getMoreAfterPostList, minId, lastId}) => (
  <div className={cx('post-body')}>
   <div className={cx('view-menu')}>
    <div className={cx('button-wrapper')}>
      <div className={cx('button')} onClick={showMarkdown}>
        상세 정보
      </div>
    </div>
    <div className={cx('button-wrapper')}>
      <div className={cx('button')} onClick={showAfter}>
        상품 후기
      </div>
    </div>
    <div className={cx('button-wrapper')}>
      <div className={cx('button')} onClick={showPayback}>
        교환 및 환불
      </div>
    </div>
   </div>
    <div className={cx('descriptions')}>
      {
        markdownVisible && <MarkdownRender markdown={markdown} />
      }
      {
        afterVisible && <AfterWrapper afterPostList={afterPostList} bought={bought} itemTitle={itemTitle} itemId={itemId} getMoreAfterPostList={getMoreAfterPostList} minId={minId} lastId={lastId}>
                          <AfterList afterPostList={afterPostList} itemId={itemId}/>
                        </AfterWrapper>
      }
    </div>
  </div>
);

export default PostBody;