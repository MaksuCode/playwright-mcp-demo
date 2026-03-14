let currentCategory = null;

async function loadProducts(category) {
  const url = category ? `/api/products?category=${encodeURIComponent(category)}` : '/api/products';
  const data = await apiFetch(url);
  renderProducts(data.products);
  await updateCartCount();
}

function renderProducts(products) {
  const grid = document.querySelector('[data-testid="product-grid"]');
  grid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.setAttribute('data-testid', `product-card-${p.id}`);
    card.className = 'product-card';
    card.innerHTML = `
      <span data-testid="product-name">${escapeHtml(p.name)}</span>
      <span data-testid="product-category">${escapeHtml(p.category)}</span>
      <span data-testid="product-price">$${p.price.toFixed(2)}</span>
      <p>${escapeHtml(p.description)}</p>
      <button data-testid="add-to-cart-${p.id}">Add to Cart</button>
    `;
    card.querySelector(`[data-testid="add-to-cart-${p.id}"]`).addEventListener('click', () => addToCart(p.id));
    grid.appendChild(card);
  });
}

async function addToCart(productId) {
  try {
    await apiFetch('/api/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity: 1 }),
    });
    await updateCartCount();
  } catch (err) {
    if (err.status === 401) window.location.href = '/login.html';
    else alert(err.message || 'Failed to add to cart');
  }
}

async function updateCartCount() {
  try {
    const data = await apiFetch('/api/cart');
    const count = data.items.reduce((sum, i) => sum + i.quantity, 0);
    document.querySelector('[data-testid="cart-count"]').textContent = count;
  } catch {
    document.querySelector('[data-testid="cart-count"]').textContent = '0';
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

document.querySelector('[data-testid="filter-all"]').addEventListener('click', () => {
  currentCategory = null;
  loadProducts(null);
});
document.querySelector('[data-testid="filter-electronics"]').addEventListener('click', () => {
  currentCategory = 'electronics';
  loadProducts('electronics');
});
document.querySelector('[data-testid="filter-apparel"]').addEventListener('click', () => {
  currentCategory = 'apparel';
  loadProducts('apparel');
});

loadProducts(null);
