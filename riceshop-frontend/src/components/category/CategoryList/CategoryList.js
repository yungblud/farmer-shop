import React from "react";
import styles from "./CategoryList.scss";
import classNames from "classnames/bind";
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const CategoryList = ({ items }) => {
  // let result = [];
  const categoryList =
    items.toJS().length > 0 &&
    items.toJS().map((item, i) => {
      let imageUrl = "";
      if(!item.markdown.includes("/api/uploads/")) {
        imageUrl = "image?default_thumbnail.png";
      } else {
        imageUrl = item.markdown.split("/api/uploads/")[1].split(")")[0];
      }

      const numberWithCommas = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      
      return (
        <Link to={`/post/${item.id}`} className={cx("Item")} key={item.id}>
          <div className={cx("Content")}>
            <div className={cx("Thumbnail")}>
              <img className={cx("Image")} src={`/api/uploads/${imageUrl}&istemp=false`} alt="ThumbnailImage" />
            </div>
          </div>
          <div className={cx("Infos")}>
            <div className={cx("Title")}>{item.title}</div>
            <div className={cx("Price")}>{numberWithCommas(item.prices.split(", ")[0])} 원</div>
          </div>
        </Link>
      );
    });

    // console.log(result);

  return (
    <div className={cx("List")}>
      <div className={cx("ListLine")}>
        {
          categoryList
        }
      </div>
    </div>
  );
};

export default CategoryList;
