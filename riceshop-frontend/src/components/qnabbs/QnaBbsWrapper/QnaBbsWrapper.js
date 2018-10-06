import React from 'react';
import styles from './QnaBbsWrapper.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const QnaBbsWrapper = ({children, word, onChangeInput, handleChangeSelectFilter, onSearch, onSearchKeydown}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChangeInput({name, value});
  }

  const handleChangeSelect = (e) => {
    const { value } = e.target;
    handleChangeSelectFilter({value});
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('description')}>
        질문 게시판
      </div>
      <div className={cx('button-wrapper')}>
        <Link to="/editor/qna" className={cx('write-button')}>
          질문 작성하기
        </Link>
      </div>
      {children}
      <div className={cx('search-options')}>
        <div className={cx('selector')}>
          <select className={cx('search-selector')} onChange={handleChangeSelect}>  
            <option value="title">제목으로 검색</option>
            <option value="username">아이디로 검색</option>
          </select>
        </div>
        <div className={cx('input-wrapper')}>
          <input 
            type="text" 
            name="searchword" 
            className={cx('input')}
            value={word}
            onChange={handleChange}
            onKeyDown={onSearchKeydown}/>
        </div>
        <div className={cx('button-wrapper')}>
          <div className={cx('search-button')} onClick={onSearch}>검색하기</div>
        </div>
      </div>
    </div>
  );
}

export default QnaBbsWrapper;