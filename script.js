// ==================== SCROLL SUAVE ==================== 
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==================== OBSERVAR ELEMENTOS ==================== 
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observar todos os elementos com animação
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.dica-card, .curiosidade-item, .impacto-card, .acao-item'
  );

  animatedElements.forEach(el => {
    observer.observe(el);
  });
});

// ==================== EFEITO PARALLAX ==================== 
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const hero = document.querySelector('.hero');

  if (hero) {
    hero.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
  }
});

// ==================== CONTADOR ANIMADO ==================== 
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Observador para iniciar contadores quando visíveis
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const targets = {
        '2000L': 2000,
        '75%': 75,
        '1T': 1,
        '80%': 80
      };

      const text = entry.target.textContent.trim();
      if (targets[text]) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target, targets[text]);
      }
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.impacto-stat').forEach(el => {
    counterObserver.observe(el);
  });
});

// ==================== HOVER EFEITO GLOW ==================== 
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.dica-card, .impacto-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const glow = document.createElement('div');
      glow.className = 'glow-effect';
      glow.style.left = x + 'px';
      glow.style.top = y + 'px';

      card.appendChild(glow);

      setTimeout(() => glow.remove(), 600);
    });
  });
});

// Adicionar estilos para o efeito glow dinamicamente
const style = document.createElement('style');
style.textContent = `
    .glow-effect {
        position: absolute;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(46, 204, 113, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        animation: glowPulse 0.6s ease-out;
    }
    
    @keyframes glowPulse {
        from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== RIPPLE EFFECT ==================== 
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.cta-button');

  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
});

// Adicionar estilos para ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==================== ATIVAR LINKS NAVBAR ==================== 
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Remover classe ativa de todos
      navLinks.forEach(l => l.style.color = 'white');

      // Adicionar classe ativa no clicado
      link.style.color = '#f39c12';

      // Scroll
      const sectionId = link.getAttribute('href').substring(1);
      scrollToSection(sectionId);
    });
  });

  // Highlight ao scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = 'white';
      if (link.getAttribute('href').substring(1) === current) {
        link.style.color = '#f39c12';
      }
    });
  });
});

// ==================== EFEITO TEXT REVEAL ==================== 
document.addEventListener('DOMContentLoaded', () => {
  const textElements = document.querySelectorAll('.hero-content h1, .hero-content p');

  textElements.forEach((el, index) => {
    const text = el.textContent;
    el.textContent = '';

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < text.length) {
        el.textContent += text.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50 + index * 20);
  });
});

// ==================== SCROLL PROGRESS BAR ==================== 
window.addEventListener('scroll', () => {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (window.scrollY / docHeight) * 100;
});

// ==================== LAZY LOADING ANIMATION ==================== 
const lazyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dica-card, .curiosidade-item, .impacto-card, .acao-item').forEach(el => {
    el.style.opacity = '0';
    el.style.animationPlayState = 'paused';
    lazyObserver.observe(el);
  });
});

// ==================== EMOJI ANIMATION ==================== 
document.addEventListener('DOMContentLoaded', () => {
  const emojiElements = document.querySelectorAll('h2');

  emojiElements.forEach(el => {
    const text = el.textContent;
    const emojiMatch = text.match(/[\p{Emoji}]/gu);

    if (emojiMatch) {
      const emoji = emojiMatch[0];
      const emojiSpan = el.querySelector('i') || document.createElement('span');

      if (!el.querySelector('i')) {
        emojiSpan.style.display = 'inline-block';
        emojiSpan.style.marginRight = '10px';
        emojiSpan.style.animation = 'bounce 2s infinite';
        el.insertBefore(emojiSpan, el.firstChild);
      }
    }
  });
});

// ==================== PÁGINA CARREGADA ==================== 
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  console.log('✨ RecycleMais carregado! Vamos salvar o planeta juntos! 🌍');
});

// Configuração inicial
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
