// cartUtils.js
let count = localStorage.getItem("cartCount");
let cartValue = document.getElementById("lblCount");

!count ? 0 : count;

let updateDisplay = () => {
  cartValue.innerHTML = count;
};

updateDisplay()

let inc  = ()=>{ //"increment cart value"
  count++
  updateDisplay()
  localStorage.setItem('cartCount',count)
}
