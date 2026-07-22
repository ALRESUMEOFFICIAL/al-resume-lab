/* ==========================================
   AL RESUME LAB — INTERACTIVE FRONTEND LOGIC
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------
    // 1. MOBILE NAVIGATION TOGGLE
    // ------------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });

        // Close menu when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('open');
            });
        });
    }

    // ------------------------------------------
    // 2. ATS CHECKER UPLOAD & DRAG/DROP SYSTEM
    // ------------------------------------------
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('resumeFileInput');

    if (uploadArea && fileInput) {

        // Click box to open file browser
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        // Drag & Drop event handlers
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                uploadArea.style.borderColor = '#38bdf8';
                uploadArea.style.backgroundColor = 'rgba(56, 189, 248, 0.12)';
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                uploadArea.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                uploadArea.style.backgroundColor = 'rgba(15, 23, 42, 0.3)';
            }, false);
        });

        // Handle File Drop
        uploadArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length > 0) {
                handleResumeUpload(files[0]);
            }
        });

        // Handle File Select via Input
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleResumeUpload(e.target.files[0]);
            }
        });
    }

    // ------------------------------------------
    // 3. MOCK ATS SCANNER SIMULATOR
    // ------------------------------------------
    function handleResumeUpload(file) {
        const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
        
        // Basic Extension Check
        const fileName = file.name;
        const isExtensionValid = fileName.endsWith('.pdf') || fileName.endsWith('.docx') || fileName.endsWith('.doc');

        if (!isExtensionValid) {
            alert('Please upload a valid PDF or Word document (.pdf, .docx).');
            return;
        }

        // Show Processing State
        const uploadContent = uploadArea.querySelector('.upload-box-content');
        const originalHTML = uploadContent.innerHTML;

        uploadContent.innerHTML = `
            <div class="upload-icon-circle" style="animation: spin 1s linear infinite; display: inline-block;">⚙️</div>
            <h3>Analyzing "${fileName}"...</h3>
            <p>Evaluating ATS formatting, section headers, and key terms.</p>
        `;

        // Inject CSS animation for scanner spinner
        if (!document.getElementById('spinnerStyle')) {
            const style = document.createElement('style');
            style.id = 'spinnerStyle';
            style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
            document.head.appendChild(style);
        }

        // Simulate 2.5s AI ATS Scan Delay
        setTimeout(() => {
            // Simulated Mock Analysis Result
            uploadContent.innerHTML = `
                <div style="font-size: 2.2rem; margin-bottom: 8px;">✅</div>
                <h3 style="color: #38bdf8; font-size: 1.4rem;">Analysis Complete!</h3>
                <p style="margin: 8px 0; color: #f8fafc;">Estimated ATS Score: <strong style="color: #60a5fa; font-size: 1.2rem;">84%</strong></p>
                <div style="margin-top: 14px; display: flex; gap: 10px; justify-content: center;">
                    <a href="#builder" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">Optimize Now</a>
                    <button id="resetUploadBtn" class="btn btn-secondary" style="padding: 8px 16px; font-size: 0.85rem;">Upload Another</button>
                </div>
            `;

            // Reset Button Logic
            const resetBtn = document.getElementById('resetUploadBtn');
            if (resetBtn) {
                resetBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    uploadContent.innerHTML = originalHTML;
                    fileInput.value = '';
                });
            }
        }, 2500);
    }

    // ------------------------------------------
    // 4. NAVBAR SCROLL HIGHLIGHTER
    // ------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });

});
