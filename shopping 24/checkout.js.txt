function ensureLoggedIn() {
  if (localStorage.getItem('loggedIn')!=='true') window.location.href = 'index.html';
}
ensureLoggedIn();

let cart = JSON.parse(localStorage.getItem('cart')||'[]');
const total = cart.reduce((a,c)=>a + c.qty*c.price,0);
document.getElementById('checkoutTotal').innerText = total.toFixed(2);

document.getElementById('logoutLink').onclick = () => {
  localStorage.removeItem('loggedIn');
  window.location.href = 'index.html';
};

document.getElementById('placeOrder').onclick = () => {
  const addrName = document.getElementById('addrName').value;
  if (!addrName) return alert("Fill all fields");
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  alert("Order placed! Thank you.");
  window.location.href = 'home.html';
};
