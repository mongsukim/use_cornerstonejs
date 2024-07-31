document.addEventListener('DOMContentLoaded', function () {
    const cornerstone = window.cornerstone;
    const cornerstoneTools = window.cornerstoneTools;
    const dicomParser = window.dicomParser;

    if (!cornerstone || !cornerstoneTools || !dicomParser) {
        console.error('Required libraries are not loaded.');
        return;
    }

    // Configure Cornerstone
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
    cornerstoneWADOImageLoader.configure({
        beforeSend: function(xhr) {
            // Add custom headers if needed
        }
    });

    const element = document.getElementById('content');
    cornerstone.enable(element);

    let dicomFiles = [];
    let currentIndex = 0;

    function loadAndDisplayImage(index) {
        if (index >= 0 && index < dicomFiles.length) {
            const imageId = dicomFiles[index];
            cornerstone.loadAndCacheImage(imageId).then(function(image) {
                cornerstone.displayImage(element, image);
                initializeTools();
            }).catch(function(error) {
                console.error('Error loading image:', error);
            });
        }
    }

    function initializeTools() {
        if (!cornerstoneTools) {
            console.error('cornerstoneTools is not loaded.');
            return;
        }

        cornerstoneTools.mouseInput.enable(element);
        cornerstoneTools.touchInput.enable(element);

        const toolNames = ['wwwc', 'zoom', 'pan', 'zoomWheel'];

        toolNames.forEach(toolName => {
            if (cornerstoneTools[toolName]) {
                cornerstoneTools[toolName].activate(element, 1);
            } else {
                console.warn(`Tool ${toolName} is not available.`);
            }
        });
    }

    function fetchDicomFiles() {
        fetch('http://localhost:8001/dicom-files')
            .then(response => response.json())
            .then(data => {
                dicomFiles = data;
                loadAndDisplayImage(currentIndex);
            })
            .catch(error => console.error('Error fetching DICOM files:', error));
    }

    fetchDicomFiles();

    element.addEventListener('wheel', function(event) {
        event.preventDefault();
        const delta = Math.sign(event.deltaY);
        const viewport = cornerstone.getViewport(element);

        const toolState = cornerstoneTools.getToolState(element, 'wwwc');
        if (toolState && toolState.data[0]) {
            const data = toolState.data[0];
            data.windowWidth += delta * 100;
            data.windowCenter += delta * 10;
            cornerstone.updateImage(element);
        }
    });

    document.getElementById('prevImage').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            loadAndDisplayImage(currentIndex);
        }
    });

    document.getElementById('nextImage').addEventListener('click', function() {
        if (currentIndex < dicomFiles.length - 1) {
            currentIndex++;
            loadAndDisplayImage(currentIndex);
        }
    });
});