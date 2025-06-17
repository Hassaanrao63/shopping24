ensureLoggedIn = () => {
  if (localStorage.getItem('loggedIn') !== 'true') window.location.href = 'index.html';
};
ensureLoggedIn();

const mockProducts = [
  { id:1,name:"Basic Tee",price:19.99,desc:"Comfortable cotton tee",img:"https://via.placeholder.com/200" },
  { id:2,name:"Sport Shoes",price:59.99,desc:"Lightweight running shoes",img:"https://via.placeholder.com/200" },
  { id:3,name:"Water Bottle",price:9.99,desc:"Insulated bottle",img:"https://via.placeholder.com/200" },
];

const cart = JSON.parse(localStorage.getItem('cart')||'[]');
const cartCount = () => document.getElementById('cartCount').innerText = cart.reduce((a,c)=>a+c.qty,0);
cartCount();

document.getElementById('logoutLink').onclick = () => {
  localStorage.removeItem('loggedIn');
  window.location.href = 'index.html';
};

function renderProducts(filter=""){
  const grid = document.getElementById('productGrid');
  grid.innerHTML = "";
  mockProducts
    .filter(p=>p.name.toLowerCase().includes(filter))
    .forEach(p => {
      const c = document.createElement('div'); c.className='card';
      c.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <h4>${p.name}</h4>
        <p>$${p.price.toFixed(2)}</p>
        <button class="button" data-id="${p.id}">View</button>
        <button class="button" data-add="${p.id}">Add to Cart</button>
      `;
      grid.appendChild(c);
    });
}

document.getElementById('searchInput').oninput = (e)=>renderProducts(e.target.value.toLowerCase());
renderProducts();

document.getElementById('productGrid').onclick = (e)=>{
  if (e.target.dataset.id) {
    window.location.href = `product.html?id=${e.target.dataset.id}`;
  } else if (e.target.dataset.add) {
    const id = +e.target.dataset.add;
    const prod = mockProducts.find(x=>x.id===id);
    const found = cart.find(i=>i.id===id);
    if(found) found.qty++;
    else cart.push({id,qty:1,price:prod.price,name:prod.name,img:prod.img});
    localStorage.setItem('cart', JSON.stringify(cart));
    cartCount();
  }
};
