// تحسينات الأداء والتفاعلية المتقدمة
document.addEventListener("DOMContentLoaded", function() {
    // متغيرات عامة
    const menuToggle = document.getElementById("menuToggle");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");
    const sideMenuCloseBtn = document.getElementById("sideMenuCloseBtn");
    const navItems = document.querySelectorAll(".nav-item");
    const actionBtns = document.querySelectorAll(".action-btn");
    const modals = document.querySelectorAll(".modal");
    const closeBtns = document.querySelectorAll(".close-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    
    let currentProjectImages = [];
    let currentImageIndex = 0;
    let isAnimating = false;

    // بيانات المشاريع مع الصور
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

    // تهيئة التأثيرات المتقدمة
    initAdvancedEffects();
    initScrollAnimations();
    initParallaxEffects();
    initMouseFollowEffects();
    initRippleEffects();
    initPageLoader();

    // وظائف القائمة الجانبية
    if (menuToggle) {
        menuToggle.addEventListener("click", function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener("click", function() {
            closeMenu();
        });
    }

    if (sideMenuCloseBtn) {
        sideMenuCloseBtn.addEventListener("click", function() {
            closeMenu();
        });
    }

    function toggleMenu() {
        if (isAnimating) return;
        isAnimating = true;
        
        sideMenu.classList.toggle("active");
        menuOverlay.classList.toggle("active");
        document.body.style.overflow = sideMenu.classList.contains("active") ? "hidden" : "auto";
        
        // إضافة تأثير صوتي بصري
        if (sideMenu.classList.contains("active")) {
            animateMenuItems();
        }
        
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    function closeMenu() {
        if (isAnimating) return;
        isAnimating = true;
        
        sideMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
        
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    function animateMenuItems() {
        const menuItems = document.querySelectorAll(".nav-item");
        menuItems.forEach((item, index) => {
            item.style.opacity = "0";
            item.style.transform = "translateX(50px)";
            
            setTimeout(() => {
                item.style.transition = "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
                item.style.opacity = "1";
                item.style.transform = "translateX(0)";
            }, index * 100);
        });
    }

    // معالجة النقر على عناصر التنقل
    navItems.forEach(item => {
        item.addEventListener("click", function(e) {
            e.preventDefault();
            const section = this.getAttribute("data-section");
            
            closeMenu();
            
            if (section === "experience") {
                setTimeout(() => {
                    const experienceSection = document.querySelector(".experience-section");
                    if (experienceSection) {
                        smoothScrollTo(experienceSection);
                    }
                }, 300);
            } else if (section === "portfolio" || section === "contact") {
                setTimeout(() => {
                    openModal(section);
                }, 300);
            }
        });
    });

    // معالجة أزرار الإجراءات
    actionBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const section = this.getAttribute("data-section");
            openModal(section);
        });
    });

    function openModal(section) {
        const modal = document.getElementById(section + "Modal");
        if (modal) {
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
            
            // تأثير فتح المودال
            const modalContent = modal.querySelector(".modal-content");
            if (modalContent) {
                modalContent.style.transform = "scale(0.8) translateY(50px)";
                modalContent.style.opacity = "0";
                
                setTimeout(() => {
                    modalContent.style.transition = "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
                    modalContent.style.transform = "scale(1) translateY(0)";
                    modalContent.style.opacity = "1";
                }, 50);
            }
        }
    }

    // معالجة أزرار الإغلاق
    closeBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const modalId = this.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            
            if (modal) {
                closeModal(modal);
            }
        });
    });

    function closeModal(modal) {
        const modalContent = modal.querySelector(".modal-content");
        if (modalContent) {
            modalContent.style.transition = "all 0.4s ease-out";
            modalContent.style.transform = "scale(0.9) translateY(30px)";
            modalContent.style.opacity = "0";
            
            setTimeout(() => {
                modal.classList.remove("active");
                document.body.style.overflow = "auto";
            }, 400);
        }
    }

    // إغلاق المودال عند النقر خارج المحتوى
    modals.forEach(modal => {
        modal.addEventListener("click", function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // معالجة عناصر المحفظة
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
                        `<span class="carousel-dot ${index === 0 ? "active" : ""}" onclick="goToImage(${index})" style="width: 12px; height: 12px; border-radius: 50%; background: ${index === 0 ? "#FFD700" : "rgba(255, 255, 255, 0.3)"}; cursor: pointer; transition: all 0.3s ease;"></span>`
                    ).join("")}
                </div>
                
                <div class="project-gallery" style="margin-top: 40px;">
                    <h3 style="color: #FFD700; margin-bottom: 20px; grid-column: 1 / -1;">Project Gallery</h3>
                    ${project.images.map(img => `<img src="${img}" alt="${project.title}" style="cursor: pointer;" onclick="openImageInCarousel('${img}')">`).join("")}
                </div>
            `;
            
            closeModal(document.getElementById("portfolioModal"));
            
            setTimeout(() => {
                openModal("projectDetail");
            }, 300);
        }
    }

    // وظائف الكاروسيل
    window.previousImage = function() {
        if (isAnimating) return;
        currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
        updateCarouselImage();
    };

    window.nextImage = function() {
        if (isAnimating) return;
        currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
        updateCarouselImage();
    };

    window.goToImage = function(index) {
        if (isAnimating) return;
        currentImageIndex = index;
        updateCarouselImage();
    };

    window.openImageInCarousel = function(imageSrc) {
        const imageIndex = currentProjectImages.indexOf(imageSrc);
        if (imageIndex !== -1) {
            currentImageIndex = imageIndex;
            updateCarouselImage();
            smoothScrollTo(document.querySelector(".project-carousel"));
        }
    };

    function updateCarouselImage() {
        const carouselImage = document.getElementById("carouselImage");
        const carouselDots = document.querySelectorAll(".carousel-dot");
        
        if (carouselImage && currentProjectImages[currentImageIndex]) {
            isAnimating = true;
            
            // تأثير الانتقال
            carouselImage.style.opacity = "0";
            carouselImage.style.transform = "scale(0.95)";
            
            setTimeout(() => {
                carouselImage.src = currentProjectImages[currentImageIndex];
                carouselImage.style.opacity = "1";
                carouselImage.style.transform = "scale(1)";
                
                // تحديث النقاط
                carouselDots.forEach((dot, index) => {
                    dot.style.background = index === currentImageIndex ? "#FFD700" : "rgba(255, 255, 255, 0.3)";
                    dot.classList.toggle("active", index === currentImageIndex);
                });
                
                isAnimating = false;
            }, 300);
        }
    }

    // معالجة نموذج الاتصال
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const email = this.querySelector("input[type=\"text\"]").value;
            const phone = this.querySelector("input[type=\"tel\"]").value;
            const interest = this.querySelector("select").value;
            const budget = this.querySelectorAll("select")[1].value;
            const message = this.querySelector("textarea").value;
            
            if (email && phone && interest && budget && message) {
                showSuccessMessage("Thank you! Your message has been sent successfully. I will get back to you soon.");
                this.reset();
            } else {
                showErrorMessage("Please fill in all required fields.");
            }
        });
    }

    function showSuccessMessage(message) {
        showNotification(message, "success");
    }

    function showErrorMessage(message) {
        showNotification(message, "error");
    }

    function showNotification(message, type) {
        const notification = document.createElement("div");
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            background: ${type === "success" ? "linear-gradient(45deg, #00ff88, #00cc6a)" : "linear-gradient(45deg, #ff4757, #ff3742)"};
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = "translateX(0)";
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = "translateX(100%)";
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }

    // التنقل بلوحة المفاتيح
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            modals.forEach(modal => {
                if (modal.classList.contains("active")) {
                    closeModal(modal);
                }
            });
            closeMenu();
        }
        
        if (document.getElementById("projectDetailModal").classList.contains("active")) {
            if (e.key === "ArrowLeft") {
                previousImage();
            } else if (e.key === "ArrowRight") {
                nextImage();
            }
        }
    });

    // دعم اللمس للأجهزة المحمولة
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
                    nextImage();
                } else {
                    previousImage();
                }
            }
        }
    }

    // تأثيرات متقدمة
    function initAdvancedEffects() {
        // تأثير الجسيمات المتحركة
        createFloatingParticles();
        
        // تأثيرات الإضاءة
        initGlowEffects();
        
        // تأثيرات الانتقال
        initTransitionEffects();
    }

    function createFloatingParticles() {
        const particleContainer = document.createElement("div");
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        document.body.appendChild(particleContainer);

        for (let i = 0; i < 15; i++) {
            const particle = document.createElement("div");
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: radial-gradient(circle, #FFD700, transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 20 + 20}s infinite linear;
                opacity: ${Math.random() * 0.5 + 0.3};
            `;
            particleContainer.appendChild(particle);
        }

        // إضافة CSS للحركة
        const style = document.createElement("style");
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function initGlowEffects() {
        const glowElements = document.querySelectorAll(".logo-icon, .timeline-dot, .star.filled");
        glowElements.forEach(element => {
            element.addEventListener("mouseenter", function() {
                this.style.boxShadow = "0 0 30px #FFD700, 0 0 60px #FFD700";
            });
            
            element.addEventListener("mouseleave", function() {
                this.style.boxShadow = "";
            });
        });
    }

    function initTransitionEffects() {
        const transitionElements = document.querySelectorAll(".portfolio-item, .experience-content, .testimonial-card");
        transitionElements.forEach(element => {
            element.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        });
    }

    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    
                    // تأثيرات خاصة للعناصر المختلفة
                    if (entry.target.classList.contains("experience-item")) {
                        animateExperienceItem(entry.target);
                    }
                    
                    if (entry.target.classList.contains("portfolio-item")) {
                        animatePortfolioItem(entry.target);
                    }
                }
            });
        }, observerOptions);

        // مراقبة العناصر
        const animatedElements = document.querySelectorAll(".experience-item, .portfolio-item, .testimonial-card");
        animatedElements.forEach(el => {
            el.classList.add("fade-in-up");
            observer.observe(el);
        });
    }

    function animateExperienceItem(item) {
        const timeline = item.querySelector(".timeline-dot");
        const content = item.querySelector(".experience-content");
        
        if (timeline) {
            setTimeout(() => {
                timeline.style.transform = "scale(1.2)";
                timeline.style.boxShadow = "0 0 25px #FFD700";
                
                setTimeout(() => {
                    timeline.style.transform = "scale(1)";
                }, 300);
            }, 200);
        }
        
        if (content) {
            content.style.transform = "translateX(-20px)";
            setTimeout(() => {
                content.style.transform = "translateX(0)";
            }, 300);
        }
    }

    function animatePortfolioItem(item) {
        item.style.transform = "translateY(20px) scale(0.95)";
        setTimeout(() => {
            item.style.transform = "translateY(0) scale(1)";
        }, 200);
    }

    function initParallaxEffects() {
        let ticking = false;

        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll(".hero-section, .horizontal-image");
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        window.addEventListener("scroll", requestTick);
    }

    function initMouseFollowEffects() {
        const cursor = document.createElement("div");
        cursor.className = "custom-cursor";
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #FFD700, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);

        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX - 10 + "px";
            cursor.style.top = e.clientY - 10 + "px";
            cursor.style.opacity = "0.6";
        });

        document.addEventListener("mouseenter", () => {
            cursor.style.opacity = "0.6";
        });

        document.addEventListener("mouseleave", () => {
            cursor.style.opacity = "0";
        });

        // تأثيرات خاصة للعناصر التفاعلية
        const interactiveElements = document.querySelectorAll("button, a, .portfolio-item");
        interactiveElements.forEach(element => {
            element.addEventListener("mouseenter", () => {
                cursor.style.transform = "scale(2)";
                cursor.style.background = "radial-gradient(circle, #FFD700, rgba(255, 215, 0, 0.3))";
            });
            
            element.addEventListener("mouseleave", () => {
                cursor.style.transform = "scale(1)";
                cursor.style.background = "radial-gradient(circle, #FFD700, transparent)";
            });
        });
    }

    function initRippleEffects() {
        const rippleElements = document.querySelectorAll("button, .action-btn, .nav-item");
        
        rippleElements.forEach(element => {
            element.addEventListener("click", function(e) {
                const ripple = document.createElement("span");
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(255, 215, 0, 0.6), transparent);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = "relative";
                this.style.overflow = "hidden";
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // إضافة CSS للتأثير
        const style = document.createElement("style");
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function initPageLoader() {
        const loader = document.createElement("div");
        loader.className = "page-loader";
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <div class="loader-logo">✦ Esam</div>
                <div class="loader-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #000, #111);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.8s ease;
        `;
        
        document.body.appendChild(loader);
        
        // محاكاة التحميل
        let progress = 0;
        const progressBar = loader.querySelector(".progress-bar");
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            if (progressBar) {
                progressBar.style.width = progress + "%";
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.style.opacity = "0";
                    setTimeout(() => {
                        loader.remove();
                        // تشغيل الحركات الأولية
                        initInitialAnimations();
                    }, 800);
                }, 500);
            }
        }, 100);
        
        // إضافة أنماط التحميل
        const loaderStyle = document.createElement("style");
        loaderStyle.textContent = `
            .loader-content {
                text-align: center;
                color: white;
            }
            
            .loader-spinner {
                width: 60px;
                height: 60px;
                border: 3px solid rgba(255, 255, 255, 0.1);
                border-top-color: #FFD700;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 30px;
            }
            
            .loader-logo {
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 30px;
                background: linear-gradient(45deg, #FFD700, #DAA520);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .loader-progress {
                width: 200px;
                height: 4px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
                overflow: hidden;
                margin: 0 auto;
            }
            
            .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #FFD700, #DAA520);
                width: 0%;
                transition: width 0.3s ease;
                border-radius: 2px;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(loaderStyle);
    }

    function initInitialAnimations() {
        // تحريك العناصر الأولية
        const heroElements = document.querySelectorAll(".hero-text, .horizontal-image, .hero-footer-actions");
        heroElements.forEach((element, index) => {
            element.style.opacity = "0";
            element.style.transform = "translateY(30px)";
            
            setTimeout(() => {
                element.style.transition = "all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }, index * 200);
        });
    }

    function smoothScrollTo(element) {
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }

    // تحسينات الأداء
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
    }, { rootMargin: "200px" });

    lazyImages.forEach(img => imageObserver.observe(img));

    // إيقاف الحركات عند عدم رؤية الصفحة
    document.addEventListener("visibilitychange", function() {
        const animations = document.querySelectorAll("*");
        animations.forEach(element => {
            if (document.hidden) {
                element.style.animationPlayState = "paused";
            } else {
                element.style.animationPlayState = "running";
            }
        });
    });
});

// ==================================================
// Testimonials Slider مع تحسينات متقدمة
// ==================================================

let currentTestimonialIndex = 0;
let testimonialInterval;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');
const testimonialAutoplayDelay = 6000;

function initTestimonialsSlider() {
    if (testimonialCards.length === 0) return;
    
    showTestimonial(0);
    startTestimonialAutoplay();
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToTestimonial(index);
        });
    });
    
    const testimonialsSection = document.querySelector('.testimonials-section');
    if (testimonialsSection) {
        testimonialsSection.addEventListener('mouseenter', pauseTestimonialAutoplay);
        testimonialsSection.addEventListener('mouseleave', startTestimonialAutoplay);
    }
}

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        card.style.transform = i < index ? 'translateX(-100%)' : i > index ? 'translateX(100%)' : 'translateX(0)';
        card.style.opacity = i === index ? '1' : '0';
    });
    
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    if (testimonialCards[index]) {
        testimonialCards[index].classList.add('active');
        
        // تأثير ظهور متقدم
        setTimeout(() => {
            const elements = testimonialCards[index].querySelectorAll('.author-image, .author-name, .testimonial-quote, .star');
            elements.forEach((el, i) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    el.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, i * 100);
            });
        }, 200);
    }
    
    currentTestimonialIndex = index;
}

function goToTestimonial(index) {
    pauseTestimonialAutoplay();
    showTestimonial(index);
    startTestimonialAutoplay();
}

function nextTestimonial() {
    const nextIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
    showTestimonial(nextIndex);
}

function previousTestimonial() {
    const prevIndex = (currentTestimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(prevIndex);
}

function startTestimonialAutoplay() {
    pauseTestimonialAutoplay();
    testimonialInterval = setInterval(nextTestimonial, testimonialAutoplayDelay);
}

function pauseTestimonialAutoplay() {
    if (testimonialInterval) {
        clearInterval(testimonialInterval);
        testimonialInterval = null;
    }
}

// دعم اللمس للشهادات
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
            nextTestimonial();
        } else {
            previousTestimonial();
        }
        startTestimonialAutoplay();
    }
}

// تهيئة الشهادات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initTestimonialsSlider, 200);
    setTimeout(initRatingStars, 300);
});

// ==================================================
// Rating Stars مع تحسينات متقدمة
// ==================================================

function initRatingStars() {
    const ratingContainers = document.querySelectorAll('.testimonial-rating');
    
    ratingContainers.forEach(container => {
        const rating = parseInt(container.getAttribute('data-rating')) || 5;
        generateStars(container, rating);
    });
}

function generateStars(container, rating) {
    container.innerHTML = '';
    const validRating = Math.max(1, Math.min(5, rating));
    
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.setAttribute('data-rating', i);
        
        if (i <= validRating) {
            star.classList.add('filled');
        }
        
        star.addEventListener('click', function() {
            updateRating(container, i);
        });
        
        star.addEventListener('mouseenter', function() {
            highlightStars(container, i);
            this.style.transform = 'scale(1.3) rotate(10deg)';
        });
        
        star.addEventListener('mouseleave', function() {
            const currentRating = parseInt(container.getAttribute('data-rating'));
            highlightStars(container, currentRating);
            this.style.transform = 'scale(1) rotate(0deg)';
        });
        
        container.appendChild(star);
    }
}

function updateRating(container, newRating) {
    container.setAttribute('data-rating', newRating);
    highlightStars(container, newRating);
    
    // تأثير بصري للتحديث
    container.style.transform = 'scale(1.1)';
    setTimeout(() => {
        container.style.transform = 'scale(1)';
    }, 200);
    
    // تأثير صوتي بصري
    const stars = container.querySelectorAll('.star.filled');
    stars.forEach((star, index) => {
        setTimeout(() => {
            star.style.transform = 'scale(1.4)';
            setTimeout(() => {
                star.style.transform = 'scale(1)';
            }, 150);
        }, index * 50);
    });
}

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

// إعادة تهيئة النجوم عند تغيير الشهادات
const originalShowTestimonial = window.showTestimonial;
if (typeof showTestimonial === 'function') {
    window.showTestimonial = function(index) {
        originalShowTestimonial(index);
        setTimeout(initRatingStars, 300);
    };
}

