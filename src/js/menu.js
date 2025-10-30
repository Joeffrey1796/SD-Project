//? Debug
console.log("menu.js opens cuhh");

/* =============================
   Starbrew Coffee - menu.js
   Provides a global loadMenuItems() that fetches menu.json,
   renders cards, and wires search/filter/modal behavior.
   ============================= */

/*
  Usage:
    In menu.html you can call:
      document.addEventListener('DOMContentLoaded', () => { loadMenuItems(); });
    (This file only defines loadMenuItems and helper functions; it does not auto-run.)
*/

(function (global) {
  // Hold menu items
  let menuItems = [];
  // Cached DOM elements placeholders (set when loadMenuItems runs)
  let menuGrid, searchBar, categoryFilter;

  // Public function (global) — fetches and initializes the menu UI
  async function loadMenuItems() {
    // find DOM elements
    menuGrid = document.getElementById("menu-grid");
    searchBar = document.getElementById("search-bar");
    categoryFilter = document.getElementById("category-filter");

    if (!menuGrid) {
      console.error("menu-grid element not found.");
      return;
    }

    try {
      const res = await fetch("src/data/menu.json");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      menuItems = await res.json();

      // Initialize filters/search listeners
      setupFilters();

      // initial display
      displayMenu(menuItems);
    } catch (err) {
      console.error("Error loading menu.json:", err);
      if (menuGrid) menuGrid.innerHTML = "<p class='error'>Unable to load menu at this time.</p>";
    }
  }

  // Render menu cards
  function displayMenu(items) {
    if (!menuGrid) return;
    menuGrid.innerHTML = "";

    if (!items || items.length === 0) {
      menuGrid.innerHTML = "<p class='no-results'>No items found.</p>";
      return;
    }

    items.forEach(item => {
      const card = document.createElement("div");
      card.className = "menu-card";
      card.innerHTML = `
        <img src="${item.image}" alt="${escapeHtml(item.name)}" class="menu-img">
        <div class="menu-info">
          <h3>${escapeHtml(item.name)}</h3>
          <p class="menu-desc">${escapeHtml(item.description)}</p>
          <p class="menu-price">${item.price} ${escapeHtml(item.currency)}</p>
          <div class="menu-tags">
            ${Array.isArray(item.tags)
              ? item.tags.map(t => `<span class="menu-tag">${escapeHtml(t)}</span>`).join('')
              : ''}
          </div>
        </div>
      `;

      // Make the whole card clickable
      card.addEventListener("click", () => showDetails(item));

      menuGrid.appendChild(card);

    });
  }

  // Setup search & category filter
  function setupFilters() {
    if (!searchBar || !categoryFilter) {
      // If UI not present, just skip wiring
      return;
    }

    searchBar.addEventListener("input", filterMenu);
    categoryFilter.addEventListener("change", filterMenu);
  }

  // Filter logic
  function filterMenu() {
    const searchTerm = (searchBar?.value || "").toLowerCase();
    const category = (categoryFilter?.value || "all");

    const filtered = menuItems.filter(item => {
      const matchesName = item.name.toLowerCase().includes(searchTerm)
        || (item.tags && item.tags.join(" ").toLowerCase().includes(searchTerm));
      const matchesCategory = category === "all" || item.category === category;
      return matchesName && matchesCategory;
    });

    displayMenu(filtered);
  }

  // Show item details in a modal
  function showDetails(item) {
    // ensure arrays exist
    const ingredients = Array.isArray(item.ingredients) ? item.ingredients.join(", ") : (item.ingredients || "—");
    const allergens = Array.isArray(item.allergens) && item.allergens.length ? item.allergens.join(", ") : "None";

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content" role="dialog" aria-modal="true" aria-label="${escapeHtml(item.name)} details">
        <button class="close-btn" aria-label="Close details">&times;</button>
        <img src="${item.image}" alt="${escapeHtml(item.name)}" class="modal-img">
        <h2>${escapeHtml(item.name)}</h2>
        <p><strong>Description:</strong> ${escapeHtml(item.description)}</p>
        <p><strong>Ingredients:</strong> ${escapeHtml(ingredients)}</p>
        <p><strong>Flavor:</strong> ${escapeHtml(item.flavor_profile || "—")}</p>
        <p><strong>Calories:</strong> ${escapeHtml(String(item.calories || "—"))} kcal</p>
        <p><strong>Allergens:</strong> ${escapeHtml(allergens)}</p>
        <p><strong>Price:</strong> ${escapeHtml(String(item.price))} ${escapeHtml(item.currency || "")}</p>
      </div>
    `;

    // append and focus
    document.body.appendChild(modal);
    // trap focus to improve a11y (basic)
    const closeBtn = modal.querySelector(".close-btn");
    closeBtn.focus();

    // Close handlers
    closeBtn.addEventListener("click", () => modal.remove());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });
    document.addEventListener("keydown", function onKey(e) {
      if (e.key === "Escape") {
        modal.remove();
        document.removeEventListener("keydown", onKey);
      }
    });
  }

  // Small helper to avoid XSS when inserting values into innerHTML
  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Add basic modal styles (keeps styling in one place and ensures modal looks okay)
  (function addModalStyles() {
    const css = `
      .modal {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: sb-fadeIn 0.22s ease;
      }
      .modal-content {
        background: var(--color-bg, #fff);
        color: var(--color-text, #222);
        padding: 1.6rem;
        border-radius: 12px;
        max-width: 560px;
        width: calc(100% - 40px);
        text-align: left;
        position: relative;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
      }
      .close-btn {
        position: absolute;
        top: 10px;
        right: 14px;
        font-size: 2.0rem;
        background: none;
        border: none;
        cursor: pointer;
        color: inherit;
      }
      .modal-img {
        width: 100%;
        height: 450px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 0.8rem;
        object-position: 0px 55% 50%;
      }
      .modal-content h2 {
        margin-top: 0;
        margin-bottom: 0.4rem;
      }
      @keyframes sb-fadeIn {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @media (max-width: 768px){
      .modal-img{
        height: 225px;
      }
      }
    `;
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
  })();

  // expose the function globally so menu.html can call loadMenuItems()
  global.loadMenuItems = loadMenuItems;

})(window);
