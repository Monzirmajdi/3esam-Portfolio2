document.addEventListener("DOMContentLoaded", function() {
    // Get elements
    const navLinks = document.querySelectorAll(".nav-link");
    const actionBtns = document.querySelectorAll(".action-btn");
    const modals = document.querySelectorAll(".modal");
    const closeBtns = document.querySelectorAll(".close-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    
    let currentProjectImages = [];
    let currentImageIndex = 0;

    // Project data with carousel images
    const projectData = {
        0: {
            title: "Runes Studio Web Design",
            client: "Runes Studio",
            duration: "3 months",
            role: "Lead UI/UX Designer",
            tools: "Figma, Adobe Creative Suite",
            description: "A comprehensive web design project for Runes Studio, featuring modern UI/UX principles and stunning visual identity. The project involved creating a complete brand experience from wireframes to final implementation.",
            images: [
                "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
            ]
        },
        1: {
            title: "Swiss App Design",
            client: "Swiss Tech Inc.",
            duration: "2 months",
            role: "Mobile UI Designer",
            tools: "Sketch, Principle, InVision",
            description: "Mobile application design with Swiss design principles, focusing on minimalism and functionality. The app features clean interfaces and intuitive user flows.",
            images: [
                "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&h=600&fit=crop"
            ]
        },
        2: {
            title: "Bruno Portfolio Website",
            client: "Bruno Martinez",
            duration: "1 month",
            role: "Web Designer & Developer",
            tools: "Figma, React, GSAP",
            description: "Personal portfolio website with advanced animations and interactive elements. Features smooth transitions and engaging micro-interactions.",
            images: [
                "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop"
            ]
        }
    };

    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const section = this.getAttribute("data-section");
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove("active"));
            // Add active class to clicked link
            this.classList.add("active");
            
            // Handle experience section scroll
            if (section === "experience") {
                const experienceSection = document.querySelector(".experience-section");
                if (experienceSection) {
                    experienceSection.scrollIntoView({ 
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
            // Open modal if it exists
            else if (section === "portfolio" || section === "contact") {
                openModal(section);
            }
            // Handle about section
            else if (section === "about") {
                const aboutSection = document.querySelector(".about-section");
                if (aboutSection) {
                    aboutSection.scrollIntoView({ 
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
            // Handle home section (scroll to top)
            else if (section === "home") {
                window.scrollTo({ 
                    top: 0, 
                    behavior: "smooth" 
                });
            }
        });
    });

    // Handle action button clicks
    actionBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const section = this.getAttribute("data-section");
            openModal(section);
        });
    });

    // Function to open modal
    function openModal(section) {
        const modal = document.getElementById(section + "Modal");
        if (modal) {
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    }

    // Handle close button clicks
    closeBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const modalId = this.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.remove("active");
                document.body.style.overflow = "auto";
            }
        });
    });

    // Close modal when clicking outside content
    modals.forEach(modal => {
        modal.addEventListener("click", function(e) {
            if (e.target === this) {
                this.classList.remove("active");
                document.body.style.overflow = "auto";
            }
        });
    });

    // Handle portfolio item clicks
    portfolioItems.forEach(item => {
        item.addEventListener("click", function() {
            const projectId = this.getAttribute("data-project-id");
            showProjectDetail(projectId);
        });
    });

    function showProjectDetail(projectId) {
        const project = projectData[projectId];
        const projectDetailModal = document.getElementById("projectDetailModal");
        const projectDetail = document.getElementById("projectDetail");
        
        if (project && projectDetail) {
            currentProjectImages = project.images;
            currentImageIndex = 0;
            
            projectDetail.innerHTML = `
                <h2>${project.title}</h2>
                <div class="project-meta">
                    <div class="project-meta-item">
                        <h4>Client</h4>
                        <p>${project.client}</p>
                    </div>
                    <div class="project-meta-item">
                        <h4>Duration</h4>
                        <p>${project.duration}</p>
                    </div>
                    <div class="project-meta-item">
                        <h4>Role</h4>
                        <p>${project.role}</p>
                    </div>
                    <div class="project-meta-item">
                        <h4>Tools</h4>
                        <p>${project.tools}</p>
                    </div>
                </div>
                <p style="color: #ccc; font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px;">${project.description}</p>
                
                <div class="project-carousel">
                    <button class="carousel-btn prev" onclick="previousImage()">‹</button>
                    <div class="carousel-container">
                        <img id="carouselImage" src="${project.images[0]}" alt="${project.title}" style="width: 100%; height: 400px; object-fit: cover; border-radius: 15px; border: 1px solid rgba(255, 255, 255, 0.1);">
                    </div>
                    <button class="carousel-btn next" onclick="nextImage()">›</button>
                </div>
                
                <div class="carousel-indicators" style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;">
                    ${project.images.map((_, index) => 
                        `<span class="carousel-dot ${index === 0 ? "active" : ""}" onclick="goToImage(${index})" style="width: 12px; height: 12px; border-radius: 50%; background: ${index === 0 ? "#FFD700" : "rgba(255, 215, 0, 0.3)"}; cursor: pointer; transition: all 0.3s ease;"></span>`
                    ).join("")}
                </div>
                
                <div class="project-gallery" style="margin-top: 40px;">
                    <h3 style="color: #FFD700; margin-bottom: 20px; grid-column: 1 / -1;">Project Gallery</h3>
                    ${project.images.map(img => `<img src="${img}" alt="${project.title}" style="cursor: pointer;" onclick="openImageInCarousel("${img}")">`).join("")}
                </div>
            `;
            
            // Close portfolio modal first
            document.getElementById("portfolioModal").classList.remove("active");
            
            // Open project detail modal
            setTimeout(() => {
                projectDetailModal.classList.add("active");
            }, 300);
        }
    }

    // Carousel functions (global scope for onclick handlers)
    window.previousImage = function() {
        currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
        updateCarouselImage();
    };

    window.nextImage = function() {
        currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
        updateCarouselImage();
    };

    window.goToImage = function(index) {
        currentImageIndex = index;
        updateCarouselImage();
    };

    window.openImageInCarousel = function(imageSrc) {
        const imageIndex = currentProjectImages.indexOf(imageSrc);
        if (imageIndex !== -1) {
            currentImageIndex = imageIndex;
            updateCarouselImage();
            // Scroll to carousel
            document.querySelector(".project-carousel").scrollIntoView({ behavior: "smooth" });
        }
    };

    function updateCarouselImage() {
        const carouselImage = document.getElementById("carouselImage");
        const carouselDots = document.querySelectorAll(".carousel-dot");
        
        if (carouselImage && currentProjectImages[currentImageIndex]) {
            carouselImage.src = currentProjectImages[currentImageIndex];
            
            // Update dots
            carouselDots.forEach((dot, index) => {
                dot.style.background = index === currentImageIndex ? "#FFD700" : "rgba(255, 215, 0, 0.3)";
                dot.classList.toggle("active", index === currentImageIndex);
            });
        }
    }

    // Handle contact form submission
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Get form data
            const email = this.querySelector("input[type=\"text\"]").value;
            const phone = this.querySelector("input[type=\"tel\"]").value;
            const interest = this.querySelector("select").value;
            const budget = this.querySelectorAll("select")[1].value;
            const message = this.querySelector("textarea").value;
            
            // Simple validation
            if (email && phone && interest && budget && message) {
                alert("Thank you! Your message has been sent successfully. I will get back to you soon.");
                this.reset();
            } else {
                alert("Please fill in all required fields.");
            }
        });
    }

    // Keyboard navigation
    document.addEventListener("keydown", function(e) {
        // Close modals with Escape key
        if (e.key === "Escape") {
            modals.forEach(modal => {
                if (modal.classList.contains("active")) {
                    modal.classList.remove("active");
                    document.body.style.overflow = "auto";
                }
            });
        }
        
        // Carousel navigation with arrow keys (only in project detail modal)
        if (document.getElementById("projectDetailModal").classList.contains("active")) {
            if (e.key === "ArrowLeft") {
                previousImage();
            } else if (e.key === "ArrowRight") {
                nextImage();
            }
        }
    });

    // Add scroll indicator functionality
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
        scrollIndicator.addEventListener("click", () => {
            const testimonialsSection = document.querySelector(".testimonial-section");
            if (testimonialsSection) {
                testimonialsSection.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    }

    // Touch support for mobile carousel
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener("touchstart", function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener("touchend", function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (document.getElementById("projectDetailModal").classList.contains("active")) {
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next image
                    nextImage();
                } else {
                    // Swipe right - previous image
                    previousImage();
                }
            }
        }
    }

    // Add dynamic background effect
    function createFloatingElements() {
        const container = document.body;
        
        for (let i = 0; i < 5; i++) {
            const element = document.createElement("div");
            element.style.cssText = `
                position: fixed;
                width: ${Math.random() * 100 + 50}px;
                height: ${Math.random() * 100 + 50}px;
                background: linear-gradient(45deg, rgba(0, 255, 136, 0.1), rgba(0, 204, 255, 0.1));
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                animation: float ${Math.random() * 10 + 10}s infinite linear;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            container.appendChild(element);
        }
    }

    // Add CSS for floating animation
    const style = document.createElement("style");
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize floating elements
    createFloatingElements();

    // تحسينات الأداء (Lazy Loading + Loader)
    const lazyImages = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: "200px" }); // تحميل الصور قبل ظهورها بــ 200px

    lazyImages.forEach(img => imageObserver.observe(img));

    // مؤشر التحميل
    window.addEventListener("load", function() {
        const loader = document.createElement("div");
        loader.className = "page-loader";
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <div class="loader-logo">✦ Esam</div>
            </div>
        `;
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    });

    // تأثيرات Hover المتقدمة
    document.querySelectorAll(".portfolio-item, .action-btn, .social-link").forEach(el => {
        el.addEventListener("mousemove", function(e) {
            const rect = this.getBoundingClientRect();
            this.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
            this.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        });
    });

});



// ==================================================
// Testimonials Slider Functionality
// ==================================================

// Testimonials slider variables
let currentTestimonialIndex = 0;
let testimonialInterval;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');
const testimonialAutoplayDelay = 5000; // 5 seconds

// Initialize testimonials slider
function initTestimonialsSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.dot');
    
    console.log('Initializing testimonials slider...', testimonialCards.length, 'cards found');
    
    if (testimonialCards.length === 0) {
        console.warn('No testimonial cards found');
        return;
    }
    
    // Reset current index
    currentTestimonialIndex = 0;
    
    // Reset all cards first
    testimonialCards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === 0) {
            card.classList.add('active');
        }
    });
    
    // Reset all dots
    testimonialDots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === 0) {
            dot.classList.add('active');
        }
    });
    
    // Start autoplay
    startTestimonialAutoplay();
    
    // Add click events to dots
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToTestimonial(index);
        });
    });
    
    // Pause autoplay on hover
    const testimonialsSection = document.querySelector('.testimonials-section');
    if (testimonialsSection) {
        testimonialsSection.addEventListener('mouseenter', pauseTestimonialAutoplay);
        testimonialsSection.addEventListener('mouseleave', startTestimonialAutoplay);
    }
    
    console.log('Testimonials slider initialized successfully');
}

// Show specific testimonial
function showTestimonial(index) {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.dot');
    
    // Hide all testimonials
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Remove active class from all dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial
    if (testimonialCards[index]) {
        testimonialCards[index].classList.add('active');
        console.log('Showing testimonial', index);
    }
    
    // Activate current dot
    if (testimonialDots[index]) {
        testimonialDots[index].classList.add('active');
    }
    
    currentTestimonialIndex = index;
}

// Go to specific testimonial
function goToTestimonial(index) {
    pauseTestimonialAutoplay();
    showTestimonial(index);
    startTestimonialAutoplay();
}

// Go to next testimonial
function nextTestimonial() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length === 0) return;
    
    const nextIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
    showTestimonial(nextIndex);
}

// Go to previous testimonial
function previousTestimonial() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length === 0) return;
    
    const prevIndex = (currentTestimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(prevIndex);
}

// Start autoplay
function startTestimonialAutoplay() {
    pauseTestimonialAutoplay(); // Clear any existing interval
    testimonialInterval = setInterval(nextTestimonial, testimonialAutoplayDelay);
}

// Pause autoplay
function pauseTestimonialAutoplay() {
    if (testimonialInterval) {
        clearInterval(testimonialInterval);
        testimonialInterval = null;
    }
}

// Touch support for testimonials
let testimonialTouchStartX = 0;
let testimonialTouchEndX = 0;

document.addEventListener('touchstart', function(e) {
    if (e.target.closest('.testimonials-section')) {
        testimonialTouchStartX = e.changedTouches[0].screenX;
    }
});

document.addEventListener('touchend', function(e) {
    if (e.target.closest('.testimonials-section')) {
        testimonialTouchEndX = e.changedTouches[0].screenX;
        handleTestimonialSwipe();
    }
});

function handleTestimonialSwipe() {
    const swipeThreshold = 50;
    const diff = testimonialTouchStartX - testimonialTouchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        pauseTestimonialAutoplay();
        if (diff > 0) {
            // Swipe left - next testimonial
            nextTestimonial();
        } else {
            // Swipe right - previous testimonial
            previousTestimonial();
        }
        startTestimonialAutoplay();
    }
}

// Keyboard navigation for testimonials
document.addEventListener('keydown', function(e) {
    // Only handle arrow keys when not in a modal
    const activeModal = document.querySelector('.modal.active');
    if (!activeModal) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        if (testimonialCards.length > 0) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goToTestimonial((currentTestimonialIndex - 1 + testimonialCards.length) % testimonialCards.length);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                goToTestimonial((currentTestimonialIndex + 1) % testimonialCards.length);
            }
        }
    }
});

// Initialize testimonials slider when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add a longer delay to ensure all elements are properly loaded
    setTimeout(() => {
        initTestimonialsSlider();
        initRatingStars();
    }, 500);
});

// Pause autoplay when page is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        pauseTestimonialAutoplay();
    } else {
        startTestimonialAutoplay();
    }
});

// Add smooth transition effects
function addTestimonialTransitionEffects() {
    const style = document.createElement('style');
    style.textContent = `
        .testimonial-card {
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .testimonial-card:not(.active) {
            opacity: 0;
            transform: translateX(50px);
        }
        
        .testimonial-card.active {
            opacity: 1;
            transform: translateX(0);
        }
        
        .dot {
            transition: all 0.3s ease;
        }
        
        .dot:hover {
            transform: scale(1.2);
        }
    `;
    document.head.appendChild(style);
}

// Initialize transition effects
addTestimonialTransitionEffects();



// ==================================================
// Rating Stars Functionality
// ==================================================

// Initialize rating stars for all testimonials
function initRatingStars() {
    const ratingContainers = document.querySelectorAll('.testimonial-rating');
    
    ratingContainers.forEach(container => {
        const rating = parseInt(container.getAttribute('data-rating')) || 5;
        generateStars(container, rating);
    });
}

// Generate stars based on rating
function generateStars(container, rating) {
    container.innerHTML = ''; // Clear existing content
    
    // Ensure rating is between 1 and 5
    const validRating = Math.max(1, Math.min(5, rating));
    
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.setAttribute('data-rating', i);
        
        if (i <= validRating) {
            star.classList.add('filled');
        }
        
        // Add click event for interactive rating (optional)
        star.addEventListener('click', function() {
            updateRating(container, i);
        });
        
        // Add hover effects
        star.addEventListener('mouseenter', function() {
            highlightStars(container, i);
        });
        
        container.appendChild(star);
    }
    
    // Reset on mouse leave
    container.addEventListener('mouseleave', function() {
        const currentRating = parseInt(container.getAttribute('data-rating'));
        highlightStars(container, currentRating);
    });
}

// Update rating when star is clicked
function updateRating(container, newRating) {
    container.setAttribute('data-rating', newRating);
    highlightStars(container, newRating);
    
    // Add a subtle animation effect
    container.style.transform = 'scale(1.05)';
    setTimeout(() => {
        container.style.transform = 'scale(1)';
    }, 200);
}

// Highlight stars up to the given rating
function highlightStars(container, rating) {
    const stars = container.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('filled');
        } else {
            star.classList.remove('filled');
        }
    });
}

// Add smooth transition effects for stars
function addStarTransitionEffects() {
    const style = document.createElement('style');
    style.textContent = `
        .testimonial-rating {
            transition: transform 0.2s ease;
        }
        
        .star {
            transition: all 0.3s ease;
        }
        
        .star:hover {
            transform: scale(1.2);
        }
        
        .star.filled:hover {
            filter: brightness(1.2);
        }
    `;
    document.head.appendChild(style);
}

// Initialize stars when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure testimonials are properly loaded
    setTimeout(() => {
        initRatingStars();
        addStarTransitionEffects();
    }, 200);
});

// Re-initialize stars when testimonials change (for slider functionality)
function reinitializeStars() {
    setTimeout(initRatingStars, 100);
}

// Override the existing showTestimonial function to include star initialization
const originalShowTestimonial = window.showTestimonial || showTestimonial;
if (typeof showTestimonial === 'function') {
    window.showTestimonial = function(index) {
        originalShowTestimonial(index);
        reinitializeStars();
    };
}



// ==================================================
// Experience Card Flip Functionality
// ==================================================

// Initialize experience card flip functionality
function initExperienceCardFlip() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    // Add click event listeners to experience cards
    experienceCards.forEach(card => {
        const frontSide = card.querySelector('.experience-card-front');
        const backSide = card.querySelector('.experience-card-back');
        const closeBtn = card.querySelector('.experience-card-back-overlay');
        
        // Click on front side to flip to back
        if (frontSide) {
            frontSide.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                flipCard(card, true);
            });
        }
        
        // Click on close button to flip back to front
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                flipCard(card, false);
            });
        }
        
        // Click anywhere on back side (except close button) to flip back
        if (backSide) {
            backSide.addEventListener('click', function(e) {
                // Only flip if not clicking on the close button
                if (!e.target.closest('.experience-card-back-overlay')) {
                    e.preventDefault();
                    e.stopPropagation();
                    flipCard(card, false);
                }
            });
        }
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isFlipped = card.classList.contains('flipped');
                flipCard(card, !isFlipped);
            } else if (e.key === 'Escape') {
                e.preventDefault();
                flipCard(card, false);
            }
        });
        
        // Make cards focusable for keyboard navigation
        card.setAttribute('tabindex', '0');
    });
}

// Flip card function
function flipCard(card, toBack = true) {
    if (!card) return;
    
    // Prevent multiple rapid clicks
    if (card.classList.contains('flipping')) return;
    
    // Add flipping class to prevent interactions during animation
    card.classList.add('flipping');
    
    if (toBack) {
        // Flip to back side
        card.classList.add('flipped');
        
        // Update icon from + to ×
        const frontIcon = card.querySelector('.experience-card-icon');
        if (frontIcon) {
            frontIcon.textContent = '×';
        }
        
        // Focus on the back side for accessibility
        setTimeout(() => {
            const backSide = card.querySelector('.experience-card-back');
            if (backSide) {
                backSide.focus();
            }
        }, 300);
        
    } else {
        // Flip to front side
        card.classList.remove('flipped');
        
        // Update icon from × to +
        const frontIcon = card.querySelector('.experience-card-icon');
        if (frontIcon) {
            frontIcon.textContent = '+';
        }
        
        // Focus on the front side for accessibility
        setTimeout(() => {
            const frontSide = card.querySelector('.experience-card-front');
            if (frontSide) {
                card.focus();
            }
        }, 300);
    }
    
    // Remove flipping class after animation completes
    setTimeout(() => {
        card.classList.remove('flipping');
    }, 600);
    
    // Add subtle haptic feedback for mobile devices
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
}

// Close all flipped cards when clicking outside
document.addEventListener('click', function(e) {
    const clickedCard = e.target.closest('.experience-card');
    const allCards = document.querySelectorAll('.experience-card');
    
    allCards.forEach(card => {
        // If clicking outside any card, or clicking on a different card
        if (!clickedCard || (clickedCard !== card)) {
            if (card.classList.contains('flipped')) {
                flipCard(card, false);
            }
        }
    });
});

// Keyboard navigation for experience cards
document.addEventListener('keydown', function(e) {
    const focusedCard = document.activeElement.closest('.experience-card');
    
    if (focusedCard) {
        const allCards = Array.from(document.querySelectorAll('.experience-card'));
        const currentIndex = allCards.indexOf(focusedCard);
        
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % allCards.length;
                allCards[nextIndex].focus();
                break;
                
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + allCards.length) % allCards.length;
                allCards[prevIndex].focus();
                break;
                
            case 'Escape':
                e.preventDefault();
                // Close all flipped cards
                allCards.forEach(card => {
                    if (card.classList.contains('flipped')) {
                        flipCard(card, false);
                    }
                });
                break;
        }
    }
});

// Touch support for mobile devices
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    const card = e.target.closest('.experience-card');
    if (card) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }
});

document.addEventListener('touchend', function(e) {
    const card = e.target.closest('.experience-card');
    if (card) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        
        const diffX = Math.abs(touchStartX - touchEndX);
        const diffY = Math.abs(touchStartY - touchEndY);
        
        // If it's a tap (not a swipe), handle the flip
        if (diffX < 10 && diffY < 10) {
            const isFlipped = card.classList.contains('flipped');
            const isCloseBtn = e.target.closest('.experience-card-back-overlay');
            
            if (isCloseBtn || (isFlipped && !isCloseBtn)) {
                flipCard(card, false);
            } else if (!isFlipped) {
                flipCard(card, true);
            }
        }
    }
});

// Initialize experience card flip when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure all elements are properly loaded
    setTimeout(initExperienceCardFlip, 200);
});

// Intersection Observer for smooth animations when cards come into view
function initExperienceCardAnimations() {
    const cards = document.querySelectorAll('.experience-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    cards.forEach(card => {
        // Set initial state for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(card);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initExperienceCardAnimations, 300);
});

// Performance optimization: Pause animations when page is not visible
document.addEventListener('visibilitychange', function() {
    const cards = document.querySelectorAll('.experience-card');
    
    cards.forEach(card => {
        if (document.hidden) {
            card.style.animationPlayState = 'paused';
        } else {
            card.style.animationPlayState = 'running';
        }
    });
});

// Add smooth scroll to experience section when navigating
function scrollToExperienceSection() {
    const experienceSection = document.querySelector('.experience-subsection');
    if (experienceSection) {
        experienceSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Export functions for potential external use
window.flipCard = flipCard;
window.scrollToExperienceSection = scrollToExperienceSection;

