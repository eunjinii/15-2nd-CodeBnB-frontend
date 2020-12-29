import { method, result, set } from "lodash";
import React, { Component } from "react";
import DatePicker from "../../Components/DatePicker/DatePicker";
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
      // house: {
      //   home_id: 1,
      //   name: "#2BB 강남구 Room(다인실)",
      //   capacity: 2,
      //   home_type: "다인실",
      //   home_building: "아파트",
      //   address: "강남구,서울,한국",
      //   boomark: 0,
      //   host: {
      //     first_name: "승재",
      //     last_name: "김",
      //     contact: "01089817891",
      //     description: "ㅎㅇ",
      //     singup_date: "2020-12-13T00:00:00",
      //     host_profile: "https://i0.wp.com/prikachi.com/wp-content/uploads/2020/07/DPP1.jpg",
      //     is_valid: true,
      //   },
      //   images: [
      //     "https://images.unsplash.com/photo-1574120582582-257909933c5f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8ODl8fGJlZCUyMHJvb218ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      //     "https://images.unsplash.com/photo-1560448075-bb485b067938?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fGJhdGhyb29tfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      //     "https://images.unsplash.com/photo-1532372576444-dda954194ad0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fGxpdmluZyUyMHJvb218ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      //     "https://images.unsplash.com/photo-1556909211-36987daf7b4d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fGtpdGNoZW58ZW58MHx8MHw%3D&auto=format&fit=crop&w=500&q=60",
      //     "https://images.unsplash.com/photo-1575517220118-57eaf432e1d9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NzR8fGJhbGNvbnl8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      //   ],
      //   description:
      //     "메인코스 수강생에게 제공되는 WeWork 이용권으로 3개월 동안 24시간 WeWork를 이용하실 수 있습니다. 생맥주, TERAROSA(테라로사), 커피, 우유, 두유가 무제한으로 제공되고 암벽등반, 탁구, 북클럽, 요가 클래스 등 다양한 이벤트가 있는 위워크에서 동기들과 함께 강남의 테헤란로 중심부에서 개발자의 커리어를 멋지게 시작하세요.\n",
      //   facilities_list: [
      //     {
      //       name: "샴푸",
      //       url: "https://t4.ftcdn.net/jpg/02/00/63/01/240_F_200630176_aGEbiITJesunksiJoxswgtQqCcJ6Xzpy.jpg",
      //     },
      //     {
      //       name: "헤어드라이어",
      //       url: "https://t3.ftcdn.net/jpg/00/85/86/44/240_F_85864409_oxICgONDimUk46PQrjqXGbOYWaSn7MXm.jpg",
      //     },
      //     {
      //       name: "필수품목(침대시트, 베개)",
      //       url: "https://t4.ftcdn.net/jpg/02/60/02/51/240_F_260025181_IE6adQuSoqwT4SHP6H6hgBPyYil5mOwu.jpg",
      //     },
      //     {
      //       name: "건조기",
      //       url: "https://t4.ftcdn.net/jpg/02/99/97/33/240_F_299973396_tOhauwx3pQwjQLhUwxrftHSAB5yEg79Q.jpg",
      //     },
      //     {
      //       name: "기본 조리도구(냄비, 후라이팬, 기름, 소금, 후추)",
      //       url: "https://t4.ftcdn.net/jpg/04/01/28/33/240_F_401283301_s8skHPlOCoCiHsQBCCembgbenPMvVHjD.jpg",
      //     },
      //     {
      //       name: "식기류",
      //       url: "https://t4.ftcdn.net/jpg/02/64/39/51/240_F_264395114_lKzNGNeXYCWnuWUrhQjhFq9dmDKh61ti.jpg",
      //     },
      //     {
      //       name: "가스레인지 또는 인덕션",
      //       url: "https://t3.ftcdn.net/jpg/03/75/24/08/240_F_375240876_w9uoqWqgovzWdrK5vlIugGkV44ShBpIy.jpg",
      //     },
      //     {
      //       name: "냉장고",
      //       url: "https://t4.ftcdn.net/jpg/03/25/98/05/240_F_325980578_MhflnrmyLZ6Er56ShagUozM2mqKflKry.jpg",
      //     },
      //     {
      //       name: "냉장고",
      //       url: "https://t4.ftcdn.net/jpg/03/25/98/05/240_F_325980578_MhflnrmyLZ6Er56ShagUozM2mqKflKry.jpg",
      //     },
      //     {
      //       name: "업무 전용 공간",
      //       url: "https://t4.ftcdn.net/jpg/02/03/15/27/240_F_203152789_raBmA8pjKT0FPec41bHnkXd4PvXfgH4N.jpg",
      //     },
      //     {
      //       name: "게스트 전용 출입문(별도의 출입로 또는 건물 입구)",
      //       url: "https://t3.ftcdn.net/jpg/02/35/06/18/240_F_235061834_s8YeufV8akLrXCAEgWaHmUI22p05y0Ph.jpg",
      //     },
      //     {
      //       name: "화재경보기(숙소에 화재경보기가 없습니다)",
      //       url: "https://t3.ftcdn.net/jpg/02/80/68/54/240_F_280685483_hf7Hunm2LfGRHqRHuLHG44pKgKcap8CN.jpg",
      //     },
      //   ],
      //   rules: [
      //     {
      //       category: "숙소 이용 규칙",
      //       rule_list: [
      //         "열쇠 보관함(으)로 셀프 체크인",
      //         "어린이(2~12세)에게 적합하지 않음",
      //         "어린이(2~12세)에게 적합하지 않음",
      //         "반려동물 동반 불가",
      //         "파티나 이벤트 금지",
      //       ],
      //     },
      //     {
      //       category: "건강과 안전",
      //       rule_list: ["일산화탄소 경보기", "일산화탄소 경보기"],
      //     },
      //     {
      //       category: "기타 알아두어야 할 사항",
      //       rule_list: [
      //         "소음이 발생할 수 있음",
      //         "건물 내 주차 불가",
      //         "건물 내 주차 불가",
      //         "숙소에 감시 또는 녹화 장치 설치",
      //         "숙소에 위험한 동물 있음",
      //       ],
      //     },
      //     {
      //       category: "환불 정책",
      //       rule_list: ["체크인 30일 전 까지 취소하시면 전액이 환불됩니다."],
      //     },
      //   ],
      //   check_in: "10:00:00",
      //   check_out: "17:00:00",
      //   options: {
      //     침실: 1,
      //     침대: 1,
      //     욕실: 0,
      //   },
      //   home_latitude: "37.492230",
      //   home_longitutde: "127.077133",
      //   price: {
      //     "1박비용": 69000,
      //     "1인당가격증가율": 11000,
      //     청소비: 18000,
      //     서비스수수료: 0,
      //     숙박세와수수료: 0,
      //   },
      //   home_region: {
      //     region_name: "강남구",
      //     region_latitude: "37.492465",
      //     region_longtitude: "127.068818",
      //     region_radius_m: 8000,
      //     region_zoom: 13,
      //   },
      //   room_info: [
      //     {
      //       room_name: "1번 침실",
      //       bed_info: [
      //         {
      //           bed_name: "더블침대",
      //           count: 1,
      //         },
      //       ],
      //     },
      //   ],
      //   reservations: [
      //     {
      //       check_in: "2020-12-09T00:00:00",
      //       check_out: "2021-01-31T00:00:00",
      //     },
      //   ],
      // },
      guest: { adult: 1, child: 0, baby: 0 },
      checkPrice: { datePrice: "", guestPrice: "", totalPrice: "" }, //내일 아침 백엔드랑 맞춰보기
      price: { nightlyCost: "", priceGrowthPerson: "", serviceFee: "", acmdtTaxfs: "", cleaningFee: "" },
    };
  }

  reservationBtn = () => {
    // {"card_number":"12121212121",
    // "expire_date":"1212",
    // "post_code":"123",
    // "payment_date":"123",
    // "card_holder":"leesuhan",
    // "method_id":"1",
    // "home_id":"3",
    // "total_cost":"15000",
    // "check_in":"2020-12-10",
    // "check_out":"2020-12-16",
    // "status_id":"2",
    // "adult":"1",
    // "children":"0",
    // "infant":"0"
    // }
    const resURL = "http://192.168.219.140:8000/reservations";
    const resToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTM5fQ.TjACmgj4KylXHqqTLexJvAUvJZHx4rLz5fLJxzeVzGc";
    // const resGetURL =
    //   resURL +
    //   this.state.house.home_id +
    //   "?card_number=12121212121&expire_date=1212&post_code=123&payment_date=123&card_holder=leesuhan&method_id=1" +
    //   "&home_id=" +
    //   this.state.house.home_id +
    //   "&total_cost=" +
    //   this.state.checkPrice.totalPrice +
    //   "&check_in=" +
    //   this.state.startDate +
    //   "&check_out=" +
    //   this.state.endDate +
    //   "&status_id=2&adult=" +
    //   this.state.guest.adult +
    //   "&children=" +
    //   this.state.guest.child +
    //   "&infant=" +
    //   this.state.guest.baby;

    // console.log(resGetURL);

    fetch(resURL, {
      method: "POST",
      headers: {
        Authorization: resToken,
      },
      body: JSON.stringify({
        card_number: "12121212121",
        expire_date: "1212",
        post_code: "123",
        payment_date: "123",
        card_holder: "leesuhan",
        method_id: "1",
        home_id: String(this.state.house.home_id),
        total_cost: String(this.state.checkPrice.totalPrice),
        check_in: String(this.state.startDate),
        check_out: String(this.state.endDate),
        status_id: "2",
        adult: String(this.state.guest.adult),
        children: String(this.state.guest.child),
        infant: String(this.state.guest.baby),
      }),
    })
      .then(result => result.json())
      .then(result => {
        console.log(result);
      });
  };

  // console.log("home_id: " + this.state.house.home_id);
  // console.log("total_cost: " + this.state.checkPrice.totalPrice); //this.state.checkPrice.totalPrice
  // console.log("check_in: " + this.state.startDate);
  // console.log("check_out: " + this.state.endDate);
  // console.log("adult: " + this.state.guest.adult);
  // console.log("children: " + this.state.guest.child);
  // console.log("infant: " + this.state.guest.baby);
  // };

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
    const changeGuest = this.state.guest;
    // console.log(changeGuest);
    if (checkValue === "adult") {
      // console.log("before: " + this.state.guest.adult);
      changeGuest.adult++;
      this.setState({ guest: changeGuest });
      // console.log("after: " + this.state.guest.adult);
    } else if (checkValue === "child") {
      // console.log("어린이입니다!");
      changeGuest.child++;
      this.setState({ guest: changeGuest });
    } else {
      // console.log("유아입니다");
      changeGuest.baby++;
      this.setState({ guest: changeGuest });
    }
    this.checkCal();
  };

  checkMinus = e => {
    const checkValue = e.target.alt;
    const changeGuest = this.state.guest;
    if (checkValue === "adult") {
      changeGuest.adult--;
      this.setState({ guest: changeGuest });
    } else if (checkValue === "child") {
      changeGuest.child--;
      this.setState({ guest: changeGuest });
    } else {
      changeGuest.baby--;
      this.setState({ guest: changeGuest });
    }
    this.checkCal();
  };

  checkCal = () => {
    //price: { nightlyCost: "", priceGrowthPerson: "", serviceFee: "", acmdtTaxfs: "", cleaningFee: "" },
    // console.log("체크인  날짜: " + this.state.startDate);
    // console.log("체크아웃날짜: " + this.state.endDate);
    // console.log("게스트인원수: " + (this.state.guest.adult + this.state.guest.child));
    const dateCalulator = (new Date(this.state.endDate) - new Date(this.state.startDate)) / (24 * 60 * 60 * 1000);
    const guestCaculator = this.state.guest.adult + this.state.guest.child;
    const setCheckPrice = this.state.checkPrice;
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

    // console.log(
    //   this.state.checkPrice.datePrice +
    //     ", " +
    //     this.state.checkPrice.guestPrice +
    //     ", " +
    //     this.state.checkPrice.totalPrice
    // );
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

  render() {
    const { house, price } = this.props;
    const sumGuest = this.state.guest.adult + this.state.guest.child;

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
                <img className="redStar" src="images\RoomDetail\redStar.png" alt="별점" />
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
                    />
                  </div>
                )}
                <div className="checkContainerBottom">
                  <div className="checkInNum" onClick={this.checkInNum}>
                    <div className="checkInTopBox">
                      <div className="checkPersonnel">인원</div>
                      <div className="checkGuest">
                        게스트 {sumGuest}명{this.state.guest.baby > 0 ? ", 유아 " + this.state.guest.baby + "명" : ""}
                      </div>
                    </div>
                    <div className="checkInBottomBox">
                      <img className="guestIcon" src="images/RoomDetail/downArrow.png" alt="인원 버튼" />
                    </div>
                  </div>
                  <div className="modalTextContainer">
                    <div className="modalTextBox">
                      <div className="modalAdultBox">
                        <div className="modalAdultText">성인</div>
                        <div className="adultBtnContainer">
                          <div className="adultMinusBtn">
                            {this.state.guest.adult === 1 ? (
                              <img
                                className="nonMinusBtn"
                                alt="adult"
                                src="\images\RoomDetail\icons8-minus-64.png"
                              ></img>
                            ) : (
                              <img
                                className="minusBtn"
                                alt="adult"
                                src="\images\RoomDetail\icons8-minus-64.png"
                                onClick={this.checkMinus}
                              ></img>
                            )}
                          </div>
                          <div className="modalAdultCount" value="adult">
                            {this.state.guest.adult}
                          </div>
                          <div className="adultPlusBtn">
                            {sumGuest === 8 ? (
                              <img className="nonPlusBtn" alt="adult" src="\images\RoomDetail\icons8-plus-64.png"></img>
                            ) : (
                              <img
                                className="plusBtn"
                                alt="adult"
                                src="\images\RoomDetail\icons8-plus-64.png"
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
                            {this.state.guest.child === 0 ? (
                              <img
                                className="nonMinusBtn"
                                alt="child"
                                src="\images\RoomDetail\icons8-minus-64.png"
                              ></img>
                            ) : (
                              <img
                                className="minusBtn"
                                alt="child"
                                src="\images\RoomDetail\icons8-minus-64.png"
                                onClick={this.checkMinus}
                              ></img>
                            )}
                          </div>
                          <div className="modalmodalCount" value="child">
                            {this.state.guest.child}
                          </div>
                          <div className="childPlusBtn">
                            {sumGuest === 8 ? (
                              <img className="nonPlusBtn" alt="child" src="\images\RoomDetail\icons8-plus-64.png"></img>
                            ) : (
                              <img
                                className="plusBtn"
                                alt="child"
                                src="\images\RoomDetail\icons8-plus-64.png"
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
                            {this.state.guest.baby === 0 ? (
                              <img
                                className="nonMinusBtn"
                                alt="baby"
                                src="\images\RoomDetail\icons8-minus-64.png"
                              ></img>
                            ) : (
                              <img
                                className="minusBtn"
                                alt="baby"
                                src="\images\RoomDetail\icons8-minus-64.png"
                                onClick={this.checkMinus}
                              ></img>
                            )}
                          </div>
                          <div className="modalBabyCount" value="baby">
                            {this.state.guest.baby}
                          </div>
                          <div className="babyPlusBtn">
                            {this.state.guest.baby === 5 ? (
                              <img className="nonPlusBtn" alt="baby" src="\images\RoomDetail\icons8-plus-64.png"></img>
                            ) : (
                              <img
                                className="plusBtn"
                                alt="baby"
                                src="\images\RoomDetail\icons8-plus-64.png"
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
              <button className="reservationSubmit" onClick={this.reservationBtn}>
                예약하기
              </button>
              <div className="checkBtnContents">
                <div className="checkContentsText">예약 확정 전에는 요금이 청구되지 않습니다.</div>
                <div className="checkContentsBox">
                  <div className="contentsRoomBox">
                    <div className="contentsRoomTax">숙소</div>
                    <div className="contentsRoomTaxPrice">₩{this.state.checkPrice.datePrice}</div>
                  </div>

                  <div className="contentsPriceBox">
                    <div className="contentsPrice">1인당가격증가율</div>
                    <div className="contentsPricePrice">₩{price.priceGrowthPerson}</div>
                  </div>

                  <div className="contentsCleaningBox">
                    <div className="contentsCleaningTax">청소비</div>
                    <div className="contentsCleaningTaxPrice">₩{price.cleaningFee}</div>
                  </div>

                  <div className="contentsServiceBox">
                    <div className="contentsServiceTax">서비스 수수료</div>
                    <div className="contentsServiceTaxPrice">₩{price.serviceFee}</div>
                  </div>

                  <div className="contentsRoomBox">
                    <div className="contentsRoomTax">숙박세와 수수료</div>
                    <div className="contentsRoomTaxPrice">₩{price.acmdtTaxfs}</div>
                  </div>
                </div>
                <div className="totalPriceBox">
                  <div className="totalPriceText">총합계</div>
                  <div className="totalPrice">₩{this.state.checkPrice.totalPrice}</div>
                </div>
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
