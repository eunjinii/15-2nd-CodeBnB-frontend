/*global kakao*/
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const KAKAOMAP_KEY = "4cbcbc2e9b2ca1cfca0760f5259bd304";
const API = "http://54.180.93.43:8000";
const SearchMap = () => {
  const [map, setMap] = useState(null);
  const [markersData, setMarkersData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [curLatLng, setCurLatLng] = useState([37.506502, 127.053617]);
  const [curBound, setCurBound] = useState([]);
  const [homes, setHomes] = useState([]);

  const getMarkers = () => {
    // const markers = homesData.map(home => {
    //   return {
    //     price: home.price["1박비용"],
    //     lat: home.home_latitude,
    //     lng: home.home_longitutde,
    //     id: home.home_id,
    //     title: home.home_name,
    //     rate: home.avg_rating,
    //     type: home.home_building,
    //   };
    // });
    // setMarkersData(markers);

    // fetch("/data/RoomList/homes.json")
    fetch(`${API}/homes`)
      .then(res => res.json())
      .then(data => {
        const markers = data.homes.map(home => {
          return {
            price: home.price["1박비용"],
            lat: home.home_latitude,
            lng: home.home_longitutde,
            id: home.home_id,
            title: home.home_name,
            rate: home.avg_rating,
            type: home.home_building,
          };
        });
        setMarkersData(markers);
      });
  };

  const createMap = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_KEY}&autoload=false`;
    document.head.appendChild(script);
    script.onload = () => {
      const { kakao } = window;
      kakao.maps.load(() => {
        const container = document.getElementById("CodeBnbMap");
        const options = {
          center: new kakao.maps.LatLng(37.506502, 127.053617),
          level: 6,
        };
        const createdMap = new kakao.maps.Map(container, options);
        setMap(createdMap);
      });
    };
  };

  const createMarker = () => {
    const { kakao } = window;
    const infoContent = "hi";
    const infoWindow = new kakao.maps.InfoWindow({ content: infoContent });
    const markerImage = new kakao.maps.MarkerImage("/images/RoomList/airbnb_logo.png", new kakao.maps.Size(30, 30));
    const tempArr = markersData?.map(marker => {
      const newMarker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(marker.lat, marker.lng),
        title: marker.price,
        image: markerImage,
      });
      kakao.maps.event.addListener(newMarker, "mouseover", makeOverListener(map, newMarker, infoWindow));
      kakao.maps.event.addListener(newMarker, "mouseout", makeOutListener(infoWindow));
      return newMarker;
    });

    kakao.maps.event.addListener(map, "dragend", function () {
      const latLng = map.getCenter();
      setCurLatLng([latLng.Ma, latLng.Ma]);
    });

    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }

    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }
    setMarkers(tempArr);
  };

  useEffect(() => {
    getMarkers();
    createMap();
  }, []);

  // marker 생성 + 표시
  useEffect(() => map && markersData.length && createMarker(), [map, markersData]);

  console.log(markersData);
  console.log(markers);
  console.log(curLatLng);

  return (
    <MapContainer>
      <CodeBnbMap id="CodeBnbMap" onClick={() => getMarkers()}></CodeBnbMap>
    </MapContainer>
  );
};

export default SearchMap;

const MapContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  width: 70vw;
  height: 100vh;
`;
const CodeBnbMap = styled.div`
  width: 70vw;
  height: 100vh;
`;

const homesData = [
  {
    home_id: 1,
    home_name: "#2BB \uac15\ub0a8\uad6c Room(\ub2e4\uc778\uc2e4)",
    home_capacity: 2,
    home_type: "\ub2e4\uc778\uc2e4",
    home_building: "\uc544\ud30c\ud2b8",
    home_images: [
      "https://images.unsplash.com/photo-1574120582582-257909933c5f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8ODl8fGJlZCUyMHJvb218ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fGJhdGhyb29tfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1532372576444-dda954194ad0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fGxpdmluZyUyMHJvb218ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1556909211-36987daf7b4d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fGtpdGNoZW58ZW58MHx8MHw%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1575517220118-57eaf432e1d9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NzR8fGJhbGNvbnl8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    ],
    home_options: { "\uce68\uc2e4": 1, "\uce68\ub300": 1, "\uc695\uc2e4": 0 },
    home_facilities: [
      "\uc0f4\ud478",
      "\ud5e4\uc5b4\ub4dc\ub77c\uc774\uc5b4",
      "\ud544\uc218\ud488\ubaa9(\uce68\ub300\uc2dc\ud2b8, \ubca0\uac1c)",
      "\uac74\uc870\uae30",
      "\uae30\ubcf8 \uc870\ub9ac\ub3c4\uad6c(\ub0c4\ube44, \ud6c4\ub77c\uc774\ud32c, \uae30\ub984, \uc18c\uae08, \ud6c4\ucd94)",
      "\uc2dd\uae30\ub958",
      "\uac00\uc2a4\ub808\uc778\uc9c0 \ub610\ub294 \uc778\ub355\uc158",
      "\ub0c9\uc7a5\uace0",
      "\ub0c9\uc7a5\uace0",
      "\uc5c5\ubb34 \uc804\uc6a9 \uacf5\uac04",
      "\uac8c\uc2a4\ud2b8 \uc804\uc6a9 \ucd9c\uc785\ubb38(\ubcc4\ub3c4\uc758 \ucd9c\uc785\ub85c \ub610\ub294 \uac74\ubb3c \uc785\uad6c)",
      "\ud654\uc7ac\uacbd\ubcf4\uae30(\uc219\uc18c\uc5d0 \ud654\uc7ac\uacbd\ubcf4\uae30\uac00 \uc5c6\uc2b5\ub2c8\ub2e4)",
    ],
    home_latitude: "37.492230",
    home_longitutde: "127.077133",
    price: {
      "1\ubc15\ube44\uc6a9": 69000,
      "1\uc778\ub2f9\uac00\uaca9\uc99d\uac00\uc728": 11000,
      "\uccad\uc18c\ube44": 18000,
      "\uc11c\ube44\uc2a4\uc218\uc218\ub8cc": 0,
      "\uc219\ubc15\uc138\uc640\uc218\uc218\ub8cc": 0,
    },
    home_region: {
      region_name: "\uac15\ub0a8\uad6c",
      region_latitude: "37.492465",
      region_longtitude: "127.068818",
      region_radius_m: 8000,
      region_zoom: 13,
    },
  },
  {
    home_id: 2,
    home_name:
      "#\ucf54\ub85c\ub098\ub300\ube44#\uc644\uc804\ubc29\uc5ed#\uac15\ub0a8\uad6c \ub3c4\ubcf45\ubd84\uac70\ub9ac#\ud589\ubcf5\uc219\ubc15",
    home_capacity: 0,
    home_type: "\uc9d1 \uc804\uccb4",
    home_building: "\uc544\ud30c\ud2b8",
    home_images: [
      "https://images.unsplash.com/photo-1584116831190-7a5b2765a30a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjd8fGJlZCUyMHJvb218ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/flagged/photo-1600002368144-444430d3f3ca?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzB8fGJhdGhyb29tfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1545454760-a8e55231441c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDh8fGxpdmluZyUyMHJvb218ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1556037843-347ddff9f4b0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8a2l0Y2hlbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1564829439675-0eec72f0b695?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8YmFsY29ueXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    ],
    home_options: { "\uce68\uc2e4": 1, "\uce68\ub300": 1, "\uc695\uc2e4": 0 },
    home_facilities: [
      "\uc628\uc218",
      "\uc0f4\ud478",
      "\uc637\uac78\uc774",
      "\ud544\uc218\ud488\ubaa9(\uce68\ub300\uc2dc\ud2b8, \ubca0\uac1c)",
      "\uac74\uc870\uae30",
      "\ub2e4\ub9ac\ubbf8",
      "\uc2dd\uae30\ub958",
      "\uae30\ubcf8 \uc870\ub9ac\ub3c4\uad6c(\ub0c4\ube44, \ud6c4\ub77c\uc774\ud32c, \uae30\ub984, \uc18c\uae08, \ud6c4\ucd94)",
      "\uae30\ubcf8 \uc870\ub9ac\ub3c4\uad6c(\ub0c4\ube44, \ud6c4\ub77c\uc774\ud32c, \uae30\ub984, \uc18c\uae08, \ud6c4\ucd94)",
      "\uac8c\uc2a4\ud2b8 \uc804\uc6a9 \ucd9c\uc785\ubb38(\ubcc4\ub3c4\uc758 \ucd9c\uc785\ub85c \ub610\ub294 \uac74\ubb3c \uc785\uad6c)",
      "\ub514\uc9c0\ud138 \ub3c4\uc5b4\ub85d(\uac8c\uc2a4\ud2b8\uac00 \ud604\uad00\ubb38 \ube44\ubc00\ubc88\ud638\ub97c \uc785\ub825\ud558\uc5ec \uc9c1\uc811 \uccb4\ud06c\uc778 \ud569\ub2c8\ub2e4)",
    ],
    home_latitude: "37.504660",
    home_longitutde: "127.038682",
    price: {
      "1\ubc15\ube44\uc6a9": 44000,
      "1\uc778\ub2f9\uac00\uaca9\uc99d\uac00\uc728": 11000,
      "\uccad\uc18c\ube44": 12000,
      "\uc11c\ube44\uc2a4\uc218\uc218\ub8cc": 10000,
      "\uc219\ubc15\uc138\uc640\uc218\uc218\ub8cc": 0,
    },
    home_region: {
      region_name: "\uac15\ub0a8\uad6c",
      region_latitude: "37.492465",
      region_longtitude: "127.068818",
      region_radius_m: 8000,
      region_zoom: 13,
    },
  },
];
