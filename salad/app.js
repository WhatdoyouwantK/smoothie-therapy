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
      desc: 'Tortilla gandum 8-inci dipanggang hangat (Standar USDA: ~45g).',
      color: '#d4af37',
      dark: '#854d0e',
      price: 0,
      cals: 130,
      protein: 3.5,
      fiber: 1.8
    },
    'spinach-tortilla': {
      id: 'spinach-tortilla',
      name: 'Spinach & Herb Tortilla',
      desc: 'Tortilla bayam hijau 8-inci kaya zat besi & serat (Standar Mission/USDA: ~49g).',
      color: '#15803d',
      dark: '#14532d',
      price: 2000,
      cals: 130,
      protein: 4.0,
      fiber: 2.0
    },
    'whole-wheat': {
      id: 'whole-wheat',
      name: 'Whole Wheat High-Fiber Wrap',
      desc: 'Tortilla gandum utuh 8-inci tinggi serat larut (Standar USDA: ~45g).',
      color: '#b45309',
      dark: '#78350f',
      price: 2000,
      cals: 110,
      protein: 4.0,
      fiber: 5.0
    }
  },

  greens: {
    'romaine': {
      id: 'romaine',
      name: 'Romaine Lettuce Segar',
      desc: 'Selada romaine renyah 50g dicuci higienis, kaya Vitamin A & K (USDA: 17 kcal/100g).',
      color: '#4ade80',
      price: 0,
      cals: 9,
      protein: 0.6,
      fiber: 1.1
    },
    'lettuce': {
      id: 'lettuce',
      name: 'Fresh Crisp Lettuce',
      desc: 'Daun selada segar crunchy 50g penyejuk tekstur (USDA: 14 kcal/100g).',
      color: '#22c55e',
      price: 0,
      cals: 7,
      protein: 0.5,
      fiber: 0.7
    },
    'duo-lettuce': {
      id: 'duo-lettuce',
      name: 'Duo Romaine & Lettuce Mix',
      desc: 'Kombinasi romaine & fresh lettuce 70g untuk crunch berlapis.',
      color: '#16a34a',
      price: 1000,
      cals: 12,
      protein: 0.8,
      fiber: 1.4
    }
  },

  proteins: {
    'boneless-chicken': {
      id: 'boneless-chicken',
      name: 'Savory Boneless Grilled Chicken',
      desc: '100g dada ayam fillet panggang tanpa kulit & minyak berlebih (Standar USDA FoodData Central).',
      color: '#f59e0b',
      price: 0,
      cals: 165,
      protein: 31.0,
      fiber: 0
    },
    'double-chicken': {
      id: 'double-chicken',
      name: 'Double Boneless Chicken Portion',
      desc: '150g dada ayam panggang empuk untuk nutrisi pembentukan otot maksimal.',
      color: '#d97706',
      price: 5000,
      cals: 248,
      protein: 46.5,
      fiber: 0
    },
    'egg-chicken': {
      id: 'egg-chicken',
      name: 'Boneless Chicken + Rebusan Telur',
      desc: '80g dada ayam panggang (132 kcal, 25g P) + 1 butir telur rebus 50g (74 kcal, 6.3g P).',
      color: '#fbbf24',
      price: 3000,
      cals: 206,
      protein: 31.1,
      fiber: 0
    }
  },

  dressings: {
    'signature-sauce': {
      id: 'signature-sauce',
      name: 'Signature House Salad Sauce',
      desc: 'Saus salad racikan yogurt & light citrus mayo (1 sdm / 15ml).',
      color: '#fef08a',
      price: 0,
      cals: 55,
      protein: 0.8,
      fiber: 0.2
    },
    'creamy-caesar': {
      id: 'creamy-caesar',
      name: 'Creamy Garlic Caesar',
      desc: 'Saus caesar klasik keju gurih & lada hitam (1 sdm / 15ml).',
      color: '#fef3c7',
      price: 1000,
      cals: 75,
      protein: 0.8,
      fiber: 0.1
    },
    'roasted-sesame': {
      id: 'roasted-sesame',
      name: 'Roasted Sesame (Wijen Sangrai)',
      desc: 'Saus wijen sangrai gurih ala Jepang (Standar Kewpie: 15ml / 1 sdm).',
      color: '#fed7aa',
      price: 1000,
      cals: 62,
      protein: 0.4,
      fiber: 0.3
    }
  },

  toppings: {
    'extra-chicken': {
      id: 'extra-chicken',
      name: 'Ekstra Boneless Chicken (+50g)',
      desc: 'Tambahan 50g fillet dada ayam panggang empuk (USDA: 82 kcal, +15.5g protein).',
      price: 5000,
      cals: 82,
      protein: 15.5,
      fiber: 0
    },
    'extra-greens': {
      id: 'extra-greens',
      name: 'Ekstra Selada Romaine Segar (+30g)',
      desc: 'Tambahan daun selada romaine renyah & higienis (USDA: 5 kcal, +0.4g protein, +0.7g serat).',
      price: 1000,
      cals: 5,
      protein: 0.4,
      fiber: 0.7
    },
    'extra-dressing': {
      id: 'extra-dressing',
      name: 'Ekstra Saus Salad (+15ml)',
      desc: 'Tambahan 1 sdm saus salad yogurt & citrus mayo (55 kcal, +0.8g protein).',
      price: 1000,
      cals: 55,
      protein: 0.8,
      fiber: 0.2
    }
  }
};

// Current State
let customWrap = {
  base: 'tortilla',
  greens: 'romaine',
  protein: 'boneless-chicken',
  dressing: 'signature-sauce',
  toppings: []
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

  // Protein SVG Builder based on selected cut
  let proteinSvg = '';
  if (customWrap.protein === 'double-chicken') {
    proteinSvg = `
      <!-- Double Boneless Chicken Mountain (High Protein) -->
      <g class="svg-pop-layer" id="proteinLayer">
        <!-- Base Fillets -->
        <g transform="rotate(-12, 105, 128)">
          <path d="M 80 128 Q 105 110 130 128 Q 115 146 80 128 Z" fill="#d97706" stroke="#78350f" stroke-width="1.5"/>
          <line x1="90" y1="120" x2="98" y2="134" stroke="#451a03" stroke-width="2" stroke-linecap="round"/>
          <line x1="104" y1="118" x2="112" y2="132" stroke="#451a03" stroke-width="2" stroke-linecap="round"/>
        </g>
        <g transform="rotate(14, 172, 130)">
          <path d="M 148 130 Q 172 112 198 130 Q 182 148 148 130 Z" fill="#d97706" stroke="#78350f" stroke-width="1.5"/>
          <line x1="160" y1="122" x2="168" y2="136" stroke="#451a03" stroke-width="2" stroke-linecap="round"/>
          <line x1="174" y1="120" x2="182" y2="134" stroke="#451a03" stroke-width="2" stroke-linecap="round"/>
        </g>
        <!-- Center Stack Fillets -->
        <g transform="rotate(-4, 138, 120)">
          <path d="M 112 120 Q 138 98 165 120 Q 150 140 112 120 Z" fill="#f59e0b" stroke="#78350f" stroke-width="1.5"/>
          <path d="M 116 117 Q 138 102 160 117" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" fill="none"/>
          <line x1="125" y1="110" x2="133" y2="126" stroke="#5c2409" stroke-width="2.2" stroke-linecap="round"/>
          <line x1="140" y1="108" x2="148" y2="124" stroke="#5c2409" stroke-width="2.2" stroke-linecap="round"/>
          <line x1="152" y1="112" x2="159" y2="124" stroke="#5c2409" stroke-width="2" stroke-linecap="round"/>
        </g>
        <!-- Foreground Overlapping Fillets -->
        <g transform="rotate(8, 126, 146)">
          <ellipse cx="126" cy="146" rx="34" ry="17" fill="#f59e0b" stroke="#78350f" stroke-width="1.5"/>
          <line x1="112" y1="140" x2="120" y2="154" stroke="#5c2409" stroke-width="2" stroke-linecap="round"/>
          <line x1="128" y1="138" x2="136" y2="152" stroke="#5c2409" stroke-width="2" stroke-linecap="round"/>
        </g>
        <g transform="rotate(-8, 160, 150)">
          <ellipse cx="160" cy="150" rx="32" ry="16" fill="#f59e0b" stroke="#78350f" stroke-width="1.5"/>
          <line x1="148" y1="144" x2="156" y2="157" stroke="#5c2409" stroke-width="2" stroke-linecap="round"/>
          <line x1="164" y1="142" x2="171" y2="155" stroke="#5c2409" stroke-width="2" stroke-linecap="round"/>
        </g>
      </g>
    `;
  } else if (customWrap.protein === 'egg-chicken') {
    proteinSvg = `
      <!-- Boneless Chicken + Boiled Egg Duet -->
      <g class="svg-pop-layer" id="proteinLayer">
        <!-- Grilled Chicken Cuts (Right & Center) -->
        <g transform="rotate(-6, 155, 122)">
          <ellipse cx="155" cy="122" rx="38" ry="20" fill="#f59e0b" stroke="#78350f" stroke-width="1.5"/>
          <path d="M 135 120 Q 155 110 175 120" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" fill="none"/>
          <line x1="144" y1="113" x2="151" y2="128" stroke="#5c2409" stroke-width="2" stroke-linecap="round"/>
          <line x1="158" y1="112" x2="165" y2="127" stroke="#5c2409" stroke-width="2" stroke-linecap="round"/>
        </g>
        <g transform="rotate(10, 156, 152)">
          <ellipse cx="156" cy="152" rx="32" ry="17" fill="#f59e0b" stroke="#78350f" stroke-width="1.5"/>
          <line x1="146" y1="145" x2="153" y2="158" stroke="#5c2409" stroke-width="2" stroke-linecap="round"/>
          <line x1="160" y1="144" x2="167" y2="157" stroke="#5c2409" stroke-width="2" stroke-linecap="round"/>
        </g>
        <!-- Perfect Halved Boiled Eggs (Left) -->
        <!-- Egg Half 1 -->
        <g transform="rotate(-12, 106, 124)">
          <ellipse cx="106" cy="124" rx="25" ry="18" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
          <ellipse cx="109" cy="124" rx="14" ry="12" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
          <circle cx="106" cy="121" r="3.5" fill="#fef08a" opacity="0.9"/>
        </g>
        <!-- Egg Half 2 -->
        <g transform="rotate(16, 114, 156)">
          <ellipse cx="114" cy="156" rx="24" ry="17" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
          <ellipse cx="112" cy="156" rx="13" ry="11" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
          <circle cx="110" cy="153" r="3" fill="#fef08a" opacity="0.9"/>
        </g>
      </g>
    `;
  } else {
    // Default: Savory Boneless Grilled Chicken (Standard Portion)
    proteinSvg = `
      <!-- Savory Boneless Grilled Chicken (Triple Seared Fillets) -->
      <g class="svg-pop-layer" id="proteinLayer">
        <!-- Upper Cutlet -->
        <g transform="rotate(-6, 140, 118)">
          <ellipse cx="140" cy="118" rx="42" ry="22" fill="#f59e0b" stroke="#78350f" stroke-width="1.5"/>
          <path d="M 118 116 Q 140 106 162 116" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" fill="none"/>
          <line x1="126" y1="110" x2="134" y2="126" stroke="#5c2409" stroke-width="2" stroke-linecap="round"/>
          <line x1="140" y1="108" x2="148" y2="124" stroke="#5c2409" stroke-width="2" stroke-linecap="round"/>
          <line x1="154" y1="110" x2="161" y2="124" stroke="#5c2409" stroke-width="2" stroke-linecap="round"/>
        </g>
        <!-- Lower Left Cutlet -->
        <g transform="rotate(12, 118, 146)">
          <ellipse cx="118" cy="146" rx="38" ry="19" fill="#f59e0b" stroke="#78350f" stroke-width="1.5"/>
          <line x1="106" y1="140" x2="114" y2="153" stroke="#5c2409" stroke-width="2" stroke-linecap="round"/>
          <line x1="120" y1="138" x2="128" y2="151" stroke="#5c2409" stroke-width="2" stroke-linecap="round"/>
        </g>
        <!-- Lower Right Cutlet -->
        <g transform="rotate(-15, 162, 150)">
          <ellipse cx="162" cy="150" rx="36" ry="18" fill="#f59e0b" stroke="#78350f" stroke-width="1.5"/>
          <line x1="150" y1="143" x2="158" y2="156" stroke="#5c2409" stroke-width="2" stroke-linecap="round"/>
          <line x1="165" y1="142" x2="172" y2="155" stroke="#5c2409" stroke-width="2" stroke-linecap="round"/>
        </g>
      </g>
    `;
  }

  // Dressing SVG Builder based on selected profile
  let dressingSvg = '';
  if (customWrap.dressing === 'creamy-caesar') {
    dressingSvg = `
      <!-- Creamy Garlic Caesar Dressing with Cracked Black Pepper -->
      <g class="svg-pop-layer" id="dressingLayer">
        <path d="M 72 130 Q 108 92 140 126 T 208 144" fill="none" stroke="${dressing.color}" stroke-width="8" stroke-linecap="round" opacity="0.94" filter="url(#dropShadowSoft)"/>
        <path d="M 94 156 Q 130 176 166 138 T 198 164" fill="none" stroke="${dressing.color}" stroke-width="6.5" stroke-linecap="round" opacity="0.92"/>
        <!-- Cracked Black Pepper Flakes -->
        <circle cx="95" cy="118" r="1.2" fill="#18181b"/>
        <circle cx="120" cy="110" r="1.4" fill="#18181b"/>
        <circle cx="152" cy="132" r="1.3" fill="#18181b"/>
        <circle cx="180" cy="142" r="1.2" fill="#18181b"/>
        <circle cx="132" cy="158" r="1.4" fill="#18181b"/>
      </g>
    `;
  } else if (customWrap.dressing === 'roasted-sesame') {
    dressingSvg = `
      <!-- Roasted Sesame Dressing with Toasted Sesame Seed Garnish -->
      <g class="svg-pop-layer" id="dressingLayer">
        <path d="M 72 130 Q 108 92 140 126 T 208 144" fill="none" stroke="${dressing.color}" stroke-width="8.5" stroke-linecap="round" opacity="0.95" filter="url(#dropShadowSoft)"/>
        <path d="M 94 156 Q 130 176 166 138 T 198 164" fill="none" stroke="${dressing.color}" stroke-width="6.5" stroke-linecap="round" opacity="0.92"/>
        <!-- Toasted Sesame Seeds (Golden/Ivory Ovals) -->
        <ellipse cx="102" cy="115" rx="2" ry="1" fill="#78350f" transform="rotate(25, 102, 115)"/>
        <ellipse cx="132" cy="116" rx="2" ry="1" fill="#fffbeb" transform="rotate(-30, 132, 116)"/>
        <ellipse cx="156" cy="133" rx="2" ry="1" fill="#78350f" transform="rotate(15, 156, 133)"/>
        <ellipse cx="184" cy="146" rx="2" ry="1" fill="#fffbeb" transform="rotate(-40, 184, 146)"/>
        <ellipse cx="125" cy="162" rx="2" ry="1" fill="#78350f" transform="rotate(35, 125, 162)"/>
      </g>
    `;
  } else {
    // Signature House Sauce (Creamy Citrus Light Mayo)
    dressingSvg = `
      <!-- Signature House Salad Dressing Ribbon -->
      <g class="svg-pop-layer" id="dressingLayer">
        <path d="M 72 130 Q 108 92 140 126 T 208 144" fill="none" stroke="${dressing.color}" stroke-width="8" stroke-linecap="round" opacity="0.95" filter="url(#dropShadowSoft)"/>
        <path d="M 94 156 Q 130 176 166 138 T 198 164" fill="none" stroke="${dressing.color}" stroke-width="6.5" stroke-linecap="round" opacity="0.92"/>
        <path d="M 78 128 Q 108 96 138 124" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
      </g>
    `;
  }

  // Dynamic Reactive Extra Portion SVG Builder
  let toppingsSvg = '';
  if (customWrap.toppings && customWrap.toppings.length > 0) {
    customWrap.toppings.forEach(tId => {
      if (tId === 'extra-chicken') {
        toppingsSvg += `
          <!-- Ekstra Boneless Chicken Cutlets (Juicy Stack) -->
          <g class="svg-pop-layer" id="extra-chicken-layer">
            <g transform="rotate(6, 140, 136)">
              <ellipse cx="140" cy="136" rx="36" ry="18" fill="#f59e0b" stroke="#78350f" stroke-width="1.5" filter="url(#dropShadowSoft)"/>
              <line x1="128" y1="128" x2="136" y2="142" stroke="#5c2409" stroke-width="2.2" stroke-linecap="round"/>
              <line x1="142" y1="126" x2="150" y2="140" stroke="#5c2409" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M 124 132 Q 140 125 156 132" stroke="rgba(255,255,255,0.45)" stroke-width="1.5" fill="none"/>
            </g>
          </g>
        `;
      } else if (tId === 'extra-greens') {
        toppingsSvg += `
          <!-- Ekstra Selada Romaine Segar (Crisp Leaf Flare) -->
          <g class="svg-pop-layer" id="extra-greens-layer">
            <path d="M 60 115 Q 40 85 68 75 Q 95 90 85 125 Z" fill="#22c55e" stroke="#15803d" stroke-width="1.2" opacity="0.95"/>
            <path d="M 220 115 Q 240 85 212 75 Q 185 90 195 125 Z" fill="#22c55e" stroke="#15803d" stroke-width="1.2" opacity="0.95"/>
            <path d="M 68 75 Q 75 100 80 120" stroke="#86efac" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            <path d="M 212 75 Q 205 100 200 120" stroke="#86efac" stroke-width="1.5" stroke-linecap="round" fill="none"/>
          </g>
        `;
      } else if (tId === 'extra-dressing') {
        toppingsSvg += `
          <!-- Ekstra Saus Salad Drizzle (Rich Swirl) -->
          <g class="svg-pop-layer" id="extra-dressing-layer">
            <path d="M 85 142 Q 115 165 140 145 T 195 152" fill="none" stroke="${dressing.color}" stroke-width="7" stroke-linecap="round" opacity="0.95" filter="url(#dropShadowSoft)"/>
            <path d="M 88 140 Q 115 162 140 143" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity="0.5"/>
          </g>
        `;
      }
    });
  }

  stage.innerHTML = `
    <svg viewBox="0 0 280 280" class="wrap-svg-graphic" style="width: 100%; height: 100%; filter: drop-shadow(0 18px 32px rgba(0,0,0,0.65));">
      <defs>
        <!-- Tortilla Wrap Skin Gradient -->
        <radialGradient id="wrapSkinGrad" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stop-color="#fffbeb"/>
          <stop offset="45%" stop-color="${base.color}"/>
          <stop offset="100%" stop-color="${base.dark}"/>
        </radialGradient>
        <!-- Hydroponic Fresh Greens Gradient -->
        <linearGradient id="greensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a7f3d0"/>
          <stop offset="40%" stop-color="${greens.color}"/>
          <stop offset="100%" stop-color="#064e3b"/>
        </linearGradient>
        <!-- Inner Leaf Ribs Gradient -->
        <linearGradient id="ribsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#6ee7b7"/>
          <stop offset="100%" stop-color="${greens.color}"/>
        </linearGradient>
        <!-- Soft Drop Shadow Filter -->
        <filter id="dropShadowSoft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity="0.35"/>
        </filter>
      </defs>

      <!-- Wrap Tortilla Envelope -->
      <ellipse cx="140" cy="140" rx="122" ry="105" fill="url(#wrapSkinGrad)" stroke="#d4af37" stroke-width="2"/>
      <ellipse cx="140" cy="140" rx="114" ry="98" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="1.5" stroke-dasharray="4 4"/>
      <!-- Tortilla Rim Crease Lines -->
      <path d="M 40 120 Q 60 145 90 148" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1.5"/>
      <path d="M 240 125 Q 220 145 190 146" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1.5"/>

      <!-- Hydroponic Fresh Greens (Base Foliage) -->
      <g filter="url(#dropShadowSoft)">
        <path d="M 46 140 Q 88 54 140 54 Q 192 54 234 140 Q 192 218 140 218 Q 88 218 46 140 Z" fill="url(#greensGrad)" opacity="0.96"/>
        <!-- Crisp Romaine / Leaf Rib Accents -->
        <path d="M 140 58 Q 140 138 140 214" stroke="url(#ribsGrad)" stroke-width="3" stroke-linecap="round" opacity="0.75" fill="none"/>
        <path d="M 140 95 Q 110 85 85 92" stroke="url(#ribsGrad)" stroke-width="2" stroke-linecap="round" opacity="0.6" fill="none"/>
        <path d="M 140 105 Q 170 95 195 102" stroke="url(#ribsGrad)" stroke-width="2" stroke-linecap="round" opacity="0.6" fill="none"/>
        <path d="M 140 160 Q 105 168 80 160" stroke="url(#ribsGrad)" stroke-width="2" stroke-linecap="round" opacity="0.6" fill="none"/>
        <path d="M 140 170 Q 175 178 200 170" stroke="url(#ribsGrad)" stroke-width="2" stroke-linecap="round" opacity="0.6" fill="none"/>
      </g>

      <!-- Flame Grilled Boneless Protein Layer -->
      ${proteinSvg}

      <!-- Artisanal Dressing Drizzle Ribbon -->
      ${dressingSvg}

      <!-- Dynamic Selected Crunches & Toppings -->
      ${toppingsSvg}
    </svg>
  `;
}

// 3. Nutrition & Price Calculations with Animated Gauges
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

  if (calsEl) calsEl.textContent = `${Math.round(cals)} kcal`;
  if (protEl) protEl.textContent = `${Math.round(prot * 10) / 10}g`;
  if (fiberEl) fiberEl.textContent = `${Math.round(fiber * 10) / 10}g`;
  if (priceEl) priceEl.textContent = formatRupiah(price);

  // Animated Nutrient Gauges
  const calsBar = document.getElementById('hudCalsBar');
  const protBar = document.getElementById('hudProteinBar');
  const fiberBar = document.getElementById('hudFiberBar');

  if (calsBar) {
    const calsPct = Math.min(100, Math.max(12, Math.round((cals / 650) * 100)));
    calsBar.style.width = `${calsPct}%`;
  }
  if (protBar) {
    const protPct = Math.min(100, Math.max(12, Math.round((prot / 55) * 100)));
    protBar.style.width = `${protPct}%`;
  }
  if (fiberBar) {
    const fiberPct = Math.min(100, Math.max(12, Math.round((fiber / 12) * 100)));
    fiberBar.style.width = `${fiberPct}%`;
  }
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
    unitPrice: price,
    price: price,
    qty: 1
  };

  orderBag.push(item);
  updateBagBadge();
  notifyGuest(`Ditambahkan ke Keranjang: Custom Wrap (${formatRupiah(price)})`);
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

function changeWrapQty(id, delta) {
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
      <div class="cart-item-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
        <span class="cart-item-price">${formatRupiah(item.price)} <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: normal;">(${formatRupiah(item.unitPrice)}/wrap)</span></span>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="qty-stepper">
            <button class="qty-btn" onclick="changeWrapQty('${item.id}', -1)" title="Kurangi">−</button>
            <span class="qty-val">${item.qty || 1}</span>
            <button class="qty-btn" onclick="changeWrapQty('${item.id}', 1)" title="Tambah">+</button>
          </div>
          <button class="btn-remove-item" onclick="removeFromBag('${item.id}')" title="Hapus menu">
            <i data-lucide="trash-2" style="width: 12px; height: 12px;"></i>
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

  if (countBadge) countBadge.textContent = `${totalPortions} Wrap`;
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
          <button type="button" class="qty-btn" onclick="changeWrapQty('${it.id}', -1)" title="Kurangi porsi">−</button>
          <span class="qty-val">${it.qty || 1}</span>
          <button type="button" class="qty-btn" onclick="changeWrapQty('${it.id}', 1)" title="Tambah porsi">+</button>
        </div>
      </div>
    `).join('');
  }
}

function openCheckoutModal() {
  if (orderBag.length === 0) {
    addCustomWrapToBag();
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
