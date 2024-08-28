import { useRecoilState } from 'recoil';
import cornerstoneTools from 'cornerstone-tools';
import { zoomActiveState } from '../recoil/StatusAtom';

export const useZoomActive = () => {
  const [isZoomActive, setIsZoomActive] = useRecoilState(zoomActiveState);

  const toggleZoomActive = () => {
    if (!isZoomActive) {
      cornerstoneTools.init({
        showSVGCursors: true,
      });

      const ZoomMouseWheelTool = cornerstoneTools.ZoomMouseWheelTool;
      cornerstoneTools.addTool(ZoomMouseWheelTool);

      const PanTool = cornerstoneTools.PanTool;
      cornerstoneTools.addTool(PanTool);
    }

    if (isZoomActive) {
      cornerstoneTools.setToolDisabled('ZoomMouseWheel');
      cornerstoneTools.setToolDisabled('Pan');
    } else {
      cornerstoneTools.setToolActive('ZoomMouseWheel', { mouseButtonMask: 1 });
      cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
    }

    setIsZoomActive(!isZoomActive);
  };

  return toggleZoomActive;
};
