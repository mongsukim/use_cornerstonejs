import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
  import initCornerstone from "../initCornerstone.js";

initCornerstone();

function LoadingImages() {
  const [imageIds, setImageIds] = useState([]);
  const element = useRef(null);

  useEffect(() => {
    if (element.current) {
      cornerstone.enable(element.current);
    }
  }, [element]);

  const handleFolderChange = async () => {
     try {
      const folderHandle = await window.showDirectoryPicker();
      const imageIdPromises = [];

      for await (const entry of folderHandle.values()) {
        if (entry.kind === 'file' && entry.name.endsWith('.dcm')) {
          const file = await entry.getFile();
          const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
          imageIdPromises.push(imageId);
        }
      }

      console.log('imageIdPromises', imageIdPromises);

      const resolvedImageIds = await Promise.all(imageIdPromises);
      setImageIds(resolvedImageIds);

      const StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool;
      const stack = {
        currentImageIdIndex: 0,
        imageIds: resolvedImageIds,
      };

      cornerstone.loadImage(resolvedImageIds[0]).then((image) => {
        cornerstone.displayImage(element.current, image);
        cornerstoneTools.addStackStateManager(element.current, ["stack"]);
        cornerstoneTools.addToolState(element.current, "stack", stack);
      });

      setTimeout(() => {
        resolvedImageIds.forEach((imageId) => {
          const thumbnailElement = document.getElementById(imageId);
          cornerstone.enable(thumbnailElement);
          cornerstone.loadImage(imageId).then((image) => {
            cornerstone.displayImage(thumbnailElement, image);
            cornerstoneTools.addStackStateManager(element.current, ["stack"]);
            cornerstoneTools.addToolState(element.current, "stack", stack);
          });
        });
      }, 1000);

      cornerstoneTools.addTool(StackScrollMouseWheelTool);
      cornerstoneTools.setToolActive("StackScrollMouseWheel", {});
    } catch (error) {
      console.error("Error loading folder:", error);
    }
  };

  const setZoomActive = () => {
    const ZoomMouseWheelTool = cornerstoneTools.ZoomMouseWheelTool;
    cornerstoneTools.addTool(ZoomMouseWheelTool);
    cornerstoneTools.setToolActive("ZoomMouseWheel", { mouseButtonMask: 1 });
    const PanTool = cornerstoneTools.PanTool;
    cornerstoneTools.addTool(PanTool);
    cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 1 });
  };

  return (
      <div className="cornerstone">
        <div className="navBar">
          <Link to="/" className={location.pathname === "/" ? "activeNavButton navButton" : "navButton"}>
            Home
          </Link>
          <Link to="/LoadingImages" className={location.pathname === "/LoadingImages" ? "activeNavButton navButton" : "navButton"}>
            Load Dicom Images
          </Link>


        </div>
        <div className="loader">
            <div className=" ">DICOM이 들어있는 폴더를 선택하세요</div>
          <button className="p-[10px] rounded-[5px] outline outline-1 mr-[30px]" onClick={handleFolderChange}>Load DICOM Folder</button>
          <button className="p-[10px] rounded-[5px] outline outline-1" onClick={setZoomActive}>Zoom/Pan</button>
        </div>
        <div className="dicom-wrapper">
          <div className="thumbnail-selector">
            <div className="thumbnail-list" id="thumbnail-list">
              {imageIds.map((imageId) => (
                  <a
                      key={imageId}
                      onContextMenu={() => false}
                      unselectable="on"
                      onMouseDown={() => false}
                      onSelect={() => false}
                  >
                    <div
                        id={imageId}
                        className="thumbnail-item"
                        onContextMenu={() => false}
                        unselectable="on"
                        onMouseDown={() => false}
                        onSelect={() => false}
                    />
                  </a>
              ))}
            </div>
          </div>
        </div>
        <div
            onContextMenu={() => false}
            className="dicom-viewer"
            unselectable="on"
            ref={element}
        >
          <div id="dicomImage"></div>
        </div>
      </div>
  );
}

export default LoadingImages;