import cornerstoneTools from 'cornerstone-tools';
import { useRecoilState } from 'recoil';
import { measurementState } from '../recoil/StatusAtom';

export const useMeasureMent = () => {
  const [isMeasurementActive, setMeasurementActive] =
    useRecoilState(measurementState);

  const toggleMeasurement = () => {
    if (!isMeasurementActive) {
      cornerstoneTools.init({
        showSVGCursors: true,
      });

      const LengthTool = cornerstoneTools.LengthTool;
      cornerstoneTools.addTool(LengthTool);
    }
    if (isMeasurementActive) {
      cornerstoneTools.setToolDisabled('Length');
    } else {
      cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 });
    }
    setMeasurementActive(!isMeasurementActive);
  };

  return toggleMeasurement;
};
