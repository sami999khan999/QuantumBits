const t=document.querySelector(".product-wrapper"),e=document.querySelector(".added-products"),o=document.querySelector(".modal-close"),s=document.querySelector(".modal"),l=document.querySelector(".cart"),r=document.querySelector(".item-count");function n(t){return t.toLocaleString("en-US",{style:"currency",currency:"USD"})}function a(t){let o=`
  <div
  class="added-product grid grid-cols-4 border-b pb-2 justify-center overflow-hidden gap-2 items-center "
>
  <div
    class="img overflow-hidden w-20 rounded flex justify-center items-center cursor-pointer"
  >
    <img
      src="${t.image}"
      alt="${t.title}"
      class="block w-full rounded"
    />
  </div>
  <div class="texts flex flex-col gap-2 col-span-2">
    <h4 class="font-semibold">${t.title}</h4>
    <div class="flex justify-between items-center">
      <p class="price font-bold text-rose-500">$${n(t.price)}</p>
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
  `;e.insertAdjacentHTML("afterbegin",o)}fetch("http://localhost:8000/products").then(t=>{if(!t.ok)throw Error("Products not found, please try again later!");return t.json()}).then(e=>{(function(e){e.forEach(e=>{html=`
      <div
          class="product overflow-hidden w-96 bg-white/75 shadow-xl backdrop-blur-lg rounded-lg shadow-gray-200"
        >
          <div
            class="product-img h-75 overflow-hidden p-3 flex justify-center items-center"
          >
            <img
              src=${e.image}
              alt=${e.title}
              class="w-full block"
            />
          </div>
          <div class="product-text p-5 flex flex-col gap-1">
            <p class="text-sm font-semibold text-violet-500 tracking-widest">${e.catagory}</p>
            <h3 class="text-2xl font-semibold truncate text-black/80">
              ${e.title}
            </h3>
            <p class="text-2xl text-rose-500 font-semibold">
              ${n(e.price)}
              <span class="text-sm font-semibold text-gray-500"
                >(${e.review} reviews)</span
              >
            </p>
            <button
            data-id="${e.id}"
              class="add-to-cart self-start bg-violet-500 text-violet-50 py-2 px-5 rounded font-semibold shadow-2xl shadow-violet-200 hover:bg-rose-500 hover:shadow-rose-200 duration-200 mt-2"
            >
              Add to cart
            </button>
          </div>
      </div>
    `,t.insertAdjacentHTML("afterbegin",html)});let o=document.querySelectorAll(".add-to-cart");o.forEach(t=>{t.addEventListener("click",function(t){let e=t.target.dataset.id;s.classList.add("-translate-x-0"),s.classList.remove("translate-x-full");let o=JSON.parse(localStorage.getItem(`item-${e}`));if(o)return null;o||(function(){let t=Number(r.textContent)+1;r.textContent=t}(),function(t){fetch(`http://localhost:8000/products/${t}`).then(t=>t.json()).then(t=>{(function(t){let e=JSON.parse(localStorage.getItem(`item-${t.id}`));!e&&(e||localStorage.setItem(`item-${t.id}`,JSON.stringify(t)))})(t),a(t)})}(e))})})})(e),function(t){let e=[];for(let o=1;o<=t.length;o++){let t=JSON.parse(localStorage.getItem(`item-${o}`));t&&e.push(t)}e.forEach(t=>{a(t)});let o=e.length;r.textContent=o}(e)}).catch(e=>(function(e){let o=`
      <p>${e.message}</p>
  `;t.insertAdjacentHTML("afterbegin",o)})(e)),l.addEventListener("click",function(){s.classList.add("-translate-x-0"),s.classList.remove("translate-x-full")}),o.addEventListener("click",function(){s.classList.add("translate-x-full"),s.classList.remove("-translate-x-0")});
//# sourceMappingURL=index.64bf1e05.js.map
