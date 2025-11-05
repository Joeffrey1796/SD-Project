// Make filters sticky on scroll
function makeFiltersSticky() {
  const filters = document.querySelector('.menu-filters');
  const header = document.querySelector('.menu-header');
  const navbar = document.querySelector('.navbar');
  
  if (!filters || !header || !navbar) return;
  
  // Get navbar height dynamically
  const navbarHeight = navbar.offsetHeight;
  let isSticky = false;
  
  function handleScroll() {
    const headerBottom = header.offsetTop + header.offsetHeight;
    const scrollPosition = window.scrollY + navbarHeight;
    
    // If scrolled past the header, make filters sticky
    if (scrollPosition > headerBottom && !isSticky) {
      filters.style.position = 'fixed';
      filters.style.top = `${navbarHeight}px`;
      filters.style.left = '0';
      filters.style.right = '0';
      filters.style.background = 'hsl(36 30% 98%)';
      filters.style.zIndex = '90';
      filters.style.padding = '1rem 0';
      filters.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      filters.style.margin = '0px';
      
      // Add margin to menu grid to prevent jump
      const menuGrid = document.querySelector('.menu-grid');
      menuGrid.style.marginTop = `${filters.offsetHeight}px`;
      
      isSticky = true;
    } 
    // If back in header area, remove sticky
    else if (scrollPosition <= headerBottom && isSticky) {
      filters.style.position = '';
      filters.style.top = '';
      filters.style.left = '';
      filters.style.right = '';
      filters.style.background = '';
      filters.style.zIndex = '';
      filters.style.padding = '';
      filters.style.boxShadow = '';
      
      // Remove margin from menu grid
      const menuGrid = document.querySelector('.menu-grid');
      menuGrid.style.marginTop = '';
      
      isSticky = false;
    }
  }
  
  // Listen for scroll events
  window.addEventListener('scroll', handleScroll);
  // Initial check
  handleScroll();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', makeFiltersSticky);

// Also recalculate on resize (in case navbar height changes)
window.addEventListener('resize', makeFiltersSticky);