/**
 * SMOOTHIE THERAPY — Chicken Salad Wrap Atelier Engine
 */

// Helper: Format to Indonesian Rupiah (Rp)
function formatRupiah(amount) {
  return 'Rp ' + Number(amount).toLocaleString('id-ID');
}

// 1. Ingredients Master Dataset (Menu Utama P8)
const wrapIngredients = {
  bases: {
    'tortilla': {
      id: 'tortilla',
      name: 'Classic Toasted Tortilla',
      desc: 'Tortilla gandum lembut dipanggang hangat, dasar sempurna untuk wrap sehat.',
      color: '#d4af37',
      dark: '#854d0e',
      price: 0,
      cals: 130,
      protein: 4,
      fiber: 2
    },
    'spinach-tortilla': {
      id: 'spinach-tortilla',
      name: 'Spinach & Herb Tortilla',
      desc: 'Tortilla infused bayam hijau kaya zat besi dan aroma herbal ringan.',
      color: '#15803d',
      dark: '#14532d',
      price: 2000,
      cals: 135,
      protein: 4,
      fiber: 3
    },
    'whole-wheat': {
      id: 'whole-wheat',
      name: 'Whole Wheat High-Fiber Wrap',
      desc: 'Gandum utuh berserat tinggi, mengenyangkan lebih lama dan ramah diet.',
      color: '#b45309',
      dark: '#78350f',
      price: 2000,
      cals: 125,
      protein: 5,
      fiber: 5
    }
  },

  greens: {
    'romaine': {
      id: 'romaine',
      name: 'Romaine Lettuce Segar',
      desc: 'Selada romaine renyah segar dari anggaran P8, dicuci higienis & kaya vitamin A & K.',
      color: '#4ade80',
      price: 0,
      cals: 20,
      protein: 2,
      fiber: 3
    },
    'lettuce': {
      id: 'lettuce',
      name: 'Fresh Crisp Lettuce',
      desc: 'Daun selada segar manis dan crunchy, memberikan sensasi sejuk di setiap gigitan.',
      color: '#22c55e',
      price: 0,
      cals: 15,
      protein: 1,
      fiber: 2
    },
    'duo-lettuce': {
      id: 'duo-lettuce',
      name: 'Duo Romaine & Lettuce Mix',
      desc: 'Kombinasi terbaik romaine lettuce dan fresh lettuce untuk tekstur crunch berlapis.',
      color: '#16a34a',
      price: 1000,
      cals: 25,
      protein: 2,
      fiber: 4
    }
  },

  proteins: {
    'boneless-chicken': {
      id: 'boneless-chicken',
      name: 'Savory Boneless Grilled Chicken',
      desc: 'Daging dada ayam fillet tanpa tulang, dipanggang gurih dengan rempah alami (Menu Utama Standar).',
      color: '#f59e0b',
      price: 0,
      cals: 180,
      protein: 26,
      fiber: 0
    },
    'double-chicken': {
      id: 'double-chicken',
      name: 'Double Boneless Chicken Portion',
      desc: 'Porsi ekstra dada ayam tanpa tulang untuk nutrisi protein maksimal (Total Rp 25.000).',
      color: '#d97706',
      price: 5000,
      cals: 270,
      protein: 40,
      fiber: 0
    },
    'egg-chicken': {
      id: 'egg-chicken',
      name: 'Boneless Chicken + Rebusan Telur',
      desc: 'Paduan dada ayam panggang empuk dengan potongan telur rebus bernutrisi.',
      color: '#fbbf24',
      price: 3000,
      cals: 230,
      protein: 32,
      fiber: 0
    }
  },

  dressings: {
    'signature-sauce': {
      id: 'signature-sauce',
      name: 'Signature House Salad Sauce',
      desc: 'Saus salad racikan khas Smoothie Therapy: creamy, gurih, dan ada hint kesegaran citrus.',
      color: '#fef08a',
      price: 0,
      cals: 75,
      protein: 1,
      fiber: 0
    },
    'creamy-caesar': {
      id: 'creamy-caesar',
      name: 'Creamy Garlic Caesar',
      desc: 'Saus caesar klasik dengan keju gurih, lada hitam, dan bawang putih halus.',
      color: '#fef3c7',
      price: 1000,
      cals: 85,
      protein: 2,
      fiber: 0
    },
    'roasted-sesame': {
      id: 'roasted-sesame',
      name: 'Roasted Sesame (Wijen Sangrai)',
      desc: 'Saus wijen sangrai ala Jepang dengan aroma kacang gurih manis yang nagih.',
      color: '#fed7aa',
      price: 1000,
      cals: 80,
      protein: 1,
      fiber: 1
    }
  },

  toppings: {
    'croutons': {
      id: 'croutons',
      name: 'Golden Bread Croutons',
      desc: 'Roti panggang renyah beraroma herbal ringan.',
      price: 1000,
      cals: 35,
      protein: 1,
      fiber: 1
    },
    'parmesan': {
      id: 'parmesan',
      name: 'Grated Savory Cheese',
      desc: 'Taburan keju gurih pilihan penambah kelezatan.',
      price: 2000,
      cals: 45,
      protein: 3,
      fiber: 0
    },
    'sweet-corn': {
      id: 'sweet-corn',
      name: 'Sweet Golden Corn',
      desc: 'Bulir jagung manis segar rebus.',
      price: 1000,
      cals: 30,
      protein: 1,
      fiber: 2
    },
    'chia-flax': {
      id: 'chia-flax',
      name: 'Chia & Flaxseed Superfood',
      desc: 'Biji chia & flax kaya serat dan Omega-3 alami.',
      price: 1000,
      cals: 25,
      protein: 1,
      fiber: 2
    }
  }
};

// 2. Signature Wraps Menu Dataset (Variasi Menu P8)
const signatureWraps = [
  {
    id: 'original-chicken-wrap',
    title: 'Signature Chicken Salad Wrap',
    badge: '⭐ Menu Utama P8',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80',
    tag: 'high-protein',
    base: 'tortilla',
    greens: 'romaine',
    protein: 'boneless-chicken',
    dressing: 'signature-sauce',
    toppings: ['croutons'],
    desc: 'Menu andalan Smoothie Therapy: Tortilla wrap hangat, boneless chicken empuk, romaine lettuce renyah, dan saus salad istimewa. Praktis dan mengenyangkan!',
    cals: 410,
    protein: 32,
    fiber: 6,
    price: 20000,
    isPopular: true
  },
  {
    id: 'power-double-chicken',
    title: 'Power Double Chicken Wrap',
    badge: '⚡ Double Protein Pelajar',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80',
    tag: 'high-protein',
    base: 'tortilla',
    greens: 'romaine',
    protein: 'double-chicken',
    dressing: 'signature-sauce',
    toppings: ['parmesan'],
    desc: 'Ekstra porsi ayam dada fillet tanpa tulang untuk asupan energi dan pemulihan stamina saat beraktivitas di sekolah.',
    cals: 495,
    protein: 45,
    fiber: 6,
    price: 25000,
    isPopular: false
  },
  {
    id: 'creamy-caesar-wrap',
    title: 'Creamy Garlic Caesar Wrap',
    badge: '🧀 Rich & Crunchy',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=80',
    tag: 'high-protein',
    base: 'tortilla',
    greens: 'romaine',
    protein: 'boneless-chicken',
    dressing: 'creamy-caesar',
    toppings: ['croutons', 'parmesan'],
    desc: 'Paduan saus caesar bawang putih gurih dengan taburan keju parut dan croutons garing yang memanjakan lidah.',
    cals: 460,
    protein: 35,
    fiber: 5,
    price: 23000,
    isPopular: false
  },
  {
    id: 'garden-fresh-wrap',
    title: 'Garden Fresh Veggie & Corn Wrap',
    badge: '🌱 Ringan & Renyah',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80',
    tag: 'light',
    base: 'tortilla',
    greens: 'duo-lettuce',
    protein: 'boneless-chicken',
    dressing: 'roasted-sesame',
    toppings: ['sweet-corn'],
    desc: 'Sensasi segar renyah dari kombinasi romaine, lettuce manis, jagung rebus, dan dressing wijen sangrai yang harum.',
    cals: 380,
    protein: 29,
    fiber: 7,
    price: 22000,
    isPopular: false
  }
];

// Current State
let customWrap = {
  base: 'tortilla',
  greens: 'romaine',
  protein: 'boneless-chicken',
  dressing: 'signature-sauce',
  toppings: ['croutons']
};

let orderBag = [];
let activeOrderRecord = null;
let selectedBatch = 'batch-1';
let selectedPaymentMethod = 'qris';

// ========================================================
// INITIALIZATION
// ========================================================
function init() {
  renderControls();
  renderStage();
  updateNutrition();
  renderSignatureCards();
  updateBagBadge();

  if (window.lucide) {
    lucide.createIcons();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Render Builder Controls
function renderControls() {
  renderRadioGroup('baseOptionsContainer', wrapIngredients.bases, customWrap.base, 'setWrapBase');
  renderRadioGroup('greensOptionsContainer', wrapIngredients.greens, customWrap.greens, 'setWrapGreens');
  renderRadioGroup('proteinOptionsContainer', wrapIngredients.proteins, customWrap.protein, 'setWrapProtein');
  renderRadioGroup('dressingOptionsContainer', wrapIngredients.dressings, customWrap.dressing, 'setWrapDressing');
  renderToppingsCheckboxes();
}

function renderRadioGroup(containerId, dataset, selectedKey, callbackFnName) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = Object.keys(dataset).map(key => {
    const item = dataset[key];
    const isSelected = key === selectedKey;
    const priceTag = item.price > 0 ? `+${formatRupiah(item.price)}` : 'Termasuk (Rp 0)';

    return `
      <div class="ingredient-card ${isSelected ? 'selected' : ''}" onclick="${callbackFnName}('${key}')">
        <div class="ingredient-info">
          <span class="ingredient-name">${item.name}</span>
          <span class="ingredient-desc">${item.desc}</span>
        </div>
        <span class="ingredient-price">${priceTag}</span>
      </div>
    `;
  }).join('');
}

function renderToppingsCheckboxes() {
  const container = document.getElementById('toppingsOptionsContainer');
  if (!container) return;

  container.innerHTML = Object.keys(wrapIngredients.toppings).map(key => {
    const item = wrapIngredients.toppings[key];
    const isChecked = customWrap.toppings.includes(key);

    return `
      <div class="ingredient-card ${isChecked ? 'selected' : ''}" onclick="toggleWrapTopping('${key}')">
        <div class="ingredient-info">
          <span class="ingredient-name">${item.name}</span>
          <span class="ingredient-desc">${item.desc}</span>
        </div>
        <span class="ingredient-price">+${formatRupiah(item.price)}</span>
      </div>
    `;
  }).join('');
}

// Handlers for Custom Wrap Updates
function setWrapBase(key) {
  customWrap.base = key;
  renderControls();
  renderStage();
  updateNutrition();
}

function setWrapGreens(key) {
  customWrap.greens = key;
  renderControls();
  renderStage();
  updateNutrition();
}

function setWrapProtein(key) {
  customWrap.protein = key;
  renderControls();
  renderStage();
  updateNutrition();
}

function setWrapDressing(key) {
  customWrap.dressing = key;
  renderControls();
  renderStage();
  updateNutrition();
}

function toggleWrapTopping(key) {
  const idx = customWrap.toppings.indexOf(key);
  if (idx > -1) {
    customWrap.toppings.splice(idx, 1);
  } else {
    customWrap.toppings.push(key);
  }
  renderControls();
  renderStage();
  updateNutrition();
}

// 2. Render Graphic SVG Simulation Stage
function renderStage() {
  const stage = document.getElementById('wrap3DStage');
  if (!stage) return;

  const base = wrapIngredients.bases[customWrap.base] || wrapIngredients.bases['tortilla'];
  const greens = wrapIngredients.greens[customWrap.greens] || wrapIngredients.greens['romaine'];
  const protein = wrapIngredients.proteins[customWrap.protein] || wrapIngredients.proteins['boneless-chicken'];
  const dressing = wrapIngredients.dressings[customWrap.dressing] || wrapIngredients.dressings['signature-sauce'];

  stage.innerHTML = `
    <svg viewBox="0 0 280 280" class="wrap-svg-graphic" style="width: 100%; height: 100%; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.6));">
      <defs>
        <radialGradient id="wrapSkinGrad" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stop-color="#fffbeb"/>
          <stop offset="45%" stop-color="${base.color}"/>
          <stop offset="100%" stop-color="${base.dark}"/>
        </radialGradient>
        <linearGradient id="greensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#86efac"/>
          <stop offset="60%" stop-color="${greens.color}"/>
          <stop offset="100%" stop-color="#14532d"/>
        </linearGradient>
      </defs>

      <!-- Wrap Tortilla Envelope -->
      <ellipse cx="140" cy="140" rx="122" ry="105" fill="url(#wrapSkinGrad)" stroke="#d4af37" stroke-width="2"/>
      <ellipse cx="140" cy="140" rx="114" ry="98" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" stroke-dasharray="4 4"/>

      <!-- Hydroponic Fresh Greens -->
      <path d="M 50 140 Q 90 60 140 60 Q 190 60 230 140 Q 190 215 140 215 Q 90 215 50 140 Z" fill="url(#greensGrad)" opacity="0.95"/>

      <!-- Flame Grilled Boneless Chicken Fillets -->
      <g>
        <ellipse cx="140" cy="120" rx="44" ry="24" fill="${protein.color}" stroke="#78350f" stroke-width="1.5" transform="rotate(-6, 140, 120)"/>
        <ellipse cx="120" cy="145" rx="40" ry="20" fill="${protein.color}" stroke="#78350f" stroke-width="1.5" transform="rotate(12, 120, 145)"/>
        <ellipse cx="160" cy="150" rx="38" ry="18" fill="${protein.color}" stroke="#78350f" stroke-width="1.5" transform="rotate(-15, 160, 150)"/>
      </g>

      <!-- Signature House Salad Dressing Ribbon -->
      <path d="M 75 130 Q 110 95 140 125 T 205 145" fill="none" stroke="${dressing.color}" stroke-width="8" stroke-linecap="round" opacity="0.9"/>
      <path d="M 95 155 Q 130 175 165 140 T 195 165" fill="none" stroke="${dressing.color}" stroke-width="6" stroke-linecap="round" opacity="0.9"/>

      <!-- Crunches and Toppings -->
      <circle cx="100" cy="110" r="5" fill="#f59e0b"/>
      <circle cx="175" cy="115" r="5" fill="#f59e0b"/>
      <circle cx="135" cy="165" r="6" fill="#f59e0b"/>
      <polygon points="120,95 126,102 115,102" fill="#fffbeb"/>
      <polygon points="155,100 162,106 150,107" fill="#fffbeb"/>
      <polygon points="140,140 147,146 136,147" fill="#fffbeb"/>
    </svg>
  `;
}

// 3. Nutrition & Price Calculations
function updateNutrition() {
  const base = wrapIngredients.bases[customWrap.base] || wrapIngredients.bases['tortilla'];
  const greens = wrapIngredients.greens[customWrap.greens] || wrapIngredients.greens['romaine'];
  const protein = wrapIngredients.proteins[customWrap.protein] || wrapIngredients.proteins['boneless-chicken'];
  const dressing = wrapIngredients.dressings[customWrap.dressing] || wrapIngredients.dressings['signature-sauce'];

  let cals = base.cals + greens.cals + protein.cals + dressing.cals;
  let prot = base.protein + greens.protein + protein.protein + dressing.protein;
  let fiber = base.fiber + greens.fiber + protein.fiber + dressing.fiber;
  let price = 20000 + base.price + greens.price + protein.price + dressing.price;

  customWrap.toppings.forEach(tId => {
    const t = wrapIngredients.toppings[tId];
    if (t) {
      cals += t.cals;
      prot += t.protein;
      fiber += t.fiber;
      price += t.price;
    }
  });

  const calsEl = document.getElementById('hudCals');
  const protEl = document.getElementById('hudProtein');
  const fiberEl = document.getElementById('hudFiber');
  const priceEl = document.getElementById('hudPrice');

  if (calsEl) calsEl.textContent = `${cals} kcal`;
  if (protEl) protEl.textContent = `${prot}g`;
  if (fiberEl) fiberEl.textContent = `${fiber}g`;
  if (priceEl) priceEl.textContent = formatRupiah(price);
}

// 4. Add Custom Wrap to Bag
function addCustomWrapToBag() {
  const base = wrapIngredients.bases[customWrap.base] || wrapIngredients.bases['tortilla'];
  const greens = wrapIngredients.greens[customWrap.greens] || wrapIngredients.greens['romaine'];
  const protein = wrapIngredients.proteins[customWrap.protein] || wrapIngredients.proteins['boneless-chicken'];
  const dressing = wrapIngredients.dressings[customWrap.dressing] || wrapIngredients.dressings['signature-sauce'];

  let price = 20000 + base.price + greens.price + protein.price + dressing.price;
  const toppingsList = customWrap.toppings.map(tId => wrapIngredients.toppings[tId]?.name).filter(Boolean);
  customWrap.toppings.forEach(tId => {
    price += wrapIngredients.toppings[tId]?.price || 0;
  });

  const item = {
    id: 'wrap_' + Date.now(),
    title: 'Custom Chicken Salad Wrap',
    details: `${base.name} • ${greens.name} • ${protein.name} • ${dressing.name}`,
    toppings: toppingsList.length > 0 ? `Topping: ${toppingsList.join(', ')}` : 'Topping Standar',
    price: price
  };

  orderBag.push(item);
  updateBagBadge();
  notifyGuest(`Ditambahkan ke Keranjang: Custom Wrap (${formatRupiah(price)})`);
  openCartDrawer();
}

// 5. Signature Wraps Rendering
function renderSignatureCards() {
  const container = document.getElementById('signatureGridContainer');
  if (!container) return;

  container.innerHTML = signatureWraps.map(wrap => `
    <div class="signature-card">
      <div class="signature-img-wrap">
        <img src="${wrap.image}" alt="${wrap.title}" class="signature-card-img" loading="lazy">
        <span class="badge-tag">${wrap.badge}</span>
      </div>
      <div class="signature-card-body">
        <div class="signature-card-header">
          <h3 class="signature-title">${wrap.title}</h3>
          <span class="signature-price">${formatRupiah(wrap.price)}</span>
        </div>
        <p class="signature-desc">${wrap.desc}</p>
        
        <div class="signature-macros-row">
          <span>🔥 ${wrap.cals} kcal</span>
          <span>💪 ${wrap.protein}g Protein</span>
          <span>🌿 ${wrap.fiber}g Serat</span>
        </div>

        <div class="signature-actions">
          <button class="btn-ghost" onclick="loadSignatureToStudio('${wrap.id}')">Sesuaikan di Studio</button>
          <button class="btn-gold" onclick="addSignatureToBag('${wrap.id}')">+ Pesan</button>
        </div>
      </div>
    </div>
  `).join('');
}

function loadSignatureToStudio(id) {
  const wrap = signatureWraps.find(w => w.id === id);
  if (!wrap) return;

  customWrap = {
    base: wrap.base,
    greens: wrap.greens,
    protein: wrap.protein,
    dressing: wrap.dressing,
    toppings: [...wrap.toppings]
  };

  renderControls();
  renderStage();
  updateNutrition();

  document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' });
  notifyGuest(`Memuat resep: ${wrap.title}`);
}

function addSignatureToBag(id) {
  const wrap = signatureWraps.find(w => w.id === id);
  if (!wrap) return;

  orderBag.push({
    id: 'sig_' + Date.now() + Math.random().toString(36).substr(2, 4),
    title: wrap.title,
    details: wrap.desc,
    toppings: wrap.badge,
    price: wrap.price
  });

  updateBagBadge();
  notifyGuest(`Ditambahkan: ${wrap.title} (${formatRupiah(wrap.price)})`);
  openCartDrawer();
}

// ========================================================
// CART FOLIO & DRAWER
// ========================================================
function updateBagBadge() {
  const badge = document.getElementById('cartBadgeCount');
  if (badge) badge.textContent = orderBag.length;
}

function openCartDrawer() {
  renderCartDrawer();
  document.getElementById('cartDrawerOverlay')?.classList.add('open');
  document.getElementById('cartDrawer')?.classList.add('open');
}

function closeCartDrawer() {
  document.getElementById('cartDrawerOverlay')?.classList.remove('open');
  document.getElementById('cartDrawer')?.classList.remove('open');
}

function renderCartDrawer() {
  const list = document.getElementById('cartDrawerItemsList');
  const subtotalEl = document.getElementById('drawerSubtotal');
  const totalEl = document.getElementById('drawerGrandTotal');
  if (!list) return;

  if (orderBag.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
        <i data-lucide="shopping-bag" style="width: 44px; height: 44px; color: var(--gold); opacity: 0.5; margin-bottom: 12px;"></i>
        <h4>Keranjang Pesanan Kosong</h4>
        <p style="font-size: 0.85rem; margin-top: 6px;">Pilih menu Chicken Salad Wrap andalan P8 di atas untuk memulai Pre-Order.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = 'Rp 0';
    if (totalEl) totalEl.textContent = 'Rp 0';
    if (window.lucide) lucide.createIcons();
    return;
  }

  const grandTotal = orderBag.reduce((acc, item) => acc + item.price, 0);

  list.innerHTML = orderBag.map((item, index) => `
    <div class="cart-item-card">
      <div class="cart-item-title">#${index + 1} ${item.title}</div>
      <div class="cart-item-desc">${item.details}</div>
      <div class="cart-item-desc" style="color: var(--gold); font-size: 0.72rem;">${item.toppings}</div>
      <div class="cart-item-footer">
        <span class="cart-item-price">${formatRupiah(item.price)}</span>
        <button class="btn-remove-item" onclick="removeFromBag('${item.id}')">
          <i data-lucide="trash-2" style="width: 12px; height: 12px;"></i>
          <span>Hapus</span>
        </button>
      </div>
    </div>
  `).join('');

  if (subtotalEl) subtotalEl.textContent = formatRupiah(grandTotal);
  if (totalEl) totalEl.textContent = formatRupiah(grandTotal);
  if (window.lucide) lucide.createIcons();
}

function removeFromBag(id) {
  orderBag = orderBag.filter(item => item.id !== id);
  updateBagBadge();
  renderCartDrawer();
}

// ========================================================
// CHECKOUT & PRE-ORDER MODAL
// ========================================================
function openCheckoutModal() {
  if (orderBag.length === 0) {
    addCustomWrapToBag();
  }
  closeCartDrawer();
  updateCheckoutTotal();

  const countBadge = document.getElementById('checkoutBadgeCount');
  const totalBadge = document.getElementById('checkoutBadgeTotal');
  const miniList = document.getElementById('checkoutMiniList');
  const grandTotal = orderBag.reduce((acc, item) => acc + item.price, 0);

  if (countBadge) countBadge.textContent = `${orderBag.length} Wrap`;
  if (totalBadge) totalBadge.textContent = formatRupiah(grandTotal);
  if (miniList) {
    miniList.innerHTML = orderBag.map(it => `
      <span class="mini-item-chip">${it.title} (${formatRupiah(it.price)})</span>
    `).join('');
  }

  setPaymentMethod(selectedPaymentMethod);
  document.getElementById('checkoutModal')?.classList.add('open');
}

function closeCheckoutModal() {
  document.getElementById('checkoutModal')?.classList.remove('open');
}

function setPaymentMethod(method) {
  selectedPaymentMethod = method;
  ['qris', 'transfer', 'cash'].forEach(m => {
    const el = document.getElementById(`pay_${m}`);
    if (el) {
      if (m === method) el.classList.add('active');
      else el.classList.remove('active');
    }
  });

  const hints = {
    'qris': '⚡ Scan QRIS via GoPay, BCA, Livin, Dana, atau ShopeePay.',
    'transfer': '🏦 Rekening bank panitia akan dikirimkan otomatis via WhatsApp.',
    'cash': '💵 Catatan: Pembayaran tunai HANYA berlaku bagi yang bisa datang langsung ke sekolah / transaksi di booth.'
  };

  const hintEl = document.getElementById('payHintText');
  if (hintEl) {
    hintEl.textContent = hints[method] || '';
    if (method === 'cash') {
      hintEl.style.borderColor = 'rgba(245, 158, 11, 0.4)';
      hintEl.style.color = '#fde68a';
    } else {
      hintEl.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      hintEl.style.color = '#cbd5e1';
    }
  }
}

function updateCheckoutTotal() {
  const grandTotal = orderBag.reduce((acc, item) => acc + item.price, 0);
  const priceTag = document.getElementById('btnPriceTag');
  if (priceTag) priceTag.textContent = formatRupiah(grandTotal);
  const totalBadge = document.getElementById('checkoutBadgeTotal');
  if (totalBadge) totalBadge.textContent = formatRupiah(grandTotal);
}

function executeOrderPayment() {
  const customerName = document.getElementById('recipientNameInput')?.value?.trim();
  const deliveryAddress = document.getElementById('deliveryAddressInput')?.value?.trim();
  const notes = document.getElementById('orderNotesInput')?.value?.trim() || 'Tanpa catatan khusus';

  if (!customerName) {
    alert('Silakan masukkan nama lengkap Anda.');
    document.getElementById('recipientNameInput')?.focus();
    return;
  }

  if (!deliveryAddress) {
    alert('Silakan masukkan Alamat Pengiriman Anda.');
    document.getElementById('deliveryAddressInput')?.focus();
    return;
  }

  const grandTotal = orderBag.reduce((acc, item) => acc + item.price, 0);
  const orderCode = '#WRAP-P8-' + Math.floor(1000 + Math.random() * 9000);

  const paymentMap = {
    'qris': 'QRIS (E-Wallet / M-Banking)',
    'transfer': 'Transfer Bank Panitia P8',
    'cash': 'Tunai (Khusus datang langsung ke sekolah)'
  };

  activeOrderRecord = {
    code: orderCode,
    name: customerName,
    address: deliveryAddress,
    payment: paymentMap[selectedPaymentMethod] || 'QRIS',
    notes: notes,
    items: [...orderBag],
    total: grandTotal
  };

  // Construct structured WhatsApp message
  let orderItemsText = activeOrderRecord.items.map((it, idx) => `${idx + 1}. ${it.title} (${formatRupiah(it.price)})`).join('%0A');
  
  const waMessage = `Halo%20Tim%20Smoothie%20Therapy!%0A%0ASaya%20ingin%20melakukan%20Pre-Order%20Chicken%20Salad%20Wrap:%0A----------------------------%0AKode%20Pesanan:%20${encodeURIComponent(orderCode)}%0ANama:%20${encodeURIComponent(customerName)}%0AAlamat%20Pengiriman:%20${encodeURIComponent(deliveryAddress)}%0AMetode%20Bayar:%20${encodeURIComponent(activeOrderRecord.payment)}%0A%0ARincian%20Pesanan:%0A${orderItemsText}%0A%0ACatatan:%20${encodeURIComponent(notes)}%0ATotal:%20${encodeURIComponent(formatRupiah(grandTotal))}%0A----------------------------%0AMohon%20konfirmasi%20pesanan%20saya.%20Terima%20kasih!`;

  closeCheckoutModal();
  orderBag = [];
  updateBagBadge();

  launchTrackerModal(activeOrderRecord);

  // Open WhatsApp in new tab
  window.open(`https://wa.me/628118411410?text=${waMessage}`, '_blank');
}

// 7. Order Confirmation Modal
function launchTrackerModal(order) {
  const codeEl = document.getElementById('trackerOrderCode');
  const addressEl = document.getElementById('trackerAddressText');
  const studentEl = document.getElementById('trackerStudentText');
  const totalEl = document.getElementById('trackerTotalText');

  if (codeEl) codeEl.textContent = order.code;
  if (addressEl) addressEl.textContent = order.address;
  if (studentEl) studentEl.textContent = order.name;
  if (totalEl) totalEl.textContent = formatRupiah(order.total);

  document.getElementById('trackerModal')?.classList.add('open');
}

function closeTrackerModal() {
  document.getElementById('trackerModal')?.classList.remove('open');
}

// ========================================================
// CONCIERGE CHATBOX
// ========================================================
function toggleConcierge() {
  const win = document.getElementById('conciergeWindow');
  if (!win) return;
  win.classList.toggle('open');
}

function handleConciergeKey(e) {
  if (e.key === 'Enter') sendConciergeMessage();
}

function sendConciergeMessage() {
  const input = document.getElementById('conciergeChatInput');
  const body = document.getElementById('conciergeMessagesBody');
  if (!input || !body) return;

  const text = input.value.trim();
  if (!text) return;

  // Add User Message
  const userDiv = document.createElement('div');
  userDiv.className = 'chat-msg user';
  userDiv.textContent = text;
  body.appendChild(userDiv);
  input.value = '';

  // Auto reply
  setTimeout(() => {
    const botDiv = document.createElement('div');
    botDiv.className = 'chat-msg bot';

    const lower = text.toLowerCase();
    if (lower.includes('harga') || lower.includes('price')) {
      botDiv.textContent = "Chicken Salad Wrap kami dibanderol seharga Rp 20.000 (varian standar) hingga Rp 25.000 (double chicken), sangat terjangkau!";
    } else if (lower.includes('batch') || lower.includes('jadwal') || lower.includes('po')) {
      botDiv.textContent = "Pesanan disiapkan segar setiap hari menggunakan bahan baku higienis dan terstandarisasi.";
    } else if (lower.includes('qris') || lower.includes('bayar')) {
      botDiv.textContent = "Kami menerima pembayaran melalui QRIS (GoPay, OVO, Dana, BCA, Livin), Transfer Bank, dan Tunai (Cash) langsung di sekolah!";
    } else if (lower.includes('protein') || lower.includes('ayam')) {
      botDiv.textContent = "Kami menggunakan 100% daging dada ayam fillet tanpa tulang (boneless chicken) yang dipanggang dengan bumbu rempah lezat dan tinggi protein!";
    } else {
      botDiv.textContent = "Halo! Kamu bisa memesan Chicken Salad Wrap langsung lewat form Pre-Order atau chat panitia kami di WhatsApp!";
    }

    body.appendChild(botDiv);
    body.scrollTop = body.scrollHeight;
  }, 450);

  body.scrollTop = body.scrollHeight;
}

// Guest Notification Toast
function notifyGuest(msg) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = '#141210';
  toast.style.color = '#ffffff';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '9999px';
  toast.style.border = '1px solid #d4af37';
  toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8)';
  toast.style.zIndex = '9999';
  toast.style.fontSize = '0.88rem';
  toast.style.fontWeight = '600';
  toast.textContent = msg;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}
