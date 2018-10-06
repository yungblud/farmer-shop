import React from 'react';
import styles from './ListItem.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ListItem = ({itemList, searchedList, isSearched}) =>  {
  
  const items = itemList.map(
    
    (item, i) => {
      let imageUrl = "";
      if(!item.get('markdown').includes("/api/uploads/")) {
        imageUrl = "image?default_thumbnail.png";
      } else {
        imageUrl = item.get('markdown').split("/api/uploads/")[1].split(")")[0];
      }
      return (
        <div className={cx('card')} key={i}>
        <Link to={`/post/${item.get('id')}`}>
          <div className={cx('image')}>
            <div className={cx('thumbnail')} style={{backgroundImage: `url(/api/uploads/${imageUrl})`}}>
            </div>
          </div>
          <div className={cx('info')}>
            <div className={cx('title')}>
              {item.get('title')}
            </div>
            <div className={cx('price')}>
              {item.get('prices').split(',')[0]}
            </div>
          </div>
          </Link>
        </div>
      )
    }
  )

  const searchedItems = searchedList.map(
    
    (item, i) => {
      let imageUrl = "";
      if(!item.get('markdown').includes("/api/uploads/")) {
        imageUrl = "image?default_thumbnail.png";
      } else {
        imageUrl = item.get('markdown').split("/api/uploads/")[1].split(")")[0];
      }
      return (
        <div className={cx('card')} key={i}>
        <Link to={`/post/${item.get('id')}`}>
          <div className={cx('image')}>
            <div className={cx('thumbnail')} style={{backgroundImage: `url(/api/uploads/${imageUrl})`}}>
            </div>
          </div>
          <div className={cx('info')}>
            <div className={cx('title')}>
              {item.get('title')}
            </div>
            <div className={cx('price')}>
              {item.get('prices').split(',')[0]}
            </div>
          </div>
          </Link>
        </div>
      )
    }
  )
  return (
    <div className={cx('list-item')}>
      <div className={cx('inner')}>
       {
         !isSearched ? items : searchedItems
       }
      </div>
    </div>
  );
}

export default ListItem;