document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const cvFile = document.getElementById('cv-file');
    const loader = document.getElementById('loader');
    const loaderText = document.getElementById('loader-text');
    const atsResult = document.getElementById('ats-result');

    if (!dropZone || !cvFile) return;

    // Drag & Drop Functionality
    dropZone.addEventListener('click', () => cvFile.click());

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#06B6D4';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = 'rgba(6, 182, 212, 0.4)';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
            cvFile.files = e.dataTransfer.files;
            processCV();
        }
    });

    cvFile.addEventListener('change', () => {
        if (cvFile.files.length) {
            processCV();
        }
    });

    // Simulated AI Corporate ATS Scanner Engine
    function processCV() {
        dropZone.style.display = 'none';
        loader.style.display = 'block';
        atsResult.style.display = 'none';

        const steps = [
            "Extracting Text & Section Headers...",
            "Running Corporate ATS Parsing Engine...",
            "Comparing Keyword Density & Layout Structure...",
            "Calculating Final Match Score..."
        ];

        let stepIdx = 0;
        const interval = setInterval(() => {
            if (stepIdx < steps.length) {
                loaderText.textContent = steps[stepIdx];
                stepIdx++;
            } else {
                clearInterval(interval);
                showResults();
            }
        }, 800);
    }

    function showResults() {
        loader.style.display = 'none';
        atsResult.style.display = 'block';

        // Generate Realistic Analysis Score (Range: 42% - 68%)
        const generatedScore = Math.floor(Math.random() * (68 - 42 + 1)) + 42; 
        
        const scoreNumber = document.getElementById('score-number');
        const scoreCircleBg = document.getElementById('score-circle-bg');
        const scoreStatus = document.getElementById('score-status');

        if (scoreNumber) scoreNumber.textContent = `${generatedScore}%`;
        if (scoreCircleBg) {
            scoreCircleBg.style.background = 
                `conic-gradient(#2563EB ${generatedScore}%, rgba(255,255,255,0.1) ${generatedScore}%)`;
        }

        if (scoreStatus && generatedScore < 55) {
            scoreStatus.textContent = "Critical Formatting & Keyword Errors Detected";
            scoreStatus.style.color = "#ef4444";
        }
    }
});
