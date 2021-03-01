import React from "react";
import { useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

const PaginationRanges = ({ homesCount, paging }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.paginationContainer}>
      <Pagination count={homesCount ? parseInt(homesCount / 15) : 1} onChange={paging} className={classes.pages} />
      <div className={classes.pageRange}>숙소 {homesCount ? homesCount : 0}개 중 1 - 15</div>
      <div className={classes.additionalFee}>추가 수수료가 부과됩니다. 세금도 부과될 수 있습니다.</div>
    </div>
  );
};

const useStyles = makeStyles({
  paginationContainer: {
    marginBottom: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "220px",

    "& .MuiPaginationItem-root": {
      margin: "0 6px",
      fontSize: "14px",
    },
    "& .MuiPaginationItem-page": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'proxima-nova', 'Noto Sans KR', sans-serif",
      letterSpacing: "-0.1px",

      "&.Mui-selected": {
        backgroundColor: "black",
        color: "white",
      },
    },
  },

  pageRange: {
    margin: "16px 0 30px",
    fontSize: "14px",
    fontWeight: "400",
  },

  additionalFee: {
    fontSize: "13px",
    fontWeight: "300",
    color: "#777",
    lineHeight: "30px",
  },
});

export default PaginationRanges;
