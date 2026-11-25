/**
 * SMOOTHIE THERAPY — Superfood Smoothie Bowl & Malibu Mango Atelier Engine
 */

// Helper: Format to Indonesian Rupiah (Rp)
function formatRupiah(amount) {
  return 'Rp ' + Number(amount).toLocaleString('id-ID');
}

// 1. Bowls & Ingredients Master Dataset
const smoothieData = {
  bases: {
    'strawberry-smoothie-bowl': {
      id: 'strawberry-smoothie-bowl',
      name: 'Strawberry Superfood Bowl Base',
      desc: '120g frozen strawberry, 80g frozen banana, 60g Greek yogurt, & 50ml susu segar (Fresh Milk) (Standar USDA FoodData Central).',
      color: '#f43f5e',
      swirlColor: '#fb7185',
      bowlFill: '#e11d48',
      price: 22000,
      cals: 175,
      protein: 9.3,
      fiber: 4.5,
      tag: 'Antioxidant & Creamy'
    },
    'malibu-mango': {
      id: 'malibu-mango',
      name: 'Malibu Mango Tropical Drink Base',
      desc: '120g frozen mango, 60g nanas, 60g pisang, 100ml santan kelapa (coconut milk), & madu (350ml botol higienis).',
      color: '#f59e0b',
      swirlColor: '#fbbf24',
      bowlFill: '#d97706',
      price: 18000,
      cals: 231,
      protein: 2.4,
      fiber: 4.5,
      tag: 'Tropical Hydration & Vitamin C'
    }
  },

  boosters: {
    'fresh-milk': {
      id: 'fresh-milk',
      name: 'Fresh Milk Creamy (Susu Segar)',
      desc: '100ml susu segar murni (Fresh Milk) (USDA: 61 kcal, 3.2g protein).',
      price: 2000,
      cals: 61,
      protein: 3.2,
      fiber: 0
    },
    'pure-honey': {
      id: 'pure-honey',
      name: 'Madu Murni Alami (Honey)',
      desc: '1 sdm (15g) madu murni lebah alami (USDA: 45 kcal, kaya antioksidan).',
      price: 1000,
      cals: 45,
      protein: 0.1,
      fiber: 0
    }
  },

  toppings: {
    'granola': {
      id: 'granola',
      name: 'Crunchy Toasted Granola',
      desc: '20g granola madu gandum renyah (USDA: 98 kcal, 2.7g protein, 1.8g serat).',
      price: 2000,
      cals: 98,
      protein: 2.7,
      fiber: 1.8
    },
    'fresh-strawberry': {
      id: 'fresh-strawberry',
      name: 'Irisan Stroberi Segar',
      desc: '30g (~2 butir) irisan stroberi segar (USDA: 10 kcal, kaya Vitamin C).',
      price: 2000,
      cals: 10,
      protein: 0.2,
      fiber: 0.6
    },
    'fresh-banana': {
      id: 'fresh-banana',
      name: 'Irisan Pisang Ambon Segar',
      desc: '30g (~3-4 irisan) pisang segar kaya kalium (USDA: 27 kcal, 0.3g protein).',
      price: 1000,
      cals: 27,
      protein: 0.3,
      fiber: 0.8
    }
  }
};

// State
let currentBowl = {
  base: 'strawberry-smoothie-bowl',
  booster: null,
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
      <div class="base-tab-card ${isActive ? 'active' : ''}" role="radio" tabindex="0" aria-checked="${isActive}" onclick="selectBase('${key}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();selectBase('${key}');}">
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

// Quick-pick helpers (official ingredients only)
function pickRandomKey(obj) {
  const keys = Object.keys(obj);
  return keys[Math.floor(Math.random() * keys.length)];
}

function refreshBowlStudio() {
  renderControls();
  renderStage();
  updateNutrition();
}

function surpriseMeBowl() {
  currentBowl.base = pickRandomKey(smoothieData.bases);
  currentBowl.booster = Math.random() < 0.6 ? pickRandomKey(smoothieData.boosters) : null;
  currentBowl.toppings = Object.keys(smoothieData.toppings).filter(() => Math.random() < 0.5);
  refreshBowlStudio();
}

function healthiestBowl() {
  currentBowl.base = 'strawberry-smoothie-bowl';
  currentBowl.booster = 'fresh-milk';
  currentBowl.toppings = ['fresh-strawberry', 'fresh-banana'];
  refreshBowlStudio();
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
      <div class="booster-chip ${isSelected ? 'selected' : ''}" role="checkbox" tabindex="0" aria-checked="${isSelected}" onclick="selectBooster('${key}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();selectBooster('${key}');}">
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
  currentBowl.booster = (currentBowl.booster === key) ? null : key;
  renderBoosters();
  renderStage();
  updateNutrition();
}

function renderToppings() {
  const container = document.getElementById('toppingsContainer');
  if (!container) return;

  container.innerHTML = Object.keys(smoothieData.toppings).map(key => {
    const item = smoothieData.toppings[key];
    const isChecked = currentBowl.toppings.includes(key);
    return `
      <div class="topping-toggle-card ${isChecked ? 'active' : ''}" role="checkbox" tabindex="0" aria-checked="${isChecked}" onclick="toggleTopping('${key}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleTopping('${key}');}">
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

  // Booster Ribbon/Swirl Builder
  let boosterSvg = '';
  if (currentBowl.booster === 'pure-honey') {
    boosterSvg = `
      <!-- Pure Honey Golden Amber Drizzle Swirl -->
      <g class="svg-pop-layer" id="boosterLayer">
        <path d="M 68 136 Q 104 88 140 132 T 212 136" fill="none" stroke="#f59e0b" stroke-width="5" stroke-linecap="round" opacity="0.9" filter="url(#dropShadowSoft)"/>
        <path d="M 88 156 Q 130 182 165 142 T 202 158" fill="none" stroke="#d97706" stroke-width="4" stroke-linecap="round" opacity="0.85"/>
        <path d="M 72 134 Q 104 92 136 130" fill="none" stroke="#fef08a" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      </g>
    `;
  } else if (currentBowl.booster === 'fresh-milk') {
    boosterSvg = `
      <!-- Fresh Milk Creamy Swirl Ripple -->
      <g class="svg-pop-layer" id="boosterLayer">
        <path d="M 65 138 Q 105 84 140 134 T 215 138" fill="none" stroke="#f8fafc" stroke-width="6.5" stroke-linecap="round" opacity="0.85" filter="url(#dropShadowSoft)"/>
        <path d="M 84 158 Q 128 184 164 144 T 204 160" fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" opacity="0.9"/>
      </g>
    `;
  }

  // Dynamic Reactive Toppings Builder (Official Ingredients Only)
  let toppingsSvg = '';
  if (currentBowl.toppings && currentBowl.toppings.length > 0) {
    currentBowl.toppings.forEach(tKey => {
      if (tKey === 'granola') {
        toppingsSvg += `
          <!-- Crunchy Toasted Granola Clusters -->
          <g class="svg-pop-layer" id="topping-granola">
            <ellipse cx="98" cy="112" rx="6" ry="4" fill="#d97706" transform="rotate(-15, 98, 112)"/>
            <ellipse cx="96" cy="111" rx="4" ry="2.5" fill="#fbbf24" transform="rotate(-15, 96, 111)"/>
            <ellipse cx="122" cy="98" rx="7" ry="4.5" fill="#d97706" transform="rotate(25, 122, 98)"/>
            <ellipse cx="120" cy="97" rx="5" ry="3" fill="#f59e0b" transform="rotate(25, 120, 97)"/>
            <ellipse cx="152" cy="102" rx="6" ry="4" fill="#b45309" transform="rotate(-10, 152, 102)"/>
            <ellipse cx="150" cy="101" rx="4.5" ry="2.5" fill="#fbbf24" transform="rotate(-10, 150, 101)"/>
            <ellipse cx="174" cy="118" rx="6" ry="4.5" fill="#d97706" transform="rotate(35, 174, 118)"/>
            <ellipse cx="172" cy="117" rx="4" ry="3" fill="#f59e0b" transform="rotate(35, 172, 117)"/>
            <ellipse cx="108" cy="158" rx="6.5" ry="4" fill="#b45309" transform="rotate(-25, 108, 158)"/>
            <ellipse cx="106" cy="157" rx="4.5" ry="2.5" fill="#fbbf24" transform="rotate(-25, 106, 157)"/>
            <ellipse cx="162" cy="164" rx="7" ry="4.5" fill="#d97706" transform="rotate(20, 162, 164)"/>
            <ellipse cx="160" cy="163" rx="5" ry="3" fill="#f59e0b" transform="rotate(20, 160, 163)"/>
          </g>
        `;
      } else if (tKey === 'fresh-strawberry') {
        toppingsSvg += `
          <!-- Fresh Strawberry Heart Medallions -->
          <g class="svg-pop-layer" id="topping-strawberry">
            <g transform="translate(80, 126) rotate(-20)">
              <polygon points="12,0 24,20 0,20" fill="#f43f5e" stroke="#e11d48" stroke-width="1.2"/>
              <polygon points="12,4 20,17 4,17" fill="#fda4af"/>
              <circle cx="9" cy="10" r="0.8" fill="#facc15"/>
              <circle cx="15" cy="10" r="0.8" fill="#facc15"/>
              <circle cx="12" cy="14" r="0.8" fill="#facc15"/>
            </g>
            <g transform="translate(170, 134) rotate(25)">
              <polygon points="12,0 24,20 0,20" fill="#f43f5e" stroke="#e11d48" stroke-width="1.2"/>
              <polygon points="12,4 20,17 4,17" fill="#fda4af"/>
              <circle cx="9" cy="10" r="0.8" fill="#facc15"/>
              <circle cx="15" cy="10" r="0.8" fill="#facc15"/>
              <circle cx="12" cy="14" r="0.8" fill="#facc15"/>
            </g>
            <g transform="translate(128, 152) rotate(6)">
              <polygon points="12,0 24,20 0,20" fill="#f43f5e" stroke="#e11d48" stroke-width="1.2"/>
              <polygon points="12,4 20,17 4,17" fill="#fda4af"/>
              <circle cx="9" cy="10" r="0.8" fill="#facc15"/>
              <circle cx="15" cy="10" r="0.8" fill="#facc15"/>
              <circle cx="12" cy="14" r="0.8" fill="#facc15"/>
            </g>
          </g>
        `;
      } else if (tKey === 'fresh-banana') {
        toppingsSvg += `
          <!-- Fresh Banana Slices (Ambon Medallions) -->
          <g class="svg-pop-layer" id="topping-banana">
            <g transform="translate(102, 130) rotate(-10)">
              <ellipse cx="14" cy="14" rx="14" ry="11" fill="#fef08a" stroke="#ca8a04" stroke-width="1.2"/>
              <ellipse cx="14" cy="14" rx="10" ry="7" fill="#fffbeb"/>
              <circle cx="12" cy="14" r="0.8" fill="#78350f"/>
              <circle cx="15" cy="13" r="0.8" fill="#78350f"/>
              <circle cx="14" cy="16" r="0.8" fill="#78350f"/>
            </g>
            <g transform="translate(145, 126) rotate(18)">
              <ellipse cx="14" cy="14" rx="14" ry="11" fill="#fef08a" stroke="#ca8a04" stroke-width="1.2"/>
              <ellipse cx="14" cy="14" rx="10" ry="7" fill="#fffbeb"/>
              <circle cx="12" cy="14" r="0.8" fill="#78350f"/>
              <circle cx="15" cy="13" r="0.8" fill="#78350f"/>
              <circle cx="14" cy="16" r="0.8" fill="#78350f"/>
            </g>
          </g>
        `;
      }
    });
  }

  if (isMalibuBottle) {
    // Render Chilled Tropical Bottle Graphic with Condensation and Depth
    let bottleToppingsSvg = '';
    if (currentBowl.toppings.includes('fresh-strawberry')) {
      bottleToppingsSvg += `
        <!-- Floating Chilled Strawberry Infusion -->
        <g class="svg-pop-layer">
          <ellipse cx="122" cy="148" rx="7" ry="9" fill="#f43f5e" stroke="#e11d48" stroke-width="0.8" transform="rotate(-15, 122, 148)"/>
          <ellipse cx="158" cy="180" rx="6" ry="8" fill="#f43f5e" stroke="#e11d48" stroke-width="0.8" transform="rotate(20, 158, 180)"/>
        </g>
      `;
    }
    if (currentBowl.toppings.includes('fresh-banana')) {
      bottleToppingsSvg += `
        <!-- Floating Banana Medallions -->
        <g class="svg-pop-layer">
          <circle cx="154" cy="120" r="7" fill="#fef08a" stroke="#ca8a04" stroke-width="0.8"/>
          <circle cx="126" cy="195" r="7" fill="#fef08a" stroke="#ca8a04" stroke-width="0.8"/>
        </g>
      `;
    }
    if (currentBowl.toppings.includes('granola')) {
      bottleToppingsSvg += `
        <!-- Toasted Granola Crunch Layer near Top -->
        <g class="svg-pop-layer">
          <ellipse cx="140" cy="74" rx="36" ry="6" fill="#fbbf24" opacity="0.6"/>
          <circle cx="125" cy="74" r="2" fill="#d97706"/>
          <circle cx="145" cy="73" r="2.5" fill="#f59e0b"/>
          <circle cx="155" cy="75" r="2" fill="#d97706"/>
        </g>
      `;
    }

    stage.innerHTML = `
      <svg viewBox="0 0 280 280" role="img" aria-label="Preview botol dingin Malibu Mango" class="svg-bowl-stage" style="width: 100%; height: 100%; filter: drop-shadow(0 18px 36px rgba(0,0,0,0.75));">
        <defs>
          <linearGradient id="juiceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="35%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#b45309"/>
          </linearGradient>
          <linearGradient id="bottleGlass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(255,255,255,0.45)"/>
            <stop offset="20%" stop-color="rgba(255,255,255,0.12)"/>
            <stop offset="80%" stop-color="rgba(255,255,255,0.05)"/>
            <stop offset="100%" stop-color="rgba(255,255,255,0.35)"/>
          </linearGradient>
          <filter id="dropShadowSoft" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity="0.35"/>
          </filter>
        </defs>

        <!-- Eco Straw Angled from Opening -->
        <line x1="152" y1="52" x2="182" y2="15" stroke="#d4af37" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="152" y1="52" x2="182" y2="15" stroke="#ffffff" stroke-width="1" stroke-linecap="round" opacity="0.6"/>

        <!-- Plastic Bottle Body -->
        <rect x="94" y="65" width="92" height="172" rx="22" fill="url(#juiceGrad)" stroke="#d4af37" stroke-width="2"/>
        <rect x="94" y="65" width="92" height="172" rx="22" fill="url(#bottleGlass)"/>

        <!-- Liquid Surface Top Wave -->
        <ellipse cx="140" cy="74" rx="42" ry="8" fill="#fef08a" opacity="0.85"/>

        <!-- Infusion Inclusions -->
        ${bottleToppingsSvg}

        <!-- Bottle Neck & Cap -->
        <rect x="118" y="55" width="44" height="12" fill="#d4af37" rx="2"/>
        <rect x="114" y="40" width="52" height="17" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
        <line x1="124" y1="42" x2="124" y2="55" stroke="#cbd5e1" stroke-width="1.2"/>
        <line x1="132" y1="42" x2="132" y2="55" stroke="#cbd5e1" stroke-width="1.2"/>
        <line x1="140" y1="42" x2="140" y2="55" stroke="#cbd5e1" stroke-width="1.2"/>
        <line x1="148" y1="42" x2="148" y2="55" stroke="#cbd5e1" stroke-width="1.2"/>
        <line x1="156" y1="42" x2="156" y2="55" stroke="#cbd5e1" stroke-width="1.2"/>

        <!-- Chilled Frost / Condensation Water Drops -->
        <circle cx="112" cy="108" r="4" fill="rgba(255,255,255,0.75)"/>
        <circle cx="166" cy="138" r="3.2" fill="rgba(255,255,255,0.75)"/>
        <circle cx="128" cy="178" r="4.5" fill="rgba(255,255,255,0.75)"/>
        <circle cx="158" cy="94" r="3" fill="rgba(255,255,255,0.65)"/>
        <circle cx="110" cy="192" r="3" fill="rgba(255,255,255,0.65)"/>

        <!-- Gold Atelier Label Badge -->
        <rect x="104" y="116" width="72" height="46" rx="6" fill="#141210" stroke="#d4af37" stroke-width="1.2"/>
        <text x="140" y="132" font-size="9" font-weight="bold" fill="#f59e0b" text-anchor="middle" letter-spacing="1">MALIBU</text>
        <text x="140" y="145" font-size="8" font-weight="600" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">MANGO</text>
        <text x="140" y="154" font-size="5.5" fill="#94a3b8" text-anchor="middle" letter-spacing="0.8">SMOOTHIE THERAPY</text>
      </svg>
    `;
    return;
  }

  // Render Premium Eco Bowl Graphic with Tactile Depth
  stage.innerHTML = `
    <svg viewBox="0 0 280 280" role="img" aria-label="Preview ${base.name}" class="svg-bowl-stage" style="width: 100%; height: 100%; filter: drop-shadow(0 18px 36px rgba(0,0,0,0.75));">
      <defs>
        <!-- Gelato Smoothie Radial Gradient -->
        <radialGradient id="bowlInnerGrad" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stop-color="${base.swirlColor}"/>
          <stop offset="55%" stop-color="${base.color}"/>
          <stop offset="100%" stop-color="${base.bowlFill}"/>
        </radialGradient>
        <!-- Bowl Rim Gradient -->
        <linearGradient id="bowlRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#94a3b8"/>
        </linearGradient>
        <!-- Soft Drop Shadow Filter -->
        <filter id="dropShadowSoft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity="0.35"/>
        </filter>
      </defs>

      <!-- Eco Paper Bowl Outer -->
      <ellipse cx="140" cy="145" rx="122" ry="105" fill="#1e1b18" stroke="#d4af37" stroke-width="2.5"/>
      <ellipse cx="140" cy="140" rx="114" ry="96" fill="url(#bowlRimGrad)" opacity="0.9"/>

      <!-- Thick Gelato Smoothie Base -->
      <ellipse cx="140" cy="140" rx="108" ry="90" fill="url(#bowlInnerGrad)"/>

      <!-- Sub-Zero Cream Swirl Lines -->
      <path d="M 60 140 Q 110 75 140 135 T 220 140" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="5" stroke-linecap="round"/>
      <path d="M 80 160 Q 130 185 165 145 T 205 160" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="4" stroke-linecap="round"/>

      <!-- Active Superfood Booster Swirl Ribbon -->
      ${boosterSvg}

      <!-- Dynamic Selected Toppings Scatter -->
      ${toppingsSvg}
    </svg>
  `;
}

// 3. Nutrition & Price Calculations with Animated Gauges
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

  if (calsEl) calsEl.textContent = `${Math.round(cals)} kcal`;
  if (protEl) protEl.textContent = `${Math.round(prot * 10) / 10}g`;
  if (fiberEl) fiberEl.textContent = `${Math.round(fiber * 10) / 10}g`;
  if (priceEl) priceEl.textContent = formatRupiah(price);

  // Animated Nutrient Gauges
  const calsBar = document.getElementById('hudCalsBar');
  const protBar = document.getElementById('hudProteinBar');
  const fiberBar = document.getElementById('hudFiberBar');

  if (calsBar) {
    const calsPct = Math.min(100, Math.max(12, Math.round((cals / 450) * 100)));
    calsBar.style.width = `${calsPct}%`;
  }
  if (protBar) {
    const protPct = Math.min(100, Math.max(12, Math.round((prot / 25) * 100)));
    protBar.style.width = `${protPct}%`;
  }
  if (fiberBar) {
    const fiberPct = Math.min(100, Math.max(12, Math.round((fiber / 14) * 100)));
    fiberBar.style.width = `${fiberPct}%`;
  }
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
    unitPrice: price,
    price: price,
    qty: 1
  };

  orderBag.push(item);
  updateBagBadge();
  notifyGuest(`Ditambahkan ke Keranjang: ${base.name} (${formatRupiah(price)})`);
  openCartDrawer();
}

// ========================================================
// CART FOLIO & DRAWER
// ========================================================
function updateBagBadge() {
  const badge = document.getElementById('cartBadgeCount');
  if (badge) badge.textContent = orderBag.reduce((sum, item) => sum + (item.qty || 1), 0);
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

function changeBowlQty(id, delta) {
  const item = orderBag.find(i => i.id === id);
  if (!item) return;
  const newQty = (item.qty || 1) + delta;
  if (newQty <= 0) {
    removeFromBag(id);
    return;
  }
  item.qty = newQty;
  item.price = item.unitPrice * item.qty;
  updateBagBadge();
  renderCartDrawer();
  if (document.getElementById('checkoutModal')?.classList.contains('open')) {
    renderCheckoutMiniList();
  }
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
      <div class="cart-item-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
        <span class="cart-item-price" style="color: #fb7185;">${formatRupiah(item.price)} <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: normal;">(${formatRupiah(item.unitPrice)}/porsi)</span></span>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="qty-stepper">
            <button class="qty-btn" onclick="changeBowlQty('${item.id}', -1)" title="Kurangi" aria-label="Kurangi jumlah">−</button>
            <span class="qty-val">${item.qty || 1}</span>
            <button class="qty-btn" onclick="changeBowlQty('${item.id}', 1)" title="Tambah" aria-label="Tambah jumlah">+</button>
          </div>
          <button class="btn-remove-item" onclick="removeFromBag('${item.id}')" title="Hapus menu" aria-label="Hapus menu">
            <i data-lucide="trash-2" style="width: 12px; height: 12px;" aria-hidden="true"></i>
          </button>
        </div>
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
  if (document.getElementById('checkoutModal')?.classList.contains('open')) {
    renderCheckoutMiniList();
  }
}

// ========================================================
// CHECKOUT & PRE-ORDER MODAL
// ========================================================
function renderCheckoutMiniList() {
  const countBadge = document.getElementById('checkoutBadgeCount');
  const totalBadge = document.getElementById('checkoutBadgeTotal');
  const miniList = document.getElementById('checkoutMiniList');
  const priceTag = document.getElementById('btnPriceTag');

  const totalPortions = orderBag.reduce((acc, item) => acc + (item.qty || 1), 0);
  const grandTotal = orderBag.reduce((acc, item) => acc + item.price, 0);

  if (countBadge) countBadge.textContent = `${totalPortions} Menu`;
  if (totalBadge) totalBadge.textContent = formatRupiah(grandTotal);
  if (priceTag) priceTag.textContent = formatRupiah(grandTotal);

  if (miniList) {
    if (orderBag.length === 0) {
      closeCheckoutModal();
      return;
    }
    miniList.innerHTML = orderBag.map(it => `
      <div class="checkout-item-row">
        <div class="checkout-item-info">
          <div class="checkout-item-title">${it.title}</div>
          <div class="checkout-item-price">${formatRupiah(it.price)} <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: normal;">(${formatRupiah(it.unitPrice)}/porsi)</span></div>
        </div>
        <div class="qty-stepper">
          <button type="button" class="qty-btn" onclick="changeBowlQty('${it.id}', -1)" title="Kurangi porsi" aria-label="Kurangi porsi">−</button>
          <span class="qty-val">${it.qty || 1}</span>
          <button type="button" class="qty-btn" onclick="changeBowlQty('${it.id}', 1)" title="Tambah porsi" aria-label="Tambah porsi">+</button>
        </div>
      </div>
    `).join('');
  }
}

function openCheckoutModal() {
  if (orderBag.length === 0) {
    addCustomBowlToBag();
  }
  closeCartDrawer();
  renderCheckoutMiniList();
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
      const active = m === method;
      el.classList.toggle('active', active);
      el.setAttribute('aria-checked', String(active));
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
  let orderItemsText = activeOrderRecord.items.map((it, idx) => `${idx + 1}. ${it.qty || 1}x ${it.title} (${formatRupiah(it.price)})`).join('%0A');
  
  // Auto-send order directly to Google Sheets Webhook
  const totalPortions = activeOrderRecord.items.reduce((sum, item) => sum + (item.qty || 1), 0);
  const webhookPayload = {
    code: orderCode,
    name: customerName,
    phone: '-',
    items: activeOrderRecord.items.map(it => `${it.qty || 1}x ${it.title}`).join(', '),
    qty: totalPortions,
    total: grandTotal,
    payment: activeOrderRecord.payment,
    address: deliveryAddress,
    notes: notes || '-'
  };
  try {
    fetch('https://script.google.com/macros/s/AKfycbwAlKee1CwycT00s56ZWyvGts68_V2T0QVHfVCZmrzcr0iMGUEFneLuyBjKix6ZiYib0w/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookPayload)
    });
  } catch (err) {
    console.warn('GSheet Auto-Input Warning:', err);
  }

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
      botDiv.textContent = "Harga smoothie bowl & minuman racikan Malibu Mango berkisar antara Rp 15.000 hingga Rp 25.000 sesuai kustomisasi pilihan Anda!";
    } else if (lower.includes('mango') || lower.includes('malibu')) {
      botDiv.textContent = "Malibu Mango adalah minuman smoothie tropis dalam botol dari campuran mangga, pisang, nanas, santan gurih, madu murni, dan es segar!";
    } else if (lower.includes('batch') || lower.includes('jadwal') || /\bpo\b/.test(lower)) {
      botDiv.textContent = "Pesanan disiapkan segar per batch Pre-Order menggunakan 100% buah beku asli dan madu murni alami.";
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
