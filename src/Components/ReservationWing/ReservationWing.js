import React, { Component } from "react";
// import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from " react-dates ";
// import " react-dates / lib / css / _datepicker.css ";
// import { Link } from "react-router-dom";
import "./ReservationWing.scss";

class ReservationWing extends Component {
  // constructor() {
  //   super();
  //   this.setstate = {
  //     house: "",
  //   };
  // }

  // reservationCheck = () => {
  //   //달력열리게하기!
  //   // document.getElementsByClassName.infoDescription[0].style.display = "none";
  //   // document.getElementsByClassName.infoPrice[0].style.display = "block";
  // };

  render() {
    return (
      <>
        <div className="ReservationContainer">
          <div className="topBox">
            <div className="reservationInfo">
              <div className="infoDescription">요금을 확인하려면 날짜를 입력하세요.</div>
              <div className="infoPrice">₩300,000/박</div>
              <div className="reservationInfoBox">
                <img className="redStar" src="images\RoomDetail\redStar.png" alt="별점" />
                <div className="infoScore">4.8</div>
              </div>
            </div>
            <div className="middleBox">
              <div className="middleCheckText">가장 빠른 예약 가능 날짜는 1월 3일입니다.</div>
              <div className="middleCheckBtn">체크인 날짜 추가</div>
            </div>
            <div className="checkInBox">
              <div className="checkContainer">
                <div className="checkContainerTop">
                  <div className="checkInDate">
                    <div className="checkInDateText">체크인</div>
                    <div className="checkInDatePlus">날짜 추가</div>

                    {/* <DateRangePicker
                      startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                      endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                      onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                      focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                      onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    /> */}
                  </div>
                  <div className="checkOutDate">
                    <div className="checkOutDateText">체크아웃</div>
                    <div className="checkOutDatePlus">날짜 추가</div>
                  </div>
                </div>
                <div className="checkContainerBottom">
                  <div className="checkInNum">
                    <div className="checkInTopBox">
                      <div className="checkPersonnel">인원</div>
                      <div className="checkGuest">게스트 1명</div>
                    </div>
                    <div className="checkInBottomBox">
                      <img className="guestIcon" src="images/Components/downArrow.png" alt="인원 버튼" />
                    </div>
                  </div>
                </div>
              </div>
              <button className="checkBtn" onClick="reservationCheck">
                예약 가능 여부 보기
              </button>
              <button className="reservationSubmit">예약하기</button>
              <div className="checkBtnContents">
                <div className="checkContentsText">예약 확정 전에는 요금이 청구되지 않습니다.</div>
                <div className="checkContentsBox">
                  <div className="contentsRoomBox">
                    <div className="contentsRoomTax">숙소</div>
                    <div className="contentsRoomTaxPrice">₩9,635,000</div>
                  </div>

                  <div className="contentsPriceBox">
                    <div className="contentsPrice">1인당가격증가율</div>
                    <div className="contentsPricePrice">-₩674,450</div>
                  </div>

                  <div className="contentsCleaningBox">
                    <div className="contentsCleaningTax">청소비</div>
                    <div className="contentsCleaningTaxPrice">₩70,000</div>
                  </div>

                  <div className="contentsServiceBox">
                    <div className="contentsServiceTax">서비스 수수료</div>
                    <div className="contentsServiceTaxPrice">₩958,837</div>
                  </div>

                  <div className="contentsRoomBox">
                    <div className="contentsRoomTax">숙박세와 수수료</div>
                    <div className="contentsRoomTaxPrice">₩95,883</div>
                  </div>
                </div>
              </div>
              <div className="totalPriceBox">
                <div className="totalPriceText">총합계</div>
                <div className="totalPrice">₩10,085,270</div>
              </div>
            </div>
            <div className="bottomBox"></div>
          </div>
        </div>
      </>
    );
  }
}

export default ReservationWing;
