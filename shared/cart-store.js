/**
 * SMOOTHIE THERAPY — Unified Cart, Auto-Combo Engine, Batch & Payment Store
 * Shared across index.html, salad/, and smoothie-bowls/
 */
(function (global) {
  const CART_KEY = 'st_unified_cart_v1';
  const BATCH_KEY = 'st_selected_batch_v1';
  const ORDERS_KEY = 'st_live_orders_v1';

  // Centralized Booth Payment Details (edit here to update all pages at once)
  const PAYMENT_CONFIG = {
    qrisImageRoot: './assets/qris-payment.png',
    qrisImageSub: '../assets/qris-payment.png',
    merchantName: 'Smoothie Therapy P8',
    ewalletLabel: 'GoPay / DANA / OVO',
    ewalletNumber: '08118411410',
    ewalletHolder: 'Panitia P8 Smoothie Therapy',
    bankName: 'BCA',
    bankAccount: '08118411410', // Ganti dengan No. Rekening BCA Panitia jika berbeda
    bankHolder: 'Panitia P8 Smoothie Therapy'
  };

  const BATCHES = {
    'batch-1': { id: 'batch-1', short: 'Istirahat 1', label: 'Batch 1 • Istirahat 1 (09:30 – 10:00)', time: '09:30 – 10:00' },
    'batch-2': { id: 'batch-2', short: 'Istirahat 2', label: 'Batch 2 • Istirahat 2 (12:00 – 12:30)', time: '12:00 – 12:30' },
    'batch-3': { id: 'batch-3', short: 'Pulang Sekolah', label: 'Batch 3 • Pulang Sekolah (14:30 – 15:30)', time: '14:30 – 15:30' }
  };

  function detectCategory(title) {
    const t = String(title || '').toLowerCase();
    if (t.includes('combo') || t.includes('package') || t.includes('paket')) return 'combo';
    if (t.includes('wrap') || t.includes('salad')) return 'wrap';
    if (t.includes('malibu') || t.includes('mango')) return 'mango';
    if (t.includes('bowl') || t.includes('strawberry')) return 'bowl';
    return 'other';
  }

  function normalizeItem(raw) {
    const qty = Math.max(1, Number(raw.qty) || 1);
    const unitPrice = Number(raw.unitPrice || (raw.price ? raw.price / qty : 0)) || 0;
    return {
      id: raw.id || ('item_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6)),
      title: raw.title || 'Menu Smoothie Therapy',
      desc: raw.desc || raw.details || '',
      toppings: raw.toppings || '',
      category: raw.category || detectCategory(raw.title),
      unitPrice: unitPrice,
      price: unitPrice * qty,
      qty: qty
    };
  }

  function getCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.map(normalizeItem) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(items) {
    const normalized = (items || []).map(normalizeItem);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(normalized));
    } catch (e) {
      console.warn('Cart save warning:', e);
    }
    return normalized;
  }

  function addItem(rawItem) {
    const cart = getCart();
    const item = normalizeItem(rawItem);
    const existing = cart.find(
      c => c.title === item.title && c.desc === item.desc && c.toppings === item.toppings && c.unitPrice === item.unitPrice
    );
    if (existing) {
      existing.qty += item.qty;
      existing.price = existing.unitPrice * existing.qty;
    } else {
      cart.push(item);
    }
    return saveCart(cart);
  }

  function changeQty(id, delta) {
    let cart = getCart();
    const item = cart.find(c => c.id === id);
    if (!item) return cart;
    const nextQty = (item.qty || 1) + delta;
    if (nextQty <= 0) {
      cart = cart.filter(c => c.id !== id);
    } else {
      item.qty = nextQty;
      item.price = item.unitPrice * item.qty;
    }
    return saveCart(cart);
  }

  function removeItem(id) {
    const cart = getCart().filter(c => c.id !== id);
    return saveCart(cart);
  }

  function clearCart() {
    return saveCart([]);
  }

  /**
   * Auto-Combo Savings Calculation:
   * - 1 Wrap + 1 Bowl + 1 Malibu Mango => Trio Therapy (-Rp 10.000)
   * - 1 Wrap + 1 Malibu Mango          => Duo Refresh  (-Rp 5.000)
   * - 1 Bowl + 1 Malibu Mango          => Duo Superfood (-Rp 5.000)
   */
  function calculateTotals(items) {
    const cart = items || getCart();
    let subtotal = 0;
    let totalQty = 0;
    let wraps = 0;
    let bowls = 0;
    let mangos = 0;

    cart.forEach(it => {
      const q = it.qty || 1;
      subtotal += (it.unitPrice || 0) * q;
      totalQty += q;
      const cat = it.category || detectCategory(it.title);
      if (cat === 'wrap') wraps += q;
      else if (cat === 'bowl') bowls += q;
      else if (cat === 'mango') mangos += q;
    });

    let discount = 0;
    const promoBadges = [];

    // 1. Trio matches first (-Rp 10.000 each)
    const trios = Math.min(wraps, bowls, mangos);
    if (trios > 0) {
      discount += trios * 10000;
      wraps -= trios;
      bowls -= trios;
      mangos -= trios;
      promoBadges.push(`${trios}x Auto-Trio (-Rp ${(trios * 10000).toLocaleString('id-ID')})`);
    }

    // 2. Duo Refresh: Wrap + Malibu Mango (-Rp 5.000 each)
    const duoRefresh = Math.min(wraps, mangos);
    if (duoRefresh > 0) {
      discount += duoRefresh * 5000;
      wraps -= duoRefresh;
      mangos -= duoRefresh;
      promoBadges.push(`${duoRefresh}x Auto-Duo Refresh (-Rp ${(duoRefresh * 5000).toLocaleString('id-ID')})`);
    }

    // 3. Duo Superfood: Bowl + Malibu Mango (-Rp 5.000 each)
    const duoSuperfood = Math.min(bowls, mangos);
    if (duoSuperfood > 0) {
      discount += duoSuperfood * 5000;
      bowls -= duoSuperfood;
      mangos -= duoSuperfood;
      promoBadges.push(`${duoSuperfood}x Auto-Duo Superfood (-Rp ${(duoSuperfood * 5000).toLocaleString('id-ID')})`);
    }

    const finalTotal = Math.max(0, subtotal - discount);

    // Upsell hint when customer has wrap/bowl without mango (or mango without food)
    let upsellHint = '';
    if (discount === 0 && totalQty > 0) {
      if ((wraps > 0 || bowls > 0) && mangos === 0) {
        upsellHint = '💡 Tambah 1 Malibu Mango untuk otomatis Hemat Rp 5.000 (Duo Combo)!';
      } else if (mangos > 0 && wraps === 0 && bowls === 0) {
        upsellHint = '💡 Tambah 1 Wrap atau Smoothie Bowl untuk otomatis Hemat Rp 5.000!';
      }
    }

    return {
      subtotal,
      discount,
      finalTotal,
      totalQty,
      promoBadges,
      upsellHint
    };
  }

  function getSelectedBatch() {
    try {
      const saved = localStorage.getItem(BATCH_KEY);
      if (saved && BATCHES[saved]) return saved;
    } catch (e) {}
    return 'batch-1';
  }

  function setSelectedBatch(batchId) {
    const valid = BATCHES[batchId] ? batchId : 'batch-1';
    try {
      localStorage.setItem(BATCH_KEY, valid);
    } catch (e) {}
    return valid;
  }

  function getBatchInfo(batchId) {
    return BATCHES[batchId] || BATCHES['batch-1'];
  }

  function pushLiveOrder(orderRecord) {
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      const list = raw ? JSON.parse(raw) : [];
      const arr = Array.isArray(list) ? list : [];
      arr.unshift(orderRecord);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(arr.slice(0, 100)));
    } catch (e) {
      console.warn('Live order push warning:', e);
    }
  }

  function renderPaymentCardHtml(method, amountFormatted, isSubpage) {
    const qrisSrc = isSubpage ? PAYMENT_CONFIG.qrisImageSub : PAYMENT_CONFIG.qrisImageRoot;
    if (method === 'qris') {
      return `
        <div class="instant-pay-card">
          <div class="instant-pay-qris-wrap">
            <img src="${qrisSrc}" alt="QRIS Smoothie Therapy" class="instant-qris-img"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="instant-qris-fallback" style="display:none;">
              <span style="font-size:1.4rem;">📱</span>
              <strong>QRIS ${PAYMENT_CONFIG.merchantName}</strong>
              <span style="font-size:0.68rem; color:#94a3b8;">Scan QR di Booth atau E-Wallet di bawah</span>
            </div>
          </div>
          <div class="instant-pay-details">
            <div class="instant-pay-title">Scan QRIS / Transfer E-Wallet</div>
            <div class="instant-pay-sub">${PAYMENT_CONFIG.ewalletLabel} • a.n. ${PAYMENT_CONFIG.ewalletHolder}</div>
            <div class="instant-copy-row">
              <code class="instant-acct-num">${PAYMENT_CONFIG.ewalletNumber}</code>
              <button type="button" class="btn-copy-acct" onclick="SmoothieStore.copyText('${PAYMENT_CONFIG.ewalletNumber}', this)">📋 Salin</button>
            </div>
            <div class="instant-pay-amount">Nominal: <strong>${amountFormatted}</strong></div>
          </div>
        </div>
      `;
    }
    if (method === 'transfer') {
      return `
        <div class="instant-pay-card">
          <div class="instant-pay-details" style="width:100%;">
            <div class="instant-pay-title">🏦 Transfer ${PAYMENT_CONFIG.bankName} / E-Wallet</div>
            <div class="instant-pay-sub">a.n. ${PAYMENT_CONFIG.bankHolder}</div>
            <div class="instant-copy-row">
              <code class="instant-acct-num">${PAYMENT_CONFIG.bankAccount}</code>
              <button type="button" class="btn-copy-acct" onclick="SmoothieStore.copyText('${PAYMENT_CONFIG.bankAccount}', this)">📋 Salin No. Rek</button>
            </div>
            <div class="instant-pay-amount">Transfer tepat: <strong>${amountFormatted}</strong> • Kirim bukti via WhatsApp</div>
          </div>
        </div>
      `;
    }
    return '';
  }

  function copyText(text, btnEl) {
    const finish = () => {
      if (btnEl) {
        const orig = btnEl.textContent;
        btnEl.textContent = '✅ Tersalin!';
        setTimeout(() => { btnEl.textContent = orig; }, 1800);
      }
      if (typeof global.notify === 'function') global.notify('Nomor berhasil disalin!');
      else if (typeof global.notifyGuest === 'function') global.notifyGuest('Nomor berhasil disalin!');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(finish).catch(() => {
        prompt('Salin nomor ini:', text);
      });
    } else {
      prompt('Salin nomor ini:', text);
    }
  }

  global.SmoothieStore = {
    CART_KEY,
    BATCH_KEY,
    ORDERS_KEY,
    PAYMENT_CONFIG,
    BATCHES,
    detectCategory,
    getCart,
    saveCart,
    addItem,
    changeQty,
    removeItem,
    clearCart,
    calculateTotals,
    getSelectedBatch,
    setSelectedBatch,
    getBatchInfo,
    pushLiveOrder,
    renderPaymentCardHtml,
    copyText
  };
})(window);
