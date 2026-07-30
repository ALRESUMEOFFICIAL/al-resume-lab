document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const cvFile = document.getElementById('cv-file');
    const loader = document.getElementById('loader');
    const loaderText = document.getElementById('loader-text');
    const atsResult = document.getElementById('ats-result');

    // Login Modal Elements
    const loginModal = document.getElementById('login-modal');
    const navLoginBtn = document.getElementById('nav-login-btn');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const googleLoginTrigger = document.getElementById('google-login-trigger');

    let isUserLoggedIn = false;

    // Login Modal Triggers
    if (navLoginBtn) {
        navLoginBtn.addEventListener('click', () => {
            loginModal.style.display = 'flex';
        });
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
    }

    if (googleLoginTrigger) {
        googleLoginTrigger.addEventListener('click', () => {
            handleUserAuth();
        });
    }

    // Drag & Drop Handling with Auth Guard
    if (dropZone && cvFile) {
        dropZone.addEventListener('click', () => {
            if (!isUserLoggedIn) {
                loginModal.style.display = 'flex';
            } else {
                cvFile.click();
            }
        });

        cvFile.addEventListener('change', () => {
            if (cvFile.files.length) {
                if (!isUserLoggedIn) {
                    loginModal.style.display = 'flex';
                } else {
                    processCV();
                }
            }
        });
    }

    window.handleUserAuth = function() {
        isUserLoggedIn = true;
        loginModal.style.display = 'none';
        if (navLoginBtn) {
            navLoginBtn.textContent = '✅ Logged In';
            navLoginBtn.style.borderColor = '#10b981';
        }
        alert('Authentication successful! You can now scan your CV.');
    };

    // Simulated AI ATS Scanner Process
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
