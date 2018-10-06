import React, {Fragment} from 'react';
import styles from './QnaBbsTable.scss';
import classNames from 'classnames/bind';
import QnaBbsTableMobile from 'components/qnabbs/QnaBbsTableMobile';
import { Link } from 'react-router-dom';
import FaLongIcon from 'react-icons/lib/fa/long-arrow-right';
import FaLockIcon from 'react-icons/lib/fa/lock';


const cx = classNames.bind(styles);

const QnaBbsTable = ({list, showModal, isSearched, searchedList}) => {
  
  const qnaList = list.map(
    (qna, i) => {
      return  (
        <Link to={`/qna/detail/${qna.get('id')}`} className={cx('row')} key={i} id={qna.get('id')}>
          <div className={cx('body-slim')} id={qna.get('id')}>
            {qna.get('id')}
          </div>
          <div className={cx('body')} id={qna.get('id')}>
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
          <div className={cx('body-slim')} id={qna.get('id')}>
            {qna.get('createdAt')}
          </div>
          <div className={cx('body-slim')} id={qna.get('id')}>
            {qna.get('username')}
          </div>
          </Link>
      )
    }
  )

  const searchedQnaList = searchedList.map(
    (qna, i) => {
      return  (
        <div className={cx('row')} key={i} id={qna.get('id')}>
          <div className={cx('body-slim')} id={qna.get('id')}>
            {qna.get('id')}
          </div>
          <div className={cx('body')} id={qna.get('id')}>
          <FaLongIcon style={{display: parseInt(qna.get('depth'), 10) > 1 ? "inline-block" : "none" }} id={qna.get('id')}/>
          <FaLockIcon style={{display: "inline-block"}} id={qna.get('id')}/>
          {
            parseInt(qna.get('depth'), 10) > 1 ? 
            `답변: ${qna.get('title')}`
            :
            `${qna.get('title')}`
          }
            
          </div>
          <div className={cx('body-slim')} id={qna.get('id')}>
            {qna.get('createdAt')}
          </div>
          <div className={cx('body-slim')} id={qna.get('id')}>
            {qna.get('username')}
          </div>
          </div>
      )
    }
  )
  return (
    <Fragment>
    <div className={cx('table')}>
    {
      list.size === 0 && 
      <div className={cx('empty-table')}>
        <div className={cx('desc')}>
          <div className={cx('text')}>
            현재 게시판에 작성된 글이 없습니다.
          </div>
        </div>
      </div>
    }
     {
       list.size !== 0 &&
       <Fragment>
       <div className={cx('thead')}>
        <div className={cx('header-number')}>
          번호
        </div>
        <div className={cx('header')}>
          제목
        </div>
        <div className={cx('header-date')}>
          날짜
        </div>
        <div className={cx('header-writer')}>
          글쓴이
        </div>
      </div>
      <div className={cx('tbody')}>
        {
          !isSearched ? qnaList : searchedQnaList
          
        }
      </div>
      </Fragment>
     }
      
    </div>
    <QnaBbsTableMobile list={list}/>
    </Fragment>
  );
  
}
export default QnaBbsTable;