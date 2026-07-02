// ======================== EASE FIT — Main Page Script ========================

// ---- Product Data ----
const products = [
  {
    id: "p01",
    name: "Relax Cotton Shirt",
    category: "Top",
    price: "39,000원",
    sizeRange: "XS~3XL",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    modelCuts: ["S", "M", "XL", "2XL"],
    stock: { XS: true, S: true, M: true, L: true, XL: true, "2XL": true, "3XL": false },
    fitTags: ["정사이즈", "어깨 여유", "힙 덮는 기장"]
  },
  {
    id: "p02",
    name: "Wide Banding Pants",
    category: "Bottom",
    price: "49,000원",
    sizeRange: "XS~3XL",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    modelCuts: ["M", "L", "XL"],
    stock: { XS: true, S: true, M: true, L: true, XL: true, "2XL": false, "3XL": true },
    fitTags: ["여유핏", "밴딩 허리", "와이드 실루엣"]
  },
  {
    id: "p03",
    name: "Soft Knit Top",
    category: "Top",
    price: "45,000원",
    sizeRange: "XS~2XL",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL"],
    modelCuts: ["S", "M", "L", "2XL"],
    stock: { XS: true, S: true, M: false, L: true, XL: true, "2XL": true },
    fitTags: ["슬림핏", "보디라인", "신축성"]
  },
  {
    id: "p04",
    name: "Linen Blend Cardigan",
    category: "Outerwear",
    price: "59,000원",
    sizeRange: "XS~3XL",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    modelCuts: ["M", "XL", "3XL"],
    stock: { XS: true, S: true, M: true, L: true, XL: true, "2XL": true, "3XL": true },
    fitTags: ["루즈핏", "린넨 혼방", "여름 아우터"]
  },
  {
    id: "p05",
    name: "Midi Wrap Skirt",
    category: "Bottom",
    price: "42,000원",
    sizeRange: "XS~2XL",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL"],
    modelCuts: ["S", "M", "XL"],
    stock: { XS: false, S: true, M: true, L: true, XL: true, "2XL": true },
    fitTags: ["미디 기장", "랩 스커트", "A라인"]
  },
  {
    id: "p06",
    name: "Structured Blazer",
    category: "Outerwear",
    price: "89,000원",
    sizeRange: "S~2XL",
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    modelCuts: ["M", "L", "XL"],
    stock: { S: true, M: true, L: true, XL: false, "2XL": true },
    fitTags: ["세미오버핏", "숄더 패드", "포멀"]
  },
  {
    id: "p07",
    name: "Rib Knit Dress",
    category: "Dress",
    price: "55,000원",
    sizeRange: "XS~3XL",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    modelCuts: ["S", "M", "L", "XL", "2XL"],
    stock: { XS: true, S: true, M: true, L: true, XL: true, "2XL": true, "3XL": false },
    fitTags: ["리브 니트", "바디컨", "미디 기장"]
  },
  {
    id: "p08",
    name: "Cotton Jogger Pants",
    category: "Bottom",
    price: "38,000원",
    sizeRange: "XS~3XL",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    modelCuts: ["M", "XL"],
    stock: { XS: true, S: true, M: true, L: true, XL: true, "2XL": true, "3XL": true },
    fitTags: ["조거 팬츠", "코튼 100%", "편안한 핏"]
  },
  {
    id: "p09",
    name: "Oversized T-Shirt",
    category: "Top",
    price: "25,000원",
    sizeRange: "XS~3XL",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    modelCuts: ["S", "M", "L", "XL", "3XL"],
    stock: { XS: true, S: true, M: true, L: true, XL: true, "2XL": false, "3XL": true },
    fitTags: ["오버사이즈", "코튼 100%", "데일리"]
  },
  {
    id: "p10",
    name: "Pleated Wide Pants",
    category: "Bottom",
    price: "62,000원",
    sizeRange: "XS~2XL",
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL"],
    modelCuts: ["M", "L"],
    stock: { XS: false, S: true, M: true, L: true, XL: true, "2XL": false },
    fitTags: ["플리츠 와이드", "하이웨이스트", "드레이프"]
  }
];

// ---- State ----
let currentSize = "M";

// ---- Init ----
function init() {
  const saved = localStorage.getItem("preferredSize");
  if (saved) {
    currentSize = saved;
    console.log("saved preferredSize:", saved);
  }
  applySize(currentSize);
  initSizeButtons();
  initCTAButtons();
}

// ---- 사이즈 선택 시 전체 UI 갱신 ----
function applySize(size) {
  setActiveButton(size);
  updateCurrentBasisLabel(size);
  updateFitViewMessage(size);
  updateProductSectionDesc(size);
  renderProducts(size);
}

// ---- 선택 버튼 active 처리 ----
function setActiveButton(size) {
  document.querySelectorAll(".size-pill").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.size === size);
  });
}

// ---- "현재 기준:" 텍스트 ----
function updateCurrentBasisLabel(size) {
  const el = document.getElementById("currentBasisLabel");
  if (el) el.textContent = size === "ALL" ? "전체" : size;
}

// ---- My Fit View 안내 문구 ----
function updateFitViewMessage(size) {
  const main = document.getElementById("fitMsgMain");
  const sub = document.getElementById("fitMsgSub");
  if (!main || !sub) return;

  if (size === "ALL") {
    main.textContent = "전체 사이즈를 보여드릴게요.";
    sub.textContent = "다양한 사이즈의 착용컷과 상품을 자유롭게 비교해보세요.";
  } else {
    main.textContent = `${size} 기준으로 보여드릴게요.`;
    sub.textContent = `${size} 착용컷과 구매 가능한 상품을 먼저 확인해보세요.`;
  }
}

// ---- 상품 섹션 설명 문구 ----
function updateProductSectionDesc(size) {
  const el = document.getElementById("productSectionDesc");
  if (!el) return;
  el.textContent = size === "ALL"
    ? "전체 사이즈 상품을 자유롭게 둘러보세요."
    : `${size} 기준으로 먼저 보는 추천 상품`;
}

// ---- 상품 정렬 (1순위: 재고+착용컷, 2순위: 재고, 3순위: 품절이지만 다른 사이즈 가능) ----
function sortProducts(prods, size) {
  if (size === "ALL") return [...prods];
  return [...prods].sort((a, b) => getScore(b, size) - getScore(a, size));
}

function getScore(product, size) {
  if (!product.availableSizes.includes(size)) return 0;
  const hasStock = product.stock[size];
  const hasModelCut = product.modelCuts.includes(size);
  if (hasStock && hasModelCut) return 3;
  if (hasStock) return 2;
  return 1;
}

// ---- 상품 카드 HTML 생성 ----
function productCardHTML(product, size) {
  let stockBadge = "";
  let cutBadge = "";

  if (size === "ALL") {
    stockBadge = `<span class="badge">전체 사이즈 보기</span>`;
  } else {
    const inRange = product.availableSizes.includes(size);

    if (!inRange) {
      stockBadge = `<span class="badge badge--unavail">이 사이즈 없음</span>`;
    } else {
      stockBadge = product.stock[size]
        ? `<span class="badge badge--avail">${size} 재고 있음</span>`
        : `<span class="badge badge--soldout">${size} 품절</span>`;

      cutBadge = product.modelCuts.includes(size)
        ? `<span class="badge badge--cut">${size} 착용컷 보기 가능</span>`
        : `<span class="badge badge--cut-none">${size} 착용컷 준비중</span>`;
    }
  }

  const rangeBadge = `<span class="badge badge--range">${product.sizeRange}</span>`;
  const fitTagsHTML = product.fitTags.map(t => `<span class="fit-tag">${t}</span>`).join("");

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-img-wrap">
        <div class="product-img-placeholder">
          <span>${product.name}</span>
        </div>
      </div>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${product.price}</p>
        <div class="product-badges">
          ${rangeBadge}
          ${stockBadge}
          ${cutBadge}
        </div>
        <div class="fit-tags">${fitTagsHTML}</div>
      </div>
    </article>
  `;
}

// ---- 상품 렌더링 ----
function renderProducts(size) {
  console.log("render products by:", size);
  const sorted = sortProducts(products, size);
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = sorted.map(p => productCardHTML(p, size)).join("");

  grid.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
      console.log("product clicked", card.dataset.id);
    });
  });
}

// ---- 사이즈 버튼 이벤트 ----
function initSizeButtons() {
  document.querySelectorAll(".size-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      const size = btn.dataset.size;
      currentSize = size;
      localStorage.setItem("preferredSize", size);
      console.log("preferredSize:", size);
      applySize(size);
    });
  });
}

// ---- CTA 버튼 이벤트 ----
function initCTAButtons() {
  // 히어로 CTA → My Fit View로 부드럽게 스크롤
  document.getElementById("heroCtaBtn")?.addEventListener("click", () => {
    document.getElementById("myFitView")?.scrollIntoView({ behavior: "smooth" });
  });

  // MY CLOTHES 버튼 → 페이지 이동 또는 alert
  document.getElementById("myClothesBtn")?.addEventListener("click", () => {
    window.location.href = "my-clothes.html";
  });
}

// ---- Start ----
document.addEventListener("DOMContentLoaded", init);
