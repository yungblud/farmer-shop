import React from "react";
import styles from "./UserCheckoutDetail.scss";
import classNames from "classnames/bind";
import Button from "components/common/Button";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const UserCheckoutDetail = ({
  userCheckoutDetail,
  parcel,
  onCancel,
  onComplete
}) => {
  const { ordered_list, ordered_number, item_number } = userCheckoutDetail;

  let texted_ordered_list = "";
  let splitted_ordered_number = "";
  if (ordered_list !== undefined && ordered_number !== undefined) {
    splitted_ordered_number = ordered_number.split(",");
    texted_ordered_list = ordered_list.split(",").map((list, i) => {
      console.log();
      if (i !== ordered_list.split(",").length - 1) {
        return (
          <div className={cx("text")} key={i}>
            <Link to={`/post/${item_number.split(",")[i]}`}>
              {list}-{splitted_ordered_number[i]}개
            </Link>
          </div>
        );
      }
    });
  }
  const parcels =
    userCheckoutDetail.songjang && parcel.size === 0 ? (
      <div className={cx("line")}>
        <div className={cx("empty-description")}>
          <div className={cx("text")}>현재 등록된 정보가 없습니다.</div>
        </div>
      </div>
    ) : (
      parcel.map((info, i) => {
        return (
          <div className={cx("line")} key={i}>
            <div className={cx("content")}>{info.get("step")}</div>
            <div className={cx("content")}>{info.get("date")}</div>
            <div className={cx("content")}>{info.get("status")}</div>
            <div className={cx("content")}>{info.get("location")}</div>
          </div>
        );
      })
    );

  return (
    <div className={cx("detail")}>
      {userCheckoutDetail.pay_backed ? (
        <div className={cx("shadowed-box")}>
          환불 처리가 완료 되었습니다. 환불 된 금액은 7 일 이내에 환불
          완료됩니다. 감사합니다.
        </div>
      ) : (
        <div>
          <div className={cx("shadowed-box")}>
            <div className={cx("columns")}>
              <div className={cx("left-column")}>
                <div className={cx("column")}>
                  <div className={cx("column-name")}>주문 한 상품 리스트</div>
                  <div className={cx("column-content")}>
                    {texted_ordered_list}
                  </div>
                </div>
                <div className={cx("column")}>
                  <div className={cx("column-name")}>결제 총 금액</div>
                  <div className={cx("column-content")}>
                    {userCheckoutDetail.paid_amount}
                  </div>
                </div>
                <div className={cx("column")}>
                  <div className={cx("column-name")}>주문 날짜</div>
                  <div className={cx("column-content")}>
                    {userCheckoutDetail.createdAt}
                  </div>
                </div>
                {userCheckoutDetail.songjang ? null : (
                  <div className={cx("column")}>
                    <div className={cx("column-name")}>배송 여부</div>
                    <div className={cx("column-content")}>
                      {userCheckoutDetail.checked ? "배송 중" : "배송 준비 중"}
                    </div>
                  </div>
                )}
                <div className={cx("column")}>
                  <div className={cx("column-name")}>송장번호</div>
                  <div className={cx("column-content")}>
                    {userCheckoutDetail.checked === true
                      ? userCheckoutDetail.songjang === null
                        ? "배송이 시작되었지만, 송장번호가 아직 등록되지 않았습니다."
                        : `${userCheckoutDetail.songjang} (CJ 대한통운)`
                      : "배송 준비 중"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {userCheckoutDetail.iscomplete ||
          userCheckoutDetail.checked ? null : (
            <div className={cx("cancel-button")}>
              {/* <Button theme="cancel" onClick={onCancel}>주문 취소하기</Button> */}
            </div>
          )}
          <div className={cx("label")}>배송정보</div>
          <div className={cx("shadowed-box")}>
            <div className={cx("thead")}>
              <div className={cx("content")}>단계</div>
              <div className={cx("content")}>처리 일시</div>
              <div className={cx("content")}>상품 상태</div>
              <div className={cx("content")}>담당 점소</div>
            </div>
            <div className={cx("tbody")}>
              {userCheckoutDetail.checked === true ? (
                userCheckoutDetail.songjang === null ? (
                  "배송이 시작되었지만, 송장번호가 아직 등록되지 않았습니다."
                ) : (
                  parcels
                )
              ) : (
                <div className={cx("line")}>
                  <div className={cx("empty-description")}>
                    현재 배송전이므로 배송정보가 없습니다.
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* {!userCheckoutDetail.iscomplete ? (
            <div className={cx("buttons-wrapper")}>
              <div className={cx("button")} onClick={onComplete}>
                구매 확정
              </div>
            </div>
          ) : (
            <div className={cx("complete-label")}>
              <div className={cx("text")}>구매 확정 완료된 상품입니다.</div>
            </div>
          )} */}
        </div>
      )}
      {/* {userCheckoutDetail.cancelled ? (
        userCheckoutDetail.pay_backed ? (
          <div className={cx("shadowed-box")}>
            환불 처리가 완료 되었습니다. 환불 된 금액은 7 일 이내에 환불
            완료됩니다. 감사합니다.
          </div>
        ) : (
          <div className={cx("shadowed-box")}>
            환불 대기중 입니다. 빠른 시일내에 환불 처리 하도록 하겠습니다. 문의
            사항은 010-1234-1234로 연락주시기 바랍니다.
          </div>
        )
      ) : (
        
      )} */}
    </div>
  );
};

export default UserCheckoutDetail;
