import React, { Component } from "react";
import "./RoomDetail.scss";
import { Link } from "react-router-dom";
import Navigation from "../../Components/Navigation/NavigationWithOutSelect";
import Footer from "../../Components/Footer/Footer";
import Review from "./Review";
import HouseExplain from "./HouseExplain";
import BedType from "./BedType";
import UserReview from "./UserReview";
import Facility from "./Facility";
import PopUp from "../../Components/Navigation/PopUp/PopUp";
import FacilityType from "./FacilityType";
import ShareList from "./ShareList";
import Important from "./Important";
import ReservationWing from "./ReservationWing";
import { ROOMDETAIL_API, BOOKMARK_API } from "../../config";

const CheckLists = [
  {
    checkList: "청결도",
    scoreValue: 80,
    score: 4.8,
  },
  {
    checkList: "의사소통",
    scoreValue: 30,
    score: 4.3,
  },
  {
    checkList: "체크인",
    scoreValue: 40,
    score: 4.4,
  },
  {
    checkList: "정확성",
    scoreValue: 70,
    score: 4.7,
  },
  {
    checkList: "위치",
    scoreValue: 70,
    score: 4.9,
  },
  {
    checkList: "가격 대비 만족도",
    scoreValue: 70,
    score: 4.5,
  },
];

const HouseExplains = [
  {
    iconImg: "/images/RoomDetail/iconmonstr-home-thin-240.png",
    explainTitle: "청결도",
    explainContent: "아파트 전체를 단독으로 사용하시게 됩니다.",
  },
  {
    iconImg: "/images/RoomDetail/iconmonstr-brightness-4-240.png",
    explainTitle: "청결 강화",
    explainContent: "에어비앤비의 강화된 5단계 청소 절차를 준수하겠다고 동의한 호스트입니다.",
  },
  {
    iconImg: "/images/RoomDetail/iconmonstr-door-4-240.png",
    explainTitle: "셀프 체크인",
    explainContent: "키패드를 이용해 체크인하세요.",
  },
  {
    iconImg: "/images/RoomDetail/iconmonstr-calendar-7-240.png",
    explainTitle: "환불 정책",
    explainContent: "1월 23일 12:00 PM 전에 예약을 취소하면 총 숙박 요금의 50% 및 서비스 수수료 전액이 환불됩니다.",
  },
  {
    iconImg: "/images/RoomDetail/iconmonstr-school-26-240.png",
    explainTitle: "숙소 이용규칙",
    explainContent: "반려동물 동반이나 흡연이 금지되는 숙소입니다.",
  },
];

const userReviews = [
  {
    userImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwuiS3uz2BwoPJ6rTRSXW7fMRIOSykuEgWTA&usqp=CAU",
    userName: "승연",
    userDate: "2020년 8월  ·  단체여행",
    userComments: "뷰 맛집! 너무 좋았어요",
  },
  {
    userImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpZLP71ACOOz-rYLjpGiln6BpF815zunJ57Q&usqp=CAU",
    userName: "하람",
    userDate: "2020년 8월  ·  단체여행",
    userComments: "bbbbbb 쌍따봉 드립니다 최고에요 또 가고싶어요!!!!",
  },
  {
    userImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwuiS3uz2BwoPJ6rTRSXW7fMRIOSykuEgWTA&usqp=CAU",
    userName: "해인",
    userDate: "2020년 8월  ·  단체여행",
    userComments: "위치도 너무 좋고 시설이 사진과 비슷합니다! 주변 편의시설도 잘 되어있어 편리합니다.",
  },
  {
    userImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpZLP71ACOOz-rYLjpGiln6BpF815zunJ57Q&usqp=CAU",
    userName: "채빈",
    userDate: "2020년 8월  ·  단체여행",
    userComments: "위치 최고~ 야경 끝내줘요",
  },
  {
    userImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwuiS3uz2BwoPJ6rTRSXW7fMRIOSykuEgWTA&usqp=CAU",
    userName: "하영",
    userDate: "2020년 8월  ·  단체여행",
    userComments: "위치 뷰 뭐 다 최고구요 진짜 우리집이였으면 하면서 지냈어요ㅠㅠㅠ 시티뷰는 진짜 여기가 최고에요ㅠㅠ",
  },
];

const shareLinks = [
  { iconImg: "/images/Components/free-icon-facebook-logo-59439.png", iconText: "페이스북" },
  { iconImg: "/images/Components/free-icon-twitter-733635.png", iconText: "트위터" },
  { iconImg: "/images/Components/024-document.png", iconText: "링크 복사" },
  { iconImg: "/images/Components/001-envelope.png", iconText: "이메일" },
  { iconImg: "/images/Components/001-envelope.png", iconText: "문자 메시지" },
  { iconImg: "/images/Components/free-icon-messenger-1077047.png", iconText: "메신저" },
  { iconImg: "/images/Components/015-chat box.png", iconText: "왓츠앱" },
  { iconImg: "/images/Components/031-express mail.png", iconText: "삽입" },
];

class RoomDetail extends Component {
  constructor() {
    super();
    this.state = {
      house: "",
      isModalOn: false,
      reviewModal1: false,
      shareModal: false,
      StorageModal: false,
      imgMoreModal: false,
      homeId: "",
      facilityTypes: [],
      price: { nightlyCost: "", priceGrowthPerson: "", serviceFee: "", acmdtTaxfs: "", cleaningFee: "" },
    };
  }

  handleClick = e => {
    const token = localStorage.getItem("token");
    if (token) {
      const setHouse = this.state.house;
      let setMethod = "";
      if (setHouse.bookmark === 0) {
        setHouse.bookmark = 1;
        setMethod = "POST";
      } else {
        setHouse.bookmark = 0;
        setMethod = "delete";
      }
      this.setState({
        house: setHouse,
      });

      const url = "http://192.168.219.148:8000/bookmarks/" + this.state.house.home_id;

      fetch(url, {
        method: setMethod,
        headers: {
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTM4fQ.U1BkYnOi3awvut_8KC211dGFHEHsFtEDtLS1nKW9TUs",
        },
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
        });
    } else {
      alert("로그인해주세요");
    }
  };

  setToken = () => {
    localStorage.setItem("token", "로그인성공~___~");
    alert("토큰설정완료");
  };

  deleteToken = () => {
    localStorage.removeItem("token");
    alert("토큰제거완료");
  };

  checkToken = () => {
    const token = localStorage.getItem("token");
    alert(token);
  };

  handleModal = name => {
    this.setState({ [name]: !this.state[name] });
  };

  componentDidMount = () => {
    const houseId = this.props.location.pathname.split("/")[2];
    fetch(`${ROOMDETAIL_API}/${houseId}`)
      .then(result => result.json())
      .then(result => {
        const setPrice = this.state.price;
        setPrice.nightlyCost = result.price["1박비용"];
        setPrice.priceGrowthPerson = result.price["1인당가격증가율"];
        setPrice.serviceFee = result.price["서비스수수료"];
        setPrice.acmdtTaxfs = result.price["숙박세와수수료"];
        setPrice.cleaningFee = result.price["청소비"];
        this.setState({
          house: result,
          price: setPrice,
          facilityTypes: result.facilities_detail,
          homeId: this.props.match.params.id,
        });
      });
  };

  render() {
    const { house, facilityTypes } = this.state;
    console.log(house);
    return (
      <>
        <Navigation navigationPadding={335} />
        <div className="RoomDetail">
          <header className="hederLineHeader">
            <div className="hederLineHeaderBox">
              <div className="headerLine">
                <div className="titleName">{house.name}</div>
                <div className="titleBox">
                  <div className="headerScorePlace">
                    <img className="redstar" alt="리뷰 별점" src="/images/RoomDetail/redStar.png" />
                    <div className="score">{house.capacity}</div>
                    <div className="titleReviewCount">({house.review_count})</div>
                    <div className="place">&nbsp; {house.address}</div>
                  </div>
                  {/* <button onClick={this.setToken}>토큰입력</button>
                <button onClick={this.checkToken}>토큰확인</button>
                <button onClick={this.deleteToken}>토큰제거</button> */}

                  <div className="headerIconLine">
                    <div className="headerShereIconBox">
                      <button
                        className="headerIconBtnShare"
                        onClick={() => this.handleModal("shareModal")}
                        type="button"
                      >
                        <div className="shareBox">
                          <div className="star">
                            <img
                              className="headerShereIcon"
                              alt="공유하기"
                              src="/images/RoomDetail/noun_Share_3122430.png"
                            />
                          </div>
                          <div className="starText">
                            <div className="headerShereIconText">공유하기</div>
                          </div>
                        </div>
                      </button>

                      <div className="headerShareBtn">
                        {this.state.shareModal ? (
                          <PopUp
                            title="가족 및 친구들과 이 장소를 공유하세요."
                            handleExit={() => this.handleModal("shareModal")}
                          >
                            {shareLinks.map((shareLink, index) => {
                              return (
                                <ShareList iconImg={shareLink.iconImg} iconText={shareLink.iconText} key={index} />
                              );
                            })}
                          </PopUp>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="headerStorageIconBox">
                      <button className="headerIconBtnStorage" onClick={this.handleClick} type="button">
                        <div className="storageBox">
                          <div className="heart">
                            <img
                              className="headerStorageIcon"
                              alt="좋아요목록"
                              src={
                                house.bookmark === 1
                                  ? "/images/RoomDetail/noun_Heart_405032.png"
                                  : "/images/RoomDetail/noun_Heart_771495.png"
                              }
                            />
                          </div>
                          <div className="heartText">
                            <div className="headerStorageIconText">저장</div>
                          </div>
                        </div>
                      </button>
                    </div>

                    <div className="headerStorageBtn"></div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {this.state.imgMoreModal ? (
            <PopUp title="사진 모두 보기" handleExit={() => this.handleModal("imgMoreModal")}>
              <div className="imgMoreBox">
                <img className="ImgMoreContainer" alt="이미지더보기버튼" src={house.images?.[0]}></img>
              </div>
            </PopUp>
          ) : (
            ""
          )}

          <section className="sliderHeaderContainer">
            <header className="sliderHeader">
              <div className="imgSliderBox">
                <div className="imgSliderBig">
                  <img className="imgBig" alt="가장 큰 이미지 슬라이드" src={house.images?.[0]} />
                </div>
                <div className="imgSlider">
                  <img className="imgSmall1" alt="작은 이미지" src={house.images?.[1]} />
                  <img className="imgSmall2" alt="작은 이미지" src={house.images?.[2]} />
                  <img className="imgSmall3" alt="작은 이미지" src={house.images?.[4]} />
                  <div class="grid12-6">
                    <img className="imgSmall4" alt="작은 이미지" src={house.images?.[2]} />
                    <div className="inner_box">
                      <button class="moreImgBtn" onClick={() => this.handleModal("imgMoreModal")} type="button">
                        <img className="imgIcon" alt="사진 모두 보기" src="/images/RoomDetail/dot.png" />
                        사진 모두 보기
                      </button>
                    </div>
                  </div>
                  <div className="imgMore">
                    <link rel="stylesheet" type="text/css" href="/examples/media/expand_style.css" />
                  </div>
                </div>
              </div>
            </header>

            <section className="articleContainer">
              <div className="interval">
                <div className="intervalBoxWrapper">
                  <div className="intervalBox">
                    <div className="middleTitle">
                      <div className="middleTitleBox">
                        <div className="introduction">
                          {house.host?.last_name}
                          {house.host?.first_name}님이 호스팅하는 {house.home_type}
                        </div>
                        <div className="explain">
                          침실 {house.options?.침실}개&nbsp;·&nbsp;침대 {house.options?.침대}개&nbsp;·&nbsp;욕실
                          {house.options?.욕실}개
                        </div>
                      </div>
                      <div className="middleTitleBoxImg">
                        <img className="middleTitleUserImg" alt="userImg" src={house.host?.host_profile} />
                      </div>
                    </div>
                    <div className="houseExplain">
                      {HouseExplains.map((houseExplain, index) => {
                        return (
                          <HouseExplain
                            iconImg={houseExplain.iconImg}
                            explainTitle={houseExplain.explainTitle}
                            explainContent={houseExplain.explainContent}
                            key={index}
                          />
                        );
                      })}
                    </div>
                    <div className="hostIntroduceBox">
                      <div className="hostIntroduce">
                        {house.description}
                        ...
                        <button className="moreReadBtn" onClick={() => this.handleModal("isModalOn")} type="button">
                          더 읽기
                        </button>
                        <div className="moreBtn">
                          {this.state.isModalOn ? (
                            <PopUp title="숙소 설명" handleExit={() => this.handleModal("isModalOn")}>
                              <div className="modalContent">{house.description}</div>
                            </PopUp>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bedTitle">침대/침구 유형</div>
                    <div className="bedType">
                      {house.room_info?.map((bedType, index) => {
                        return (
                          <div className="bedContainer">
                            <BedType room_name={bedType.room_name} bed_info={bedType.bed_info} key={index} />
                          </div>
                        );
                      })}
                    </div>
                    <div className="facilities">
                      <div className="facilitiesTitleBox">
                        <div className="facilitiesTitle">편의시설</div>
                        {house.facilities_list?.map((facility, index) => {
                          return <Facility facility={facility} />;
                        })}
                        <button
                          class="facilitiesMoreBtn"
                          onClick={() => this.handleModal("reviewModal1")}
                          type="button"
                        >
                          편의시설 모두 보기
                        </button>
                        <div className="facilitiesBtn">
                          {this.state.reviewModal1 ? (
                            <PopUp title="편의시설" handleExit={() => this.handleModal("reviewModal1")}>
                              <div className="facilitiesMore">
                                {facilityTypes &&
                                  facilityTypes.map((facilities, index) => {
                                    return <FacilityType key={index} facilities={facilities} key={index} />;
                                  })}
                              </div>
                            </PopUp>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="wingWrapper">
                    <ReservationWing house={house} price={this.state.price} />
                  </div>
                </div>
                <div className="reviewBox">
                  <div className="reviewScoreTitle">
                    <div className="reviewScoreTitleIcon">
                      <img className="redStar" alt="별점 아이콘" src="/images/RoomDetail/redStar.png" />
                    </div>
                    <div className="reviewScore">{house.capacity}점(후기 39개)</div>
                  </div>
                  <div className="checkList">
                    {CheckLists.map((checkList, index) => {
                      return (
                        <Review
                          checkList={checkList.checkList}
                          scoreValue={checkList.scoreValue}
                          score={checkList.score}
                          key={index}
                        />
                      );
                    })}
                  </div>
                  <div className="gridContainer">
                    {userReviews.map((userReview, index) => {
                      return (
                        <UserReview
                          userImg={userReview.userImg}
                          userName={userReview.userName}
                          userDate={userReview.userDate}
                          userComments={userReview.userComments}
                          key={index}
                        />
                      );
                    })}
                  </div>
                  <button className="clickBtn clickBtn reviewBtn">후기 49개 모두 보기</button>
                </div>

                <div className="hostIntroductionBox">
                  <div className="hostIntroduction">
                    <div className="hostBox">
                      <div className="hostBoxLine">
                        <div className="hostImgBox">
                          <img className="hostImg" alt="hostImg" src="/images/RoomDetail/jsLove.png" />
                        </div>
                        <div className="hostNameSignDate">
                          <div className="hostName">
                            {house.host?.last_name}
                            {house.host?.first_name}님
                          </div>
                          <div className="signDate">회원 가입일:2017년 11월</div>
                        </div>
                      </div>

                      <div className="hostContainerLine">
                        <div className="hostContainerBig">
                          <div className="hostContainer">
                            <div className="hostIntroductionLine">
                              <img className="redStar" alt="별점 아이콘" src="/images/RoomDetail/redStar.png" />
                              후기 1733개
                              <img
                                className="certificationIcon"
                                alt="인증 아이콘"
                                src="/images/RoomDetail/noun_Certificate_1240589.png"
                              />
                              본인 인증 완료
                            </div>
                            <span className="hostIntroductionMiniBox">
                              {house.host?.description}
                              {house.host?.host_description}
                              <Link to="./RoomDetail" className="TitleImgMore">
                                더 읽기
                              </Link>
                            </span>
                          </div>

                          <div className="superHostContainer">
                            <div className="superHost">
                              {house.host?.last_name}
                              {house.host?.first_name}님은 슈퍼호스트입니다.
                            </div>
                            <div className="superHostMeaning">
                              슈퍼호스트는 풍부한 경험과 높은 평점을 자랑하며 게스트가 숙소에서 편안히 머무를 수 있도록
                              최선을 다하는 호스트입니다.
                            </div>
                          </div>
                        </div>

                        <div className="hostContainerSmall">
                          <div className="hostBoxItem">
                            <div className="responseRate">응답률:100% </div>
                            <div className="responseTime ">응답 시간: 1시간 이내</div>
                            <button class="clickBtn clickBtn">호스트에게 연락하기</button>
                            <div className="hostText">
                              안전한 결제를 위해 에어비앤비 웹사이트나 <br />
                              앱외부에서 송금하거나 대화를 나누지 마세요.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <footer className="precautionsFooter">
              <div className="precautions">
                <div className="importantTitle">알아두어야 할 사항</div>
                <div className="importantItemBox">
                  {house.rules?.map((rule, index) => {
                    return <Important key={index} rule={rule} />;
                  })}
                </div>
              </div>
            </footer>
          </section>
        </div>
        <Footer />
      </>
    );
  }
}

export default RoomDetail;
