function ensureLoggedIn() {
  if (localStorage.getItem('loggedIn')!=='true') window.location.href = 'index.html';
}
ensureLoggedIn();

const mockProducts = [
  { id:1,name:"Basic Tee",price:19.99,desc:"Comfortable cotton tee",img:"https://via.placeholder.com/200" },
  { id:2,name:"Sport Shoes",price:59.99,desc:"Lightweight running shoes",img:"https://via.placeholder.com/200" },
  { id:3,name:"Water Bottle",price:9.99,desc:"Insulated bottle",img:"https://via.placeholder.com/200" },
];
let cart = JSON.parse(localStorage.getItem('cart')||'[]');
const cartCount = () => document.getElementById('cartCount').innerText = cart.reduce((a,c)=>a+c.qty,0);
cartCount();

document.getElementById('logoutLink').onclick = () => {
  localStorage.removeItem('loggedIn');
  window.location.href = 'index.html';
};

const params = new URLSearchParams(location.search);
const product = mockProducts.find(p=>p.id===+params.get('id'));

const container = document.getElementById('productDetail');
container.innerHTML = `
  <img src="${product.img}" alt="${product.name}">
  <h2>${product.name}</h2>
  <p>$${product.price.toFixed(2)}</p>
  <p>${product.desc}</p>
  <input type="number" id="qty" value="1" min="1" style="width:60px;">
  <button id="addCart" class="button">Add to Cart</button>
`;

document.getElementById('addCart').onclick = ()=>{
  const qty = +document.getElementById('qty').value;
  const found = cart.find(i=>i.id===product.id);
  if(found) found.qty+=qty;
  else cart.push({id:product.id,qty,price:product.price,name:product.name,img:product.img});
  localStorage.setItem('cart', JSON.stringify(cart));
  cartCount();
  alert("Added to cart!");
};

document.getElementById('tabDesc').onclick = () => {
  showTab('tabDesc','Description of product goes here.');
};
document.getElementById('tabRev').onclick = () => {
  showTab('tabRev','No reviews yet.');
};

function showTab(tab, text){
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(tab).classList.add('active');
  document.getElementById('tabContent').innerText = text;
}

showTab('tabDesc','Description of product goes here.');
