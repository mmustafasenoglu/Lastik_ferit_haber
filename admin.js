// ===============================================
// ADMIN PANEL - NEWS MANAGEMENT
// ===============================================

// ===============================================
// STATE & ELEMENTS
// ===============================================
const imageInput = document.getElementById('imageInput');
const imageUploadArea = document.getElementById('imageUploadArea');
const uploadPlaceholder = document.getElementById('uploadPlaceholder');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const removeImageBtn = document.getElementById('removeImage');
const newsForm = document.getElementById('newsForm');
const resetFormBtn = document.getElementById('resetForm');
const newsList = document.getElementById('newsList');
const newsCount = document.getElementById('newsCount');
const successModal = document.getElementById('successModal');
const closeSuccessModalBtn = document.getElementById('closeSuccessModal');

let uploadedImageData = null;

// ===============================================
// IMAGE UPLOAD HANDLING
// ===============================================

// Click to upload
uploadPlaceholder.addEventListener('click', () => {
    imageInput.click();
});

// Drag and drop
imageUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    imageUploadArea.style.borderColor = 'var(--accent-light)';
    imageUploadArea.style.background = 'rgba(50, 130, 184, 0.1)';
});

imageUploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    imageUploadArea.style.borderColor = 'var(--border)';
    imageUploadArea.style.background = 'transparent';
});

imageUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    imageUploadArea.style.borderColor = 'var(--border)';
    imageUploadArea.style.background = 'transparent';

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleImageUpload(files[0]);
    }
});

// File input change
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleImageUpload(file);
    }
});

// Handle image upload
function handleImageUpload(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Lütfen geçerli bir görsel dosyası seçin!');
        return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        alert('Dosya boyutu 5MB\'dan küçük olmalıdır!');
        return;
    }

    // Read file
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedImageData = e.target.result;
        previewImg.src = uploadedImageData;
        uploadPlaceholder.style.display = 'none';
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// Remove image
removeImageBtn.addEventListener('click', () => {
    uploadedImageData = null;
    previewImg.src = '';
    imageInput.value = '';
    uploadPlaceholder.style.display = 'flex';
    imagePreview.style.display = 'none';
});

// ===============================================
// FORM HANDLING
// ===============================================

newsForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const title = document.getElementById('newsTitle').value.trim();
    const category = document.getElementById('newsCategory').value;
    const summary = document.getElementById('newsSummary').value.trim();
    const content = document.getElementById('newsContent').value.trim();
    const author = document.getElementById('newsAuthor').value.trim();
    const readTime = document.getElementById('newsReadTime').value.trim();

    // Validate image
    if (!uploadedImageData) {
        alert('Lütfen bir görsel yükleyin!');
        return;
    }

    // Create news object
    const newsItem = {
        id: Date.now(),
        title,
        category,
        image: uploadedImageData,
        summary,
        content,
        author,
        date: formatDate(new Date()),
        readTime
    };

    // Save to localStorage
    saveNewsItem(newsItem);

    // Show success modal
    showSuccessModal();

    // Reset form
    resetForm();

    // Reload news list
    loadNewsList();
});

// Reset form
resetFormBtn.addEventListener('click', resetForm);

function resetForm() {
    newsForm.reset();
    uploadedImageData = null;
    previewImg.src = '';
    imageInput.value = '';
    uploadPlaceholder.style.display = 'flex';
    imagePreview.style.display = 'none';
}

// ===============================================
// LOCALSTORAGE FUNCTIONS
// ===============================================

function saveNewsItem(newsItem) {
    let customNews = getCustomNews();
    customNews.unshift(newsItem); // Add to beginning
    localStorage.setItem('customNews', JSON.stringify(customNews));
}

function getCustomNews() {
    const stored = localStorage.getItem('customNews');
    return stored ? JSON.parse(stored) : [];
}

function deleteNewsItem(id) {
    let customNews = getCustomNews();
    customNews = customNews.filter(news => news.id !== id);
    localStorage.setItem('customNews', JSON.stringify(customNews));
    loadNewsList();
}

// ===============================================
// NEWS LIST DISPLAY
// ===============================================

function loadNewsList() {
    const customNews = getCustomNews();

    if (customNews.length === 0) {
        newsList.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="12" y1="18" x2="12" y2="12"></line>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
                <p>Henüz haber eklenmedi</p>
            </div>
        `;
        newsCount.textContent = 'Toplam 0 haber';
        return;
    }

    newsCount.textContent = `Toplam ${customNews.length} haber`;

    newsList.innerHTML = customNews.map(news => `
        <div class="news-item">
            <img src="${news.image}" alt="${news.title}" class="news-item-image">
            <div class="news-item-content">
                <span class="news-item-category">${news.category.toUpperCase()}</span>
                <h3 class="news-item-title">${news.title}</h3>
                <div class="news-item-meta">
                    <span>📅 ${news.date}</span>
                    <span>⏱️ ${news.readTime}</span>
                    <span>✍️ ${news.author}</span>
                </div>
            </div>
            <div class="news-item-actions">
                <button class="btn-delete" onclick="confirmDelete(${news.id})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Sil
                </button>
            </div>
        </div>
    `).join('');
}

function confirmDelete(id) {
    if (confirm('Bu haberi silmek istediğinizden emin misiniz?')) {
        deleteNewsItem(id);
    }
}

// ===============================================
// MODAL FUNCTIONS
// ===============================================

function showSuccessModal() {
    successModal.classList.add('active');
}

function hideSuccessModal() {
    successModal.classList.remove('active');
}

closeSuccessModalBtn.addEventListener('click', hideSuccessModal);
successModal.querySelector('.modal-overlay').addEventListener('click', hideSuccessModal);

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('tr-TR', options);
}

// ===============================================
// LOGOUT FUNCTIONALITY
// ===============================================

const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', () => {
    if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'login.html';
    }
});

// ===============================================
// INITIALIZATION
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    loadNewsList();
});
