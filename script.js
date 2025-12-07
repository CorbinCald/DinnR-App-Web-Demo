/**
 * DinnR Prototype - Interactive Script
 * 
 * Features:
 * - initCarousel(): Swipe/drag navigation between cuisine menus
 * - initIconHoverStates(): Touch feedback for mobile devices
 * - initSpaghettiLandDialog(): Click Spaghetti Land icon → show detail card
 * - initDialogOverlay(): Full-screen dialog with close functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initIconHoverStates();
    initSpaghettiLandDialog();
    initDialogOverlay();
});

/* ========================================
   Carousel Swipe Functionality
   ======================================== */
function initCarousel() {
    const container = document.getElementById('carouselContainer');
    const track = document.getElementById('carouselTrack');
    const slides = track.querySelectorAll('.carousel-slide');
    const slideCount = slides.length;
    
    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startTime = 0;
    
    const SWIPE_THRESHOLD = 50; // Minimum distance for swipe
    const VELOCITY_THRESHOLD = 0.5; // Minimum velocity for quick swipe
    const SLIDE_GAP = 20; // Gap between slides (must match CSS)
    
    // Touch Events
    container.addEventListener('touchstart', handleDragStart, { passive: true });
    container.addEventListener('touchmove', handleDragMove, { passive: false });
    container.addEventListener('touchend', handleDragEnd);
    container.addEventListener('touchcancel', handleDragEnd);
    
    // Mouse Events (for desktop testing)
    container.addEventListener('mousedown', handleDragStart);
    container.addEventListener('mousemove', handleDragMove);
    container.addEventListener('mouseup', handleDragEnd);
    container.addEventListener('mouseleave', handleDragEnd);
    
    // Dot navigation
    document.querySelectorAll('.carousel-dots').forEach(dotsContainer => {
        dotsContainer.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                goToSlide(index);
            });
        });
    });
    
    function handleDragStart(e) {
        isDragging = true;
        startX = getPositionX(e);
        startTime = Date.now();
        track.classList.add('dragging');
        
        // Prevent text selection during drag
        e.preventDefault();
    }
    
    function handleDragMove(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        currentX = getPositionX(e);
        const diff = currentX - startX;
        const containerWidth = container.offsetWidth;
        const slideWidth = containerWidth + SLIDE_GAP;
        const offset = -currentIndex * slideWidth + diff;
        
        // Apply resistance at edges
        let resistance = 1;
        if ((currentIndex === 0 && diff > 0) || 
            (currentIndex === slideCount - 1 && diff < 0)) {
            resistance = 0.3;
        }
        
        track.style.transform = `translateX(${offset * resistance}px)`;
    }
    
    function handleDragEnd(e) {
        if (!isDragging) return;
        
        isDragging = false;
        track.classList.remove('dragging');
        
        const diff = currentX - startX;
        const elapsedTime = Date.now() - startTime;
        const velocity = Math.abs(diff) / elapsedTime;
        
        // Determine if we should change slides
        if (Math.abs(diff) > SWIPE_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
            if (diff > 0 && currentIndex > 0) {
                // Swipe right - go to previous
                currentIndex--;
            } else if (diff < 0 && currentIndex < slideCount - 1) {
                // Swipe left - go to next
                currentIndex++;
            }
        }
        
        goToSlide(currentIndex);
    }
    
    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }
    
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, slideCount - 1));
        const containerWidth = container.offsetWidth;
        const slideWidth = containerWidth + SLIDE_GAP;
        track.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        
        // Update all dot indicators
        updateDots();
    }
    
    function updateDots() {
        document.querySelectorAll('.carousel-slide').forEach((slide, slideIndex) => {
            const dots = slide.querySelectorAll('.dot');
            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle('active', dotIndex === currentIndex);
            });
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        goToSlide(currentIndex);
    });
}

/* ========================================
   Icon Hover States
   ======================================== */
function initIconHoverStates() {
    const iconWrappers = document.querySelectorAll('.icon-wrapper');
    
    iconWrappers.forEach(wrapper => {
        // Touch feedback for mobile - show hover label on touch
        wrapper.addEventListener('touchstart', () => {
            wrapper.classList.add('touching');
        }, { passive: true });
        
        wrapper.addEventListener('touchend', () => {
            setTimeout(() => {
                wrapper.classList.remove('touching');
            }, 300);
        });
    });
}

/* ========================================
   Spaghetti Land Dialog
   ======================================== */
function initSpaghettiLandDialog() {
    const spaghettiLandIcon = document.getElementById('spaghettiLandIcon');
    const detailCard = document.getElementById('detailCard');
    const dialogOverlay = document.getElementById('dialogOverlay');
    
    if (!spaghettiLandIcon || !detailCard) return;
    
    let isCardVisible = false;
    
    // Click on Spaghetti Land icon to show detail card
    spaghettiLandIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDetailCard();
    });
    
    // Click on detail card to open full dialog
    detailCard.addEventListener('click', (e) => {
        e.stopPropagation();
        openDialog();
    });
    
    // Click outside to close card
    document.addEventListener('click', (e) => {
        // Close detail card when clicking outside
        if (isCardVisible && 
            !detailCard.contains(e.target) && 
            !spaghettiLandIcon.contains(e.target)) {
            hideDetailCard();
        }
        
        // Also close dialog if clicking outside dialog content
        const dialogOverlay = document.getElementById('dialogOverlay');
        if (dialogOverlay && dialogOverlay.classList.contains('visible')) {
            const dialogContent = document.getElementById('dialogContent');
            if (!dialogContent.contains(e.target)) {
                dialogOverlay.classList.remove('visible');
                document.body.style.overflow = '';
            }
        }
    });
    
    function toggleDetailCard() {
        if (isCardVisible) {
            hideDetailCard();
        } else {
            showDetailCard();
        }
    }
    
    function showDetailCard() {
        detailCard.classList.add('visible');
        isCardVisible = true;
        detailCard.style.animation = 'fadeIn 0.3s ease forwards';
    }
    
    function hideDetailCard() {
        detailCard.classList.remove('visible');
        detailCard.style.animation = ''; // Clear inline animation style
        isCardVisible = false;
    }
    
    function openDialog() {
        dialogOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
        hideDetailCard();
    }
}

/* ========================================
   Dialog Overlay
   ======================================== */
function initDialogOverlay() {
    const dialogOverlay = document.getElementById('dialogOverlay');
    const dialogContent = document.getElementById('dialogContent');
    const dialogClose = document.getElementById('dialogClose');
    
    if (!dialogOverlay) return;
    
    // Close button
    dialogClose.addEventListener('click', closeDialog);
    
    // Click outside dialog to close
    dialogOverlay.addEventListener('click', (e) => {
        if (e.target === dialogOverlay) {
            closeDialog();
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dialogOverlay.classList.contains('visible')) {
            closeDialog();
        }
    });
    
    // Prevent clicks inside dialog from closing it
    dialogContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    function closeDialog() {
        dialogOverlay.classList.remove('visible');
        document.body.style.overflow = '';
    }
}

