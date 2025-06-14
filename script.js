// ========================================
// VARIABLES GLOBALES
// ========================================

// Seleccionamos los elementos que vamos a usar
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const filterButtons = document.querySelectorAll('.filter-btn');

// ========================================
// AL INICIAR LA PÁGINA
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initContactForm();
    initScheduleFilters();
    // Redirección a entradas desde cronograma
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('Comprar Tickets')) {
            button.addEventListener('click', function() {
                window.location.href = 'entradas.html';
            });
        }
    });
});

// ========================================
// MENÚ MÓVIL
// ========================================

function initMobileMenu() {
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// ========================================
// VALIDACIÓN DEL FORMULARIO DE CONTACTO
// ========================================

function initContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateForm(contactForm)) {
                showMessage(formMessage, '¡Mensaje enviado correctamente!', 'success');
                contactForm.reset();
                clearValidation(contactForm);
            } else {
                showMessage(formMessage, 'Por favor corrige los errores.', 'error');
            }
        });
    }
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    inputs.forEach(function(input) {
        if (input.hasAttribute('required') && !input.value.trim()) {
            markAsError(input);
            isValid = false;
        } else if (input.type === 'email' && input.value) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                markAsError(input);
                isValid = false;
            }
        }
    });
    return isValid;
}

function markAsError(input) {
    input.classList.add('border-red-500');
    input.classList.remove('border-green-500');
}

function clearValidation(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(function(input) {
        input.classList.remove('border-red-500', 'border-green-500');
    });
}

function showMessage(formMessage, message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = 'mt-4 p-4 rounded-lg';
        if (type === 'success') {
            formMessage.classList.add('bg-green-100', 'text-green-800');
        } else {
            formMessage.classList.add('bg-red-100', 'text-red-800');
        }
        formMessage.classList.remove('hidden');
        setTimeout(function() {
            formMessage.classList.add('hidden');
        }, 5000);
    }
}

// ========================================
// FILTROS DE CRONOGRAMA
// ========================================

function initScheduleFilters() {
    if (filterButtons.length > 0) {
        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const week = this.getAttribute('data-week');
                filterSchedule(week);
                updateActiveButton(this, filterButtons);
            });
        });
    }
}

function filterSchedule(week) {
    document.querySelectorAll('.week-section').forEach(function(section) {
        section.classList.toggle('hidden', section.getAttribute('data-week') !== week);
    });
}

function updateActiveButton(activeButton, filterButtons) {
    filterButtons.forEach(function(button) {
        button.classList.remove('active', 'bg-primary', 'text-white');
        button.classList.add('bg-white', 'border-2', 'border-primary', 'text-primary');
    });
    activeButton.classList.remove('bg-white', 'border-2', 'border-primary', 'text-primary');
    activeButton.classList.add('active', 'bg-primary', 'text-white');
}