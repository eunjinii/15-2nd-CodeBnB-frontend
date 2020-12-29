import React, { Component } from "react";
import "./RoomDetail.scss";

class RoomDetail extends Component {
  render() {
    return (
      <div className="RoomDetail">
        <header className="hederLineHeader">
          <div className="headerLine">
            <div className="titleName">빔프로젝터📽영화/분위기에 설레는 공간. 반짝이는추억/ 서울대입구역 1분 1MIN</div>
            <div className="titleBox">
              <div className="headerScorePlace">
                <div className="score">4.86</div>
                <div className="place">Jungang-dong, Gwanak-gu, 서울, 한국</div>
              </div>
              <div className="headerShareStorage">
                <div className="share">공유하기</div>
                <div className="storage">저장</div>
              </div>
            </div>
          </div>
        </header>

        <section>
          <header className="sliderHeader">
            <div className="imgSliderBox">
              <div className="imgSliderBig">
                <img
                  className="imgBig"
                  src="https://a0.muscache.com/im/pictures/43ab1060-8690-429b-a64e-9d5a510538a4.jpg?im_w=1200"
                  alt="My Image"
                />
              </div>
              <div className="imgSlider">
                <img
                  className="imgSmall1"
                  src="https://a0.muscache.com/im/pictures/6aa0742d-881a-4f34-a6f0-45669377b59b.jpg?im_w=720"
                  alt="My Image"
                />
                <img
                  className="imgSmall2"
                  src="https://a0.muscache.com/im/pictures/6c69502b-f29d-42cd-9a7a-0bae750af432.jpg?im_w=720"
                  alt="My Image"
                />
                <img
                  className="imgSmall3"
                  src="https://a0.muscache.com/im/pictures/9e83c517-a9cf-4e2c-a707-5adda2a40e60.jpg?im_w=720"
                  alt="My Image"
                />
                <img
                  className="imgSmall4"
                  src="https://a0.muscache.com/im/pictures/62dfb3a2-721e-4e21-a025-9e9168653d9f.jpg?im_w=720"
                  alt="My Image"
                />
                <button>사진 모두 보기</button>
              </div>
            </div>
          </header>

          <article className="articleContainer">
            <div className="interval">
              {/*간격 */}
              <div className="intervalBox">
                <div className="middleTitle">
                  <div className="middleTitleBox">
                    <div className="introduction">Emily님이 호스팅하는 아파트 전체</div>
                  </div>
                  <div className="middleTitleBoxExplain">
                    <div className="explain">최대 인원 3명.침실 1개.침대 2개.욕실 1개</div>
                  </div>
                  <div className="middleTitleBoxImg">
                    <img src="" alt="userImg" />
                  </div>
                </div>
                <div className="houseExplain">
                  <div className="house">
                    집 전체
                    <img className="explainIcon" src="" alt="userImg" />
                    <div className="explain">아파트 전체를 단독으로 사용하시게 됩니다.</div>
                  </div>{" "}
                  <div className="house1">
                    집 전체
                    <img className="explainIcon" src="" alt="userImg" />
                    <div className="explain">아파트 전체를 단독으로 사용하시게 됩니다.</div>
                  </div>{" "}
                  <div className="house2">
                    집 전체
                    <img className="explainIcon" src="" alt="userImg" />
                    <div className="explain">아파트 전체를 단독으로 사용하시게 됩니다.</div>
                  </div>
                </div>

                <div className="hostIntroduce">
                  ★14층에 위치하여 뷰가 아주 좋습니다★ ★분위기가 최고예요★ ★인스타그램에서 "saintuhgro" 를 검색하시면 더
                  많은 사진을 보실 수 있습니다★ ★롯데마트와 편의점이 바로 옆에 위치하고 있습니다★ 【5분거리】 -코엑스
                  -SM Town -현대백화점 -도심공항터미널 【15~20분거리】 -가로수길 -청담동 -강남역 -이태원 -롯데월드 숙소
                  1. 위치 *대중교통 이용 시 -삼성동 107번지 미켈란107아파트 입니다. 9호선 봉은사역 3번출구 바로 앞에
                  위치하고 있습니다! *자가용 이용 시 저희 건물은 기계주차 시…...
                  <button>더 읽기</button>
                </div>

                <div className="bedType">
                  <div className="cards">
                    <div className="card">1번카드</div>
                    <div className="card">2번카드</div>
                    <div className="card">3번카드</div>
                  </div>
                </div>
                <div className="facilities">
                  <div className="facilitiesBox">
                    <img className="facilitiesIcon" src="" alt="facilitiesImg" />
                    <div className="item">헤어드라이어</div>
                    <button>편의시설 16개 모두 보기</button>
                  </div>
                </div>
              </div>

              <div className="calendarBox">
                <div className="calendar">달력있는 부분</div>
              </div>
              <div className="reviewBox">
                <div className="review">리뷰있는 부분</div>
                <button>후기 49개 모두 보기</button>
              </div>
              <div className="mapBox">
                <div className="roomDetailMap">지도있는 부분</div>
              </div>
              <div className="hostIntroductionBox">
                <div className="hostIntroduction">
                  <div className="hostImgBox">
                    <img className="hostImg" src="" alt="hostImg" />
                  </div>
                  <div className="hostNameSignDate">
                    <div className="hostName">호스트:Emily님</div>
                    <div className="signDate">회원 가입일:2017년 11월</div>
                  </div>

                  <div className="reviewLine">후기 66개</div>
                  <span>
                    Hello, this is Emily. I was born in Korea and currently live in Seoul. - I was a tour guide in
                    Korea. I've met and communicated with many tourists, and I've been able to travel aro…
                    <button>더 읽기</button>
                  </span>

                  <span>Emily님은 슈퍼호스트입니다.</span>
                  <span>
                    슈퍼호스트는 풍부한 경험과 높은 평점을 자랑하며 게스트가 숙소에서 편안히 머무를 수 있도록 최선을
                    다하는 호스트입니다.
                  </span>
                  <div className="hostBoxitem">
                    <span>응답률:100%</span>
                    <span>응답 시간:1시간 이내</span>
                    <button>호스트에게 연락하기</button>

                    <div className="hostText">
                      안전한 결제를 위해 에어비앤비 웹사이트나 <br />
                      앱외부에서 송금하거나 대화를 나누지 마세요.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <footer className="precautionsFooter">
            <div className="precautions">
              <div className="roomRule">
                숙소 이용규칙
                <div>체크인 시간: 오후 3:00 이후</div>
                <div>체크아웃 시간: 오전 11:00</div>
                <div>키패드(으)로 셀프 체크인</div>
                <div>흡연 금지</div>
                <div>반려동물 동반 불가</div>
              </div>
              <div className="safety">
                건강과 안전
                <div>에어비앤비의 강화된 청소 절차 준수에 동의했습니다</div>
                <div>에어비앤비의 사회적 거리 두기 및 관련 가이드라인이 적용됩니다.</div>
                <div>일산화탄소 경보기</div>
                <div>화재경보기</div>
              </div>
              <div className="refundPolicy">
                환불 정책
                <div>1월 23일 12:00 PM 전에 예약을 취소하면 총 숙박 요금의 50% 및 서비스 수수료 전액이 환불됩니다.</div>
              </div>
              {/*간격 */}
            </div>
          </footer>
        </section>
      </div>
    );
  }
}

export default RoomDetail;
