// DOM Elements
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.getElementById('indicators');
const reviewModal = document.getElementById('reviewModal');
const modalClose = document.getElementById('modalClose');
const modalName = document.getElementById('modalName');
const modalReview = document.getElementById('modalReview');

// Carousel state
let reviewsData = [];
let currentIndex = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

// Fetch reviews data from JSON file
async function fetchReviewsData() {
    try {
        const response = await fetch('src/data/reviews.json');
        if (!response.ok) {
            throw new Error('Failed to fetch reviews data');
        }
        reviewsData = await response.json();
        return reviewsData;
    } catch (error) {
        console.error('Error loading reviews:', error);
        // Fallback to empty array if fetch fails
        return [];
    }
}

// Initialize the carousel
async function initCarousel() {
    await fetchReviewsData();
    
    // Only proceed if we have reviews data
    if (reviewsData.length > 0) {
        renderReviewCards();
        renderIndicators();
        updateCarousel();
        setupEventListeners();
    } else {
        // Show message if no reviews available
        carouselTrack.innerHTML = '<p style="text-align: center; width: 100%; padding: 2rem;">No reviews available at the moment.</p>';
    }
}

// Render review cards
function renderReviewCards() {
    carouselTrack.innerHTML = '';
    
    reviewsData.forEach((review, index) => {
      //  if (index >= reviewsData.length - 1) return;
        const card = document.createElement('div');
        card.className = 'review-card';
        card.dataset.index = index;
        
        // Truncate review text if needed
        const truncatedText = truncateText(review.review, 180);
        const isTruncated = truncatedText.length < review.review.length;
        
        card.innerHTML = `
            <h3 class="customer-name">${review.name}</h3>
            <div class="review-text ${isTruncated ? 'truncated' : ''}">${truncatedText}</div>
        `;
        
        carouselTrack.appendChild(card);
    });
}

// Render indicators
function renderIndicators() {
    indicators.innerHTML = '';
    
    for (let i = 0; i < reviewsData.length; i++) {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${i === currentIndex ? 'active' : ''}`;
        indicator.dataset.index = i;
        indicators.appendChild(indicator);
    }
}

// Update carousel position
function updateCarousel() {
    const cardWidth = document.querySelector('.review-card').offsetWidth;
    const gap = 24; // 1.5rem in pixels
    const translateX = -currentIndex * (cardWidth + gap);
    
    carouselTrack.style.transform = `translateX(${translateX}px)`;
    
    // Update active indicator
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

// Truncate text function
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength);
}

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < reviewsData.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Indicators
    indicators.addEventListener('click', (e) => {
        if (e.target.classList.contains('indicator')) {
            currentIndex = parseInt(e.target.dataset.index);
            updateCarousel();
        }
    });
    
    // Review card click for modal
    carouselTrack.addEventListener('click', (e) => {
        const card = e.target.closest('.review-card');
        if (card) {
            const index = parseInt(card.dataset.index);
            openModal(index);
        }
    });
    
    // Modal close
    modalClose.addEventListener('click', closeModal);
    reviewModal.addEventListener('click', (e) => {
        if (e.target === reviewModal) {
            closeModal();
        }
    });
    
    // Touch events for mobile swipe
    carouselTrack.addEventListener('touchstart', touchStart);
    carouselTrack.addEventListener('touchmove', touchMove);
    carouselTrack.addEventListener('touchend', touchEnd);
    
    // Mouse events for desktop drag
    carouselTrack.addEventListener('mousedown', dragStart);
    carouselTrack.addEventListener('mousemove', dragMove);
    carouselTrack.addEventListener('mouseup', dragEnd);
    carouselTrack.addEventListener('mouseleave', dragEnd);
}

// Touch event handlers
function touchStart(e) {
    isDragging = true;
    startPos = e.touches[0].clientX;
    prevTranslate = currentTranslate;
    carouselTrack.style.transition = 'none';
}

function touchMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const currentPosition = e.touches[0].clientX;
    currentTranslate = prevTranslate + currentPosition - startPos;
    carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
}

function touchEnd() {
    isDragging = false;
    carouselTrack.style.transition = 'transform var(--transition-fast)';
    
    const cardWidth = document.querySelector('.review-card').offsetWidth;
    const gap = 24;
    const movedBy = currentTranslate - prevTranslate;
    
    if (Math.abs(movedBy) > cardWidth / 4) {
        if (movedBy > 0 && currentIndex > 0) {
            currentIndex--;
        } else if (movedBy < 0 && currentIndex < reviewsData.length - 1) {
            currentIndex++;
        }
    }
    
    updateCarousel();
    currentTranslate = -currentIndex * (cardWidth + gap);
}

// Mouse event handlers for desktop drag
function dragStart(e) {
    isDragging = true;
    startPos = e.clientX;
    prevTranslate = currentTranslate;
    carouselTrack.style.transition = 'none';
}

function dragMove(e) {
    if (!isDragging) return;
    const currentPosition = e.clientX;
    currentTranslate = prevTranslate + currentPosition - startPos;
    carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
}

function dragEnd() {
    isDragging = false;
    carouselTrack.style.transition = 'transform var(--transition-fast)';
    
    const cardWidth = document.querySelector('.review-card').offsetWidth;
    const gap = 24;
    const movedBy = currentTranslate - prevTranslate;
    
    if (Math.abs(movedBy) > cardWidth / 4) {
        if (movedBy > 0 && currentIndex > 0) {
            currentIndex--;
        } else if (movedBy < 0 && currentIndex < reviewsData.length - 1) {
            currentIndex++;
        }
    }
    
    updateCarousel();
    currentTranslate = -currentIndex * (cardWidth + gap);
}

// Modal functions
function openModal(index) {
    const review = reviewsData[index];
    modalName.textContent = review.name;
    modalReview.textContent = review.review;
    reviewModal.classList.add('active');
}

function closeModal() {
    reviewModal.classList.remove('active');
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', initCarousel);