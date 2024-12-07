const anchor1 = document.querySelector("#new-arrivals-anchor");
const anchor2 = document.querySelector("#apparel-anchor");
const anchor3 = document.querySelector("#collectibles-anchor");
const page1 = document.querySelector("#new-arrivals-page");
const page2 = document.querySelector("#apparel-page");
const page3 = document.querySelector("#collectibles-page");
const loginModal = document.querySelector("#modal-login-foo");
const username = document.querySelector("#username-input-foo");
const password = document.querySelector("#password-input-foo");
const buyingModal = document.querySelector("#modal-buying-foo");
const buyingImg = document.querySelector("#product-image-foo");
const buyingName = document.querySelector("#product-name-foo");
const buyingPrice = document.querySelector("#product-price-foo");
const cartRoute = document.querySelector("#cart-content-route-here");
let currImg = "";
let currName = "";
let currPrice = "";

let loggedIn = false;
// setTimeout(() => {
// }, 500)

const pageRoutes = {
  "new-arrivals-anchor": "new-arrivals-page",
  "apparel-anchor": "apparel-page",
  "collectibles-anchor": "collectibles-page",
};

function HandlePageRouting(anchorId) {
  if (anchor1 && anchor2 && anchor3 && page1 && page2 && page3) {
    const anchors = [anchor1, anchor2, anchor3];
    const pages = [page1, page2, page3];
    // this changes the anchor design, from inactive to active and vice versa
    anchors.forEach((a) => {
      if (a.id == anchorId) {
        if (!a.classList.contains("active")) {
          // refer to css styles for more info
          a.classList.toggle("active");
        }
      } else {
        if (a.classList.contains("active")) {
          a.classList.toggle("active");
        }
      }
    });
    // this changes the pages in display in the main page
    pages.forEach((page) => {
      if (page.id == pageRoutes[anchorId]) {
        if (!page.classList.contains("active")) {
          page.classList.toggle("active");
        }
      } else {
        if (page.classList.contains("active")) {
          page.classList.toggle("active");
        }
      }
    });
  }
}

let myCart = [];

const ItemModel = {
  name: "",
  price: 0,
  qty: 0,
  img: "",
};
let openCart = true
function DisplayCart() {
  if (cartRoute && openCart && myCart.length > 0) { // inserts products slot in the cart to display
    let template = 
    (img, name, price, qty, obj) => {
      return `
      <div class="product-card-cart">
        <img src="${img}" alt="">
        <div class="right">
          <p>${name} <br>${price}</p>
          <p>${qty}</p>
        </div>
        <button onclick="BuyProduct('${obj}')">Buy Now</button>
      </div>
    `;
    };
    let insert = ``;

    // insert in html
    myCart.forEach((item) => {
      insert += template(item.img, item.name,item.price,item.qty, item.img)
    })
    cartRoute.innerHTML = insert;
    openCart = false
  } else {
    cartRoute.innerHTML = '';
    openCart = true
  }
}

function BuyProduct(obj) {
  let newCart = []

  myCart.forEach((item) => {
    if(item.img != obj) {
      newCart.push(item)
    }
  })

  myCart = newCart;
  DisplayCart()
}

function AddToCart() {
  const newItem = {
    name: currName,
    price: currPrice,
    qty: 1,
    img: currImg,
  };
  myCart.push(newItem);
}

function HandleLoginModal(img, prodName, price) {
  if (!loggedIn) {
    loginModal.classList.toggle("active");
  } else {
    buyingModal.classList.toggle("active");
    buyingImg.src = img;
    buyingName.innerText = prodName;
    buyingPrice.innerText = price;
    currImg = img;
    currName = prodName;
    currPrice = price;
  }
}

function HandleLogin() {
  if (!loggedIn) {
    // in memory login for demo
    const uname = "username";
    const pword = "pass123";

    if (username.value == uname) {
      if (password.value == pword) {
        alert("Logged In!");
        HandleLoginModal();
        loggedIn = true;
      }
    } else if (username.value == "") {
      alert("Username can't be empty");
    } else {
      alert("Invalid username");
    }
  }
}
