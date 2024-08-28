import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";

export async function handleGetDicomClick(element: HTMLDivElement | null) {
  if (element) {
    // element가 null이 아니면
    const elementRef = element; // element를 직접 사용

    cornerstone.enable(elementRef); // cornerstone을 element에 적용

    const imageIds = [
      "wadouri:https://medicalip.s3.ap-northeast-2.amazonaws.com/aidelete/1/08394639/arterial/artrial_0001.dcm",
      "wadouri:https://medicalip.s3.ap-northeast-2.amazonaws.com/aidelete/1/08394639/arterial/artrial_0002.dcm",
      "wadouri:https://medicalip.s3.ap-northeast-2.amazonaws.com/aidelete/1/08394639/arterial/artrial_0003.dcm",
    ];

    const StackScrollMouseWheelTool =
      cornerstoneTools.StackScrollMouseWheelTool;

    const stack = {
      currentImageIdIndex: 0,
      imageIds: imageIds,
    };

    cornerstone
      .loadImage(imageIds[0])
      .then((image) => {
        cornerstone.displayImage(elementRef, image); // 이미지를 element에 표시
        cornerstoneTools.addStackStateManager(elementRef, ["stack"]); // 스택 상태 추가
        cornerstoneTools.addToolState(elementRef, "stack", stack); // 도구 상태 추가

        cornerstoneTools.addTool(StackScrollMouseWheelTool);
        cornerstoneTools.setToolActive("StackScrollMouseWheel", {});

        const getMetaData = (type: string, imageId: string) => {
          const imageIdToURI = imageId.substring(7); // 'wadouri:' 접두사 제거
          return cornerstoneWADOImageLoader.wadors.metaDataManager.get(
            type,
            imageIdToURI,
          );
        };

        cornerstone.metaData.addProvider(getMetaData);

        const metaDataTypes = [
          "generalImageModule",
          "patientModule",
          "generalStudyModule",
          "generalSeriesModule",
          "imagePlaneModule",
          "imagePixelModule",
        ];

        const metaData = metaDataTypes.reduce(
          (acc, type) => {
            acc[type] = cornerstone.metaData.get(type, imageIds[0]);
            return acc;
          },
          {} as Record<string, any>,
        );

        console.log("DICOM Metadata:", metaData);
      })
      .catch((err) => {
        console.error("Error loading image:", err);
      });

    // Clean-up function (만약 필요하다면)
    return () => {
      cornerstone.disable(elementRef); // element에 대한 cornerstone 비활성화
    };
  }
}
