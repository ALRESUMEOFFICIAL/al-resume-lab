/**
 * ==========================================
 * ENTERPRISE APPLICATION DASHBOARD - CORE JS
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ========================================== */
    /* 1. STATE & UI ELEMENTS INITIALIZATION      */
    /* ========================================== */
    
    // UI Elements - Modal & Actions
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalMessage = document.getElementById('modal-message');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    const modalCancelBtn = document.getElementById('modal-cancel-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    
    // UI Elements - Interactive Buttons
    const btnCreateProject = document.getElementById('btn-create-project');
    const btnExportReport = document.getElementById('btn-export-report');
    const notifBtn = document.getElementById('notif-btn');
    const notifCount = document.getElementById('notif-count');
    const userMenuBtn = document.getElementById('user-menu-btn');
    
    // UI Elements - Table & Filters
    const selectAllCheckbox = document.getElementById('select-all');
    const rowCheckboxes = document.querySelectorAll('.row-select');
    const statusFilter = document.getElementById('status-filter');
    const transactionsTable = document.getElementById('transactions-table');
    const tableBody = document.getElementById('table-body');
    const paginationInfo = document.getElementById('pagination-info');

    // UI Elements - Forms
    const settingsForm = document.getElementById('settings-form');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    // Callback store for active modal operations
    let pendingActionCallback = null;


    /* ========================================== */
    /* 2. MODAL CONTROLLER                        */
    /* ========================================== */

    /**
     * Shows modal with custom message and callback action
     */
    function showModal(message, onConfirm) {
        if (modalMessage) modalMessage.textContent = message;
        pendingActionCallback = onConfirm;
        if (modalBackdrop) modalBackdrop.classList.remove('hidden');
    }

    /**
     * Hides modal and clears active callbacks
     */
    function hideModal() {
        if (modalBackdrop) modalBackdrop.classList.add('hidden');
        pendingActionCallback = null;
    }

    // Modal Event Listeners
    if (modalCancelBtn) modalCancelBtn.addEventListener('click', hideModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);

    if (modalConfirmBtn) {
        modalConfirmBtn.addEventListener('click', () => {
            if (typeof pendingActionCallback === 'function') {
                pendingActionCallback();
            }
            hideModal();
        });
    }

    // Close modal when clicking outside of dialog
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) hideModal();
        });
    }


    /* ========================================== */
    /* 3. TABLE SELECTION & FILTERING SYSTEM      */
    /* ========================================== */

    // Select All Checkboxes toggle
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            rowCheckboxes.forEach((checkbox) => {
                checkbox.checked = isChecked;
            });
        });
    }

    // Status Filter for Table Rows
    if (statusFilter && tableBody) {
        statusFilter.addEventListener('change', (e) => {
            const selectedStatus = e.target.value.toLowerCase();
            const rows = tableBody.querySelectorAll('tr');
            let visibleCount = 0;

            rows.forEach((row) => {
                const statusBadge = row.querySelector('.badge');
                if (!statusBadge) return;

                const rowStatus = statusBadge.textContent.trim().toLowerCase();

                if (selectedStatus === 'all' || rowStatus === selectedStatus) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });

            // Update Pagination Text
            if (paginationInfo) {
                paginationInfo.textContent = `Showing ${visibleCount} entries`;
            }
        });
    }

    // Dynamic Row Deletion using Event Delegation
    if (tableBody) {
        tableBody.addEventListener('click', (e) => {
            // Check if Delete Button was clicked
            if (e.target.classList.contains('delete-btn')) {
                const targetRow = e.target.closest('tr');
                const invoiceId = targetRow ? targetRow.cells[1].textContent : 'this item';

                showModal(`Are you sure you want to delete invoice ${invoiceId}?`, () => {
                    targetRow.remove();
                    updateTablePaginationCount();
                });
            }

            // Check if View Button was clicked
            if (e.target.classList.contains('view-btn')) {
                const targetRow = e.target.closest('tr');
                const invoiceId = targetRow ? targetRow.cells[1].textContent : '';
                alert(`Opening details for Invoice: ${invoiceId}`);
            }
        });
    }

    /**
     * Recalculates visible table rows after deletion
     */
    function updateTablePaginationCount() {
        if (!tableBody || !paginationInfo) return;
        const visibleRows = Array.from(tableBody.querySelectorAll('tr')).filter(
            (row) => row.style.display !== 'none'
        );
        paginationInfo.textContent = `Showing ${visibleRows.length} entries`;
    }


    /* ========================================== */
    /* 4. FORM HANDLING & VALIDATION              */
    /* ========================================== */

    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect Form Inputs
            const formData = new FormData(settingsForm);
            const data = Object.fromEntries(formData.entries());

            console.log('Submitted Account Data:', data);

            // Simple Feedback
            alert('Account Settings updated successfully!');
        });
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput ? searchInput.value.trim() : '';

            if (query) {
                alert(`Searching records for: "${query}"`);
            } else {
                alert('Please enter a search term.');
            }
        });
    }


    /* ========================================== */
    /* 5. USER ACTIONS & NOTIFICATIONS            */
    /* ========================================== */

    if (btnCreateProject) {
        btnCreateProject.addEventListener('click', () => {
            showModal('Do you want to initialize a new project workspace?', () => {
                alert('Project workspace created successfully.');
            });
        });
    }

    if (btnExportReport) {
        btnExportReport.addEventListener('click', () => {
            alert('Generating PDF/CSV Report... Download will begin shortly.');
        });
    }

    if (notifBtn) {
        notifBtn.addEventListener('click', () => {
            alert('You have 3 unread system alerts.');
            if (notifCount) {
                notifCount.style.display = 'none'; // Clear notification badge
            }
        });
    }

    if (userMenuBtn) {
        userMenuBtn.addEventListener('click', () => {
            alert('User profile menu clicked.');
        });
    }

});
