// Slide-based navigation system
const sections = [
  { id: 'about', element: null },
  { id: 'experience', element: null },
  { id: 'skills', element: null },
  { id: 'education', element: null },
  { id: 'contact', element: null }
];

let currentSectionIndex = 0;
const body = document.body;
const themeToggleBtn = document.getElementById('themeToggle');
const favicon = document.getElementById('favicon');
const logo = document.getElementById('logo');
const sidebarItems = document.querySelectorAll('.sidebar__item');
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');

// Initialize sections
const initSections = () => {
  sections.forEach(section => {
    section.element = document.getElementById(section.id);
  });
};

// Initialize theme from localStorage
const getBodyTheme = localStorage.getItem('portfolio-theme') || 'light';
const setInitialTheme = () => {
  body.classList.add(getBodyTheme);
  updateThemeUI(getBodyTheme);
};

// Update UI based on theme
const updateThemeUI = (theme) => {
  if (theme === 'dark') {
    favicon.href = 'favicon-dark.ico';
    if (logo) {
      logo.src = 'favicon-dark.ico';
    }
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
  } else {
    favicon.href = 'favicon-light.ico';
    if (logo) {
      logo.src = 'favicon-light.ico';
    }
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }
};

// Toggle theme
const toggleTheme = () => {
  const isDark = body.classList.contains('dark');
  
  if (isDark) {
    body.classList.remove('dark');
    body.classList.add('light');
    localStorage.setItem('portfolio-theme', 'light');
    updateThemeUI('light');
  } else {
    body.classList.remove('light');
    body.classList.add('dark');
    localStorage.setItem('portfolio-theme', 'dark');
    updateThemeUI('dark');
  }
};

// Add theme toggle button event listener
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}

// Update sidebar active state
const updateSidebarActive = (index) => {
  sidebarItems.forEach((item, i) => {
    if (i === index) {
      item.classList.add('sidebar__item--active');
    } else {
      item.classList.remove('sidebar__item--active');
    }
  });
};

// Navigate to section
const navigateToSection = (index) => {
  if (index < 0 || index >= sections.length) return;
  
  currentSectionIndex = index;
  const section = sections[index];
  
  if (section.element) {
    section.element.scrollIntoView({ behavior: 'smooth' });
    updateSidebarActive(index);
  }
};

// Sidebar click navigation
sidebarItems.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    navigateToSection(index);
  });
});

// Arrow button navigation
if (prevSlideBtn) {
  prevSlideBtn.addEventListener('click', () => {
    navigateToSection(currentSectionIndex - 1);
  });
}

if (nextSlideBtn) {
  nextSlideBtn.addEventListener('click', () => {
    navigateToSection(currentSectionIndex + 1);
  });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  // Arrow up or previous
  if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
    e.preventDefault();
    navigateToSection(currentSectionIndex - 1);
  }
  // Arrow down or next
  else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
    e.preventDefault();
    navigateToSection(currentSectionIndex + 1);
  }
  // Ctrl/Cmd + Shift + L to toggle theme
  else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
    e.preventDefault();
    toggleTheme();
  }
});

// Detect current section on scroll
const detectCurrentSection = () => {
  const scrollContainer = document.querySelector('.slides-container');
  if (!scrollContainer) return;

  let closestIndex = 0;
  let closestDistance = Infinity;

  sections.forEach((section, index) => {
    if (section.element) {
      const rect = section.element.getBoundingClientRect();
      const distance = Math.abs(rect.top);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    }
  });

  if (closestIndex !== currentSectionIndex) {
    currentSectionIndex = closestIndex;
    updateSidebarActive(closestIndex);
  }
};

// Listen for scroll events
document.addEventListener('scroll', detectCurrentSection);

// Initialize on document load
document.addEventListener('DOMContentLoaded', () => {
  initSections();
  setInitialTheme();
  updateSidebarActive(0);
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (!this.classList.contains('sidebar__item') && 
        !this.classList.contains('link--nav')) {
      const href = this.getAttribute('href');
      const section = sections.find(s => s.id === href.substring(1));
      if (section) {
        e.preventDefault();
        const index = sections.indexOf(section);
        navigateToSection(index);
      }
    }
  });
});
