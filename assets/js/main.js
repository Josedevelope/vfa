// ===== MAIN JAVASCRIPT FILE =====

$(document).ready(function() {
    'use strict';

    // ===== PRELOADER FIXED =====
    function initPreloader() {
        const preloader = $('#preloader');
        const loadingProgress = $('.loading-progress');
        
        // Simulate loading progress
        let progress = 0;
        const progressInterval = setInterval(function() {
            progress += Math.random() * 15;
            if (progress > 100) {
                progress = 100;
                clearInterval(progressInterval);
                hidePreloader();
            }
            loadingProgress.css('width', progress + '%');
        }, 100);

        function hidePreloader() {
            setTimeout(function() {
                preloader.addClass('fade-out');
                setTimeout(function() {
                    preloader.remove();
                    $('body').removeClass('loading');
                }, 800);
            }, 500);
        }

        // Fallback: hide preloader after maximum 3 seconds
        setTimeout(hidePreloader, 3000);
    }

    // ===== NAVIGATION =====
    function initNavigation() {
        const navbar = $('.navbar');
        const navLinks = $('.nav-link');

        // Navbar scroll effect
        $(window).scroll(function() {
            if ($(this).scrollTop() > 50) {
                navbar.addClass('scrolled');
            } else {
                navbar.removeClass('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        navLinks.on('click', function(e) {
            const href = $(this).attr('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = $(href);
                
                if (target.length) {
                    const offsetTop = target.offset().top - 80;
                    $('html, body').animate({
                        scrollTop: offsetTop
                    }, 800);
                }
            }
        });

        // Active navigation highlighting
        $(window).scroll(function() {
            const scrollPos = $(window).scrollTop() + 100;
            
            $('section[id]').each(function() {
                const section = $(this);
                const sectionTop = section.offset().top;
                const sectionHeight = section.outerHeight();
                const sectionId = section.attr('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.removeClass('active');
                    $(`.nav-link[href="#${sectionId}"]`).addClass('active');
                }
            });
        });

        // Mobile menu close on link click
        $('.navbar-nav .nav-link').on('click', function() {
            $('.navbar-collapse').collapse('hide');
        });
    }

    // ===== ANIMATIONS =====
    function initAnimations() {
        // Initialize AOS if available
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true,
                offset: 100,
                disable: function() {
                    return window.innerWidth < 768;
                }
            });
        }

        // GSAP Animations if available
        if (typeof gsap !== 'undefined') {
            // Hero animations
            const tl = gsap.timeline({ delay: 0.5 });
            
            tl.from('.hero-badge', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: 'power2.out'
            })
            .from('.hero-title', {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power2.out'
            }, '-=0.3')
            .from('.hero-description', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: 'power2.out'
            }, '-=0.5')
            .from('.hero-stats .stat-item', {
                duration: 0.6,
                y: 20,
                opacity: 0,
                stagger: 0.1,
                ease: 'power2.out'
            }, '-=0.3')
            .from('.hero-actions .btn', {
                duration: 0.6,
                y: 20,
                opacity: 0,
                stagger: 0.1,
                ease: 'power2.out'
            }, '-=0.2');

            // Floating elements animation
            gsap.to('.floating-element', {
                duration: 6,
                y: -20,
                rotation: 360,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                stagger: 2
            });

            // Register ScrollTrigger if available
            if (typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);
                
                // Animate sections on scroll
                gsap.utils.toArray('.section-padding').forEach(section => {
                    gsap.from(section.children, {
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none reverse'
                        },
                        duration: 0.8,
                        y: 50,
                        opacity: 0,
                        stagger: 0.2,
                        ease: 'power2.out'
                    });
                });
            }
        }
    }

    // ===== COUNTER ANIMATION =====
    function initCounters() {
        function animateCounter(element, target, duration = 2000) {
            const $element = $(element);
            const startValue = 0;
            const increment = target / (duration / 16);
            let currentValue = startValue;

            const timer = setInterval(function() {
                currentValue += increment;
                if (currentValue >= target) {
                    currentValue = target;
                    clearInterval(timer);
                }
                $element.text(Math.floor(currentValue));
            }, 16);
        }

        // Use Intersection Observer for better performance
        if ('IntersectionObserver' in window) {
            const counterObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const $counter = $(entry.target);
                        const target = parseInt($counter.data('count')) || parseInt($counter.text());
                        
                        if (!$counter.hasClass('animated')) {
                            $counter.addClass('animated');
                            animateCounter($counter[0], target);
                        }
                    }
                });
            }, { threshold: 0.5 });

            $('.stat-number').each(function() {
                counterObserver.observe(this);
            });
        }
    }

    // ===== FORM HANDLING =====
    function initForms() {
        const contactForm = $('#contactForm');
        
        if (contactForm.length) {
            contactForm.on('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val(),
                    service: $('#service').val(),
                    message: $('#message').val()
                };

                // Basic validation
                if (!formData.name || !formData.email || !formData.message) {
                    showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                    return;
                }

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    showNotification('Por favor, insira um email válido.', 'error');
                    return;
                }

                // Simulate form submission
                const submitBtn = contactForm.find('button[type="submit"]');
                const originalText = submitBtn.html();
                
                submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Enviando...');
                submitBtn.prop('disabled', true);

                setTimeout(function() {
                    submitBtn.html('<i class="fas fa-check me-2"></i>Enviado!');
                    showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                    
                    // Reset form
                    contactForm[0].reset();
                    
                    setTimeout(function() {
                        submitBtn.html(originalText);
                        submitBtn.prop('disabled', false);
                    }, 2000);
                }, 2000);
            });
        }

        // Form field animations
        $('.form-control, .form-select').on('focus', function() {
            $(this).parent().addClass('focused');
        }).on('blur', function() {
            if (!$(this).val()) {
                $(this).parent().removeClass('focused');
            }
        });
    }

    // ===== NOTIFICATIONS =====
    function showNotification(message, type = 'info') {
        const notification = $(`
            <div class="notification notification-${type}">
                <div class="notification-content">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
                    ${message}
                </div>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `);

        // Add notification styles if not already added
        if (!$('#notification-styles').length) {
            $('head').append(`
                <style id="notification-styles">
                    .notification {
                        position: fixed;
                        top: 2rem;
                        right: 2rem;
                        background: white;
                        border-radius: 10px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                        padding: 1rem 1.5rem;
                        z-index: 10000;
                        transform: translateX(400px);
                        transition: transform 0.3s ease;
                        max-width: 90vw;
                        border-left: 4px solid;
                    }
                    .notification-success { border-left-color: #3CB371; }
                    .notification-error { border-left-color: #dc3545; }
                    .notification-info { border-left-color: #6A5ACD; }
                    .notification.show { transform: translateX(0); }
                    .notification-content {
                        display: flex;
                        align-items: center;
                        color: #333;
                        font-weight: 500;
                        font-size: 0.9rem;
                    }
                    .notification-close {
                        position: absolute;
                        top: 0.5rem;
                        right: 0.5rem;
                        background: none;
                        border: none;
                        color: #999;
                        cursor: pointer;
                        padding: 0.25rem;
                    }
                    .notification-close:hover { color: #333; }
                    @media (max-width: 768px) {
                        .notification {
                            top: 1rem;
                            right: 1rem;
                            left: 1rem;
                            max-width: none;
                            transform: translateY(-100px);
                        }
                        .notification.show { transform: translateY(0); }
                    }
                </style>
            `);
        }

        $('body').append(notification);
        
        setTimeout(() => notification.addClass('show'), 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.removeClass('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);

        // Manual close
        notification.find('.notification-close').on('click', function() {
            notification.removeClass('show');
            setTimeout(() => notification.remove(), 300);
        });
    }

    // ===== SCROLL INDICATOR =====
    function initScrollIndicator() {
        $('.scroll-indicator a').on('click', function(e) {
            e.preventDefault();
            const target = $($(this).attr('href'));
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800);
            }
        });
    }

    // ===== PERFORMANCE OPTIMIZATION =====
    function initPerformanceOptimizations() {
        // Throttle scroll events
        let ticking = false;
        
        function updateOnScroll() {
            // Scroll-dependent functions here
            ticking = false;
        }
        
        $(window).on('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        });

        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }

    // ===== ACCESSIBILITY ENHANCEMENTS =====
    function initAccessibility() {
        // Skip to main content link
        if (!$('.skip-link').length) {
            $('body').prepend(`
                <a href="#home" class="skip-link">
                    Pular para o conteúdo principal
                </a>
            `);
        }

        // Add skip link styles
        if (!$('#accessibility-styles').length) {
            $('head').append(`
                <style id="accessibility-styles">
                    .skip-link {
                        position: absolute;
                        top: -40px;
                        left: 6px;
                        background: #000;
                        color: #fff;
                        padding: 8px;
                        text-decoration: none;
                        z-index: 10000;
                        border-radius: 4px;
                        font-size: 0.9rem;
                    }
                    .skip-link:focus {
                        top: 6px;
                    }
                    .keyboard-navigation *:focus {
                        outline: 2px solid #6A5ACD !important;
                        outline-offset: 2px;
                    }
                </style>
            `);
        }

        // Keyboard navigation
        $(document).on('keydown', function(e) {
            if (e.key === 'Tab') {
                $('body').addClass('keyboard-navigation');
            }
        });

        $(document).on('mousedown', function() {
            $('body').removeClass('keyboard-navigation');
        });
    }

    // ===== MOBILE OPTIMIZATIONS =====
    function initMobileOptimizations() {
        // Touch events for mobile
        if ('ontouchstart' in window) {
            $('body').addClass('touch-device');
            
            // Improve touch targets
            $('.btn, .nav-link').css('min-height', '44px');
            
            // Prevent zoom on input focus (iOS)
            $('input, select, textarea').attr('autocomplete', 'off');
        }

        // Viewport height fix for mobile browsers
        function setVH() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setVH();
        $(window).on('resize orientationchange', setVH);

        // Optimize animations for mobile
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        
        function handleMobileView(e) {
            if (e.matches) {
                // Disable heavy animations on mobile
                $('.floating-card, .floating-element').css('animation', 'none');
            } else {
                // Re-enable animations on desktop
                $('.floating-card, .floating-element').css('animation', '');
            }
        }
        
        handleMobileView(mediaQuery);
        mediaQuery.addListener(handleMobileView);
    }

    // ===== ERROR HANDLING =====
    function initErrorHandling() {
        window.addEventListener('error', function(e) {
            console.error('JavaScript Error:', e.error);
            // Optionally show user-friendly error message
        });

        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled Promise Rejection:', e.reason);
        });
    }

    // ===== INITIALIZATION =====
    function init() {
        try {
            initPreloader();
            initNavigation();
            initAnimations();
            initCounters();
            initForms();
            initScrollIndicator();
            initPerformanceOptimizations();
            initAccessibility();
            initMobileOptimizations();
            initErrorHandling();
            
            console.log('VFA-JORGE website initialized successfully');
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    // Start initialization
    init();

    // Expose functions globally for debugging
    window.VFA = {
        showNotification: showNotification,
        init: init
    };
});

// ===== WINDOW LOAD EVENTS =====
$(window).on('load', function() {
    // Additional load-dependent initializations
    console.log('VFA-JORGE website fully loaded');
});

// ===== RESIZE HANDLER =====
$(window).on('resize', function() {
    // Handle responsive adjustments
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(function() {
        // Responsive adjustments here
    }, 250);
});

