import React, { Component } from "react";
import "./RoomDetail.scss";
import Review from "./Review";
import HouseExplain from "./HouseExplain";
import BedType from "./BedType";
import UserReview from "./UserReview";
import Facility from "./Facility";

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
    iconImg: "images/RoomDetail/iconmonstr-home-thin-240.png",
    explainTitle: "청결도",
    explainContent: "아파트 전체를 단독으로 사용하시게 됩니다.",
  },
  {
    iconImg: "images/RoomDetail/iconmonstr-brightness-4-240.png",
    explainTitle: "청결 강화",
    explainContent: "에어비앤비의 강화된 5단계 청소 절차를 준수하겠다고 동의한 호스트입니다.",
  },
  {
    iconImg: "images/RoomDetail/iconmonstr-door-4-240.png",
    explainTitle: "셀프 체크인",
    explainContent: "키패드를 이용해 체크인하세요.",
  },
  {
    iconImg: "images/RoomDetail/iconmonstr-calendar-7-240.png",
    explainTitle: "환불 정책",
    explainContent: "1월 23일 12:00 PM 전에 예약을 취소하면 총 숙박 요금의 50% 및 서비스 수수료 전액이 환불됩니다.",
  },
  {
    iconImg: "images/RoomDetail/iconmonstr-school-26-240.png",
    explainTitle: "숙소 이용규칙",
    explainContent: "반려동물 동반이나 흡연이 금지되는 숙소입니다.",
  },
];

const bedTypes = [
  {
    bedAmount: [
      "images/RoomDetail/noun_Bed_3667468.png",
      "images/RoomDetail/noun_Bed_3667468.png",
      "images/RoomDetail/noun_Bed_3667468.png",
    ],
    cardTextTitle: "1번 침실",
    cardTextContents: "퀸사이즈 침대 3개",
  },
  {
    bedAmount: ["images/RoomDetail/noun_Bed_3667468.png", "images/RoomDetail/noun_Bed_3667468.png"],
    cardTextTitle: "2번 침실",
    cardTextContents: "싱글사이즈 침대 2개",
  },
  {
    bedAmount: ["images/RoomDetail/noun_Bed_3667468.png"],
    cardTextTitle: "3번 침실",
    cardTextContents: "싱글사이즈 침대 1개",
  },
];

const userReviews = [
  {
    userImg: "images/RoomDetail/jsLove.PNG",
    userName: "효주",
    userDate: "2020년 8월  ·  단체여행",
    userComments: "뷰 맛집! 너무 좋았어요",
  },
  {
    userImg: "images/RoomDetail/jsLove.PNG",
    userName: "채빈",
    userDate: "2020년 8월  ·  단체여행",
    userComments: "bbbbbb 쌍따봉 드립니다 최고에요 또 가고싶어요!!!!",
  },
  {
    userImg: "images/RoomDetail/jsLove.PNG",
    userName: "은진",
    userDate: "2020년 8월  ·  단체여행",
    userComments: "위치도 너무 좋고 시설이 사진과 비슷합니다! 주변 편의시설도 잘 되어있어 편리합니다.",
  },
  {
    userImg: "images/RoomDetail/jsLove.PNG",
    userName: "라라",
    userDate: "2020년 8월  ·  단체여행",
    userComments: "위치 최고~ 야경 끝내줘요",
  },
  {
    userImg: "images/RoomDetail/jsLove.PNG",
    userName: "제니",
    userDate: "2020년 8월  ·  단체여행",
    userComments: "위치 뷰 뭐 다 최고구요 진짜 우리집이였으면 하면서 지냈어요ㅠㅠㅠ 시티뷰는 진짜 여기가 최고에요ㅠㅠ",
  },
];

class RoomDetail extends Component {
  constructor() {
    super();
    this.state = {
      house: "",
    };
  }

  componentDidMount = () => {
    fetch("/data/RoomDetail/RoomDetailData.json") //http://localhost:3000/data/data.json
      .then(result => result.json())
      .then(result => {
        this.setState({
          house: result,
        });
      });
  };

  render() {
    const { house } = this.state;
    // console.log(house.host?.host_name);
    //console.log(house.facility_list);
    // console.log(house.host);
    // console.log(house?.images);

    return (
      <div className="RoomDetail">
        <header className="hederLineHeader">
          <div className="hederLineHeaderBox">
            <div className="headerLine">
              <div className="titleName">{house.name}</div>
              <div className="titleBox">
                <div className="headerScorePlace">
                  <div className="score">4.86</div>
                  <div className="place">{house.address}</div>
                </div>

                <div className="headerIconLine">
                  <div className="headerShereIconBox">
                    <button className="headerIconBtn">
                      <div className="star">
                        <img className="headerShereIcon" src="images\RoomDetail\noun_Share_3122430.png" alt="" />
                      </div>
                      <div className="starText">
                        <div className="headerShereIconText">공유하기</div>
                      </div>
                    </button>
                  </div>

                  <div className="headerStorageIconBox">
                    <button className="headerIconBtn">
                      <div className="heart">
                        <img className="headerStorageIcon" src="images\RoomDetail\noun_Heart_771495.png" alt="" />
                      </div>
                      <div className="heartText">
                        <div className="headerStorageIconText">저장</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="sliderHeaderContainer">
          <header className="sliderHeader">
            <div className="imgSliderBox">
              <div className="imgSliderBig">
                <img className="imgBig" src={house.images?.[0]} alt="" />
              </div>
              <div className="imgSlider">
                <img className="imgSmall1" src={house.images?.[1]} alt="" />
                <img className="imgSmall2" src={house.images?.[2]} alt="" />
                <img className="imgSmall3" src={house.images?.[4]} alt="" />
                <img className="imgSmall4" src={house.images?.[2]} alt="" />
                <button>사진 모두 보기</button>
              </div>
            </div>
          </header>

          <article className="articleContainer">
            <div className="interval">
              <div className="intervalBox">
                <div className="middleTitle">
                  <div className="middleTitleBox">
                    <div className="introduction">
                      {house.host?.host_name}님이 호스팅하는 {house.home_type}
                    </div>
                    <div className="explain">
                      침실 {house.options?.bedroom}개&nbsp;·&nbsp;침대 {house.options?.bed}개&nbsp;·&nbsp;욕실
                      {house.options?.bathroom}개
                    </div>
                  </div>
                  <div className="middleTitleBoxImg">
                    <img
                      className="middleTitleUserImg"
                      src="https://a0.muscache.com/im/pictures/62dfb3a2-721e-4e21-a025-9e9168653d9f.jpg?im_w=720"
                      alt="userImg"
                    />
                  </div>
                </div>
                <div className="houseExplain">
                  {HouseExplains.map(houseExplain => {
                    return (
                      <HouseExplain
                        iconImg={houseExplain.iconImg}
                        explainTitle={houseExplain.explainTitle}
                        explainContent={houseExplain.explainContent}
                      />
                    );
                  })}
                </div>
                <div className="hostIntroduceBox">
                  <div className="hostIntroduce">
                    {house.description}
                    <button>더 읽기</button>
                  </div>
                </div>

                <div className="bedType">
                  <div className="bedTitle">침대/침구 유형</div>
                  {bedTypes.map(bedType => {
                    return (
                      <BedType
                        bedAmount={bedType.bedAmount}
                        cardTextTitle={bedType.cardTextTitle}
                        cardTextContents={bedType.cardTextContents}
                      />
                    );
                  })}
                </div>
                <div className="facilities">
                  <div className="facilitiesTitleBox">
                    <div className="facilitiesTitle">편의시설</div>

                    {house.facility_list?.map(facility => {
                      return <Facility facility={facility} />;
                    })}

                    <button class="clickBtn clickBtn">편의시설 40개 모두 보기</button>
                  </div>
                </div>
              </div>
              <div className="calendarBox">
                <div className="calendar">달력있는 부분</div>
              </div>

              <div className="reviewBox">
                <div className="review"></div>
                <div className="reviewScoreTitle">
                  <div className="reviewScoreTitleIcon">
                    <img
                      className="reviewScoreIcon"
                      src="images\RoomDetail\noun_Star_1187905.png"
                      alt="reviewStarIcon"
                    />
                  </div>
                  <div className="reviewScore">4.90점(후기 39개)</div>
                </div>

                <div className="checkList">
                  {CheckLists.map(checkList => {
                    return (
                      <Review checkList={checkList.checkList} poster={checkList.scoreValue} score={checkList.score} />
                    );
                  })}
                </div>

                <div className="gridContainer">
                  {userReviews.map(userReview => {
                    return (
                      <UserReview
                        userImg={userReview.userImg}
                        userName={userReview.userName}
                        userDate={userReview.userDate}
                        userComments={userReview.userComments}
                      />
                    );
                  })}
                </div>

                <button className="clickBtn clickBtn reviewBtn">후기 49개 모두 보기</button>
              </div>

              <div className="mapBox">
                <div className="mapTitle">위치</div>
                <div className="roomDetailMap">
                  <img className="mapImg" src="images\RoomDetail\map.png" alt="mapImg" />
                </div>
                <div className="nomination">{house.address}</div>
                <div className="nominationExplanation">
                  -Coex / SM Town / Hyundai Department Store / Seven Luck Casino are located very closely. -Garosu-gil
                  Road / Chungdam-dong Fashion Street / Gangnam Station / Itaewon / LotteWorld are located quite
                  closely. -Big Mart is near the building.
                </div>
                <button class="clickBtn clickBtn">자세한 위치 정보</button>
              </div>
              <div className="hostIntroductionBox">
                <div className="hostIntroduction">
                  <div className="hostBox">
                    <div className="hostBoxLine">
                      <div className="hostImgBox">
                        <img className="hostImg" src="images\RoomDetail\map.png" alt="hostImg" />
                      </div>
                      <div className="hostNameSignDate">
                        <div className="hostName">호스트:{house.host?.host_name}님</div>
                        <div className="signDate">회원 가입일:2017년 11월</div>
                      </div>
                    </div>

                    <div className="hostContainerLine">
                      <div className="hostContainerBig">
                        <div className="hostContainer">
                          <div className="hostIntroductionLine">
                            <img className="starIcon" src="images\RoomDetail\noun_Star_1187905.png" alt="" />
                            후기 1733개
                            <img
                              className="certificationIcon"
                              src="images\RoomDetail\noun_Certificate_1240589.png"
                              alt=""
                            />
                            본인 인증 완료
                          </div>
                          <span className="hostIntroductionMiniBox">
                            {house.host?.host_description}
                            <button>더 읽기</button>
                          </span>
                        </div>

                        <div className="superHostContainer">
                          <div className="superHost">{house.host?.host_name}님은 슈퍼호스트입니다.</div>
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
          </article>

          <footer className="precautionsFooter">
            <div className="precautions">
              <div className="important">알아두어야 할 사항</div>
              <div className="importantBox">
                <div className="importantBoxItem">
                  <div className="roomRule">숙소 이용규칙</div>
                  <div className="roomRuleBox">
                    <div>체크인 시간: 오후 3:00 이후</div>
                    <div>체크아웃 시간: 오전 11:00</div>
                    <div>키패드(으)로 셀프 체크인</div>
                    <div>흡연 금지</div>
                    <div>반려동물 동반 불가</div>
                  </div>
                </div>

                <div className="importantBoxItem">
                  <div className="safety"> 건강과 안전</div>
                  <div className="safetyBox">
                    <div>에어비앤비의 강화된 청소 절차 준수에 동의했습니다</div>
                    <div>에어비앤비의 사회적 거리 두기 및 관련 가이드라인이 적용됩니다.</div>
                    <div>일산화탄소 경보기</div>
                    <div>화재경보기</div>
                  </div>
                </div>

                <div className="importantBoxItem">
                  <div className="refundPolicy"> 환불 정책</div>
                  <div className="refundPolicyBox">
                    <div>
                      1월 23일 12:00 PM 전에 예약을 취소하면 총 숙박 요금의 50% 및 서비스 수수료 전액이 환불됩니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </section>
      </div>
    );
  }
}

export default RoomDetail;
