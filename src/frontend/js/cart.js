async function loadCart() {
  try {
    const data = await apiFetch('/api/cart');
    renderCart(data.items);
  } catch (err) {
    if (err.status === 401) window.location.href = '/login.html';
  }
}

function renderCart(items) {
  const container = document.querySelector('[data-testid="cart-items"]');
  const emptyMsg = document.querySelector('[data-testid="empty-cart-message"]');
  const totalEl = document.querySelector('[data-testid="cart-total"]');
  const checkoutBtn = document.querySelector('[data-testid="checkout-button"]');

  container.innerHTML = '';

  if (items.length === 0) {
    emptyMsg.style.display = 'block';
    totalEl.textContent = '$0.00';
    checkoutBtn.disabled = true;
    return;
  }

  emptyMsg.style.display = 'none';
  checkoutBtn.disabled = false;

  let total = 0;
  items.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.setAttribute('data-testid', `cart-item-${item.productId}`);
    div.className = 'cart-item';
    div.innerHTML = `
      <span data-testid="item-name">${escapeHtml(item.name)}</span>
      <span data-testid="item-price">$${item.price.toFixed(2)}</span>
      <input data-testid="item-quantity" type="number" min="1" value="${item.quantity}" />
      <button data-testid="update-quantity-${item.productId}">Update</button>
      <button data-testid="remove-item-${item.productId}">Remove</button>
    `;
    div.querySelector(`[data-testid="update-quantity-${item.productId}"]`).addEventListener('click', async () => {
      const qty = parseInt(div.querySelector('[data-testid="item-quantity"]').value, 10);
      if (qty < 1) return;
      try {
        const data = await apiFetch(`/api/cart/items/${item.productId}`, {
          method: 'PUT',
          body: JSON.stringify({ quantity: qty }),
        });
        renderCart(data.items);
      } catch (err) {
        alert(err.message || 'Failed to update quantity');
      }
    });
    div.querySelector(`[data-testid="remove-item-${item.productId}"]`).addEventListener('click', async () => {
      try {
        const data = await apiFetch(`/api/cart/items/${item.productId}`, { method: 'DELETE' });
        renderCart(data.items);
      } catch (err) {
        alert(err.message || 'Failed to remove item');
      }
    });
    container.appendChild(div);
  });

  totalEl.textContent = `$${total.toFixed(2)}`;
}

document.querySelector('[data-testid="checkout-button"]').addEventListener('click', async () => {
  try {
    await apiFetch('/api/orders', { method: 'POST' });
    document.querySelector('[data-testid="cart-items"]').innerHTML = '';
    document.querySelector('[data-testid="cart-total"]').textContent = '$0.00';
    document.querySelector('[data-testid="empty-cart-message"]').style.display = 'block';
    document.querySelector('[data-testid="checkout-button"]').disabled = true;
    document.querySelector('[data-testid="order-success-message"]').style.display = 'block';
  } catch (err) {
    if (err.status === 401) window.location.href = '/login.html';
    else alert(err.message || 'Checkout failed');
  }
});

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

loadCart();
