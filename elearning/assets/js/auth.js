// ===== AUTH JAVASCRIPT FILE =====

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

    // ===== FORM SWITCHING =====
    window.switchForm = function(formType) {
        const loginForm = $('#loginForm');
        const registerForm = $('#registerForm');

        if (formType === 'register') {
            loginForm.removeClass('active');
            registerForm.addClass('active');
            gsap.from(registerForm.find('.form-header, .form, .form-footer'), {
                duration: 0.8,
                x: 50,
                opacity: 0,
                stagger: 0.1,
                ease: 'power2.out'
            });
        } else {
            registerForm.removeClass('active');
            loginForm.addClass('active');
            gsap.from(loginForm.find('.form-header, .form, .form-footer'), {
                duration: 0.8,
                x: -50,
                opacity: 0,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }
    };

    // ===== PASSWORD TOGGLE =====
    window.togglePassword = function(fieldId) {
        const passwordField = $('#' + fieldId);
        const toggleBtn = passwordField.next('.password-toggle').find('i');

        if (passwordField.attr('type') === 'password') {
            passwordField.attr('type', 'text');
            toggleBtn.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            passwordField.attr('type', 'password');
            toggleBtn.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    };

    // ===== FORM VALIDATION & SUBMISSION =====
    function initForms() {
        // Login Form Submission
        $('#loginForm form').on('submit', function(e) {
            e.preventDefault();
            const email = $('#loginEmail').val();
            const password = $('#loginPassword').val();

            if (!email || !password) {
                showNotification('Por favor, preencha todos os campos.', 'error');
                return;
            }

            // Simulate API call
            const submitBtn = $(this).find('.btn-auth');
            const originalText = submitBtn.html();
            submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Entrando...');
            submitBtn.prop('disabled', true);

            setTimeout(function() {
                // Simulate success
                $('#successModal').modal('show');
                setTimeout(function() {
                    window.location.href = 'dashboard.html'; // Redirect to dashboard
                }, 2000);

                submitBtn.html(originalText);
                submitBtn.prop('disabled', false);
            }, 2000);
        });

        // Register Form Submission
        $('#registerForm form').on('submit', function(e) {
            e.preventDefault();
            const firstName = $('#firstName').val();
            const lastName = $('#lastName').val();
            const email = $('#registerEmail').val();
            const password = $('#registerPassword').val();
            const confirmPassword = $('#confirmPassword').val();
            const agreeTerms = $('#agreeTerms').is(':checked');

            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showNotification('As senhas não coincidem.', 'error');
                return;
            }

            if (!agreeTerms) {
                showNotification('Você deve concordar com os Termos de Uso e Política de Privacidade.', 'error');
                return;
            }

            // Simulate API call
            const submitBtn = $(this).find('.btn-auth');
            const originalText = submitBtn.html();
            submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Criando...');
            submitBtn.prop('disabled', true);

            setTimeout(function() {
                showNotification('Conta criada com sucesso! Faça login para continuar.', 'success');
                switchForm('login'); // Switch back to login form
                
                submitBtn.html(originalText);
                submitBtn.prop('disabled', false);
                $('#registerForm form')[0].reset();
            }, 2000);
        });

        // Password Strength Indicator
        $('#registerPassword').on('keyup', function() {
            const password = $(this).val();
            const strengthBar = $(this).closest('.form-group').find('.strength-fill');
            const strengthText = $(this).closest('.form-group').find('.strength-text');
            let strength = 0;

            if (password.length > 5) strength += 20;
            if (password.length > 8) strength += 20;
            if (password.match(/[a-z]+/)) strength += 20;
            if (password.match(/[A-Z]+/)) strength += 20;
            if (password.match(/[0-9]+/)) strength += 10;
            if (password.match(/[^\w\s]/)) strength += 10;

            strengthBar.css('width', strength + '%');

            let color = 'gray';
            let text = 'Muito Fraca';
            if (strength > 90) { color = 'green'; text = 'Excelente'; }
            else if (strength > 70) { color = 'lightgreen'; text = 'Forte'; }
            else if (strength > 50) { color = 'orange'; text = 'Média'; }
            else if (strength > 30) { color = 'red'; text = 'Fraca'; }
            
            strengthBar.css('background-color', color);
            strengthText.text('Força da senha: ' + text);
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

    // ===== INITIALIZATION =====
    function init() {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 50
        });
        initForms();
        console.log('🚀 VFA-JORGE E-Learning Auth Page initialized successfully!');
    }

    // Start initialization
    init();
});

