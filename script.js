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
                        `<span class="carousel-dot ${index === 0 ? "active" : ""}" onclick="goToImage(${index})" style="width: 12px; height: 12px; border-radius: 50%; background: ${index === 0 ? "#00ff88" : "rgba(255, 255, 255, 0.3)"}; cursor: pointer; transition: all 0.3s ease;"></span>`
                    ).join("")}
                </div>
                
                <div class="project-gallery" style="margin-top: 40px;">
                    <h3 style="color: #00ff88; margin-bottom: 20px; grid-column: 1 / -1;">Project Gallery</h3>
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
                dot.style.background = index === currentImageIndex ? "#00ff88" : "rgba(255, 255, 255, 0.3)";
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
    if (testimonialCards.length === 0) return;
    
    // Show first testimonial
    showTestimonial(0);
    
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
}

// Show specific testimonial
function showTestimonial(index) {
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
    const nextIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
    showTestimonial(nextIndex);
}

// Go to previous testimonial
function previousTestimonial() {
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
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goToTestimonial((currentTestimonialIndex - 1 + testimonialCards.length) % testimonialCards.length);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            goToTestimonial((currentTestimonialIndex + 1) % testimonialCards.length);
        }
    }
});

// Initialize testimonials slider when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure all elements are properly loaded
    setTimeout(initTestimonialsSlider, 100);
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
// Experience Grid Functionality
// ==================================================

// Experience data for the new grid layout
const experienceData = {
    0: {
        company: "Tech Innovations Inc.",
        period: "2023 - Present",
        title: "Senior UI/UX Designer",
        location: "San Francisco, CA",
        type: "Full-time",
        description: "Leading design initiatives for enterprise-level applications, creating comprehensive design systems, and mentoring junior designers. Responsible for user research, prototyping, and ensuring design consistency across products. Successfully redesigned the main product interface resulting in 40% increase in user engagement.",
        responsibilities: [
            "Lead design initiatives for enterprise applications",
            "Create and maintain comprehensive design systems",
            "Mentor junior designers and conduct design reviews",
            "Conduct user research and usability testing",
            "Collaborate with development teams for implementation",
            "Ensure design consistency across all products"
        ],
        achievements: [
            "Redesigned main product interface with 40% increase in user engagement",
            "Established design system used across 15+ products",
            "Led team of 5 designers on major product launches",
            "Reduced design-to-development time by 30%"
        ],
        tags: ["UI/UX", "Branding", "Design Systems", "User Research", "Prototyping", "Team Leadership"]
    },
    1: {
        company: "Creative Studio Pro",
        period: "2022 - 2023",
        title: "Art Director",
        location: "New York, NY",
        type: "Full-time",
        description: "Directed creative campaigns for major brands, developed visual identities, and managed creative teams. Successfully launched 15+ brand campaigns with measurable impact on client engagement and sales. Specialized in creating cohesive brand experiences across digital and print media.",
        responsibilities: [
            "Direct creative campaigns for major brands",
            "Develop comprehensive visual identities",
            "Manage and mentor creative teams",
            "Oversee brand strategy and implementation",
            "Collaborate with clients on creative direction",
            "Ensure brand consistency across all touchpoints"
        ],
        achievements: [
            "Launched 15+ successful brand campaigns",
            "Increased client engagement by average of 60%",
            "Won 3 industry awards for creative excellence",
            "Managed creative team of 8 professionals"
        ],
        tags: ["Art Direction", "Visual Identity", "Brand Strategy", "Creative Leadership", "Campaign Management"]
    },
    2: {
        company: "Digital Solutions Agency",
        period: "2020 - 2022",
        title: "UI/UX Designer",
        location: "Los Angeles, CA",
        type: "Full-time",
        description: "Designed user interfaces for web and mobile applications, conducted user research and usability testing. Collaborated with development teams to ensure pixel-perfect implementation of designs. Worked on diverse projects ranging from e-commerce platforms to mobile apps.",
        responsibilities: [
            "Design user interfaces for web and mobile applications",
            "Conduct user research and usability testing",
            "Create wireframes, prototypes, and design specifications",
            "Collaborate with developers for accurate implementation",
            "Participate in client presentations and feedback sessions",
            "Maintain design documentation and style guides"
        ],
        achievements: [
            "Designed 20+ web and mobile applications",
            "Improved user satisfaction scores by 45% on average",
            "Reduced development time through detailed specifications",
            "Successfully delivered projects for 30+ clients"
        ],
        tags: ["Web Design", "Mobile Apps", "User Research", "Prototyping", "Usability Testing"]
    }
};

// Initialize experience grid functionality
function initExperienceGrid() {
    const experienceCards = document.querySelectorAll('.experience-card');
    const experienceModal = document.getElementById('experienceModal');
    
    // Add click event listeners to experience cards
    experienceCards.forEach(card => {
        card.addEventListener('click', function() {
            const experienceId = this.getAttribute('data-experience');
            showExperienceDetail(experienceId);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Handle modal close for experience modal
    const experienceCloseBtn = experienceModal?.querySelector('.close-btn');
    if (experienceCloseBtn) {
        experienceCloseBtn.addEventListener('click', function() {
            closeExperienceModal();
        });
    }
    
    // Close modal when clicking outside
    if (experienceModal) {
        experienceModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeExperienceModal();
            }
        });
    }
}

// Show experience detail in modal
function showExperienceDetail(experienceId) {
    const experience = experienceData[experienceId];
    const experienceModal = document.getElementById('experienceModal');
    const experienceDetail = document.getElementById('experienceDetail');
    
    if (experience && experienceDetail) {
        experienceDetail.innerHTML = `
            <h2>${experience.title}</h2>
            
            <div class="experience-detail-header">
                <div class="experience-detail-item">
                    <h4>Company</h4>
                    <p>${experience.company}</p>
                </div>
                <div class="experience-detail-item">
                    <h4>Period</h4>
                    <p>${experience.period}</p>
                </div>
                <div class="experience-detail-item">
                    <h4>Location</h4>
                    <p>${experience.location}</p>
                </div>
                <div class="experience-detail-item">
                    <h4>Type</h4>
                    <p>${experience.type}</p>
                </div>
            </div>
            
            <div class="experience-detail-description">
                ${experience.description}
            </div>
            
            <div style="margin: 30px 0;">
                <h3 style="color: #FFD700; margin-bottom: 15px; font-size: 1.3rem;">Key Responsibilities</h3>
                <ul style="color: #ccc; line-height: 1.8; padding-left: 20px;">
                    ${experience.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                </ul>
            </div>
            
            <div style="margin: 30px 0;">
                <h3 style="color: #FFD700; margin-bottom: 15px; font-size: 1.3rem;">Key Achievements</h3>
                <ul style="color: #ccc; line-height: 1.8; padding-left: 20px;">
                    ${experience.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
            
            <div class="experience-detail-tags">
                ${experience.tags.map(tag => `<span class="experience-detail-tag">${tag}</span>`).join('')}
            </div>
        `;
        
        // Show modal
        experienceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add animation effect
        setTimeout(() => {
            experienceDetail.style.opacity = '1';
            experienceDetail.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Close experience modal
function closeExperienceModal() {
    const experienceModal = document.getElementById('experienceModal');
    const experienceDetail = document.getElementById('experienceDetail');
    
    if (experienceModal) {
        // Add exit animation
        if (experienceDetail) {
            experienceDetail.style.opacity = '0';
            experienceDetail.style.transform = 'translateY(20px)';
        }
        
        setTimeout(() => {
            experienceModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }, 200);
    }
}

// Add keyboard support for experience modal
document.addEventListener('keydown', function(e) {
    const experienceModal = document.getElementById('experienceModal');
    
    if (e.key === 'Escape' && experienceModal?.classList.contains('active')) {
        closeExperienceModal();
    }
});

// Touch support for experience cards
let experienceCardTouchStartY = 0;
let experienceCardTouchEndY = 0;

document.addEventListener('touchstart', function(e) {
    if (e.target.closest('.experience-card')) {
        experienceCardTouchStartY = e.changedTouches[0].screenY;
    }
});

document.addEventListener('touchend', function(e) {
    if (e.target.closest('.experience-card')) {
        experienceCardTouchEndY = e.changedTouches[0].screenY;
        const diff = Math.abs(experienceCardTouchStartY - experienceCardTouchEndY);
        
        // If it's a tap (not a scroll), trigger click
        if (diff < 10) {
            const card = e.target.closest('.experience-card');
            if (card) {
                const experienceId = card.getAttribute('data-experience');
                showExperienceDetail(experienceId);
            }
        }
    }
});

// Initialize experience grid when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure all elements are properly loaded
    setTimeout(initExperienceGrid, 150);
});

// Add smooth transition effects for experience detail modal
function addExperienceTransitionEffects() {
    const style = document.createElement('style');
    style.textContent = `
        .experience-detail {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }
        
        .experience-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .experience-card:active {
            transform: translateY(-5px) scale(0.98);
        }
        
        @media (max-width: 768px) {
            .experience-card:hover {
                transform: none;
            }
            
            .experience-card:active {
                transform: scale(0.98);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize transition effects
addExperienceTransitionEffects();

// Update navigation to handle experience section
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('data-section') === 'about') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
                
                // Scroll to experience section
                const experienceSection = document.querySelector('.experience-section');
                if (experienceSection) {
                    experienceSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
});

