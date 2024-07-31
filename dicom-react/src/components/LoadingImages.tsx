import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import './old.css';
import initCornerstone from "../initCornerstone.js";
import Button from "./CustomButtonComponent";

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
    alert('클릭');
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
          <Link to="/viewpage" className={location.pathname === "/viewpage" ? "activeNavButton navButton" : "navButton"}>
            Viewmodes
          </Link>
          <Link to="/Help" className={location.pathname === "/Help" ? "activeNavButton navButton" : "navButton"}>
            Help
          </Link>
          <Link to="/Contacts" className={location.pathname === "/Contacts" ? "activeNavButton navButton" : "navButton"}>
            Contact Info
          </Link>
        </div>
        <div className="loader">
          <button onClick={handleFolderChange}>Load DICOM Folder</button>
          <button onClick={setZoomActive}>Zoom/Pan</button>
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
        <Link to={{ pathname: "/Viewpage", state: { imageIds: imageIds } }}>
          <Button
              border="none"
              color="blue"
              height="200px"
              onClick={() => console.log(imageIds)}
              radius="50%"
              width="200px"
          >
            Continue
          </Button>
        </Link>
      </div>
  );
}

export default LoadingImages;