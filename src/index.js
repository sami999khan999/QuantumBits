const productWrapper = document.querySelector(".product-wrapper");
const addedProduct = document.querySelector(".added-products");
const modalClose = document.querySelector(".modal-close");
const modal = document.querySelector(".modal");
const cart = document.querySelector(".cart");
const itemCount = document.querySelector(".item-count");

//=================================================================================================================//
// fetching product
//=================================================================================================================//

function getProducts() {
  fetch("http://localhost:8000/products")
    .then((res) => {
      if (!res.ok)
        throw new Error("Products not found, please try again later!");
      return res.json();
    })
    .then((data) => {
      renderProducts(data);
      renderLocalData(data);
    })
    .catch((err) => renderError(err));
}

getProducts();

//=================================================================================================================//
// currency formate
//=================================================================================================================//

function currencyFormate(price) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

//=================================================================================================================//
// rendering data
//=================================================================================================================//

function renderProducts(products) {
  products.forEach((product) => {
    html = `
      <div
          class="product overflow-hidden w-96 bg-white/75 shadow-xl backdrop-blur-lg rounded-lg shadow-gray-200"
        >
          <div
            class="product-img h-75 overflow-hidden p-3 flex justify-center items-center"
          >
            <img
              src=${product.image}
              alt=${product.title}
              class="w-full block"
            />
          </div>
          <div class="product-text p-5 flex flex-col gap-1">
            <p class="text-sm font-semibold text-violet-500 tracking-widest">${
              product.catagory
            }</p>
            <h3 class="text-2xl font-semibold truncate text-black/80">
              ${product.title}
            </h3>
            <p class="text-2xl text-rose-500 font-semibold">
              ${currencyFormate(product.price)}
              <span class="text-sm font-semibold text-gray-500"
                >(${product.review} reviews)</span
              >
            </p>
            <button
            data-id="${product.id}"
              class="add-to-cart self-start bg-violet-500 text-violet-50 py-2 px-5 rounded font-semibold shadow-2xl shadow-violet-200 hover:bg-rose-500 hover:shadow-rose-200 duration-200 mt-2"
            >
              Add to cart
            </button>
          </div>
      </div>
    `;
    productWrapper.insertAdjacentHTML("afterbegin", html);
  });

  //===============================================================================================================//
  // add to cart
  //===============================================================================================================//

  const addToCart = document.querySelectorAll(".add-to-cart");

  addToCart.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const id = e.target.dataset.id;

      // cart open
      modal.classList.add("-translate-x-0");
      modal.classList.remove("translate-x-full");

      // checking local data
      const checkingLocalData = JSON.parse(localStorage.getItem(`item-${id}`));

      if (checkingLocalData) {
        return null;
      }

      if (!checkingLocalData) {
        // rumber of items in cart
        numberOfItems();
        // calling another fetch function
        fetchingSingleProduct(id);
      }
    });
  });
}

//=================================================================================================================//
// number of items in cart
//=================================================================================================================//

function numberOfItems() {
  const items = Number(itemCount.textContent) + 1;
  itemCount.textContent = items;
}

//=================================================================================================================//
// fetching single product
//=================================================================================================================//

function fetchingSingleProduct(id) {
  fetch(`http://localhost:8000/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      saveInLocalStroage(data);
      renderSingleProduct(data);
    });
}

//=================================================================================================================//
// save in local stroage
//=================================================================================================================//

function saveInLocalStroage(product) {
  // getting data from locel stroage
  const getLocalData = JSON.parse(localStorage.getItem(`item-${product.id}`));

  // if data exists return null
  if (getLocalData) return null;

  // if data does not exists
  if (!getLocalData) {
    localStorage.setItem(`item-${product.id}`, JSON.stringify(product));
  }
}

//=================================================================================================================//
// rendering local data
//=================================================================================================================//

function renderLocalData(products) {
  let localData = [];

  for (let i = 1; i <= products.length; i++) {
    const dataParsing = JSON.parse(localStorage.getItem(`item-${i}`));
    if (dataParsing) localData.push(dataParsing);
  }

  // render local data
  localData.forEach((product) => {
    renderSingleProduct(product);
  });

  // render item count
  const items = localData.length;
  itemCount.textContent = items;
}

//=================================================================================================================//
// rendering single product
//=================================================================================================================//

function renderSingleProduct(product) {
  const html = `
  <div
  class="added-product grid grid-cols-4 border-b pb-2 justify-center overflow-hidden gap-2 items-center "
>
  <div
    class="img overflow-hidden w-20 rounded flex justify-center items-center cursor-pointer"
  >
    <img
      src="${product.image}"
      alt="${product.title}"
      class="block w-full rounded"
    />
  </div>
  <div class="texts flex flex-col gap-2 col-span-2">
    <h4 class="font-semibold">${product.title}</h4>
    <div class="flex justify-between items-center">
      <p class="price font-bold text-rose-500">$${currencyFormate(
        product.price
      )}</p>
      <p
        class="font-semibold text-xl overfolw-hidden flex items-center bg-purple-100 gap-3"
      >
        <span
          class="bg-violet-500 text-violet-50 px-3 cursor-pointer active:bg-rose-500 select-none"
          >-</span
        ><span>1</span
        ><span
          class="bg-violet-500 text-violet-50 px-3 cursor-pointer active:bg-rose-500 select-none"
          >+</span
        >
      </p>
    </div>
  </div>
  <button
    class="romove-item hover:text-rose-500 justify-self-end pt-10 duration-200"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  </button>
</div>
  `;
  addedProduct.insertAdjacentHTML("afterbegin", html);
}

//=================================================================================================================//
// rendering error
//=================================================================================================================//

function renderError(err) {
  const html = `
      <p>${err.message}</p>
  `;

  productWrapper.insertAdjacentHTML("afterbegin", html);
}

//=================================================================================================================//
// modal open
//=================================================================================================================//

cart.addEventListener("click", function () {
  modal.classList.add("-translate-x-0");
  modal.classList.remove("translate-x-full");
});

//=================================================================================================================//
// modal close
//=================================================================================================================//

modalClose.addEventListener("click", function () {
  modal.classList.add("translate-x-full");
  modal.classList.remove("-translate-x-0");
});
