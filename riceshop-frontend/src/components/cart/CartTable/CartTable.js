import React from "react";
import styles from "./CartTable.scss";
import classNames from "classnames/bind";
import Button from "components/common/Button";
import { Link } from "react-router-dom";
import FaPlusCircle from "react-icons/lib/fa/plus-circle";
import TiEquals from "react-icons/lib/ti/equals";

const cx = classNames.bind(styles);

const CartTable = ({
  ver,
  cartList,
  totalPrice,
  onRemoveById,
  getPostItemById,
  setSelectedCart,
  setNumber,
  showModal
}) => {
  const handleSelect = e => {
    const { id } = e.target;
    const selectedCart = cartList.filter(cart => {
      return cart.id === parseInt(id, 10);
    });
    getPostItemById(id);
    setSelectedCart({ cart: selectedCart[0] });
    setNumber({ value: selectedCart[0].amount });
    showModal();
  };

  const handleChange = e => {
    console.log(e.target.value);
  };

  const carts = cartList.map((cart, i) => {
    return (
      <div className={cx("row")} key={i}>
        <div className={cx("content")}>
          <div className={cx("FirstColumn")}>
            <Link to={`/post/${cart.id}`} className={cx("ImageWrapper")}>
              <img
                className={cx("image")}
                src={`/api/uploads/${cart.thumbnailImage}`}
                alt="CartImage"
              />
            </Link>
            <Link to={`/post/${cart.id}`} className={cx("TitleAndOption")}>
              {cart.title} - {cart.option}
            </Link>
          </div>
        </div>
        {/* <div className={cx('content')}>
            <Link to={`/post/${cart.id}`}>
              {cart.title} - {cart.option}
              </Link>
            </div> */}
        <div className={cx("content")}>
          <div className={cx("InputWrapper")}>
            {cart.amount}
            {!ver && (
              <div className={cx("Button")}>
                <Button id={cart.id} onClick={handleSelect}>
                  수정
                </Button>
              </div>
            )}
          </div>
          {/* <div className={cx('InputWrapper')}>
        <input type="text" name="number" className={cx("ChangableInput")} value={cart.amount} />
        <div className={cx("Button")}>
          <Button id={cart.id} onClick={handleClick}>완료</Button>
        </div>
       </div> */}
        </div>
        {/* <div className={cx("content")} id={cart.id} onClick={handleClick}>{cart.amount}</div> */}
        <div className={cx("content")}>
          <div className={cx("Text")}>{cart.totalPrice}</div>
        </div>
        {!ver && (
          <div className={cx("content")}>
            <Button
              removeid={cart.cartId}
              onClick={onRemoveById}
              theme="remove"
            >
              삭제
            </Button>
          </div>
        )}
      </div>
    );
  });

  const cartMobile = cartList.map((cart, i) => {
    return (
      <div className={cx("line")} key={i}>
        <div className={cx("Title")}>
          <div className={cx("Text")}>{cart.title}</div>
        </div>
        <div className={cx("ImageTitleAndOption")}>
          <img
            className={cx("Image")}
            src={`/api/uploads/${cart.thumbnailImage}`}
            alt="CartThumbnail"
          />
          <div className={cx("Description")}>
            <div className={cx("ItemTitle")}>{cart.title}</div>
            <div className={cx("ItemOption")}>{cart.option}</div>
          </div>
        </div>
        <div className={cx("AboutItem")}>
          <div className={cx("Line")}>
            <div className={cx("Label")}>상품금액 ({cart.amount}개)</div>
            <div className={cx("Price")}>
              <div className={cx("Number")}>{cart.totalPrice}</div>원
            </div>
          </div>
        </div>
        <div className={cx("RemoveButton")}>
          {!ver && (
            <div className={cx("remove-line")}>
              <div className={cx("remove-mark")}>
                <div
                  className={cx("remove-button")}
                  removeid={cart.cartId}
                  onClick={onRemoveById}
                >
                  삭제
                </div>
              </div>
            </div>
          )}
        </div>
        {/* <div className={cx("left-line")}>
          <div className={cx("thumbnail")}>
            <Link to={`/post/${cart.id}`}>
              <img
                className={cx("image")}
                src={`/api/uploads/${cart.thumbnailImage}`}
              />
            </Link>
          </div>
        </div> */}
        {/* <div className={cx("right-line")}>
          <div className={cx("title")}>
            <Link to={`/post/${cart.id}`}>
              {cart.title} - {cart.option}
            </Link>
          </div>
          <div className={cx("number")}>수량: {cart.amount}</div>
          <div className={cx("price")}>가격: {cart.totalPrice}</div>
        </div> */}
        {/* {!ver && (
          <div className={cx("remove-line")}>
            <div className={cx("remove-mark")}>
              <div
                className={cx("remove-button")}
                removeid={cart.cartId}
                onClick={onRemoveById}
              >
                삭제
              </div>
            </div>
          </div>
        )} */}
      </div>
    );
  });
  if (cartList.length === 0) {
    return (
      <div className={cx("no-cart")}>
        <div className={cx("text")}>현재 장바구니에 담긴 상품이 없습니다.</div>
        <div className={cx("button-wrapper")}>
          <Link to="/item" className={cx("button")}>
            쇼핑 계속 하기
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className={cx("cart-table")}>
      <div className={cx("cart-content")}>
        <div className={cx("header")}>
          <div className={cx("heading")}>상품 / 옵션 정보</div>
          {/* <div className={cx('heading')}>
            상품명
          </div> */}
          <div className={cx("heading")}>수량</div>
          <div className={cx("heading")}>가격</div>
          {!ver && <div className={cx("heading")}>삭제</div>}
        </div>
        <div className={cx("body")}>{carts}</div>
      </div>
      <div className={cx("cart-content-mobile")}>{cartMobile}</div>

      <div className={cx("InfoLine")}>
        <div className={cx("total-price")}>
          <div className={cx("Descriptions")}>
            <div className={cx("LeftDesc")}>
              <div className={cx("Normal")}>총</div>
              <div className={cx("Bold")}>{cartList.length}</div>
              <div className={cx("Normal")}>개의 상품 금액 </div>
              <div className={cx("Bold")}>{parseInt(totalPrice, 10)}</div>
              <div className={cx("Normal")}>원</div>
            </div>
            <div className={cx("PlusIcon")}>
              <FaPlusCircle className={cx("Icon")} />
            </div>
            <div className={cx("CenterDesc")}>
              <div className={cx("Normal")}>배송비</div>
              <div className={cx("Bold")}>3000</div>
              <div className={cx("Normal")}>원</div>
            </div>
            <div className={cx("EqualIcon")}>
              <TiEquals className={cx("Icon")} />
            </div>
            <div className={cx("RightDesc")}>
              <div className={cx("Bold")}>
                {parseInt(totalPrice, 10) + 3000}
              </div>
              <div className={cx("Normal")}>원</div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("Bottom")}>
        {!ver && [
          <div className={cx("order-button")} key="order">
            <div className={cx("Button")}>
              <Button to="/payment" theme="order-mobile">
                주문하기
              </Button>
            </div>
          </div>,
          <div className={cx("order-button")} key="shopping">
            <div className={cx("Button")}>
              <Button to="/item" theme="order-mobile">
                계속 쇼핑하기
              </Button>
            </div>
          </div>
        ]}
      </div>
    </div>
  );
};

export default CartTable;
