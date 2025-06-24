// ===== DASHBOARD JAVASCRIPT FILE =====

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

    // ===== SIDEBAR TOGGLE =====
    const sidebar = $('#sidebar');
    const sidebarToggle = $('#sidebarToggle');
    const mobileMenuToggle = $('#mobileMenuToggle');

    sidebarToggle.on('click', function() {
        sidebar.toggleClass('collapsed');
    });

    mobileMenuToggle.on('click', function() {
        sidebar.toggleClass('show');
    });

    // Close sidebar when clicking outside on mobile
    $(document).on('click touchstart', function(e) {
        if ($(window).width() <= 992 && !sidebar.is(e.target) && sidebar.has(e.target).length === 0 && !mobileMenuToggle.is(e.target) && mobileMenuToggle.has(e.target).length === 0) {
            sidebar.removeClass('show');
        }
    });

    // ===== USER DROPDOWN =====
    $('#userDropdown').on('click', function() {
        $(this).parent().toggleClass('show');
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.user-dropdown').length) {
            $('.user-dropdown').removeClass('show');
        }
    });

    // ===== NOTIFICATIONS PANEL =====
    $('#notificationsBtn').on('click', function() {
        $('#notificationsPanel').addClass('show');
    });

    $('#closeNotifications').on('click', function() {
        $('#notificationsPanel').removeClass('show');
    });

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

    // ===== PROGRESS CIRCLES =====
    function initProgressCircles() {
        $('.progress-circle').each(function() {
            const circle = $(this).find('.progress-ring-circle')[0];
            const radius = circle.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            const progress = $(this).data('progress');
            const offset = circumference - (progress / 100) * circumference;

            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = offset;
        });
    }

    // ===== INITIALIZATION =====
    function init() {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 50
        });
        initCounters();
        initProgressCircles();
        console.log('🚀 VFA-JORGE E-Learning Dashboard initialized successfully!');
    }

    // Start initialization
    init();
});

