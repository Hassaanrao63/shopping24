function ensureLoggedIn() {
  if (localStorage.getItem('loggedIn')!=='true') window.location.href = 'index.html';
}
ensureLoggedIn();

let cart = JSON.parse(localStorage.getItem('cart')||'[]');
const cartCount = () => document.getElementById('cartCount').innerText = cart.reduce((a,c)=>a+c.qty,0);
cartCount();

document.getElementById('logoutLink').onclick = () => {
  localStorage.removeItem('loggedIn');
  window.location.href = 'index.html';
};

function renderCart(){
  const div = document.getElementById('cartItems');
  div.innerHTML = '';
  cart.forEach(item => {
    const d = document.createElement('div');
    d.className = 'cart-item';
    d.innerHTML = `
      <img src="${item.img}">
      <div>
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)} × 
           <input type="number" class="qty" data-id="${item.id}" style="width:50px;" value="${item.qty}">
        </p>
        <button class="remove" data-id="${item.id}">Remove</button>
      </div>
    `;
    div.appendChild(d);
  });
  const total = cart.reduce((a,c)=>a + c.qty*c.price, 0);
  document.getElementById('cartTotal').innerText = total.toFixed(2);
}

renderCart();

document.getElementById('cartItems').onclick = e => {
  if (e.target.classList.contains('remove')) {
    const id = +e.target.dataset.id;
    cart = cart.filter(i=>i.id !== id);
    localStorage.setItem('cart',JSON.stringify(cart));
    renderCart();
    cartCount();
  }
};

document.getElementById('cartItems').oninput = e => {
  if (e.target.classList.contains('qty')) {
    const id = +e.target.dataset.id, q = +e.target.value;
    const item = cart.find(i=>i.id===id);
    item.qty = q;
    localStorage.setItem('cart',JSON.stringify(cart));
    renderCart();
    cartCount();
  }
};

document.getElementById('gotoCheckout').onclick = () => {
  window.location.href = 'checkout.html';
};
