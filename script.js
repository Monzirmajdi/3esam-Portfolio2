document.addEventListener("DOMContentLoaded", function() {
// ===== Dynamic Logo Cloning =====
function cloneLogoItems() {
    const rows = document.querySelectorAll('.logos-row');
    
    rows.forEach(row => {
        // احذف النسخ القديمة أولاً لتجنب التكرار
        const existingClones = row.querySelectorAll('.logo-item[data-cloned="true"]');
        existingClones.forEach(clone => clone.remove());
        
        // احسب العرض الكلي للعناصر الأصلية + المسافات
        const logoItems = row.querySelectorAll('.logo-item:not([data-cloned="true"])');
        const totalWidth = Array.from(logoItems).reduce((total, item) => {
            return total + item.offsetWidth + 30; // 30px = المسافة بين العناصر (gap)
        }, 0);
        
        // استنسخ فقط إذا كان العرض أقل من عرض الشاشة
        if (totalWidth < window.innerWidth) {
            const clones = [];
            logoItems.forEach(item => {
                const clone = item.cloneNode(true);
                clone.setAttribute('data-cloned', 'true'); // وضع علامة على النسخ
                clones.push(clone);
            });
            
            // أضف النسخ إلى الصف
            clones.forEach(clone => {
                row.appendChild(clone);
            });
        }
    });
}

// تهيئة عند تحميل الصفحة وتغيير الحجم
cloneLogoItems();
window.addEventListener('resize', cloneLogoItems);
    // Get elements
    const navLinks = document.querySelectorAll(".nav-link");
    const actionBtns = document.querySelectorAll(".action-btn");
    const modals = document.querySelectorAll(".modal");
    const closeBtns = document.querySelectorAll(".close-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    const projectCategories = document.querySelectorAll(".project-category");
    
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

    // Handle project category clicks
    projectCategories.forEach(category => {
        category.addEventListener("click", function() {
            const categoryType = this.getAttribute("data-category");
            let modalId = "";
            
            switch(categoryType) {
                case "branding":
                    modalId = "brandingModal";
                    break;
                case "social-media":
                    modalId = "socialMediaModal";
                    break;
                case "illustrations":
                    modalId = "illustrationsModal";
                    break;
            }
            
            if (modalId) {
                openModal(modalId.replace("Modal", ""));
            }
        });
    });

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
            else if (section === "contact") {
                openModal(section);
            }
            // Handle projects section
            else if (section === "projects") {
                const projectsSection = document.querySelector(".projects-section");
                if (projectsSection) {
                    projectsSection.scrollIntoView({ 
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
            // Handle portfolio section (if it still exists, otherwise remove)
            else if (section === "portfolio") {
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
            // Close any currently active modals before opening a new one
            modals.forEach(m => {
                if (m.classList.contains("active")) {
                    m.classList.remove("active");
                }
            });
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

    // Initialize experience card flip functionality after DOM is fully loaded
    setTimeout(() => {
        initExperienceCardFlip();
    }, 100);

});








// Project Data (replace with your actual project details)
const projectData = {
    branding: [
        {
            id: 'branding-1',
            title: 'Brand Identity for Tech Startup',
            client: 'Innovate Inc.',
            duration: '2 months',
            role: 'Lead Designer',
            tools: 'Illustrator, Photoshop',
            description: 'Developed a complete brand identity, including logo, color palette, and typography.',
            images: ['images/branding1.jpg', 'images/branding2.jpg', 'images/branding3.jpg']
        },
        {
            id: 'branding-2',
            title: 'Rebranding for a Coffee Shop',
            client: 'The Daily Grind',
            duration: '1 month',
            role: 'Graphic Designer',
            tools: 'Illustrator, InDesign',
            description: 'A fresh new look for a local coffee shop, including a new logo and menu design.',
            images: ['images/coffee1.jpg', 'images/coffee2.jpg']
        }
    ],
    social_media: [
        {
            id: 'social-1',
            title: 'Social Media Campaign for a Fashion Brand',
            client: 'Chic Boutique',
            duration: '3 weeks',
            role: 'Content Creator',
            tools: 'Photoshop, Canva',
            description: 'Designed a series of engaging posts for Instagram and Facebook.',
            images: ['images/social1.jpg', 'images/social2.jpg', 'images/social3.jpg']
        }
    ],
    illustrations: [
        {
            id: 'illustration-1',
            title: 'Character Design for a Children\'s Book',
            client: 'Little Readers Publishing',
            duration: '1.5 months',
            role: 'Illustrator',
            tools: 'Procreate, Photoshop',
            description: 'Created a set of lovable characters for an upcoming children\'s book.',
            images: ['images/char1.jpg', 'images/char2.jpg']
        }
    ]
};

// Handle Category Card Clicks
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        openProjectListModal(category);
    });
});

function openProjectListModal(category) {
    const modalId = category + 'Modal';
    const modal = document.getElementById(modalId);
    const projectListContainer = document.getElementById(category + 'ProjectList');

    if (modal && projectListContainer) {
        // Clear previous projects
        projectListContainer.innerHTML = '';

        // Populate with new projects
        const projects = projectData[category];
        if (projects) {
            projects.forEach(project => {
                const projectItem = document.createElement('div');
                projectItem.className = 'project-item';
                projectItem.setAttribute('data-project-id', project.id);
                projectItem.setAttribute('data-category', category);
                projectItem.innerHTML = `
                    <img src="${project.images[0]}" alt="${project.title}">
                    <h4>${project.title}</h4>
                `;
                projectListContainer.appendChild(projectItem);

                // Add click listener to the new project item
                projectItem.addEventListener('click', function() {
                    const projectId = this.getAttribute('data-project-id');
                    const projectCategory = this.getAttribute('data-category');
                    openProjectDetailModal(projectCategory, projectId);
                });
            });
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function openProjectDetailModal(category, projectId) {
    const project = projectData[category].find(p => p.id === projectId);
    const projectDetailModal = document.getElementById('projectDetailModal');
    const projectDetailContainer = document.getElementById('projectDetail');

    if (project && projectDetailModal && projectDetailContainer) {
        currentProjectImages = project.images;
        currentImageIndex = 0;

        projectDetailContainer.innerHTML = `
            <h2>${project.title}</h2>
            <div class="project-meta">
                <div class="project-meta-item"><h4>Client</h4><p>${project.client}</p></div>
                <div class="project-meta-item"><h4>Duration</h4><p>${project.duration}</p></div>
                <div class="project-meta-item"><h4>Role</h4><p>${project.role}</p></div>
                <div class="project-meta-item"><h4>Tools</h4><p>${project.tools}</p></div>
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
                    `<span class="carousel-dot ${index === 0 ? 'active' : ''}" onclick="goToImage(${index})" style="width: 12px; height: 12px; border-radius: 50%; background: ${index === 0 ? '#FFD700' : 'rgba(255, 215, 0, 0.3)'}; cursor: pointer; transition: all 0.3s ease;"></span>`
                ).join('')}
            </div>
            <div class="project-gallery" style="margin-top: 40px;">
                <h3 style="color: #FFD700; margin-bottom: 20px; grid-column: 1 / -1;">Project Gallery</h3>
                ${project.images.map(img => `<img src="${img}" alt="${project.title}" style="cursor: pointer;" onclick="openImageInCarousel('${img}')">`).join('')}
            </div>
        `;

        // Close the list modal
        const listModal = document.getElementById(category + 'Modal');
        if(listModal) listModal.classList.remove('active');

        // Open the detail modal
        projectDetailModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close Modals
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});




    // Experience Cards Flip Functionality
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle the flipped class
            this.classList.toggle('flipped');
        });
        
        // Optional: Add keyboard support for accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('flipped');
            }
        });
        
        // Make cards focusable for keyboard navigation
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Click to flip card and view details');
    });

    // Optional: Close card when clicking outside (if you want this behavior)
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.experience-card')) {
            experienceCards.forEach(card => {
                card.classList.remove('flipped');
            });
        }
    });
