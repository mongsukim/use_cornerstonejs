import cornerstone from 'cornerstone-core';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

// 단일 dicom 파일 불러오기
export async function handleFileChange(element: HTMLDivElement | null) {
  try {
    const [fileHandle] =
      (await window.showOpenFilePicker?.({
        types: [
          {
            description: 'DICOM Files',
            accept: {
              'application/dicom': ['.dcm'],
            },
          },
        ],
      })) || [];

    if (fileHandle && element) {
      const file = await fileHandle.getFile();
      const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);

      cornerstone.loadImage(imageId).then((image) => {
        cornerstone.displayImage(element, image);
      });
    }
  } catch (error) {
    console.error('Error loading file:', error);
  }
}

export default handleFileChange;
