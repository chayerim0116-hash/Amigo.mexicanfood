// ===== PRODUCT DATA =====
const PRODUCTS = [
  { id: "top01",    type: "top",    name: "Relax Cotton Shirt",  size: "XL",  price: "39,000원", color: "#e4ddd4", label: "SHIRT" },
  { id: "top02",    type: "top",    name: "Stripe Linen Shirt",  size: "M",   price: "45,000원", color: "#9e9891", label: "SHIRT" },
  { id: "top03",    type: "top",    name: "Essential Knit",      size: "L",   price: "52,000원", color: "#222222", label: "KNIT"  },
  { id: "top04",    type: "top",    name: "Cozy Oversized Tee",  size: "XL",  price: "29,000원", color: "#cac5be", label: "TEE"   },
  { id: "bottom01", type: "bottom", name: "Wide Banding Pants",  size: "XL",  price: "49,000원", color: "#c0a87a", label: "PANTS" },
  { id: "bottom02", type: "bottom", name: "Slim Straight Denim", size: "M",   price: "69,000원", color: "#2c3c58", label: "DENIM" },
  { id: "bottom03", type: "bottom", name: "Midi Flare Skirt",    size: "L",   price: "55,000원", color: "#1c1c1c", label: "SKIRT" },
  { id: "bottom04", type: "bottom", name: "Linen Wide Pants",    size: "2XL", price: "59,000원", color: "#ccc0a6", label: "PANTS" },
];

// ===== STATE =====
const state = {
  preferredSize:   "XL",
  selectedTop:     null,
  selectedBottom:  null,
  wishlist:        [],
  recentlyViewed:  [],
  cart:            [],
  activeTab:       "top",
};

// ===== LOCALSTORAGE =====
function loadState() {
  try {
    state.preferredSize  = localStorage.getItem("preferredSize") || "XL";
    state.selectedTop    = localStorage.getItem("myClothes_top") || null;
    state.selectedBottom = localStorage.getItem("myClothes_bottom") || null;
    state.wishlist       = JSON.parse(localStorage.getItem("myClothes_wishlist")      || "[]");
    state.recentlyViewed = JSON.parse(localStorage.getItem("myClothes_recentlyViewed") || "[]");
    state.cart           = JSON.parse(localStorage.getItem("myClothes_cart")          || "[]");

    // Seed demo recently-viewed if empty
    if (state.recentlyViewed.length === 0) {
      state.recentlyViewed = ["top01", "bottom01", "top03", "bottom02"];
      persist("myClothes_recentlyViewed", state.recentlyViewed);
    }

    // Default preview selections for demo
    if (!state.selectedTop)    { state.selectedTop    = "top01";    persist("myClothes_top",    "top01"); }
    if (!state.selectedBottom) { state.selectedBottom = "bottom01"; persist("myClothes_bottom", "bottom01"); }
  } catch (_) { /* localStorage unavailable — use defaults */ }
}

function persist(key, value) {
  try { localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value)); } catch (_) {}
}

// ===== HELPERS =====
function getProduct(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

// Determine readable text color for a hex background
function textColorFor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 140 ? "#333333" : "#eeeeee";
}

// ===== DOM REFS =====
const fitStage       = document.getElementById("fitStage");
const svgTopLayer    = document.getElementById("svgTopLayer");
const svgBottomLayer = document.getElementById("svgBottomLayer");
const sizeBadge      = document.getElementById("sizeBadge");
const currentSizeLabel = document.getElementById("currentSizeLabel");
const topComboText   = document.getElementById("topComboText");
const bottomComboText = document.getElementById("bottomComboText");
const comboSize      = document.getElementById("comboSize");
const comboTopText   = document.getElementById("comboTopText");
const comboBottomText = document.getElementById("comboBottomText");
const productList    = document.getElementById("productList");
const recentList     = document.getElementById("recentList");
const wishlistList   = document.getElementById("wishlistList");
const cartList       = document.getElementById("cartList");
const cartComboBtn   = document.getElementById("cartComboBtn");
const toastEl        = document.getElementById("toast");
const sizeBtns       = document.querySelectorAll(".size-btn");
const tabBtns        = document.querySelectorAll(".tab-btn");

// ===== SIZE =====
const SIZE_CLASS_MAP = {
  XS: "body-size-xs", S: "body-size-s", M: "body-size-m", L: "body-size-l",
  XL: "body-size-xl", "2XL": "body-size-2xl", "3XL": "body-size-3xl",
};

function applySize(size) {
  Object.values(SIZE_CLASS_MAP).forEach(cls => fitStage.classList.remove(cls));
  fitStage.classList.add(SIZE_CLASS_MAP[size] || "body-size-xl");

  sizeBadge.textContent     = size;
  currentSizeLabel.textContent = size;
  comboSize.textContent     = size;

  sizeBtns.forEach(btn => {
    const active = btn.dataset.size === size;
    btn.classList.toggle("size-btn-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

// ===== GARMENT LAYERS =====
function applyTop(id) {
  const product = getProduct(id);
  if (product) {
    svgTopLayer.setAttribute("fill", product.color);
    topComboText.textContent  = `${product.name} / ${product.size}`;
    comboTopText.textContent  = `${product.name} / ${product.size}`;
  } else {
    svgTopLayer.setAttribute("fill", "transparent");
    topComboText.textContent  = "—";
    comboTopText.textContent  = "선택 전";
  }
}

function applyBottom(id) {
  const product = getProduct(id);
  if (product) {
    svgBottomLayer.setAttribute("fill", product.color);
    bottomComboText.textContent  = `${product.name} / ${product.size}`;
    comboBottomText.textContent  = `${product.name} / ${product.size}`;
  } else {
    svgBottomLayer.setAttribute("fill", "transparent");
    bottomComboText.textContent  = "—";
    comboBottomText.textContent  = "선택 전";
  }
}

// ===== PRODUCT LIST =====
function renderProductList(type) {
  const products = PRODUCTS.filter(p => p.type === type);
  productList.innerHTML = "";

  products.forEach(product => {
    const isSelected   = type === "top" ? state.selectedTop === product.id : state.selectedBottom === product.id;
    const isWishlisted = state.wishlist.includes(product.id);

    const li = document.createElement("li");
    li.className = `product-card${isSelected ? " card-selected" : ""}`;
    li.setAttribute("role", "button");
    li.setAttribute("tabindex", "0");
    li.setAttribute("aria-pressed", isSelected ? "true" : "false");
    li.setAttribute("aria-label", `${product.name} 선택`);
    li.dataset.id   = product.id;
    li.dataset.type = product.type;

    li.innerHTML = `
      <div class="product-thumb" style="background-color: ${product.color};" aria-hidden="true">
        <span class="product-thumb-label" style="color: ${textColorFor(product.color)};">${product.label}</span>
      </div>
      <div class="product-info">
        <p class="product-name">${product.name}</p>
        <p class="product-meta">${product.size} · ${product.price}</p>
      </div>
      <button
        class="wish-btn${isWishlisted ? " wish-active" : ""}"
        type="button"
        aria-label="${isWishlisted ? "찜 해제" : "찜하기"}"
        aria-pressed="${isWishlisted ? "true" : "false"}"
        data-id="${product.id}"
      >${isWishlisted ? "♥" : "♡"}</button>
    `;

    li.addEventListener("click", e => {
      if (e.target.closest(".wish-btn")) return;
      selectProduct(product.id, product.type);
    });

    li.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectProduct(product.id, product.type); }
    });

    li.querySelector(".wish-btn").addEventListener("click", e => {
      e.stopPropagation();
      toggleWishlist(product.id);
    });

    productList.appendChild(li);
  });
}

// ===== SELECTION =====
function selectProduct(id, type) {
  if (type === "top") {
    state.selectedTop = id;
    persist("myClothes_top", id);
    applyTop(id);
  } else {
    state.selectedBottom = id;
    persist("myClothes_bottom", id);
    applyBottom(id);
  }
  renderProductList(type);
}

// ===== TABS =====
function switchTab(type) {
  state.activeTab = type;
  tabBtns.forEach(btn => {
    const active = btn.dataset.tab === type;
    btn.classList.toggle("tab-active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
  renderProductList(type);
}

// ===== WISHLIST =====
function toggleWishlist(id) {
  const idx = state.wishlist.indexOf(id);
  if (idx === -1) {
    state.wishlist.push(id);
  } else {
    state.wishlist.splice(idx, 1);
  }
  persist("myClothes_wishlist", state.wishlist);
  renderProductList(state.activeTab);
  renderWishlist();
}

// ===== CART COMBO =====
function addComboToCart() {
  if (!state.selectedTop || !state.selectedBottom) {
    showToast("상의와 하의를 모두 선택해주세요.");
    return;
  }
  state.cart.push({
    top:    state.selectedTop,
    bottom: state.selectedBottom,
    size:   state.preferredSize,
  });
  persist("myClothes_cart", state.cart);
  renderCart();
  showToast("현재 조합을 장바구니에 담았습니다.");
}

// ===== COLLECTION RENDERS =====
function renderRecentlyViewed() {
  renderIdCollection(recentList, state.recentlyViewed, "최근 본 상품이 없습니다.");
}

function renderWishlist() {
  renderIdCollection(wishlistList, state.wishlist, "아직 찜한 상품이 없습니다.");
}

function renderIdCollection(listEl, ids, emptyText) {
  listEl.innerHTML = "";
  if (ids.length === 0) {
    const li = document.createElement("li");
    li.className  = "empty-state";
    li.textContent = emptyText;
    listEl.appendChild(li);
    return;
  }

  ids.forEach(id => {
    const product = getProduct(id);
    if (!product) return;

    const li = document.createElement("li");
    li.className = "mini-card";
    li.setAttribute("role", "button");
    li.setAttribute("tabindex", "0");
    li.setAttribute("aria-label", `${product.name} 선택`);

    li.innerHTML = `
      <div class="mini-thumb" style="background-color: ${product.color};" aria-hidden="true">
        <span style="color: ${textColorFor(product.color)}; font-size: 8px; font-weight: 800; letter-spacing: 0.08em;">${product.label}</span>
      </div>
      <p class="mini-name">${product.name}</p>
      <p class="mini-meta">${product.type === "top" ? "상의" : "하의"} · ${product.size}</p>
    `;

    li.addEventListener("click", () => {
      if (product.type !== state.activeTab) switchTab(product.type);
      selectProduct(product.id, product.type);
    });

    li.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (product.type !== state.activeTab) switchTab(product.type);
        selectProduct(product.id, product.type);
      }
    });

    listEl.appendChild(li);
  });
}

function renderCart() {
  cartList.innerHTML = "";
  if (state.cart.length === 0) {
    const li = document.createElement("li");
    li.className   = "empty-state";
    li.textContent  = "장바구니에 담긴 상품이 없습니다.";
    cartList.appendChild(li);
    return;
  }

  state.cart.forEach((entry, idx) => {
    const top    = getProduct(entry.top);
    const bottom = getProduct(entry.bottom);
    const li = document.createElement("li");
    li.className = "cart-entry-card";
    li.innerHTML = `
      <span class="cart-entry-label">조합 ${idx + 1}</span>
      <p class="cart-entry-names">${top ? top.name : "—"} + ${bottom ? bottom.name : "—"}</p>
      <p class="cart-entry-size">기준 사이즈: ${entry.size}</p>
    `;
    cartList.appendChild(li);
  });
}

// ===== TOAST =====
let toastTimer;
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("toast-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("toast-visible"), 3000);
}

// ===== EVENT LISTENERS =====
sizeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    state.preferredSize = btn.dataset.size;
    persist("preferredSize", btn.dataset.size);
    applySize(btn.dataset.size);
  });
});

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => switchTab(btn.dataset.tab));
});

cartComboBtn.addEventListener("click", addComboToCart);

// ===== INIT =====
function init() {
  loadState();
  applySize(state.preferredSize);
  applyTop(state.selectedTop);
  applyBottom(state.selectedBottom);
  renderProductList(state.activeTab);
  renderRecentlyViewed();
  renderWishlist();
  renderCart();
}

init();
