document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, null, href);
      }
    }
  });
});

const revealElements = document.querySelectorAll('.reveal');
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); 
    }
  });
}, observerOptions);

revealElements.forEach(el => observer.observe(el));

const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('#nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('open');
    
    const lines = navToggle.querySelectorAll('.nav__toggle-line');
    
    lines.forEach(line => {
      line.style.transform = '';
      line.style.opacity = '';
      line.style.background = '';
    });
    
    if (!expanded) {
      lines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      lines[1].style.opacity = '0';
      lines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      lines[0].style.background = 'linear-gradient(90deg, #ff6b6b, #ffd93d)';
      lines[2].style.background = 'linear-gradient(90deg, #ff6b6b, #ffd93d)';
    } else {
      lines[0].style.background = 'linear-gradient(90deg, #ff6b6b, #ffd93d)';
      lines[1].style.background = 'linear-gradient(90deg, #ff6b6b, #ffd93d)';
      lines[2].style.background = 'linear-gradient(90deg, #ff6b6b, #ffd93d)';
    }
  });
}

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
        const lines = navToggle.querySelectorAll('.nav__toggle-line');
        lines.forEach(line => {
          line.style.transform = '';
          line.style.opacity = '';
          line.style.background = 'linear-gradient(90deg, #ff6b6b, #ffd93d)';
        });
      }
    }
  });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    const name = contactForm.querySelector('#name');
    const email = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');
    
    clearErrors();
    
    if (!name.value.trim()) {
      showError(name, 'Please enter your name.');
      valid = false;
    }
    
    if (!email.value.trim() || !isValidEmail(email.value)) {
      showError(email, 'Please enter a valid email address.');
      valid = false;
    }
    
    if (!message.value.trim()) {
      showError(message, 'Please enter a message.');
      valid = false;
    }
    
    if (valid) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      const originalBg = submitBtn.style.background;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.background = 'linear-gradient(135deg, #6bcf7f, #4dabf7)';
      
      setTimeout(() => {
        submitBtn.textContent = '✓ Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #6bcf7f, #4dabf7)';
        
        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.style.background = originalBg;
          submitBtn.disabled = false;
        }, 2000);
      }, 1500);
    }
  });
  
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });
    
    input.addEventListener('input', () => {
      clearError(input);
      if (input.value.trim() && validateField(input)) {
        input.style.borderColor = '#6bcf7f';
        input.style.boxShadow = '0 0 0 3px rgba(107, 207, 127, 0.1)';
      }
    });
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(input, message) {
  input.style.borderColor = '#ff6b6b';
  input.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.1)';
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.color = '#ff6b6b';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '0.25rem';
  errorDiv.style.fontWeight = '500';
  errorDiv.textContent = message;
  input.parentNode.appendChild(errorDiv);
}

function clearError(input) {
  input.style.borderColor = '';
  input.style.boxShadow = '';
  const errorDiv = input.parentNode.querySelector('.error-message');
  if (errorDiv) {
    errorDiv.remove();
  }
}

function clearErrors() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(error => error.remove());
  
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.style.borderColor = '';
    input.style.boxShadow = '';
  });
}

function validateField(input) {
  clearError(input);
  
  if (input.id === 'name' && !input.value.trim()) {
    showError(input, 'Please enter your name.');
    return false;
  }
  
  if (input.id === 'email' && (!input.value.trim() || !isValidEmail(input.value))) {
    showError(input, 'Please enter a valid email address.');
    return false;
  }
  
  if (input.id === 'message' && !input.value.trim()) {
    showError(input, 'Please enter a message.');
    return false;
  }
  
  return true;
}

const yearSpan = document.querySelector('#year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
      this.style.transform = 'scale(1)';
    });
    
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    if (img.complete) {
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
    }
  });
});

window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('body::before');
});

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px)';
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

function toggleDesc(card) {
  const fullDesc = card.querySelector('.skill-card__desc.full');
  fullDesc.style.display = fullDesc.style.display === 'block' ? 'none' : 'block';
}
