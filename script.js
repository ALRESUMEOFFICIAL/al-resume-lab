// Set PDF.js Worker Path
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const cvFile = document.getElementById('cv-file');
    const loader = document.getElementById('loader');
    const loaderText = document.getElementById('loader-text');
    const atsResult = document.getElementById('ats-result');

    const loginModal = document.getElementById('login-modal');
    const navLoginBtn = document.getElementById('nav-login-btn');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const userProfileBadge = document.getElementById('user-profile-badge');
    const userAvatar = document.getElementById('user-avatar');
    const userEmailText = document.getElementById('user-email-text');

    let currentUser = JSON.parse(localStorage.getItem('al_resume_user')) || null;

    if (currentUser) {
        updateUIForLoggedInUser(currentUser);
    }

    if (navLoginBtn) {
        navLoginBtn.addEventListener('click', () => {
            if (!currentUser) loginModal.style.display = 'flex';
        });
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
    }

    if (dropZone && cvFile) {
        dropZone.addEventListener('click', () => {
            if (!currentUser) {
                loginModal.style.display = 'flex';
            } else {
                cvFile.click();
            }
        });

        cvFile.addEventListener('change', (e) => {
            if (e.target.files.length) {
                if (!currentUser) {
                    loginModal.style.display = 'flex';
                } else {
                    handleCVFile(e.target.files[0]);
                }
            }
        });
    }

    // Google Sign-In Setup
    window.onload = function () {
        if (typeof google !== 'undefined') {
            google.accounts.id.initialize({
                client_id: "108392112345-example.apps.googleusercontent.com", 
                callback: handleGoogleCredentialResponse
            });

            google.accounts.id.renderButton(
                document.getElementById("google-btn-container"),
                { theme: "outline", size: "large", width: "100%" }
            );
        }
    };

    function parseJwt(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    }

    function handleGoogleCredentialResponse(response) {
        const payload = parseJwt(response.credential);
        if (payload) {
            const userData = { email: payload.email, name: payload.name, picture: payload.picture };
            localStorage.setItem('al_resume_user', JSON.stringify(userData));
            currentUser = userData;
            updateUIForLoggedInUser(userData);
            loginModal.style.display = 'none';
        }
    }

    function updateUIForLoggedInUser(user) {
        if (navLoginBtn) navLoginBtn.style.display = 'none';
        if (userProfileBadge) {
            userProfileBadge.style.display = 'flex';
            userAvatar.src = user.picture || 'https://via.placeholder.com/24';
            userEmailText.textContent = user.email.split('@')[0];
        }
    }

    // REAL CV PARSING ENGINE
    async function handleCVFile(file) {
        dropZone.style.display = 'none';
        loader.style.display = 'block';
        atsResult.style.display = 'none';
        loaderText.textContent = "Parsing PDF/DOCX Document Text...";

        let extractedText = "";

        try {
            if (file.type === "application/pdf" || file.name.endsWith('.pdf')) {
                extractedText = await extractTextFromPDF(file);
            } else if (file.name.endsWith('.docx')) {
                extractedText = await extractTextFromDOCX(file);
            } else {
                alert("Please upload a valid PDF or DOCX file.");
                resetUI();
                return;
            }

            // Execute Real ATS Calculation Logic
            analyzeTextAndCalculateScore(extractedText);

        } catch (error) {
            console.error(error);
            alert("Error reading file text. Ensure it is not image-based/scanned.");
            resetUI();
        }
    }

    // Extract Text from PDF
    function extractTextFromPDF(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function () {
                const typedarray = new Uint8Array(this.result);
                pdfjsLib.getDocument(typedarray).promise.then(async (pdf) => {
                    let fullText = "";
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map(item => item.str).join(" ");
                        fullText += pageText + " ";
                    }
                    resolve(fullText);
                }).catch(reject);
            };
            reader.readAsArrayBuffer(file);
        });
    }

    // Extract Text from DOCX
    function extractTextFromDOCX(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                mammoth.extractRawText({ arrayBuffer: e.target.result })
                    .then(result => resolve(result.value))
                    .catch(reject);
            };
            reader.readAsArrayBuffer(file);
        });
    }

    // REAL ATS EVALUATION ALGORITHM
    function analyzeTextAndCalculateScore(text) {
        loaderText.textContent = "Running AI Structural & Keyword Audit...";
        
        const lowerText = text.toLowerCase();
        let calculatedScore = 0;

        // 1. Check Contact Details (Max 20 Points)
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        const phoneRegex = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/;
        const hasEmail = emailRegex.test(text);
        const hasPhone = phoneRegex.test(text);
        
        let contactScore = 0;
        if (hasEmail) contactScore += 10;
        if (hasPhone) contactScore += 10;
        calculatedScore += contactScore;

        // 2. Check Standard ATS Headers (Max 40 Points)
        const standardHeaders = ["experience", "education", "skills", "summary", "projects", "certifications"];
        let headersFound = 0;
        standardHeaders.forEach(header => {
            if (lowerText.includes(header)) headersFound++;
        });
        const headerScore = Math.min(40, (headersFound / 4) * 40);
        calculatedScore += headerScore;

        // 3. Check High Impact Corporate Keywords (Max 40 Points)
        const corporateKeywords = [
            "management", "developed", "created", "designed", "analysis", "led", 
            "project", "team", "marketing", "experience", "business", "data", "results",
            "communication", "planning", "strategy", "performance", "technical"
        ];
        let keywordsMatched = 0;
        corporateKeywords.forEach(word => {
            if (lowerText.includes(word)) keywordsMatched++;
        });
        const keywordScore = Math.min(40, (keywordsMatched / 8) * 40);
        calculatedScore += keywordScore;

        const finalScore = Math.round(calculatedScore);

        setTimeout(() => {
            loader.style.display = 'none';
            atsResult.style.display = 'block';

            // Render Output
            const scoreNumber = document.getElementById('score-number');
            const scoreCircleBg = document.getElementById('score-circle-bg');
            const scoreStatus = document.getElementById('score-status');

            const resHeaders = document.getElementById('res-headers');
            const resKeywords = document.getElementById('res-keywords');
            const resContact = document.getElementById('res-contact');

            if (scoreNumber) scoreNumber.textContent = `${finalScore}%`;
            if (scoreCircleBg) {
                scoreCircleBg.style.background = `conic-gradient(#2563EB ${finalScore}%, rgba(255,255,255,0.1) ${finalScore}%)`;
            }

            if (resHeaders) {
                resHeaders.textContent = `${headersFound} Standard Headers Found`;
                resHeaders.style.color = headersFound >= 3 ? "#10b981" : "#ef4444";
            }

            if (resKeywords) {
                const kwPercent = Math.round((keywordsMatched / corporateKeywords.length) * 100);
                resKeywords.textContent = `${kwPercent}% Corporate Match`;
                resKeywords.style.color = kwPercent >= 40 ? "#10b981" : "#f59e0b";
            }

            if (resContact) {
                resContact.textContent = hasEmail ? "Email & Phone Found" : "Missing Email / Contact";
                resContact.style.color = hasEmail ? "#10b981" : "#ef4444";
            }

            if (scoreStatus) {
                if (finalScore >= 75) {
                    scoreStatus.textContent = "Excellent ATS Compatibility!";
                    scoreStatus.style.color = "#10b981";
                } else if (finalScore >= 50) {
                    scoreStatus.textContent = "Moderate - Optimization Recommended";
                    scoreStatus.style.color = "#f59e0b";
                } else {
                    scoreStatus.textContent = "Critical ATS Parsing Issues Detected";
                    scoreStatus.style.color = "#ef4444";
                }
            }
        }, 1200);
    }

    function resetUI() {
        loader.style.display = 'none';
        dropZone.style.display = 'block';
        cvFile.value = '';
    }
});
