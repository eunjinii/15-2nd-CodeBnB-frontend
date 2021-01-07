import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
import Navigation from "../../../Components/Navigation/NavigationWithOutSelect";
import { flexAlignCenter, flexCenter } from "../../../styles/Theme";
import { RESERVATION_LIST as API } from "../../../config";

const ReservationDetail = () => {
  const [detail, setDetail] = useState({});
  const history = useHistory();
  const params = useParams();
  const {
    check_in,
    check_out,
    start_date,
    end_date,
    guest_number,
    home_address,
    home_name,
    home_photo,
    host_name,
    host_profile_image,
    room_type,
    total_cost,
  } = detail;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`${API}/${params.id}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then(res => res.json())
      .then(res => {
        setDetail(res.data);
      });
  };

  const momentToString = date => {
    const newDate = moment(date).format("YYYY-MM-DD").split("-");
    return `${newDate[0]}년 ${newDate[1]}월 ${newDate[2]}일`;
  };

  const convertTime = time => {
    const newTime = time.split(":");
    let result = `${newTime[0]}:${newTime[1]}`;
    if (newTime[0] >= 12) {
      result = "오후 " + result;
    } else {
      result = "오전 " + result;
    }
    return result;
  };

  const deleteReservation = () => {
    fetch(`${API}/${params.id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then(res => res.json())
      .then(res => {
        history.push("/reservation");
      });
  };
  return (
    <>
      <Navigation navigationPadding={20} />
      <DetailContainer>
        {check_in && (
          <DetailWrapper>
            <DetailHeader>
              <Plus onClick={() => history.push("/reservation")} />
              <span>숙소 예약</span>
            </DetailHeader>
            <DetailContents>
              <Title>
                <div>{`${home_address.split(",")[1]} ${home_address.split(",")[0]} ${momentToString(
                  start_date
                )} ~ ${momentToString(end_date)}`}</div>
                <h1>{`${host_name}님의 숙소`}</h1>
              </Title>
              <ContentWrapper>
                <ContentSection>
                  <RoomImage src={home_photo[0]}></RoomImage>
                  <RoomName>{`${home_name}`}</RoomName>
                  <DateSection>
                    <DateColumn>
                      <header>체크인</header>
                      <span>{momentToString(start_date)}</span>
                      <div>{convertTime(check_in)}</div>
                    </DateColumn>
                    <DateColumn>
                      <header>체크아웃</header>
                      <span>{momentToString(end_date)}</span>
                      <div>{convertTime(check_out)}</div>
                    </DateColumn>
                  </DateSection>
                  <HostSection>
                    <SectionTitle>간략 정보</SectionTitle>
                    <HostInfo>
                      <div className="column">
                        <div>
                          호스트: <span>{host_name}</span>님
                        </div>
                        <div>
                          <span>{room_type}</span>·<span>게스트 {guest_number}명</span>
                        </div>
                      </div>
                      <img src={host_profile_image} alt="hostprofile" />
                    </HostInfo>
                    <Price>
                      <span>₩ {Number(total_cost).toLocaleString()}</span>
                    </Price>
                  </HostSection>
                </ContentSection>
              </ContentWrapper>
            </DetailContents>
            <DeleteButton onClick={deleteReservation}>예약 취소하기</DeleteButton>
          </DetailWrapper>
        )}
      </DetailContainer>
    </>
  );
};

export default ReservationDetail;

const DetailContainer = styled.div`
  padding: 0;
  width: 100%;
  height: 904px;
  padding: 8px;
  background-image: url("/images/reservation/reservation_detail_bg.png");
  background-size: cover;
  background-repeat: no-repeat;
`;

const DetailWrapper = styled.div`
  width: 500px;
  /* height: 780px; */
  border-radius: 5px;
  background-color: white;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
`;

const DetailHeader = styled.header`
  ${flexCenter}
  position: relative;
  height: 60px;
  border-bottom: 1px solid #ebebeb;

  span {
    font-weight: 500;
  }
`;

const Plus = styled.div`
  display: inline-block;
  position: absolute;
  left: 10px;
  width: 32px;
  height: 32px;
  background: linear-gradient(#000, #000), linear-gradient(#000, #000);
  background-position: center;
  background-size: 50% 2px, 2px 50%;
  background-repeat: no-repeat;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  cursor: pointer;
  transform: rotate(45deg);
`;

const DetailContents = styled.main`
  height: 740px;
  overflow-y: scroll;
`;

const Title = styled.div`
  padding: 25px 25px;
  border-bottom: 5px solid #ebebeb;

  div {
    color: #767676;
    font-size: 12px;
    font-weight: 300;
    margin-bottom: 20px;
  }

  h1 {
    font-weight: 500;
    font-size: 30px;
  }
`;

const ContentWrapper = styled.section`
  padding: 20px 20px;

  &.makeBorder {
    border-top: 5px solid #ebebeb;
  }
`;

const ContentSection = styled.section`
  img {
    width: 460px;
    height: 300px;
    border-radius: 5px;
  }
`;
const RoomImage = styled.div`
  width: 460px;
  height: 300px;
  border-radius: 5px;
  background-image: url(${props => props.src});
`;

const RoomName = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin: 30px 0;
`;

const DateSection = styled.div`
  ${flexCenter}
  padding-bottom: 20px;
  border-bottom: 1px solid #dddddd;
`;

const DateColumn = styled.div`
  width: 230px;

  &:nth-child(1) {
    border-right: 1px solid #dddddd;
  }

  &:nth-child(2) {
    padding-left: 20px;
  }

  header {
    padding-bottom: 20px;
    font-size: 12px;
    color: #7e7e7e;
  }

  span {
    display: block;
    color: #3f3f3f;
    margin-bottom: 15px;
  }

  div {
    font-size: 25px;
    font-weight: 300;
  }
`;

const HostSection = styled.div``;

const SectionTitle = styled.header`
  margin: 20px 0;
  font-size: 12px;
  color: #7e7e7e;
`;

const HostInfo = styled.div`
  ${flexAlignCenter}
  justify-content: space-between;
  width: 100%;

  div.column {
    div {
      font-weight: 300;
      color: #222222;
      &:nth-child(1) {
        margin-bottom: 7px;
        span {
          text-decoration: underline;
          font-weight: 400;
        }
      }
    }
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

const Price = styled.div`
  font-weight: 300;
  color: #222222;
`;

const DeleteButton = styled.div`
  ${flexCenter}
  width: 100%;
  font-weight: 400;
  height: 50px;
  border-top: 5px solid #ebebeb;
  cursor: pointer;
`;
