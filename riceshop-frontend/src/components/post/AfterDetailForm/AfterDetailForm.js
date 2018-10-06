import React from 'react';
import styles from './AfterDetailForm.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AfterDetailForm = ({itemId, afterId, afterPost}) => {
  const content = {
    __html: afterPost.content
  };
  return  (
    <div className={cx('after-detail-form')}>
      <div className={cx('contents')}>
        <div className={cx('label')}>
          상품 후기
        </div>
        <div className={cx('table')}>
          <div className={cx('info-line')}>
            {afterPost.username}
          </div>
          <div className={cx('content')} dangerouslySetInnerHTML={content}/>
        </div>
      </div>
    </div>
  );
}

export default AfterDetailForm;