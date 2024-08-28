import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import RightArrowButton from './RightArrowButton';

interface Props {
  image01: string;
  image02?: string;
  text: string;
  href: string;
}

const CardLarge: FC<Props> = (props) => {
  const { image01, image02, text, href } = props;
  const navigate = useNavigate();

  return (
    <>
      <div
        className={
          'w-[540px] h-[620px] rounded-[50px] z-10 text-white bg-gray_80 p-[20px] group cursor-pointer hover:border hover:border-[rgba(255,255,255,0.40)] hover:bg-[#383838] hover:shadow-[0px_0px_61.9px_0px_rgba(151,71,255,0.31)]'
        }
        onClick={() => {
          navigate(href);
        }}
      >
        <div
          className={
            'w-[500px] h-[500px] bg-black flex justify-center items-center rounded-[30px] relative overflow-hidden transition-all duration-500 ease-in-out group-hover:h-[520px]'
          }
        >
          <img
            src={image01}
            alt={'deepCatchImage'}
            className={`h-full object-cover transition-transform duration-500 ease-in-out transform  ${image02 ? 'group-hover:hidden' : ''}`}
          />
          {image02 ? (
            <img
              src={image02}
              alt={'deepCatchImage'}
              className={`hidden h-full object-cover transition-transform duration-500 ease-in-out transform  group-hover:block scale-[102%]`}
            />
          ) : null}
        </div>
        <div className={'flex justify-between h-[80px] px-[30px] items-center'}>
          <p className={'text-[30px]'}>{text}</p>
          <RightArrowButton />
        </div>
      </div>
    </>
  );
};

export default CardLarge