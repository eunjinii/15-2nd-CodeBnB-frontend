import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { flexCenter, flexAlignCenter } from "../../styles/Theme";
import _ from "lodash";
import RoomListItem from "./RoomListItem/RoomListItem";
import FilterPopUp from "./FilterPopUp/FilterPopUp";
import FilterDropDown from "./FilterDropDown/FilterDropDown";
import PriceFilterDropDown from "./PriceFilterDropDown/PriceFilterDropDown";
import PageButtons from "./PageButtons/PageButtons";
import EmptyState from "./EmptyState/EmptyState";
import Footer from "../../Components/Footer/Footer";

const API = "http://192.168.219.148:8000";
const LIMIT = 15;
const RoomList = () => {
  const history = useHistory();
  const [isMapToggleOn, setIsMapToggleOn] = useState(true);
  const [data, setData] = useState([]);
  const [homes, setHomes] = useState([]);
  const [bedFilter, setBedFilter] = useState([]);
  const [filters, setFilters] = useState([]);
  const [isRoomTypeFilterPop, setIsRoomTypeFilterPop] = useState(false);
  const [isPriceFilterPop, setIsPriceFilterPop] = useState(false);
  const [isConditionFilterPop, setIsConditionFilterPop] = useState(false);
  const [isRoomFiltered, setIsRoomFiltered] = useState(false);
  const [isPriceFiltered, setIsPriceFiltered] = useState(false);
  const [isConditionFiltered, setIsConditionFiltered] = useState(false);
  const [filteredResult, setFilteredResult] = useState([]);
  const [prevFilterState, setPrevFilterState] = useState([]);

  const stringToQuery = (query) => {
    const [_, params] = query.split("?");
    return (
      params &&
      params.split("&").reduce((acc, cur) => {
        const [k, v] = cur.split("=");
        return { ...acc, [k]: v };
      }, {})
    );
  };

  const queryToString = (queryObj) => {
    return (
      "?" +
      Object.entries(queryObj)
        .flatMap((e) => e.join("="))
        .join("&")
    );
  };

  const arrayToString = (queryArray) => {
    return "?" + queryArray.flatMap((e) => e.join("=")).join("&");
  };

  const fetchFilteredData = (queryStrings) => {
    fetch(`${API}/homes${queryStrings}`)
      .then((res) => res.json())
      .then((data) => {
        data && setHomes(data.homes);
      })
      .catch((err) => console.log(err));
  };

  const handlePopUp = () => {
    if (!isConditionFilterPop) {
      const prevFiltered = _.cloneDeep(filters);
      setPrevFilterState(prevFiltered);
    } else {
      setFilters(prevFilterState);
    }
    setIsConditionFilterPop(!isConditionFilterPop);
    document.body.style.overflow = `${
      isConditionFilterPop ? "unset" : "hidden"
    }`;
  };

  const [roomTypeFilters, setRoomTypeFilters] = useState([]);
  const [roomTypeFilteredResult, setRoomTypeFilteredResult] = useState([]);

  const handleRoomTypePopUp = () => {
    setIsRoomTypeFilterPop(!isRoomTypeFilterPop);
    document.body.style.overflow = `${
      isRoomTypeFilterPop ? "unset" : "hidden"
    }`;
  };

  // [필터 추가하기] -> [침실과 침대] 항목 수량 변경 기능
  const handleModifyBtn = (id, type) => {
    const { filterType, filterItem, filterChecked } = filters[0];
    let modifiedStatus = filterChecked;
    type === "plus"
      ? modifiedStatus[id]++
      : filterChecked[id] >= 1 && modifiedStatus[id]--;
    setBedFilter({
      filterType: filterType,
      filteredItem: filterItem.map((item, index) => {
        return {
          name: item,
          amount: modifiedStatus[index],
        };
      }),
    });
  };

  // [필터 추가하기] -> [편의시설, 시설, 건물유형, 지역] 항목 체크 기능
  const handleCheckBtn = (id, filterType) => {
    const checkedStatus = filters.map((filter, index) => {
      index &&
        filter.filterType === filterType &&
        (filter.filterChecked[id + 1] = !filter.filterChecked[id + 1]);
      return filter;
    });
    setFilters(checkedStatus);
  };

  // [필터 추가하기] -> 필터 옵션 변경 후 [숙소 검색 결과] 버튼 누르는 함수.
  const handleSearchBtn = () => {
    const filteredListTemp = filters
      .map((filter, index) => {
        if (index) {
          const filteredStatus = filter.filterItem.filter(
            (_, index) => filter.filterChecked[index]
          );
          if (filteredStatus.length > 0)
            return {
              filterType: filter.filterType,
              filteredItem: filteredStatus,
            };
        }
      })
      .filter((el) => el);

    filteredResult.length
      ? setIsConditionFiltered(true)
      : setIsConditionFiltered(false);

    filteredListTemp.unshift(bedFilter);
    setFilteredResult(filteredListTemp);
    setFilters(filters);
    setPrevFilterState(filters);
    setIsConditionFilterPop(false);
    searchFilterOptions();
  };

  // 변경된 filter로 쿼리스트링 만들어서 fetch하는 함수
  const searchFilterOptions = () => {
    const searchString1 =
      filters[0] &&
      filters[0].filterId
        .map((id, index) => {
          if (filters[0].filterChecked[index]) {
            return `${id}=${filters[0].filterChecked[index]}`;
          }
        })
        .filter((id) => id)
        .join("&");

    const filterRestArray =
      filters &&
      filters.slice(1).map((filter) => {
        return filter.filterChecked
          .map((isChecked, index) => {
            if (isChecked) {
              return filter.filterId[index + 1];
            }
          })
          .filter((id) => id);
      });

    const searchString2 = filterRestArray
      .map((results, index) => {
        const result = results
          .map((result) => {
            if (index === 0) return `amenities=${result}`;
            else if (index === 1) return `property_type_id=${result}`;
            else if (index === 2) return `neighborhood_id=${result}`;
          })
          .join("&");
        return result;
      })
      .filter((id) => id)
      .join("&");

    // 필터추가하기 검색 query string으로.
    const searchString = "?" + [searchString1, searchString2].join("&");

    console.log(searchString1);
    //기존 url query string에서 배열로.
    const prevQueryArray = Object.entries({
      ...stringToQuery(history.location.search),
    }).filter(
      (el) =>
        ![
          "min_beds",
          "min_bedrooms",
          "min_bathrooms",
          "amenities",
          "property_type_id",
          "neighborhood_id",
        ].includes(el[0])
    );
    const nextQueryArray = Object.entries({ ...stringToQuery(searchString) });
    const nextString = arrayToString([...prevQueryArray, ...nextQueryArray]);

    history.push(`/roomlist${nextString}`);
    fetch(`${API}/homes${nextString}`)
      .then((res) => res.json())
      .then((data) => {
        setHomes(data.homes);
      })
      .catch((err) => console.log(err));
  };

  //[요금 검색] 여닫기
  const handlePriceFilterPop = () => {
    setIsPriceFilterPop(!isPriceFilterPop);
  };

  //[필터 추가하기] 필터 모달창에서 항목 숨기고 모두보기 버튼 토글
  const viewMoreBtn = (id) => {
    const toggledArray = filters.map((filter, index) => {
      if (index === id + 1) {
        filter.isViewOpen = !filter.isViewOpen;
      }
      return filter;
    });
    setFilters(toggledArray);
  };

  useEffect(() => {
    // fetch("/data/RoomList/homes.json")
    fetch(`${API}/homes`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setHomes(data.homes);
      })
      .catch((err) => console.log(err));

    fetch("/data/RoomList/listFilters.json")
      .then((res) => res.json())
      .then((data) => {
        const newData = data.filters.map((filter, index) => {
          return index
            ? {
                ...filter,
                filterChecked: Array(filter.filterItem.length).fill(false),
                isViewOpen: false,
              }
            : {
                ...filter,
                filterChecked: Array(filter.filterItem.length).fill(0),
              };
        });
        setFilters(newData);
      })
      .catch((err) => console.log(err));

    fetch("/data/RoomList/roomTypeFilters.json")
      .then((res) => res.json())
      .then((data) => {
        const newData = data.roomTypeFilters.map((filter) => {
          return { ...filter, isChecked: false };
        });
        setRoomTypeFilters(newData);
      })
      .catch((err) => console.log(err));
  }, []);

  //페이지네이션
  const paging = (e) => {
    const offset = e.target.dataset.index;
    if (!offset) return;
    const nextQueryObj = { ...stringToQuery(history.location.search) };
    nextQueryObj["limit"] = LIMIT;
    nextQueryObj["offset"] = offset * LIMIT;
    const nextString = queryToString(nextQueryObj);
    history.push(`/roomlist${nextString}`);
    fetch(`${API}/homes?${nextString}`)
      .then((res) => res.json())
      .then((data) => setHomes(data.homes));
  };

  console.log(homes.length);

  const deleteFilter = () => {
    fetch(`${API}/homes`)
      .then((res) => res.json())
      .then((data) => setHomes(data.homes));
  };

  const backToDefault = () => {
    history.push("/roomlist");
    setHomes(data.homes);
    setIsRoomFiltered(false);
    setIsPriceFiltered(false);
    setIsConditionFiltered(false);
    setFilteredResult([]);
    setPrevFilterState([]);
  };

  console.log(filteredResult);

  return (
    <RoomListPage>
      {isConditionFilterPop && (
        <FilterPopUp
          className="roomListPopUp"
          handlePopUp={handlePopUp}
          filters={filters}
          filteredResult={filteredResult}
          handleModifyBtn={handleModifyBtn}
          viewMoreBtn={viewMoreBtn}
          handleCheckBtn={handleCheckBtn}
          handleSearchBtn={handleSearchBtn}
          setFilteredResult={setFilteredResult}
        />
      )}
      <RoomListHeader>
        <SearchResultSummary>
          <div>숙박 {homes.length && homes.length}건</div>
          <div>12월 29일 - 12월 31일</div>
          <div>게스트 3명</div>
        </SearchResultSummary>
        <LocationTitle onClick={() => backToDefault()}>
          Seoul-si의 숙소
        </LocationTitle>
        <FilterMapButtons>
          <FilterButtons>
            <FilterButton
              className={`${isRoomTypeFilterPop ? "popActive" : ""}
              ${isRoomFiltered ? "filtered" : ""}`}
              onClick={handleRoomTypePopUp}
            >
              숙소 유형
            </FilterButton>
            {isRoomTypeFilterPop && (
              <FilterDropDown
                roomTypeFilters={roomTypeFilters}
                setRoomTypeFilters={setRoomTypeFilters}
                roomTypeFilteredResult={roomTypeFilteredResult}
                setRoomTypeFilteredResult={setRoomTypeFilteredResult}
                handleRoomTypePopUp={handleRoomTypePopUp}
                setIsRoomFiltered={setIsRoomFiltered}
                fetchFilteredData={fetchFilteredData}
                stringToQuery={stringToQuery}
                arrayToString={arrayToString}
              />
            )}
            <FilterButton
              className={`${isPriceFilterPop ? "popActive" : ""}
              ${isPriceFiltered ? "filtered" : ""}`}
              onClick={handlePriceFilterPop}
            >
              요금
            </FilterButton>
            {isPriceFilterPop && (
              <PriceFilterDropDown
                handleExit={handlePriceFilterPop}
                setHomes={setHomes}
                data={data}
                setIsPriceFiltered={setIsPriceFiltered}
                isPriceFiltered={isPriceFiltered}
                stringToQuery={stringToQuery}
                queryToString={queryToString}
                fetchFilteredData={fetchFilteredData}
              />
            )}
            <FilterButton
              // filtered={filteredResult}
              // popActive={isConditionFilterPop}
              className={`${isConditionFilterPop ? "popActive" : ""}
              ${
                isConditionFiltered && filteredResult.length ? "filtered" : ""
              }`}
              onClick={handlePopUp}
            >
              필터 추가하기
            </FilterButton>
          </FilterButtons>
          <MapToggle>
            <i className="far fa-map" />
            지도 표시하기
          </MapToggle>
        </FilterMapButtons>
        {homes.length > 0 && (
          <CovidCheck>
            예약하기 전에 코로나19 관련 여행 제한 사항을 확인하세요.
            <div>자세히 알아보기</div>
          </CovidCheck>
        )}
      </RoomListHeader>
      <RoomListContainer>
        {homes ? (
          homes.map((item) => {
            return <RoomListItem key={item.home_id} room={item} />;
          })
        ) : (
          <EmptyState deleteFilter={deleteFilter} />
        )}
      </RoomListContainer>
      {homes && <PageButtons paging={paging} homesCount={homes.length} />}
      <Footer />
    </RoomListPage>
  );
};

const RoomListPage = styled.div`
  flex-direction: column;
  ${flexCenter};
  width: 100vw;
`;

const RoomListHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 1600px;
`;

const SearchResultSummary = styled.div`
  ${flexAlignCenter}
  justify-content: flex-start;
  margin: 50px 0 10px;
  font-size: ${(props) => props.theme.fontSizeSmall};
  color: #333;
  font-weight: ${(props) => props.theme.fontWeightRegular};

  & div {
    margin-right: 6px;
    padding-right: 6px;
    border-right: 1px solid #777;

    &:last-of-type {
      border: none;
    }
  }
`;

const LocationTitle = styled.h1`
  width: 100%;
  margin: 4px 0 30px;
  font-size: 32px;
  font-weight: ${(props) => props.theme.fontWeightBold};
  cursor: pointer;
`;

const FilterMapButtons = styled.div`
  ${flexAlignCenter}
  justify-content: space-between;
  width: 100%;
`;

const FilterButtons = styled.div`
  ${flexAlignCenter}
  justify-content: space-between;
  position: relative;
  color: #333;
`;

const FilterButton = styled.div`
  ${flexCenter}
  margin-right: 8px;
  padding: 0 18px;
  height: 36px;
  font-size: ${(props) => props.theme.fontSizeSmall};
  font-weight: ${(props) => props.theme.fontWeightRegular};
  border: 1px solid #999;
  border-radius: 18px;
  cursor: pointer;

  ${(props) =>
    !props.active &&
    css`
      color: black;
    `}

  &:hover {
    color: black;
    border: 1px solid black;
  }

  &.popActive,
  &.filtered {
    border: 1px solid black;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-weight: 500;
  }
`;

const MapToggle = styled.div`
  ${flexCenter}
  margin-right: 20px;
  font-size: ${(props) => props.theme.fontSizeSmall};
  font-weight: ${(props) => props.theme.fontWeightRegular};
  color: #333;
  cursor: pointer;

  i {
    margin-right: 6px;
    font-size: ${(props) => props.theme.fontSizeRegular};
  }
`;

const CovidCheck = styled.div`
  ${flexCenter}
  margin: 30px 0 12px;
  font-size: ${(props) => props.theme.fontSizeSmall};
  font-weight: ${(props) => props.theme.fontWeightRegular};

  div {
    margin-left: 4px;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const RoomListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 1600px;
  /* min-height: 340px; */
`;

export default RoomList;
