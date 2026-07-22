/* ==========================================================================
   AL RESUME LAB & QURESHI DESIGN HUB — CORE JAVASCRIPT LOGIC
   ========================================================================== */

// 1. STATE MANAGEMENT & LOCAL STORAGE
const MAX_FREE_SCANS = 5;
let remainingScans = parseInt(localStorage.getItem('al_free_scans')) || MAX_FREE_SCANS;

// Initialize Counter UI on Page Load
document.addEventListener('DOMContentLoaded', () => {
    updateScanCounterUI();
    setupDropzone();
    setupPaymentForm();
});

// Update Remaining Scans Display
function updateScanCounterUI() {
    const counterElement = document.getElementById('freeScansLeft');
    if (counterElement) {
        counterElement.textContent = remainingScans;
    }
}

// 2. DRAG & DROP & FILE UPLOAD LOGIC
function setupDropzone() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');

    if (!dropzone || !fileInput) return;

    // Trigger File Input Click
    dropzone.addEventListener('click', () => {
        if (remainingScans <= 0) {
            alert("Aap ke 5 Free Scans poore ho chuke hain. Unlimited scans ke liye Pro Plan upgrade karein!");
            openPaymentModal('Pro Subscription Plan (Unlimited Scans)', 5000);
            return;
        }
        fileInput.click();
    });

    // Drag & Drop Events
    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.style.borderColor = '#38bdf8';
            dropzone.style.background = 'rgba(56, 189, 248, 0.08)';
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.style.borderColor = 'rgba(56, 189, 248, 0.35)';
            dropzone.style.background = 'rgba(5, 8, 17, 0.4)';
        }, false);
    });

    // Handle File Drop
    dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });

    // Handle File Input Change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });
}

// 3. ATS PARSING & ANALYSIS ENGINE (SIMULATION)
function handleFileUpload(file) {
    if (remainingScans <= 0) {
        alert("Free limits reached!");
        openPaymentModal('Pro Subscription Plan', 5000);
        return;
    }

    const dropzoneContent = document.getElementById('dropzoneContent');
    
    // UI Loader State
    dropzoneContent.innerHTML = `
        <div class="loader-box" style="padding: 20px;">
            <div class="pulse-dot" style="width: 20px; height: 20px; margin: 0 auto 15px;"></div>
            <h3>Analyzing "${file.name}" ...</h3>
            <p style="color: #94a3b8; font-size: 0.85rem;">Parsing layout structures, font hierarchies, and keyword density...</p>
        </div>
    `;

    // Deduct 1 Scan
    remainingScans--;
    localStorage.setItem('al_free_scans', remainingScans);
    updateScanCounterUI();

    // Simulate AI Processing Delay (2.5 Seconds)
    setTimeout(() => {
        generateScanResult(file.name);
    }, 2500);
}

// Render ATS Scan Result
function generateScanResult(fileName) {
    // Generate Random Realistic Score for Demo (e.g., 42% - 68%)
    const score = Math.floor(Math.random() * (68 - 42 + 1)) + 42;
    const dropzoneContent = document.getElementById('dropzoneContent');

    const isLowScore = score < 70;

    dropzoneContent.innerHTML = `
        <div class="scan-result-container" style="text-align: center; padding: 10px;">
            <div style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 5px;">Analysis Complete for: <strong>${fileName}</strong></div>
            
            <div style="font-size: 2.8rem; font-weight: 800; color: ${isLowScore ? '#ef4444' : '#22c55e'}; font-family: 'Space Grotesk', sans-serif;">
                ${score}%
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: ${isLowScore ? '#ef4444' : '#22c55e'}; margin-bottom: 15px;">
                ${isLowScore ? '⚠️ Low ATS Compatibility Score' : '✅ Good ATS Score'}
            </div>

            <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 18px; max-width: 480px; margin-left: auto; margin-right: auto;">
                ${isLowScore 
                    ? 'Your CV failed critical corporate ATS checks due to unreadable column formatting, missing job keywords, or non-standard fonts.' 
                    : 'Your CV passed basic layout checks! Upgrade to Pro for detailed keyword gap analysis.'}
            </p>

            ${isLowScore ? `
                <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); padding: 15px; border-radius: 12px; margin-bottom: 15px;">
                    <div style="color: #4ade80; font-weight: 700; font-size: 0.9rem; margin-bottom: 4px;">Get 100% ATS Redesign by Qureshi Design Hub</div>
                    <div style="color: #94a3b8; font-size: 0.8rem; margin-bottom: 12px;">Fix formatting issues and increase interview call rates.</div>
                    <a href="https://wa.me/923309871122?text=Hi%20Qureshi%20Design%20Hub,%20my%20ATS%20score%20was%20only%20${score}%.%20I%20need%20a%20professional%20CV%20redesign." 
                       target="_blank" 
                       class="btn btn-whatsapp-sm" 
                       style="display: inline-flex; width: auto;">
                        💬 Fix CV via WhatsApp (03309871122)
                    </a>
                </div>
            ` : ''}

            <button onclick="resetDropzone()" class="btn btn-secondary-lg" style="padding: 8px 18px; font-size: 0.8rem;">
                🔄 Scan Another Resume
            </button>
        </div>
    `;
}

// Reset Dropzone UI
function resetDropzone() {
    const dropzoneContent = document.getElementById('dropzoneContent');
    dropzoneContent.innerHTML = `
        <div class="upload-icon-box">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 16.5V3m0 0L7.5 7.5M12 3l4.5 4.5M21 16.5v3a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-3"/></svg>
        </div>
        <h3>Drag & Drop Your Resume File Here</h3>
        <p>or <span class="highlight-click">click to browse</span> from your computer or smartphone</p>
        <span class="supported-formats">Supported Formats: PDF, DOCX (Max 10MB)</span>
    `;
}

// 4. PAYMENT MODAL CONTROLLER
function openPaymentModal(title, price) {
    const modal = document.getElementById('paymentModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalAmount = document.getElementById('modalAmount');

    if (modal && modalTitle && modalAmount) {
        modalTitle.textContent = title;
        modalAmount.textContent = `Rs. ${price.toLocaleString()} PKR`;
        modal.classList.add('active');
    }
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// 5. PAYMENT FORM SUBMISSION VIA WHATSAPP
function setupPaymentForm() {
    const form = document.getElementById('modalPaymentForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('userEmail').value;
        const trxId = document.getElementById('userTrxId').value;
        const itemTitle = document.getElementById('modalTitle').textContent;
        const amount = document.getElementById('modalAmount').textContent;

        const whatsappMessage = `*NEW PAYMENT VERIFICATION REQUEST*%0A%0A` +
            `*Item/Plan:* ${encodeURIComponent(itemTitle)}%0A` +
            `*Amount:* ${encodeURIComponent(amount)}%0A` +
            `*User Email:* ${encodeURIComponent(email)}%0A` +
            `*TRX Reference ID:* ${encodeURIComponent(trxId)}%0A%0A` +
            `Please verify my transaction and activate my access.`;

        const whatsappUrl = `https://wa.me/923309871122?text=${whatsappMessage}`;
        
        // Open WhatsApp Direct Link
        window.open(whatsappUrl, '_blank');
        closePaymentModal();
    });
}
