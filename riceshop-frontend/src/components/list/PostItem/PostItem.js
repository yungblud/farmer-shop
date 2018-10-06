import React from 'react';
import styles from './PostItem.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const PostItem = ({postItemList}) => {

  const postList = postItemList.map(
    (postItem, i) => {
      let imageUrl = "";
      if(!postItem.markdown.includes("/api/uploads/")) {
        imageUrl = "image?default_thumbnail.png";
      } else {
        imageUrl = postItem.markdown.split("/api/uploads/")[1].split(")")[0];
      }
      
      
      const price = postItem.prices.split(",")[0];
      return (
        <div className={cx('item-card')} key={i}>
        <Link to={`/post/${postItem.id}`}>
        <img
          className={cx('image')}
          src={`/api/uploads/${imageUrl}`}/>
        <div className={cx('info')}>
          <div className={cx('title')}>
            {postItem.title}
          </div>
          <div className={cx('price')}>
            {price}
          </div>
        </div>
        </Link>
      </div>
      )
    }
  )

  return (
    <div className={cx('post-item')}>
      <div className={cx('inner')}>
        {
          postList
        }
      </div>
    </div>
  );
  
}
export default PostItem;