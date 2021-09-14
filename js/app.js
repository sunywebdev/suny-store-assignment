const loadProducts = () => {
  const url = 'db.json'
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {

    const prevPrice = parseFloat((product.price / 10) + product.price).toFixed(2);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `

<div class="card h-100 py-3 rounded-3">
      <img src="${product.image}" class="card-img-top mx-auto"  alt="${product.title}">
      <div class="card-body">
        <h5 class="card-title fw-bold">${product.title}</h5>
        <p class="card-text text-capitalize"><i class="fas fa-list-alt"></i> Category: ${product.category}</p>
        <h4 class="price fw-bold">Price: $ ${product.price}  <small><del>$ ${(prevPrice)}</del>(-10%)</small> </h4>
        <i class="fa fa-star-o rating-star"></i> <span class="rating-number">${product.rating.rate} (${product.rating.count})</span>
      </div>
      <div class="mx-auto">
        <button type="button"  onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="btn btn-danger px-4">Add to cart</button>
        <button type="button" id="details-btn"  class="btn btn-success px-4">Details</button>    
      </div>
</div>


      `;
    document.getElementById("all-products").appendChild(div);
  }
};


let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal()
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);;
};