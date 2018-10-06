import React from 'react';
import styles from './Item.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const Item = ({title, price, postItemList}) => {


  const itemList = postItemList && postItemList.map(
    (postItem, i) => {
      let imageUrl = "";
      if(!postItem.markdown.includes("/api/uploads/")) {
        imageUrl = "image?default_thumbnail.png";
      } else {
        imageUrl = postItem.markdown.split("/api/uploads/")[1].split(")")[0];
      }
      const numberWithCommas = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
        return (
          // 
          // <div className={cx('item')} key={i}>
         
          <Link to={`/post/${postItem.id}`} className={cx('card')} key={i}>
            <div className={cx('image')}>
              <div className={cx('thumbnail')} style={{backgroundImage: `url(/api/uploads/${imageUrl})`}}>
              </div>
            </div>
            <div className={cx('info')}>
              <div className={cx('title')}>
                <div className={cx('text')}>
                  {/* <Link to={`/post/${postItem.id}`} > */}
                    {postItem.title}
                  {/* </Link> */}
                </div>
              </div>
              <div className={cx('price')}>
                {numberWithCommas(postItem.prices.split(", ")[0])} 원
              </div>
            </div>
          </Link>
         
        // </div>
        )
    }
  );
  return (
    <div className={cx('item-list')}>
      <div className={cx('one-line')}>
        {
          itemList
        }     
      </div>     
    </div>
  );
}


export default Item;