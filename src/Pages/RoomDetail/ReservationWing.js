import { method, result, set } from "lodash";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import DatePicker from "../../Components/DatePicker/DatePicker";
import moment from "moment";
import { RESERVATION_LIST as API } from "../../config";
import "./ReservationWing.scss";

class ReservationWing extends Component {
  constructor() {
    super();
    this.state = {
      isCalendarOpen: false,
      changeTextBtn: "",
      clickTest: "",
      dateCheck: "",
      startDate: "",
      endDate: "",
      date: new Date(),
      adut: 0,
      child: 0,
      infant: 0,
      checkPrice: { datePrice: "", guestPrice: "", totalPrice: "" }, //내일 아침 백엔드랑 맞춰보기
      price: { nightlyCost: "", priceGrowthPerson: "", serviceFee: "", acmdtTaxfs: "", cleaningFee: "" },
    };
  }

  componentDidMount() {
    if (this.props.location.search) {
      const MAPPING = {};
      for (let i of this.props.location.search.split("&")) {
        if (i.includes("?")) i = i.slice(1);
        const key = i.split("=")[0];
        const value = i.split("=")[1];
        MAPPING[key] = value;
      }
      console.log(MAPPING);

      this.setState({
        startDate: MAPPING.checkin,
        endDate: MAPPING.checkout,
        adult: Number(MAPPING.adult),
        child: Number(MAPPING.child),
        infant: Number(MAPPING.infant),
      });
    } else {
      this.setState({
        startDate: "",
        endDate: "",
        adult: 0,
        child: 0,
        infant: 0,
      });
    }
  }

  reservationBtn = () => {
    fetch(API, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        card_number: "12121212121",
        expire_date: "1212",
        post_code: "123",
        payment_date: "123",
        card_holder: "leesuhan",
        method_id: "1",
        home_id: String(this.props.house.home_id),
        total_cost: String(this.state.checkPrice.totalPrice),
        check_in: String(this.state.startDate),
        check_out: String(this.state.endDate),
        status_id: "2",
        adult: String(this.state.adult),
        children: String(this.state.child),
        infant: String(this.state.infant),
      }),
    })
      .then(result => result.json())
      .then(result => {
        if (result.MESSAGE === "SUCCESS") {
          alert("예약에 성공하였습니다 :)");
        }
      });
  };

  toggleCalendar = () => {
    this.setState({ isCalendarOpen: !this.state.isCalendarOpen });
    this.dateCheck();
    this.checkCal();
    this.setDefault();
  };

  checkInNum = () => {
    if (document.getElementsByClassName("modalTextContainer")[0].style.display === "block") {
      document.getElementsByClassName("modalTextContainer")[0].style.display = "none";
    } else {
      document.getElementsByClassName("modalTextContainer")[0].style.display = "block";
    }
  };

  clickTest = () => {
    if (
      document.getElementsByClassName("checkInDatePlus")[0].innerHTML === "날짜를 선택해주세요" ||
      document.getElementsByClassName("checkOutDatePlus")[0].innerHTML === "날짜를 선택해주세요"
    ) {
      this.toggleCalendar();
    }
  };

  dateCheck = () => {
    if (
      document.getElementsByClassName("checkInDatePlus")[0].innerHTML !== "날짜를 선택해주세요" &&
      document.getElementsByClassName("checkOutDatePlus")[0].innerHTML !== "날짜를 선택해주세요"
    ) {
      document.getElementsByClassName("checkBtn")[0].style.display = "none";
      document.getElementsByClassName("reservationSubmit")[0].style.display = "block";
      document.getElementsByClassName("checkBtnContents")[0].style.display = "block";
      document.getElementsByClassName("middleBox")[0].style.display = "none";
    } else {
      document.getElementsByClassName("checkBtn")[0].style.display = "block";
    }
  };

  checkPlus = e => {
    const checkValue = e.target.alt;
    const { adult, child, infant } = this.state;
    if (checkValue === "adult") {
      this.setState({ adult: adult + 1 });
    } else if (checkValue === "child") {
      this.setState({ child: child + 1 });
    } else {
      this.setState({ infant: infant + 1 });
    }
    this.checkCal();
  };

  checkMinus = e => {
    const checkValue = e.target.alt;
    const { adult, child, infant } = this.state;
    if (checkValue === "adult") {
      this.setState({ adult: adult - 1 });
    } else if (checkValue === "child") {
      this.setState({ child: child - 1 });
    } else {
      this.setState({ infant: infant - 1 });
    }
    this.checkCal();
  };

  checkCal = () => {
    const dateCalulator = (new Date(this.state.endDate) - new Date(this.state.startDate)) / (24 * 60 * 60 * 1000);
    const guestCaculator = this.state.adult + this.state.child;
    const setCheckPrice = {};
    const { price } = this.props;
    setCheckPrice.datePrice = dateCalulator * price.nightlyCost;
    setCheckPrice.guestPrice = guestCaculator * price.priceGrowthPerson;
    setCheckPrice.totalPrice =
      setCheckPrice.datePrice +
      setCheckPrice.guestPrice +
      price.cleaningFee * dateCalulator +
      price.serviceFee +
      price.acmdtTaxfs;

    this.setState({
      checkPrice: setCheckPrice,
    });
  };

  setStartDate = date => {
    this.setState({ startDate: date });
  };

  setEndDate = date => {
    this.setState({ endDate: date });
  };

  setDefault = () => {
    const { house, price } = this.props;
    this.setState({
      house: house,
      price: price,
    });
  };

  findDatesBetween = (startDate, endDate) => {
    const start = moment(startDate).subtract(1, "days");
    const end = moment(endDate);
    const result = [];

    while (start.diff(end) !== 0) {
      result.push(start.add(1, "days").format("YYYY-MM-DD"));
    }
    return result;
  };

  render() {
    const { house, price } = this.props;
    const blocked = house.reservations?.reduce((acc, curr) => {
      return [...acc, ...this.findDatesBetween(curr.check_in, curr.check_out)];
    }, []);

    const sumGuest = this.state.adult + this.state.child;
    const shouldCalculationOpen = this.state.startDate?.length !== 0 && this.state.endDate?.length !== 0;

    return (
      <>
        <div className="ReservationContainer">
          <div className="topBox">
            <div className="reservationInfo">
              <div className="infoDescription">
                요금을 확인하려면 날짜를
                <br />
                입력하세요.
              </div>
              <div className="infoPrice">₩{price.nightlyCost}/박</div>
              <div className="reservationInfoBox">
                <img className="redStar" src="/images/RoomDetail/redStar.png" alt="별점" />
                <div className="infoScore">{house.capacity}</div>
                <div className="infoReviewCount">({house.review_count})</div>
              </div>
            </div>
            <div className="middleBox">
              <div className="middleCheckText">
                가장 빠른 예약 가능 날짜는 {this.state.date.getMonth() + 1}월 {this.state.date.getDate() + 1}입니다.
              </div>
              <div className="middleCheckBtn" onClick={this.toggleCalendar}>
                체크인 날짜 추가
              </div>
            </div>
            <div className="checkInBox">
              <div className="checkContainer">
                <div className="checkContainerTop" onClick={this.toggleCalendar}>
                  <div className="checkInDate">
                    <div className="checkInDateText">체크인</div>
                    <div className="checkInDatePlus">
                      {this.state.startDate ? this.state.startDate : "날짜를 선택해주세요"}
                    </div>
                  </div>
                  <div className="checkOutDate">
                    <div className="checkOutDateText">체크아웃</div>
                    <div className="checkOutDatePlus">
                      {this.state.endDate ? this.state.endDate : "날짜를 선택해주세요"}
                    </div>
                  </div>
                </div>

                {this.state.isCalendarOpen && (
                  <div className="datePickerContainer">
                    <DatePicker
                      start={this.state.startDate}
                      end={this.state.endDate}
                      updateStartDate={this.setStartDate}
                      updateEndDate={this.setEndDate}
                      blockedDates={blocked}
                    />
                  </div>
                )}
                <div className="checkContainerBottom">
                  <div className="checkInNum" onClick={this.checkInNum}>
                    <div className="checkInTopBox">
                      <div className="checkPersonnel">인원</div>
                      <div className="checkGuest">
                        게스트 {sumGuest}명{this.state.infant > 0 ? ", 유아 " + this.state.infant + "명" : ""}
                      </div>
                    </div>
                    <div className="checkInBottomBox">
                      <img className="guestIcon" src="/images/RoomDetail/downArrow.png" alt="인원 버튼" />
                    </div>
                  </div>
                  <div className="modalTextContainer">
                    <div className="modalTextBox">
                      <div className="modalAdultBox">
                        <div className="modalAdultText">성인</div>
                        <div className="adultBtnContainer">
                          <div className="adultMinusBtn">
                            {this.state.adult === 1 ? (
                              <img
                                className="nonMinusBtn"
                                alt="adult"
                                src="/images/RoomDetail/icons8-minus-64.png"
                              ></img>
                            ) : (
                              <img
                                className="minusBtn"
                                alt="adult"
                                src="/images/RoomDetail/icons8-minus-64.png"
                                onClick={this.checkMinus}
                              ></img>
                            )}
                          </div>
                          <div className="modalAdultCount" value="adult">
                            {this.state.adult}
                          </div>
                          <div className="adultPlusBtn">
                            {sumGuest === 8 ? (
                              <img className="nonPlusBtn" alt="adult" src="/images/RoomDetail/icons8-plus-64.png"></img>
                            ) : (
                              <img
                                className="plusBtn"
                                alt="adult"
                                src="/images/RoomDetail/icons8-plus-64.png"
                                onClick={this.checkPlus}
                              ></img>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="modalChildContainer">
                        <div className="modalChildBox">
                          <div className="modalChildText">어린이</div>
                          <div className="modalChildAge">2~12세</div>
                        </div>
                        <div className="childBtnContainer">
                          <div className="childMinusBtn">
                            {this.state.child === 0 ? (
                              <img
                                className="nonMinusBtn"
                                alt="child"
                                src="/images/RoomDetail/icons8-minus-64.png"
                              ></img>
                            ) : (
                              <img
                                className="minusBtn"
                                alt="child"
                                src="/images/RoomDetail/icons8-minus-64.png"
                                onClick={this.checkMinus}
                              ></img>
                            )}
                          </div>
                          <div className="modalmodalCount" value="child">
                            {this.state.child}
                          </div>
                          <div className="childPlusBtn">
                            {sumGuest === 8 ? (
                              <img className="nonPlusBtn" alt="child" src="/images/RoomDetail/icons8-plus-64.png"></img>
                            ) : (
                              <img
                                className="plusBtn"
                                alt="child"
                                src="/images/RoomDetail/icons8-plus-64.png"
                                onClick={this.checkPlus}
                              ></img>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="modalBabyContainer">
                        <div className="modalBabyBox">
                          <div className="modalBabyText">유아</div>
                          <div className="modalBabyAge">2세미만</div>
                        </div>
                        <div className="babyBtnContainer">
                          <div className="babyMinusBtn">
                            {this.state.infant === 0 ? (
                              <img
                                className="nonMinusBtn"
                                alt="infant"
                                src="/images/RoomDetail/icons8-minus-64.png"
                              ></img>
                            ) : (
                              <img
                                className="minusBtn"
                                alt="infant"
                                src="/images/RoomDetail/icons8-minus-64.png"
                                onClick={this.checkMinus}
                              ></img>
                            )}
                          </div>
                          <div className="modalBabyCount" value="baby">
                            {this.state.infant}
                          </div>
                          <div className="babyPlusBtn">
                            {this.state.infant === 5 ? (
                              <img
                                className="nonPlusBtn"
                                alt="infant"
                                src="/images/RoomDetail/icons8-plus-64.png"
                              ></img>
                            ) : (
                              <img
                                className="plusBtn"
                                alt="infant"
                                src="/images/RoomDetail/icons8-plus-64.png"
                                onClick={this.checkPlus}
                              ></img>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="modalFooterContainer">
                      <div className="modaFooter">최대 8명.유아는 숙박인원에 포함되지 않습니다.</div>
                      <div className="modalClose" onClick={this.checkInNum}>
                        닫기
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="checkBtn" onClick={this.clickTest}>
                예약 가능 여부 보기
              </button>
              {shouldCalculationOpen && (
                <>
                  <button className="reservationSubmit" onClick={this.reservationBtn}>
                    예약하기
                  </button>
                  <div className="checkBtnContents">
                    <div className="checkContentsText">예약 확정 전에는 요금이 청구되지 않습니다.</div>
                    <div className="checkContentsBox">
                      <div className="contentsRoomBox">
                        <div className="contentsRoomTax">숙소</div>
                        <div className="contentsRoomTaxPrice">₩ {this.state.checkPrice.datePrice}</div>
                      </div>

                      <div className="contentsPriceBox">
                        <div className="contentsPrice">1인당가격증가율</div>
                        <div className="contentsPricePrice">₩ {price.priceGrowthPerson}</div>
                      </div>

                      <div className="contentsCleaningBox">
                        <div className="contentsCleaningTax">청소비</div>
                        <div className="contentsCleaningTaxPrice">₩ {price.cleaningFee}</div>
                      </div>

                      <div className="contentsServiceBox">
                        <div className="contentsServiceTax">서비스 수수료</div>
                        <div className="contentsServiceTaxPrice">₩ {price.serviceFee}</div>
                      </div>

                      <div className="contentsRoomBox">
                        <div className="contentsRoomTax">숙박세와 수수료</div>
                        <div className="contentsRoomTaxPrice">₩ {price.acmdtTaxfs}</div>
                      </div>
                    </div>
                    <div className="totalPriceBox">
                      <div className="totalPriceText">총합계</div>
                      <div className="totalPrice">₩ {this.state.checkPrice.totalPrice}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="bottomBox"></div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ReservationWing);
