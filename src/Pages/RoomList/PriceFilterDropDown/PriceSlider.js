import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";

function ValueLabelComponent(props) {
  const { children, open, value } = props;
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

export default function CustomizedSlider({
  min,
  curVal,
  value,
  max,
  handleChange,
  getMinInputValue,
  getMaxInputValue,
  buttonRef,
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AirbnbSlider
        ref={buttonRef}
        ThumbComponent={AirbnbThumbComponent}
        value={value}
        defaultValue={[value[0], value[1]]}
        onChange={handleChange}
        max={max}
        min={min}
      />
      <PriceInputs>
        <InputBox>
          <Value>최저 요금</Value>
          <Currency>₩</Currency>
          <MinValue defaultValue={value[0]} value={curVal[0]} onChange={getMinInputValue} />
        </InputBox>
        <div>-</div>
        <InputBox>
          <Value>최고 요금</Value>
          <Currency>₩</Currency>
          <MaxValue defaultValue={value[1]} value={curVal[1]} onChange={getMaxInputValue} />
        </InputBox>
      </PriceInputs>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: 330 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const AirbnbSlider = withStyles({
  root: {
    color: "#acacac",
    height: 3,
    padding: "13px 0",
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    marginTop: -12,
    marginLeft: -13,
    boxShadow: "none",
    "&:focus, &:hover, &$active": {
      boxShadow: "#ccc 0 0 0 0",
    },
    "& .bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 2,
  },
  rail: {
    color: "#dedede",
    opacity: 1,
    height: 2,
  },
})(Slider);

const PriceInputs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const InputBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 168px;
  height: 58px;
  border: 1px solid #555;
  border-radius: 10px;
  letter-spacing: -0.2px;
`;

const Value = styled.div`
  position: absolute;
  top: 10px;
  left: 11px;
  color: #777;
  font-size: 13px;
  font-weight: 300;
`;

const Currency = styled.div`
  position: absolute;
  top: 29px;
  left: 12px;
  font-size: 16px;
`;

const MinValue = styled.input.attrs(props => ({
  type: "text",
  placeholder: props.defaultValue,
}))`
  position: absolute;
  top: 20px;
  left: 28px;
  width: 140px;
  height: 32px;
  font-size: 16px;
  background: none;
  border: none;

  &:focus {
    outline: none;
  }
`;

const MaxValue = styled(MinValue).attrs(props => ({
  placeholder: props.defaultValue,
}))`
  /* background: rgba(0, 0, 0, 0.4); */
`;
