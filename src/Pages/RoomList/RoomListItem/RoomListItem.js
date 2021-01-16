import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { flexAlignCenter } from "../../../styles/Theme";

const RoomListItem = ({ room }) => {
  const { price } = room;
  const history = useHistory();
  const location = useLocation();

  return (
    <RoomListItemContainer>
      <VisualContainer>
        <ImgSlider onClick={() => history.push(`/roomdetail/${room.home_id}${location.search}`)}>
          <img alt={room.home_name} src={room.home_images[0]} />
        </ImgSlider>
        <BookmarkContainer>
          <BookmarkFilled alt="bookmark" src="/images/RoomList/like-filled.png" />
          <BookmarkSolid alt="bookmark" src="/images/RoomList/like.png" />
        </BookmarkContainer>
      </VisualContainer>
      <RateContainer>
        <RateStar className="fas fa-star" />
        <RateAvg>{room.avg_rating}</RateAvg>
        {/* <RateCount>(45)</RateCount> */}
      </RateContainer>
      <TypeAndLocation>
        <RoomType>{room.home_building}</RoomType>
        <div>{room.home_region.region_name}</div>
      </TypeAndLocation>
      <RoomTitle>{room.home_name}</RoomTitle>
      <OriginalPrice>
        <RoomPrice>₩{room.price["1박비용"].toLocaleString()}</RoomPrice>
        <RoomPerNight>/ 1박</RoomPerNight>
      </OriginalPrice>
      <TotalPrice>
        총 요금: ₩{((price["1박비용"] + price["청소비"] + price["1인당가격증가율"] * 2) * 3).toLocaleString()}
      </TotalPrice>
    </RoomListItemContainer>
  );
};

const RoomListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 50px;
  width: 300px;
  background: white;
  font-size: ${props => props.theme.fontSizeMedium};
  font-weight: 200;
`;

const VisualContainer = styled.div`
  position: relative;
  margin-bottom: 14px;
  width: 100%;
  height: 205px;
`;

const ImgSlider = styled.div`
  width: 100%;
  height: 205px;

  img {
    width: 100%;
    height: 205px;
    object-fit: cover;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const BookmarkContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 14px;
  width: 28px;
  color: white;
  cursor: pointer;
`;

const BookmarkFilled = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  object-fit: center;
  opacity: 0.4;
`;

const BookmarkSolid = styled(BookmarkFilled)`
  opacity: 0.8;
  filter: brightness(0) invert(1);
`;

const RateContainer = styled.div`
  margin-bottom: 6px;
  ${flexAlignCenter}
  justify-content: flex-start;
  font-size: ${props => props.theme.fontSizeSmall};
`;

const RateStar = styled.i`
  margin-right: 4px;
  font-size: 12px;
  color: ${props => props.theme.primaryColor};
`;

const RateAvg = styled.div`
  margin-right: 3px;
`;

const RateCount = styled.div`
  color: #777;
`;

const TypeAndLocation = styled.div`
  ${flexAlignCenter}
  justify-content: flex-start;
  margin: 2px 0 4px 0;
  font-weight: ${props => props.theme.fontWeightRegular};
`;

const RoomType = styled.div`
  margin-right: 6px;
  padding-right: 6px;
  border-right: 1px solid #ddd;
`;

const RoomTitle = styled.div`
  margin: 2px 0 10px 0;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: ${props => props.theme.fontWeightRegular};
`;

const OriginalPrice = styled.div`
  ${flexAlignCenter}
  justify-content: flex-start;
`;

const RoomPrice = styled.div`
  font-weight: ${props => props.theme.fontWeightBold};
`;

const RoomPerNight = styled.div`
  margin-left: 2px;
  font-weight: ${props => props.theme.fontWeightMedium};
  font-size: ${props => props.theme.fontSizeSmall};
  color: #333;
`;

const TotalPrice = styled.div`
  margin-top: 10px;
  text-decoration: underline;
  font-size: ${props => props.theme.fontSizeSmall};
  color: #777;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

export default RoomListItem;
