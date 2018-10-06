import React, { Component } from "react";
import styles from "./PostInfo.scss";
import classNames from "classnames/bind";
import Button from "components/common/Button/Button";
import UpIcon from "react-icons/lib/md/arrow-drop-up";
import DownIcon from "react-icons/lib/md/arrow-drop-down";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const cx = classNames.bind(styles);

class PostInfo extends Component {
  state = {
    isInitial: true,
    initialPrice: 0
  };

  // componentDidUpdate(prevProps, prevState) {   console.log("hey");
  // if(prevProps.prices !== this.props.prices) {
  // console.log(this.props.prices);     this.setState({       priceList:     });
  //    console.log(this.state.priceList);   } }
  componentDidMount() {
    const { initialize } = this.props;
    if (this.props.prices !== undefined) {
      const priceList = this.props.prices.split(",").map(price => price.trim());
      initialize({ initialPrice: priceList[0] });
    }
  }

  handleSelectionChanged = e => {
    const { value, selectedIndex, options } = e.target;
    const { onSelectorChange } = this.props;
    const option = options[selectedIndex].innerHTML;
    onSelectorChange({ value, option });
    this.setState({ isInitial: false });
  };

  handleNumberChange = e => {
    const { value } = e.target;
    const { onNumberChange } = this.props;

    onNumberChange({ value });
  };
  render() {
    const {
      title,
      prices,
      options,
      totalPrice,
      eachPrice,
      number,
      onAddCart,
      goToPay,
      adminLogged,
      onRemoveItem,
      onUpdate,
      markdown,
      onPressUp,
      onPressDown,
      imageUrlArr,
      imageLoading
    } = this.props;
    const { isInitial } = this.state;
    const { handleSelectionChanged, handleNumberChange } = this;
    if (prices !== undefined) {
      const priceList = this.props.prices.split(",").map(price => price.trim());
      const optionList = this.props.options
        .split(",")
        .map(option => option.trim());

      const optionSelector = optionList.map((option, i) => {
        return (
          <option value={priceList[i]} origin={optionList[i]} key={i}>
            {optionList[i]}
          </option>
        );
      });

      let imageUrl = "";
      if (!markdown.includes("/api/uploads/")) {
        imageUrl = "image?default_thumbnail.png";
      } else {
        imageUrl = markdown.split("/api/uploads/")[1].split(")")[0];
      }

      const CarouselList = imageUrlArr.map((url, i) => {
        return (
          <div className={cx("ImageWrapper")} key={i}>
            <img className={cx("image")} src={`${url}&istemp=false`} alt="CarouselThumbnail" />
          </div>
        );
      });
      return (
        <div className={cx("post-info")}>
          <div className={cx("post-title")}>
            <div className={cx("Text")}>{title.toString()}</div>
          </div>
          <div className={cx("info-wrapper")}>
            <div className={cx("thumbnail")}>
              {!imageLoading &&
                CarouselList.length > 0 && (
                  <Carousel autoPlay showThumbs={false} emulateTouch>
                    {CarouselList}
                  </Carousel>
                )}
            </div>
            <div className={cx("infos")}>
              <div className={cx("info-box")}>
                <div className={cx("options")}>
                  <div className={cx("label")}>상품 옵션 선택</div>
                  <select
                    className={cx("option-selector")}
                    onChange={handleSelectionChanged}
                  >
                    {optionSelector}
                  </select>
                  <div className={cx("label")}>상품 개수 선택</div>
                  <div className={cx("NumberSelectorZone")}>
                    <input
                      type="number"
                      value={number}
                      onChange={handleNumberChange}
                      className={cx("number-selector")}
                    />
                    <div className={cx("UpAndDown")}>
                      <UpIcon className={cx("Icons")} onClick={onPressUp} />
                      <DownIcon className={cx("Icons")} onClick={onPressDown} />
                    </div>
                  </div>
                </div>

                <div className={cx("price")}>개당 가격: {eachPrice}</div>
                <div className={cx("total-price")}>총 가격: {totalPrice}</div>
              </div>
              <div className={cx("buttons")}>
                <div className={cx("member-only")}>
                  <div className={cx("cart-button")}>
                    <Button onClick={onAddCart} theme="cart">
                      장바구니
                    </Button>
                  </div>
                  <div className={cx("pay-button")}>
                    <Button theme="pay" onClick={goToPay}>
                      바로구매
                    </Button>
                  </div>
                </div>

                {adminLogged && (
                  <div className={cx("admin-only")}>
                    <div className={cx("update-button")}>
                      <Button theme="update" onClick={onUpdate}>
                        수정하기
                      </Button>
                    </div>
                    <div className={cx("delete-button")}>
                      <Button theme="delete" onClick={onRemoveItem}>
                        삭제하기
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}
export default PostInfo;
