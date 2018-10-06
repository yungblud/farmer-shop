import React from 'react';
import styles from './QnaBbsDetailTable.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import storage from 'lib/storage';

const cx = classNames.bind(styles);

const QnaBbsDetailTable = ({qna, adminLogged, onRemove, onUpdate, onUpdateAdmin, onRemoveAdmin}) =>{
  const content = {
    __html: qna.content
  };
  return  (
    <div className={cx('table')}>
      <div className={cx('contents')}>
        <div className={cx('title')}>
          <div className={cx('text')}>  
            {qna.title}
          </div>
        </div>
        <div className={cx('infos')}>
          <div className={cx('date')}>
          {
            qna.isedited && "수정됨 "
          }
            {qna.createdAt}
          </div>
          <div className={cx('username')}>
            {qna.username}
          </div>
        </div>
        <div className={cx('content')} dangerouslySetInnerHTML={content}/>
  
      </div>
      {
        (adminLogged && !qna.isanswer && !qna.isanswered) && 
        <div className={cx('button-wrapper')}>
          <Link to={`/editor/qna/admin?id=${qna.id}&update=false`} className={cx('answer-button')}>
            답변하기
          </Link>
        </div>
      }
      {
        qna.isanswered && 
        null
      }
      {
        (adminLogged && qna.isanswer) &&
        <div className={cx('button-wrapper')}>
          <div className={cx('update-button')} onClick={onUpdateAdmin}>
            수정하기
          </div>
          <div className={cx('remove-button')} onClick={onRemoveAdmin}>
            삭제하기
          </div>
        </div>
      }
      {
        (storage.get('loggedInfo') !== null && storage.get('loggedInfo').userID === qna.username) &&
        <div className={cx('button-wrapper')}>
          <div className={cx('update-button')} onClick={onUpdate}>
            수정하기
          </div>
          <div className={cx('remove-button')} onClick={onRemove}>
            삭제하기
          </div>
        </div>
      }

    </div>
  );
  
}
export default QnaBbsDetailTable;