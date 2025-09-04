// --- State (with localStorage persistence) ---
let allProducts = [];
let cart = JSON.parse(localStorage.getItem('ys_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('ys_wishlist') || '[]');
let user = JSON.parse(localStorage.getItem('ys_user') || 'null'); // {name:"..."}

let currentFilter = 'all';
let searchQuery = '';

// --- Helpers for ₹ ---
const INR = (usd) => (usd * 83).toFixed(2);

// --- Persistence ---
function saveState() {
  localStorage.setItem('ys_cart', JSON.stringify(cart));
  localStorage.setItem('ys_wishlist', JSON.stringify(wishlist));
  localStorage.setItem('ys_user', JSON.stringify(user));
}

// --- Initial fetch ---
(async function init() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    allProducts = await res.json();
  } catch (e) {
    console.error('Failed to load products', e);
    allProducts = [];
  }
  updateHeaderUser();
  updateCounts();
  showPage('home');
})();

// --- UI Routing ---
function showPage(page, productId = null) {
  const el = document.getElementById('content');
  el.innerHTML = '';

  if (page === 'home' || page === 'products') {
    const heading = page === 'home' ? 'Featured Products' : 'All Products';
    el.innerHTML = `<h2 style="margin:6px 0 14px">${heading}</h2>`;
    const container = document.createElement('div');
    container.className = 'products';

    // Filter + search
    let list = [...allProducts];
    if (currentFilter !== 'all') list = list.filter(p => p.category.toLowerCase() === currentFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    if (page === 'home') list = list.slice(0, 8);

    list.forEach(p => container.appendChild(productCard(p)));
    el.appendChild(container);
  }

  if (page === 'cart') {
    el.innerHTML = `<h2>Your Cart</h2>`;
    if (cart.length === 0) {
      el.innerHTML += `<p>Cart is empty</p>`;
    } else {
      let total = 0;
      cart.forEach(item => {
        const line = item.price * 83 * item.qty;
        total += line;

        const row = document.createElement('div');
        row.className = 'row-card';
        row.innerHTML = `
          <div style="display:flex; align-items:center;">
            <img src="${item.image}" alt="${item.title}">
            <div>
              <div style="font-weight:700">${item.title}</div>
              <div>₹${INR(item.price)} x ${item.qty} = <b>₹${line.toFixed(2)}</b></div>
            </div>
          </div>
          <div class="qty">
            <button class="ghost" onclick="changeQty(${item.id}, -1)">-</button>
            <span>${item.qty}</span>
            <button class="ghost" onclick="changeQty(${item.id}, 1)">+</button>
            <button class="danger" onclick="removeFromCart(${item.id})">❌</button>
          </div>
        `;
        el.appendChild(row);
      });

      const totalWrap = document.createElement('div');
      totalWrap.style.marginTop = '10px';
      totalWrap.innerHTML = `
        <h3>Total: ₹${total.toFixed(2)}</h3>
        <button class="secondary" onclick="checkout()">Checkout</button>
        <div class="payments">
          <img src="https://img.icons8.com/color/48/visa.png" alt="Visa"/>
          <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard"/>
          <img src="https://img.icons8.com/color/48/rupay.png" alt="RuPay"/>
          <img src="https://t3.ftcdn.net/jpg/05/60/50/16/360_F_560501607_x7crxqBWbmbgK2k8zOL0gICbIbK9hP6y.jpg" alt="UPI"/>
          <img src="https://img.icons8.com/color/48/google-pay.png" alt="GPay"/>
          <img src="https://img.icons8.com/color/48/phone-pe.png" alt="PhonePe"/>
          <img src="https://img.icons8.com/color/48/paytm.png" alt="Paytm"/>
          <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal"/>
        </div>
      `;
      el.appendChild(totalWrap);
    }
  }

  if (page === 'wishlist') {
    el.innerHTML = `<h2>Your Wishlist</h2>`;
    if (wishlist.length === 0) {
      el.innerHTML += `<p>No items in wishlist</p>`;
    } else {
      wishlist.forEach(item => {
        const row = document.createElement('div');
        row.className = 'row-card';
        row.innerHTML = `
          <div style="display:flex; align-items:center;">
            <img src="${item.image}" alt="${item.title}">
            <div>
              <div style="font-weight:700">${item.title}</div>
              <div>₹${INR(item.price)}</div>
            </div>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            <button onclick="addToCart(${item.id}, true)">Add to Cart</button>
            <button class="danger" onclick="removeFromWishlist(${item.id})">❌</button>
          </div>
        `;
        el.appendChild(row);
      });
    }
  }

  if (page === 'detail' && productId) {
    const p = allProducts.find(x => x.id === productId);
    if (!p) { el.innerHTML = '<p>Product not found</p>'; return; }

    const wishActive = wishlist.some(w => w.id === p.id) ? 'active' : '';
    const stars = '⭐'.repeat(Math.round(p.rating?.rate || 0)).padEnd(5, '☆');

    const wrap = document.createElement('div');
    wrap.className = 'detail';
    wrap.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <div>
        <h1>${p.title}</h1>
        <div class="stars" style="color:#ffb400">${stars} (${p.rating?.rate || 0})</div>
        <h2 style="margin:6px 0">₹${INR(p.price)}</h2>
        <p class="desc">${p.description}</p>
        <div class="actions">
          <button onclick="addToCart(${p.id})">Add to Cart</button>
          <button class="secondary" onclick="buyNow(${p.id})">Buy Now</button>
          <button class="ghost" onclick="history.back()">Back</button>
          <span class="wish ${wishActive}" style="position:static" onclick="toggleWishlist(${p.id}, this)">&#10084;</span>
        </div>
      </div>
    `;
    el.appendChild(wrap);
  }
}

// --- Cards ---
function productCard(p) {
  const isW = wishlist.some(w => w.id === p.id);
  const card = document.createElement('div');
  card.className = 'product';
  const stars = '⭐'.repeat(Math.round(p.rating?.rate || 0)).padEnd(5, '☆');

  card.innerHTML = `
    <span class="wish ${isW ? 'active' : ''}" onclick="toggleWishlist(${p.id}, this)">&#10084;</span>
    <img src="${p.image}" alt="${p.title}" onclick="showPage('detail', ${p.id})">
    <h2 onclick="showPage('detail', ${p.id})">${p.title}</h2>
    <div class="stars">${stars} <span style="color:#555">(${p.rating?.rate || 0})</span></div>
    <div class="price">₹${INR(p.price)}</div>
    <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">
      <button onclick="addToCart(${p.id})">Add to Cart</button>
      <button class="secondary" onclick="buyNow(${p.id})">Buy Now</button>
    </div>
  `;
  return card;
}

// --- Cart logic ---
function addToCart(id, fromWishlist = false) {
  const p = allProducts.find(x => x.id === id);
  if (!p) return;
  const ex = cart.find(x => x.id === id);
  if (ex) {
    ex.qty += 1; // increment if already exists
  } else {
    cart.push({ ...p, qty: 1 });
  }
  if (fromWishlist) {
    wishlist = wishlist.filter(w => w.id !== id);
  }
  updateCounts();
  saveState();
}

function changeQty(id, delta) {
  const it = cart.find(x => x.id === id);
  if (!it) return;
  it.qty += delta;
  if (it.qty <= 0) {
    cart = cart.filter(x => x.id !== id);
  }
  updateCounts();
  saveState();
  showPage('cart');
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  updateCounts();
  saveState();
  showPage('cart');
}

function checkout() {
  if (cart.length === 0) { alert('Your cart is empty.'); return; }
  if (!user) { openLogin(); return; } // require login for checkout
  const total = cart.reduce((s, p) => s + p.price * 83 * p.qty, 0);
  alert(`✅ Order placed, ${user.name}!\nTotal: ₹${total.toFixed(2)}\n(Payments: Visa/MasterCard/UPI/Paytm/etc.)`);
  cart = [];
  updateCounts();
  saveState();
  showPage('cart');
}

function buyNow(id) {
  const p = allProducts.find(x => x.id === id);
  if (!p) return;
  if (!user) { openLogin(); return; } // require login for buy now
  alert(`✅ Order placed for:\n${p.title}\nAmount: ₹${INR(p.price)}\nThanks, ${user.name}!`);
}

// --- Wishlist ---
function toggleWishlist(id, el) {
  const p = allProducts.find(x => x.id === id);
  if (!p) return;
  const exists = wishlist.some(w => w.id === id);
  if (exists) {
    wishlist = wishlist.filter(w => w.id !== id);
    if (el) el.classList.remove('active');
  } else {
    wishlist.push(p);
    if (el) el.classList.add('active');
  }
  updateCounts();
  saveState();
}

function removeFromWishlist(id) {
  wishlist = wishlist.filter(w => w.id !== id);
  updateCounts();
  saveState();
  showPage('wishlist');
}

// --- Header counts + search ---
function updateCounts() {
  document.getElementById('cart-count').textContent = cart.reduce((a, b) => a + b.qty, 0);
  // If you add wishlist count to header later, update it here similarly.
}

function onSearch() {
  const inp = document.getElementById('searchInput');
  searchQuery = inp.value || '';
  showPage('products');
}

// --- Category filter ---
function filterByCategory(cat) {
  currentFilter = cat.toLowerCase();
  showPage('products');
}

// --- Login Modal logic ---
function openLogin() {
  document.getElementById('loginModal').classList.remove('hidden');
  setTimeout(() => document.getElementById('loginUsername')?.focus(), 0);
}
function closeLogin() {
  document.getElementById('loginModal').classList.add('hidden');
}
function modalBgClose(e) {
  if (e.target.id === 'loginModal') closeLogin();
}

function handleLogin(e) {
  e.preventDefault();
  const name = document.getElementById('loginUsername').value.trim();
  const pass = document.getElementById('loginPassword').value.trim();
  if (name.length < 2) return alert('Username must be at least 2 characters');
  if (pass.length < 4) return alert('Password must be at least 4 characters');

  user = { name };
  saveState();
  updateHeaderUser();
  closeLogin();
  alert(`Welcome, ${name}!`);
}
function updateHeaderUser() {
  const link = document.getElementById('loginLink');
  if (!link) return;
  if (user) {
    link.innerHTML = `<i class="bi bi-person-check"></i> Hi, ${escapeHtml(user.name)} (Logout)`;
    link.onclick = () => { handleLogout(); return false; };
  } else {
    link.innerHTML = `<i class="bi bi-person"></i> Login`;
    link.onclick = () => { openLogin(); return false; };
  }
}

function handleLogout() {
  if (!confirm('Logout now?')) return;
  user = null;
  saveState();
  updateHeaderUser();
  alert('Logged out.');
}

// Basic HTML escape for safety in header text
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
function updateCounts() {
  document.getElementById('cart-count').textContent = cart.reduce((a, b) => a + b.qty, 0);
  document.getElementById('wishlist-count').textContent = wishlist.length;
}
