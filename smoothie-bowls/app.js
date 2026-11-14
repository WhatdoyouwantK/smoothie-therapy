/**
 * SMOOTHIE THERAPY — Superfood Smoothie Bowl & Malibu Mango Atelier Engine
 */

// Helper: Format to Indonesian Rupiah (Rp)
function formatRupiah(amount) {
  return 'Rp ' + Number(amount).toLocaleString('id-ID');
}

// 1. Bowls & Ingredients Master Dataset (Menu Utama P8)
const smoothieData = {
  bases: {
    'strawberry-smoothie-bowl': {
      id: 'strawberry-smoothie-bowl',
      name: 'Strawberry Smoothie Bowl (Menu Utama)',
      desc: '100% frozen strawberry pilihan & frozen banana whipped kental dengan yoghurt/susu oat & protein powder. Disajikan di paper bowl ramah lingkungan.',
      color: '#f43f5e',
      swirlColor: '#fb7185',
      bowlFill: '#e11d48',
      price: 22000,
      cals: 320,
      protein: 12,
      fiber: 9,
      tag: 'Antioxidant & Creamy'
    },
    'malibu-mango': {
      id: 'malibu-mango',
      name: 'Malibu Mango Tropical Smoothie (Juice)',
      desc: 'Perpaduan frozen mango, banana, pineapple, coconut milk, dan madu murni. Disajikan dingin menyegarkan dalam botol plastik higienis.',
      color: '#f59e0b',
      swirlColor: '#fbbf24',
      bowlFill: '#d97706',
      price: 18000,
      cals: 260,
      protein: 4,
      fiber: 6,
      tag: 'Tropical Hydration & Vitamin C'
    }
  },

  boosters: {
    'protein-powder': {
      id: 'protein-powder',
      name: 'Pure Protein Powder Boost',
      desc: '+12g protein murni untuk ketahanan fisik & pembentukan otot.',
      price: 3000,
      cals: 50,
      protein: 12,
      fiber: 0
    },
    'oat-milk': {
      id: 'oat-milk',
      name: 'Oat Milk Creamy (Bahan Segar P8)',
      desc: 'Susu gandum nabati bebas laktosa dengan kelembutan alami.',
      price: 2000,
      cals: 40,
      protein: 2,
      fiber: 2
    },
    'pure-honey': {
      id: 'pure-honey',
      name: 'Madu Murni Alami (Honey)',
      desc: 'Pemanis alami kaya enzim pelindung imunitas tubuh.',
      price: 1000,
      cals: 30,
      protein: 0,
      fiber: 0
    },
    'chia-seeds': {
      id: 'chia-seeds',
      name: 'Superfood Organic Chia Seeds',
      desc: 'Biji chia super kaya Omega-3 dan serat larut.',
      price: 1000,
      cals: 25,
      protein: 1,
      fiber: 3
    }
  },

  toppings: {
    'granola': {
      id: 'granola',
      name: 'Crunchy Toasted Granola',
      desc: 'Granola madu renyah (Bahan Segar P8) pelengkap tekstur crunchy.',
      price: 2000,
      cals: 65,
      protein: 2,
      fiber: 2
    },
    'fresh-strawberry': {
      id: 'fresh-strawberry',
      name: 'Irisan Stroberi Segar',
      desc: 'Potongan buah stroberi segar kaya vitamin C.',
      price: 2000,
      cals: 20,
      protein: 0,
      fiber: 2
    },
    'fresh-banana': {
      id: 'fresh-banana',
      name: 'Irisan Pisang Ambon Segar',
      desc: 'Potongan pisang matang lembut dan manis alami.',
      price: 1000,
      cals: 35,
      protein: 1,
      fiber: 1
    },
    'coconut-flakes': {
      id: 'coconut-flakes',
      name: 'Toasted Coconut Flakes',
      desc: 'Parutan kelapa sangrai harum dan gurih.',
      price: 1000,
      cals: 30,
      protein: 0,
      fiber: 1
    }
  }
};

// State
let currentBowl = {
  base: 'strawberry-smoothie-bowl',
  booster: 'protein-powder',
  toppings: ['granola', 'fresh-strawberry']
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

// Render Controls
function renderControls() {
  renderBaseTabs();
  renderBoosters();
  renderToppings();
}

function renderBaseTabs() {
  const container = document.getElementById('baseSelectorContainer');
  if (!container) return;

  container.innerHTML = Object.keys(smoothieData.bases).map(key => {
    const b = smoothieData.bases[key];
    const isActive = key === currentBowl.base;
    return `
      <div class="base-tab-card ${isActive ? 'active' : ''}" onclick="selectBase('${key}')">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
          <h4 style="font-weight: 700; color: #ffffff; font-size: 0.95rem;">${b.name}</h4>
          <span style="font-weight: 800; color: ${b.color}; font-size: 0.9rem;">${formatRupiah(b.price)}</span>
        </div>
        <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4;">${b.desc}</p>
        <div style="margin-top: 8px;">
          <span style="font-size: 0.7rem; padding: 2px 8px; border-radius: 9999px; background: rgba(255,255,255,0.06); color: ${b.swirlColor};">${b.tag}</span>
        </div>
      </div>
    `;
  }).join('');
}

function selectBase(key) {
  currentBowl.base = key;
  renderBaseTabs();
  renderStage();
  updateNutrition();
}

function renderBoosters() {
  const container = document.getElementById('boostersContainer');
  if (!container) return;

  container.innerHTML = Object.keys(smoothieData.boosters).map(key => {
    const item = smoothieData.boosters[key];
    const isSelected = key === currentBowl.booster;
    return `
      <div class="booster-chip ${isSelected ? 'selected' : ''}" onclick="selectBooster('${key}')">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <span style="font-weight: 600; font-size: 0.84rem; color: #ffffff;">${item.name}</span>
          <span style="font-size: 0.78rem; color: var(--gold); font-weight: 700;">+${formatRupiah(item.price)}</span>
        </div>
        <span style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">${item.desc}</span>
      </div>
    `;
  }).join('');
}

function selectBooster(key) {
  currentBowl.booster = key;
  renderBoosters();
  updateNutrition();
}

function renderToppings() {
  const container = document.getElementById('toppingsContainer');
  if (!container) return;

  container.innerHTML = Object.keys(smoothieData.toppings).map(key => {
    const item = smoothieData.toppings[key];
    const isChecked = currentBowl.toppings.includes(key);
    return `
      <div class="topping-toggle-card ${isChecked ? 'active' : ''}" onclick="toggleTopping('${key}')">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 600; font-size: 0.85rem; color: #ffffff;">${item.name}</span>
          <span style="font-size: 0.78rem; color: #fb7185; font-weight: 700;">+${formatRupiah(item.price)}</span>
        </div>
        <span style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">${item.desc}</span>
      </div>
    `;
  }).join('');
}

function toggleTopping(key) {
  const idx = currentBowl.toppings.indexOf(key);
  if (idx > -1) {
    currentBowl.toppings.splice(idx, 1);
  } else {
    currentBowl.toppings.push(key);
  }
  renderToppings();
  renderStage();
  updateNutrition();
}

// 2. Render Stage Graphic SVG
function renderStage() {
  const stage = document.getElementById('bowlStageSvgContainer');
  if (!stage) return;

  const base = smoothieData.bases[currentBowl.base] || smoothieData.bases['strawberry-smoothie-bowl'];
  const isMalibuBottle = currentBowl.base === 'malibu-mango';

  if (isMalibuBottle) {
    // Render Chilled Tropical Bottle Graphic
    stage.innerHTML = `
      <svg viewBox="0 0 280 280" style="width: 100%; height: 100%; filter: drop-shadow(0 15px 35px rgba(0,0,0,0.7));">
        <defs>
          <linearGradient id="juiceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="40%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#d97706"/>
          </linearGradient>
          <linearGradient id="bottleGlass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(255,255,255,0.4)"/>
            <stop offset="20%" stop-color="rgba(255,255,255,0.1)"/>
            <stop offset="80%" stop-color="rgba(255,255,255,0.05)"/>
            <stop offset="100%" stop-color="rgba(255,255,255,0.3)"/>
          </linearGradient>
        </defs>

        <!-- Plastic Bottle Body -->
        <rect x="95" y="65" width="90" height="170" rx="20" fill="url(#juiceGrad)" stroke="#d4af37" stroke-width="2"/>
        <rect x="95" y="65" width="90" height="170" rx="20" fill="url(#bottleGlass)"/>

        <!-- Bottle Cap -->
        <rect x="115" y="42" width="50" height="23" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>

        <!-- Frost / Ice Drops -->
        <circle cx="115" cy="110" r="4" fill="rgba(255,255,255,0.7)"/>
        <circle cx="160" cy="140" r="3" fill="rgba(255,255,255,0.7)"/>
        <circle cx="130" cy="180" r="5" fill="rgba(255,255,255,0.7)"/>
        <circle cx="150" cy="90" r="3" fill="rgba(255,255,255,0.6)"/>

        <!-- Label Badge -->
        <rect x="105" y="115" width="70" height="45" rx="6" fill="#141210" stroke="#d4af37" stroke-width="1"/>
        <text x="140" y="132" font-size="9" font-weight="bold" fill="#f59e0b" text-anchor="middle">MALIBU</text>
        <text x="140" y="145" font-size="8" fill="#ffffff" text-anchor="middle">MANGO</text>
        <text x="140" y="153" font-size="6" fill="#94a3b8" text-anchor="middle">SMOOTHIE THERAPY</text>
      </svg>
    `;
    return;
  }

  // Render Paper Bowl Graphic
  stage.innerHTML = `
    <svg viewBox="0 0 280 280" style="width: 100%; height: 100%; filter: drop-shadow(0 15px 35px rgba(0,0,0,0.7));">
      <defs>
        <radialGradient id="bowlInnerGrad" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stop-color="${base.swirlColor}"/>
          <stop offset="65%" stop-color="${base.color}"/>
          <stop offset="100%" stop-color="${base.bowlFill}"/>
        </radialGradient>
        <linearGradient id="bowlRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#94a3b8"/>
        </linearGradient>
      </defs>

      <!-- Eco Paper Bowl Outer -->
      <ellipse cx="140" cy="145" rx="122" ry="105" fill="#1e1b18" stroke="#d4af37" stroke-width="2.5"/>
      <ellipse cx="140" cy="140" rx="114" ry="96" fill="url(#bowlRimGrad)" opacity="0.9"/>

      <!-- Thick Gelato Smoothie Base -->
      <ellipse cx="140" cy="140" rx="108" ry="90" fill="url(#bowlInnerGrad)"/>

      <!-- Sub-Zero Cream Swirl Lines -->
      <path d="M 60 140 Q 110 75 140 135 T 220 140" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="5" stroke-linecap="round"/>
      <path d="M 80 160 Q 130 185 165 145 T 205 160" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="4" stroke-linecap="round"/>

      <!-- Granola & Strawberry Topping Scatter -->
      <g>
        <!-- Granola pieces -->
        <circle cx="100" cy="115" r="4" fill="#fbbf24"/>
        <circle cx="120" cy="100" r="5" fill="#f59e0b"/>
        <circle cx="150" cy="105" r="4" fill="#fbbf24"/>
        <circle cx="170" cy="120" r="5" fill="#d97706"/>
        <circle cx="110" cy="155" r="4" fill="#fbbf24"/>
        <circle cx="160" cy="165" r="4" fill="#f59e0b"/>

        <!-- Strawberry cuts -->
        <polygon points="85,125 95,140 75,140" fill="#f43f5e" stroke="#e11d48" stroke-width="1"/>
        <polygon points="175,135 185,150 165,150" fill="#f43f5e" stroke="#e11d48" stroke-width="1"/>
        <polygon points="135,160 145,175 125,175" fill="#f43f5e" stroke="#e11d48" stroke-width="1"/>
      </g>
    </svg>
  `;
}

// 3. Nutrition & Price Calculations
function updateNutrition() {
  const base = smoothieData.bases[currentBowl.base] || smoothieData.bases['strawberry-smoothie-bowl'];
  const booster = smoothieData.boosters[currentBowl.booster];

  let cals = base.cals;
  let prot = base.protein;
  let fiber = base.fiber;
  let price = base.price;

  if (booster) {
    cals += booster.cals;
    prot += booster.protein;
    fiber += booster.fiber;
    price += booster.price;
  }

  currentBowl.toppings.forEach(tKey => {
    const t = smoothieData.toppings[tKey];
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

// 4. Add Custom Bowl to Bag
function addCustomBowlToBag() {
  const base = smoothieData.bases[currentBowl.base] || smoothieData.bases['strawberry-smoothie-bowl'];
  const booster = smoothieData.boosters[currentBowl.booster];

  let price = base.price;
  if (booster) price += booster.price;

  const toppingsList = currentBowl.toppings.map(tKey => smoothieData.toppings[tKey]?.name).filter(Boolean);
  currentBowl.toppings.forEach(tKey => {
    price += smoothieData.toppings[tKey]?.price || 0;
  });

  const item = {
    id: 'bowl_' + Date.now(),
    title: base.name,
    details: `${booster ? booster.name : 'Standar'} • ${toppingsList.length > 0 ? toppingsList.join(', ') : 'Tanpa topping tambahan'}`,
    price: price
  };

  orderBag.push(item);
  updateBagBadge();
  notifyGuest(`Ditambahkan ke Keranjang: ${base.name} (${formatRupiah(price)})`);
  openCartDrawer();
}

function addSignatureBowlToBag(baseId) {
  const base = smoothieData.bases[baseId];
  if (!base) return;

  orderBag.push({
    id: 'sig_' + Date.now() + Math.random().toString(36).substr(2, 4),
    title: base.name,
    details: base.desc,
    price: base.price
  });

  updateBagBadge();
  notifyGuest(`Ditambahkan: ${base.name} (${formatRupiah(base.price)})`);
  openCartDrawer();
}

function loadSignatureBowlToStudio(baseId) {
  currentBowl.base = baseId;
  renderBaseTabs();
  renderStage();
  updateNutrition();
  document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' });
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
        <i data-lucide="shopping-bag" style="width: 44px; height: 44px; color: #fb7185; opacity: 0.5; margin-bottom: 12px;"></i>
        <h4>Keranjang Pesanan Kosong</h4>
        <p style="font-size: 0.85rem; margin-top: 6px;">Pilih Strawberry Smoothie Bowl atau Malibu Mango di atas untuk memulai Pre-Order.</p>
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
      <div class="cart-item-footer">
        <span class="cart-item-price" style="color: #fb7185;">${formatRupiah(item.price)}</span>
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
    addCustomBowlToBag();
  }
  closeCartDrawer();
  updateCheckoutTotal();

  const countBadge = document.getElementById('checkoutBadgeCount');
  const totalBadge = document.getElementById('checkoutBadgeTotal');
  const miniList = document.getElementById('checkoutMiniList');
  const grandTotal = orderBag.reduce((acc, item) => acc + item.price, 0);

  if (countBadge) countBadge.textContent = `${orderBag.length} Menu`;
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
  const orderCode = '#BOWL-P8-' + Math.floor(1000 + Math.random() * 9000);

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

  // Structured WhatsApp message
  let orderItemsText = activeOrderRecord.items.map((it, idx) => `${idx + 1}. ${it.title} (${formatRupiah(it.price)})`).join('%0A');
  
  const waMessage = `Halo%20Tim%20Smoothie%20Therapy!%0A%0ASaya%20ingin%20melakukan%20Pre-Order%20Smoothie%2FBowl:%0A----------------------------%0AKode%20Pesanan:%20${encodeURIComponent(orderCode)}%0ANama:%20${encodeURIComponent(customerName)}%0AAlamat%20Pengiriman:%20${encodeURIComponent(deliveryAddress)}%0AMetode%20Bayar:%20${encodeURIComponent(activeOrderRecord.payment)}%0A%0ARincian%20Pesanan:%0A${orderItemsText}%0A%0ACatatan:%20${encodeURIComponent(notes)}%0ATotal:%20${encodeURIComponent(formatRupiah(grandTotal))}%0A----------------------------%0AMohon%20konfirmasi%20pesanan%20saya.%20Terima%20kasih!`;

  closeCheckoutModal();
  orderBag = [];
  updateBagBadge();

  launchTrackerModal(activeOrderRecord);

  // Open WhatsApp in new tab
  window.open(`https://wa.me/628118411410?text=${waMessage}`, '_blank');
}

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

  const userDiv = document.createElement('div');
  userDiv.className = 'chat-msg user';
  userDiv.textContent = text;
  body.appendChild(userDiv);
  input.value = '';

  setTimeout(() => {
    const botDiv = document.createElement('div');
    botDiv.className = 'chat-msg bot';

    const lower = text.toLowerCase();
    if (lower.includes('harga') || lower.includes('price')) {
      botDiv.textContent = "Strawberry Smoothie Bowl seharga Rp 22.000 dan Malibu Mango seharga Rp 18.000, sangat terjangkau!";
    } else if (lower.includes('mango') || lower.includes('malibu')) {
      botDiv.textContent = "Malibu Mango adalah minuman smoothie tropis dalam botol dari campuran mangga, pisang, nanas, santan gurih, madu murni, dan es segar!";
    } else if (lower.includes('batch') || lower.includes('jadwal') || lower.includes('po')) {
      botDiv.textContent = "Pesanan disiapkan segar setiap hari menggunakan 100% buah beku asli dan madu murni alami.";
    } else if (lower.includes('buah') || lower.includes('bahan')) {
      botDiv.textContent = "Kami menggunakan 100% buah beku asli (frozen strawberry, banana, mango, pineapple) tanpa pemanis buatan berlebih atau bahan pengawet!";
    } else {
      botDiv.textContent = "Halo! Silakan pilih menu di atas atau chat langsung panitia P8 kami di WhatsApp jika ada pertanyaan!";
    }

    body.appendChild(botDiv);
    body.scrollTop = body.scrollHeight;
  }, 450);

  body.scrollTop = body.scrollHeight;
}

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
  toast.style.border = '1px solid #fb7185';
  toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8)';
  toast.style.zIndex = '9999';
  toast.style.fontSize = '0.88rem';
  toast.style.fontWeight = '600';
  toast.textContent = msg;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}
