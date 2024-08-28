import { useRecoilState } from 'recoil';
import cornerstoneTools from 'cornerstone-tools';
import { windowingActiveState } from '../recoil/StatusAtom';

export const useToggleWwwcActive = () => {
  const [isWwwcActive, setIsWwwcActive] = useRecoilState(windowingActiveState);

  const toggleWwwcActive = () => {
    if (!isWwwcActive) {
      cornerstoneTools.init({
        showSVGCursors: true,
      });

      const WwwcTool = cornerstoneTools.WwwcTool;
      cornerstoneTools.addTool(WwwcTool);
    }

    if (isWwwcActive) {
      cornerstoneTools.setToolDisabled('Wwwc');
    } else {
      cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });
    }

    setIsWwwcActive(!isWwwcActive);
  };

  return toggleWwwcActive;
};
