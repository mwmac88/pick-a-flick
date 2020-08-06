import React, { useState } from 'react';
import Slider, { ValueLabelProps } from '@material-ui/core/Slider';
import { withStyles, Tooltip } from '@material-ui/core';

interface Props {
  min: number;
  max: number;
  step: number;
  labelText: string;
  valueChange: Function;
}

const PickAFlickSlider = withStyles({
  root: {
    color: '#ED8936',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  track: {
    height: 8,
    borderRadius: 50,
  },
  rail: {
    height: 8,
    borderRadius: 50,
  },
})(Slider);

const StyledTooltip = withStyles({
  tooltipPlacementBottom: {
    backgroundColor: '#ED8936',
    margin: '4px 0',
  },
})(Tooltip);

function ValueLabelComponent(props: ValueLabelProps) {
  const { children, open, value } = props;

  return (
    <StyledTooltip
      open={open}
      enterTouchDelay={0}
      placement='bottom'
      title={value}
    >
      {children}
    </StyledTooltip>
  );
}

const InputSlider: React.FC<Props> = ({
  min,
  max,
  step,
  labelText,
  valueChange,
}) => {
  const [sliderValue, setSliderValue] = useState<number | number[]>(1);

  const changeValue = (_event: object, value: number | number[]) => {
    setSliderValue(value);
    valueChange(value);
  };

  const ariaValueText = () => {
    return `${sliderValue} ${labelText}`;
  };

  return (
    <PickAFlickSlider
      defaultValue={1}
      getAriaValueText={ariaValueText}
      ValueLabelComponent={ValueLabelComponent}
      aria-labelledby='discrete-slider'
      valueLabelDisplay='on'
      step={step}
      marks
      min={min}
      max={max}
      onChange={changeValue}
    />
  );
};

export default InputSlider;
