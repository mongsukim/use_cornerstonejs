import SideMenu from './commons/SideMenu';
import DicomMenu from './commons/DicomMenu';
import LeftMenu from './commons/LeftMenu';
import { handleGetDicomClick } from '../function/handleGetDicomClick';
import initCornerstone from '../initCornerstone';
import { useRecoilState } from 'recoil';
import { imgIdState } from '../recoil/StatusAtom';
import { useEffect, useRef, useState } from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

initCornerstone();

declare global {
  interface Window {
    showDirectoryPicker?: () => Promise<any>;
    showOpenFilePicker?: (options?: any) => Promise<any>;
  }
}

const AnalysisPage = () => {
  const [imageIds, setImageIds] = useRecoilState(imgIdState);
  const element = useRef<HTMLDivElement>(null);
  const [dicomData, setDicomData] = useState<any>(null);
  // @ts-ignore
  const [viewport, setViewport] = useState(
    // @ts-ignore
    cornerstone.getDefaultViewport(null, undefined)
  );

  useEffect(() => {
    if (element.current) {
      const elementRef = element.current;
      const onImageRendered = () => {
        const viewport = cornerstone.getViewport(elementRef);
        setViewport(viewport);
      };

      const onNewImage = () => {
        const viewport = cornerstone.getViewport(elementRef);
        setViewport(viewport);
      };

      const onWindowResize = () => {
        cornerstone.resize(elementRef, true);
      };

      elementRef.addEventListener('cornerstoneimagerendered', onImageRendered);
      elementRef.addEventListener('cornerstonenewimage', onNewImage);
      window.addEventListener('resize', onWindowResize);

      return () => {
        elementRef.removeEventListener(
          'cornerstoneimagerendered',
          onImageRendered
        );
        elementRef.removeEventListener('cornerstonenewimage', onNewImage);
        window.removeEventListener('resize', onWindowResize);
        cornerstone.disable(elementRef);
      };
    }
  }, [imageIds]);

  useEffect(() => {
    if (element.current) {
      cornerstone.enable(element.current);

      if (imageIds.length > 0) {
        cornerstone
          .loadImage(imageIds[0])
          .then((image) => {
            if (element.current) {
              if (cornerstone.getEnabledElement(element.current)) {
                cornerstone.displayImage(element.current, image);
                const stack = {
                  currentImageIdIndex: 0,
                  imageIds: imageIds,
                };
                cornerstoneTools.addStackStateManager(element.current, [
                  'stack',
                ]);
                cornerstoneTools.addToolState(element.current, 'stack', stack);
              }
            }
          })
          .catch((error) => {
            console.error('Error loading image:', error);
          });
      }
    }
  }, [imageIds]);

  // dicom 폴더 불러오기
  const handleFolderChange = async () => {
    const folderHandle = await window.showDirectoryPicker?.();
    const imageIdPromises = [];

    for await (const entry of folderHandle.values()) {
      // if (entry.kind === "file" && entry.name.endsWith(".dcm")) {
      if (entry.kind === 'file') {
        const file = await entry.getFile();

        const imageId =
          cornerstoneWADOImageLoader.wadouri.fileManager.add(file);

        imageIdPromises.push(imageId);
      } else {
        console.log('err');
      }
    }

    const resolvedImageIds = await Promise.all(imageIdPromises);

    setImageIds(resolvedImageIds);

    const StackScrollMouseWheelTool =
      cornerstoneTools.StackScrollMouseWheelTool;
    const stack = {
      currentImageIdIndex: 0,
      imageIds: resolvedImageIds,
    };

    cornerstone.loadImage(resolvedImageIds[0]).then((image) => {
      if (element.current) {
        cornerstone.displayImage(element.current, image);
        cornerstoneTools.addStackStateManager(element.current, ['stack']);
        cornerstoneTools.addToolState(element.current, 'stack', stack);
      }
    });

    setTimeout(() => {
      resolvedImageIds.forEach((imageId) => {
        const thumbnailElement = document.getElementById(imageId);
        if (thumbnailElement) {
          cornerstone.enable(thumbnailElement);
          cornerstone.loadImage(imageId).then((image) => {
            cornerstone.displayImage(thumbnailElement, image);
            cornerstoneTools.addStackStateManager(element.current, ['stack']);
            cornerstoneTools.addToolState(element.current, 'stack', stack);
          });
        }
      });
    }, 1000);

    cornerstoneTools.addTool(StackScrollMouseWheelTool);
    cornerstoneTools.setToolActive('StackScrollMouseWheel', {});
  };

  return (
    <div className="flex flex-col md:flex-row font-pretendard font-light text-[16px] text-gray_5 bg-black h-full text-white justify-between items-center">
      <LeftMenu />
      <div className="cornerstone w-full h-full">
        <button
          className="p-[10px] rounded-[5px] outline outline-1 block mx-auto "
          onClick={() => handleGetDicomClick(element.current)}
        >
          DICOM 불러오기
        </button>
        <div className={'flex items-center justify-center'}>
          <div
            onContextMenu={() => false}
            className="dicom-viewer h-[500px] shrink-0"
            unselectable="on"
            ref={element}
          >
            <div id="flex items-center justify-center outline outline-1 dicomImage"></div>
            <div className={'absolute bottom-1 text-white shrink-0 text-sm'}>
              <div>ZOOM: {viewport?.scale}</div>
              <div>
                WW/WC: {viewport?.voi?.windowWidth}/
                {viewport?.voi?.windowCenter}
              </div>
            </div>
          </div>
          {dicomData && (
            <div>
              <h3>DICOM Metadata</h3>
              <pre>{JSON.stringify(dicomData, null, 2)}</pre>
            </div>
          )}
        </div>
        <DicomMenu />
      </div>
      <SideMenu />
    </div>
  );
};

export default AnalysisPage;
