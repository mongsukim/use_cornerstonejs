import RightArrowButton from './RightArrowButton';
import { FC } from 'react';

interface Props {
  text: string;
  image: string;
}

const CardSmall: FC<Props> = (props) => {
  const { text, image } = props;
  return (
    <div
      className={
        'w-[180px] h-[254px] p-[10px] rounded-[20px] border border-[rgba(255,255,255,0.40)] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10)] backdrop-blur-[50px] hover:bg-deepCatchC-line/30 transition-all ease-in-out duration-500 cursor-pointer'
      }
      style={{
        backgroundBlendMode: 'luminosity, color-burn',
      }}
    >
      <div
        className={
          'w-[160px] h-[160px] rounded-[10px] overflow-hidden bg-black flex items-center justify-center'
        }
      >
        <img src={image} alt={'deepCatchImage'} className={'h-full'} />
      </div>
      <div className={'flex justify-between items-center px-[10px] h-[80px]'}>
        <div
          className={'text-[16px] font-pretendard w-[100px] truncate-2-lines'}
        >
          {text}
        </div>
        <RightArrowButton />
      </div>
    </div>
  );
};

export default CardSmall