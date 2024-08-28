import Windowing from '../Icon/windowing';
import Pan from '../Icon/pan';
import Measure from '../Icon/measure';
import Reset from '../Icon/reset';
import { useToggleWwwcActive } from '../../function/setWwwActive';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  imgIdState,
  measurementState,
  windowingActiveState,
  zoomActiveState,
} from '../../recoil/StatusAtom';
import { useZoomActive } from '../../function/setZoomActive';
import { useMeasureMent } from '../../function/setLengthActive';

const DicomMenu = () => {
  const [imageIds, setImageIds] = useRecoilState(imgIdState);
  const toggleWwwcActive = useToggleWwwcActive();
  const toggleZoomActive = useZoomActive();
  const toggleMeasurement = useMeasureMent();

  const isWwwcActive = useRecoilValue(windowingActiveState); // 상태와 상태 설정 함수
  const isZoomActive = useRecoilValue(zoomActiveState);
  const isMeasurementActive = useRecoilValue(measurementState);

  return (
    <div className="   w-[324px] text-[12px] flex items-center mx-auto">
      <div className="flex space-x-[24px] cursor-pointer">
        <button
          onClick={toggleWwwcActive}
          className={`${isWwwcActive ? 'opacity-70' : 'opcaity-100 '} flex flex-col items-center hover:opacity-70 `}
        >
          <Windowing />
          Windowing
        </button>
        <button
          onClick={toggleZoomActive}
          className={`${isZoomActive ? 'opacity-70' : 'opcaity-100'} flex flex-col items-center hover:opacity-80`}
        >
          <Pan />
          Pan / Zoom
        </button>
        <button
          onClick={toggleMeasurement}
          className={`${isMeasurementActive ? 'opacity-70' : 'opcaity-100'} flex flex-col items-center hover:opacity-80`}
        >
          <Measure />
          Measure
        </button>
      </div>
      <button
        onClick={() => setImageIds([])}
        className="ml-[46px] flex flex-col items-center hover:opacity-80"
      >
        <Reset />
        Reset
      </button>
    </div>
  );
};
export default DicomMenu;
