const dresses = [
    { name: "Formal wear", Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZysl2_QoBSXSZjh6-VAO4PJ2QejrJFx5uag&s", price: 599 },
      { name: "Sports wear", Image: "https://madeinqatar.qa/wp-content/uploads/2024/02/b55.png", price: 1499 },
        { name: "indo western", Image: "https://i.pinimg.com/736x/ff/22/75/ff227585e1ce8eb6a521d4b66a298c0e.jpg", price: 2599 },
          { name: "American wear", Image: "https://i.pinimg.com/736x/9e/d4/bd/9ed4bd99558ffe0440bbd7ff6c8da6c3.jpg", price: 4599 },
            { name: "Natual cotton shirt", Image: "https://apisap.fabindia.com/medias/20091729-01.jpg?context=bWFzdGVyfGltYWdlc3w5NDYwOHxpbWFnZS9qcGVnfGFEZzBMMmd4WVM4eE1ESXpNemszTURNME1EWTJNakl2TWpBd09URTNNamxmTURFdWFuQm58MGI2NTY4Mjg0ZTU4MGJlMjUyMTI3NGVlNmIzODIwZjk1Mzk2MWY2Y2I4NTE5YTViMzNlMzhlM2VhNjBmOGY4Mw&aio=w-768", price: 2499 },
              { name: "Beige cotten Pant", Image: "https://apisap.fabindia.com/medias/20070588-01.jpg?context=bWFzdGVyfGltYWdlc3w3MDgwM3xpbWFnZS9qcGVnfGFHRTRMMmc1TVM4eE1ESXpNemszTURJd016QXpOall2TWpBd056QTFPRGhmTURFdWFuQm58M2VjZTQ2MTg1NTgyMDQ4NTU0YzUyMzFiOWU2ODZlMWU3MjkyMWRmMDY3ZmZlNGVhYmY3YzhmZjE4NDQ4N2U5YQ&aio=w-768", price: 3399 },
                { name: "Wine cooton shirt", Image: "https://apisap.fabindia.com/medias/20216919-01.jpg?context=bWFzdGVyfGltYWdlc3w4MDEyMnxpbWFnZS9qcGVnfGFEUTJMMmhpTVM4NU9UYzJPRFUwT0RreE56STNPQzh5TURJeE5qa3hPVjh3TVM1cWNHY3w2Y2RkMzIxYzQwZmEwMDM1MjZkYzMzMGQ3ZDM4YTA4NTdkMWI3NTkwOGI2MzExYjVjYWEzMDJhMmNmOWFlYTQw&aio=w-768", price: 4699 },
                  { name: "Black cotton", Image: "https://apisap.fabindia.com/medias/20229194-01.jpg?context=bWFzdGVyfGltYWdlc3wxMTcxNDl8aW1hZ2UvanBlZ3xhRFl5TDJobU15OHhNREUyTnpnM09UVXhNamc0TmpJdk1qQXlNamt4T1RSZk1ERXVhbkJufGMyOWVkNmYzYjE5ZTIwNDYwMWJjYmE3Y2JhODc5YzQ2MjcxNjNmZTgyZmRjYWQzM2FkMjc4OGVjNTVjMDMwYjI&aio=w-400", price: 1799 },
                    { name: "Blue Cotton Ikat Shirt", Image: "https://apisap.fabindia.com/medias/20217300-01.jpg?context=bWFzdGVyfGltYWdlc3wxNDAzODN8aW1hZ2UvanBlZ3xhRGt4TDJoak1DODNPVGs0TURZMk1USXhNVEUyTmk4eU1ESXhOek13TUY4d01TNXFjR2N8ODZkNGQ4NDYxMWNmMTQwNmRiZjQxZmYzMmFhYTIyZjY1ODBmNDZlZmMyZDA0NDJmNzFjYjNkNjhjYjQ0OGE4MA&aio=w-768", price: 1599 },
                      { name: "White Cotton Printed Shirt", Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvemZ1VFczpVl6QMG0lmC3wmHn1O-7e6qSdA&s", price: 2399 },
    
];

 const cart = {};

const productGrid = document.getElementById("productGrid");
const cartSection = document.getElementById("cartSection");

function renderProducts() {
  dresses.forEach((dress, index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = dress.Image;
    img.alt = dress.name;

    const name = document.createElement("div");
    name.className = "product-name";
    name.textContent = dress.name;

    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent = `₹${dress.price}`;

    const qtyLabel = document.createElement("div");
    qtyLabel.textContent = "Qty: ";

    const qtySpan = document.createElement("span");
    qtySpan.textContent = "0";
    qtySpan.id = `qty-${index}`;

    const incBtn = document.createElement("button");
    incBtn.textContent = "+";
    incBtn.onclick = () => {
      qtySpan.textContent = parseInt(qtySpan.textContent) + 1;
    };

    const decBtn = document.createElement("button");
    decBtn.textContent = "-";
    decBtn.onclick = () => {
      if (parseInt(qtySpan.textContent) > 0) {
        qtySpan.textContent = parseInt(qtySpan.textContent) - 1;
      }
    };

    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";
    // addToCartBtn.addEventListener("click", addToCart);
    addToCartBtn.onclick = () => {
      const qty = parseInt(qtySpan.textContent);
      if (qty > 0) {
        cart[dress.name] = {
          ...dress,
          quantity: qty,
        };
        addToCart();
        //import { addToCart } from './Test2.js';
        renderCart();
      } else {
        alert("Quantity must be greater than 0 to add to cart.");
      }
    };

    qtyLabel.appendChild(incBtn);
    qtyLabel.appendChild(qtySpan);
    qtyLabel.appendChild(decBtn);

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(qtyLabel);
    card.appendChild(addToCartBtn);
    productGrid.appendChild(card);
  });
}

function renderCart() {
  cartSection.innerHTML = "";
  let total = 0;
  for (const item in cart) {
    const cartItem = cart[item];
    const div = document.createElement("div");
    div.className = "cart-item";
    div.textContent = `${cartItem.name} - Qty: ${cartItem.quantity} - ₹${
      cartItem.quantity * cartItem.price
    }`;
    total += cartItem.quantity * cartItem.price;
    cartSection.appendChild(div);
  }

  const totalDiv = document.createElement("div");
  totalDiv.className = "cart-total";
  totalDiv.textContent = `Total Amount: ₹${total}`;
  cartSection.appendChild(totalDiv);
}

// Initialize
//import { addToCart } from './Test2.js'; // ✅ Adjust path based on folder structure
let count = localStorage.getItem("cartCount");
let addToCart = () => {
  //"increment cart value"
  count++;
  // updateDisplay();
  localStorage.setItem("cartCount", count);
};

renderProducts();
