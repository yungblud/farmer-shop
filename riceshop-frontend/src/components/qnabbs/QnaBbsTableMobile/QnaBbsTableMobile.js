import React from 'react';
import styles from './QnaBbsTableMobile.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import FaLongIcon from 'react-icons/lib/fa/long-arrow-right';
import FaLockIcon from 'react-icons/lib/fa/lock';

const cx = classNames.bind(styles);

const QnaBbsTableMobile = ({list, showModal}) => {
  const qnaList = list.map(
    (qna, i) => {
      return (
        <Link to={`/qna/detail/${qna.get('id')}`} className={cx('row')} 
        // onClick={showModal} 
        // to={`/qna/detail/${qna.get('id')}`} 
        key={i}
        id={qna.get('id')}>
          <div className={cx('title')} id={qna.get('id')}>
          <FaLongIcon style={{display: parseInt(qna.get('depth'), 10) > 1 ? "inline-block" : "none" }} id={qna.get('id')}/>
          {
            qna.get('isprivate') ? <FaLockIcon style={{display: "inline-block"}} id={qna.get('id')}/> : null
          }
          {
            parseInt(qna.get('depth'), 10) > 1 ? 
            
            `답변: ${qna.get('title')}`
            :
            `${qna.get('title')}`
          }
          </div>
          <div className={cx('bottoms')} id={qna.get('id')}>
            <div className={cx('username')} id={qna.get('id')}>
            {qna.get('username')}
            </div>
            <div className={cx('date')} id={qna.get('id')}>
            {qna.get('createdAt')}
            </div>
          </div>
        </Link>
      )
    }
  )
  return (
    <div className={cx('table')}>
    {
      list.size === 0 ?
      <div className={cx('empty-table')}>
        <div className={cx('desc')}>
          <div className={cx('text')}>
            현재 게시판에 작성된 글이 없습니다.
          </div>
        </div>
      </div>
      :
      <div className={cx('contents')}>
        {
          qnaList
        }
      </div>
    }
      
    </div>
  );
}

export default QnaBbsTableMobile;