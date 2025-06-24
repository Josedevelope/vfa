// ===== MAIN JAVASCRIPT FILE =====

$(document).ready(function() {
    'use strict';

    // ===== PRELOADER =====
    function hidePreloader() {
        $('#preloader').fadeOut(500, function() {
            $(this).remove();
        });
    }

    // Hide preloader after page load
    $(window).on('load', function() {
        setTimeout(hidePreloader, 1000);
    });

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
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = $(href);
                
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 80
                    }, 800, 'easeInOutQuart');
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
        // Initialize AOS
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });

        // GSAP Animations
        if (typeof gsap !== 'undefined') {
            // Hero title animation
            gsap.from('.hero-title .title-line, .hero-title .title-highlight, .hero-title .title-accent', {
                duration: 1.2,
                y: 100,
                opacity: 0,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.5
            });

            // Hero description and buttons animation
            gsap.from('.hero-description, .hero-actions', {
                duration: 1,
                y: 50,
                opacity: 0,
                stagger: 0.3,
                ease: 'power2.out',
                delay: 1.2
            });

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

            // Service cards hover animation
            $('.service-card').hover(
                function() {
                    gsap.to($(this).find('.service-icon'), {
                        duration: 0.3,
                        scale: 1.1,
                        rotation: 10,
                        ease: 'back.out(1.7)'
                    });
                },
                function() {
                    gsap.to($(this).find('.service-icon'), {
                        duration: 0.3,
                        scale: 1,
                        rotation: 0,
                        ease: 'back.out(1.7)'
                    });
                }
            );

            // Competency cards animation on scroll
            gsap.registerPlugin(ScrollTrigger);
            
            gsap.from('.competency-card', {
                scrollTrigger: {
                    trigger: '.competencies-section',
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

        // Intersection Observer for counters
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const $counter = $(entry.target);
                    const target = parseInt($counter.data('count'));
                    
                    if (!$counter.hasClass('animated')) {
                        $counter.addClass('animated');
                        animateCounter($counter[0], target);
                    }
                }
            });
        }, { threshold: 0.5 });

        $('.stat-number[data-count]').each(function() {
            counterObserver.observe(this);
        });
    }

    // ===== PARALLAX EFFECTS =====
    function initParallax() {
        $(window).scroll(function() {
            const scrolled = $(window).scrollTop();
            const parallaxElements = $('.floating-element');
            
            parallaxElements.each(function() {
                const speed = $(this).data('speed') || 1;
                const yPos = -(scrolled * speed * 0.1);
                $(this).css('transform', `translateY(${yPos}px)`);
            });
        });
    }

    // ===== FORM HANDLING =====
    function initForms() {
        const contactForm = $('#contactForm');
        
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
                        max-width: 400px;
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

    // ===== BACK TO TOP BUTTON =====
    function initBackToTop() {
        const backToTopBtn = $('#backToTop');
        
        $(window).scroll(function() {
            if ($(this).scrollTop() > 300) {
                backToTopBtn.addClass('show');
            } else {
                backToTopBtn.removeClass('show');
            }
        });

        backToTopBtn.on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 800, 'easeInOutQuart');
        });
    }

    // ===== SCROLL INDICATOR =====
    function initScrollIndicator() {
        $('.scroll-indicator').on('click', function() {
            $('html, body').animate({
                scrollTop: $(window).height()
            }, 800, 'easeInOutQuart');
        });
    }

    // ===== LAZY LOADING =====
    function initLazyLoading() {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // ===== PERFORMANCE OPTIMIZATION =====
    function initPerformanceOptimizations() {
        // Debounce scroll events
        let scrollTimeout;
        $(window).on('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(function() {
                // Scroll-dependent functions here
            }, 10);
        });

        // Preload critical images
        const criticalImages = [
            'assets/images/WGsCTC00WcEw.jpg',
            'assets/images/pv6ImKmjsBCB.jpg',
            'assets/images/0kGuH69hg3IJ.jpg'
        ];

        criticalImages.forEach(function(src) {
            const img = new Image();
            img.src = src;
        });
    }

    // ===== ACCESSIBILITY ENHANCEMENTS =====
    function initAccessibility() {
        // Keyboard navigation for custom elements
        $('.btn, .nav-link, .service-card, .competency-card').attr('tabindex', '0');

        // Focus management
        $(document).on('keydown', function(e) {
            if (e.key === 'Tab') {
                $('body').addClass('keyboard-navigation');
            }
        });

        $(document).on('mousedown', function() {
            $('body').removeClass('keyboard-navigation');
        });

        // Skip to main content link
        $('body').prepend(`
            <a href="#home" class="skip-link">
                Pular para o conteúdo principal
            </a>
        `);

        // Add skip link styles
        $('head').append(`
            <style>
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

    // ===== EASTER EGGS =====
    function initEasterEggs() {
        // Konami code easter egg
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

        $(document).on('keydown', function(e) {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                showNotification('🎉 Código Konami ativado! Você descobriu nosso segredo!', 'success');
                
                // Add special animation
                $('body').addClass('konami-mode');
                setTimeout(() => $('body').removeClass('konami-mode'), 3000);
            }
        });

        // Add konami mode styles
        $('head').append(`
            <style>
                .konami-mode * {
                    animation: rainbow 2s linear infinite !important;
                }
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            </style>
        `);
    }

    // ===== INITIALIZATION =====
    function init() {
        initNavigation();
        initAnimations();
        initCounters();
        initParallax();
        initForms();
        initBackToTop();
        initScrollIndicator();
        initLazyLoading();
        initPerformanceOptimizations();
        initAccessibility();
        initEasterEggs();

        // Custom easing for jQuery animations
        $.easing.easeInOutQuart = function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        };

        console.log('🚀 VFA-JORGE Website initialized successfully!');
    }

    // Start initialization
    init();

    // ===== WINDOW RESIZE HANDLER =====
    $(window).on('resize', function() {
        // Recalculate animations on resize
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    });

    // ===== SERVICE WORKER REGISTRATION =====
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed');
                });
        });
    }
});

