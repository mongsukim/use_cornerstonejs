import { RightArrowSvg } from '../svgs/ArrowSvgs';
import React from 'react';

const RightArrowButton = () => {
  return (
    <button
      className={
        'hover:bg-gray_50 w-[30px] h-[30px] rounded-[2px] flex items-center justify-center'
      }
    >
      <RightArrowSvg />
    </button>
  );
};
export default RightArrowButton;