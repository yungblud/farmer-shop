import React from 'react';
import styles from './ListWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ListWrapper = ({children, onChangeInput, onSearch, onKeydown, search}) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChangeInput({name, value});
  }

  const reloadPage = () => {
    window.location.reload();
  }

  return (
    <div className={cx('list-wrapper')}>
      <div className={cx('top-wrapper')}>
        <div to="/item" className={cx('title')} onClick={reloadPage}>
          새로나온 상품 리스트
        </div>
        <div className={cx('search')}>
          <div className={cx('label')}>
            검색
          </div>
          <div className={cx('search-wrapper')}>
            <input 
              type="text" 
              name="search" 
              className={cx('input')} 
              onChange={handleChange}
              onKeyDown={onKeydown}
              value={search}
               />
          </div>
          <div className={cx('button-wrapper')}>
            <div className={cx('button')} onClick={onSearch}>
              검색하기
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default ListWrapper;