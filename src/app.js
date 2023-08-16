const productWrapper = document.querySelector(".product-wrapper");

function getProducts() {
  fetch("http://localhost:3000/products")
    .then((res) => {
      if (!res.ok) throw new Error("Something went wrong!");
      return res.json();
    })
    .then((data) => renderProducts(data))
    .catch((err) => renderError(err.message));
}

getProducts();

function currencyFormate(price) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

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
            <p class="text-lg font-semibold text-violet-500">${
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
              class="self-start bg-violet-500 text-violet-50 py-2 px-5 rounded font-semibold shadow-2xl shadow-violet-200 hover:bg-rose-500 hover:shadow-rose-200 duration-200 mt-2"
            >
              Add to cart
            </button>
          </div>
      </div>
    `;
    productWrapper.insertAdjacentHTML("afterbegin", html);
  });
}

function renderError(err) {}
