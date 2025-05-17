export function Aside() {
  let aside = document.getElementById("aside");
  let asideVar = `
      <div class="left bg-black d-flex justify-content-between flex-column animate__animated animate__backInUp">
        <div class="up h-50">
          <ul class="">
            <li><a href="/Resturant/Search/search.html">Search</a></li>
            <li><a href="../index.html">Home</a></li>
            <li><a href="/Resturant/categories/categorie.html">Category</a></li>
            <li><a href="/Resturant/Area/Area.html">Area</a></li>
            <li><a href="/Resturant/ingredients/ingr.html">Ingredients</a></li>
            <li><a href="/Resturant/Contact/contact.html">Contact us</a></li>
          </ul>
        </div>
        <div class="down text-white p-2">
          <p>Created by Ahmed Sayed</p>
        </div>
      </div>
      <div class="right bg-white d-flex justify-content-between align-items-center flex-column">
        <div class="up"><div class="image"></div></div>
        <div class="mid">
          <div class="icon">
            <i class="fa-solid fa-xmark text-black d-none" id="exit"></i>
            <i class="fa-solid fa-bars text-black" id="menu"></i>
          </div>
        </div>
        <div class="down">
          <div class="icons d-flex flex-column">
            <i class="fa-solid fa-globe"></i>
            <i class="fa-solid fa-share-nodes mt-2 mb-2"></i>
          </div>
        </div>
      </div>`;
  aside.innerHTML = asideVar;
}

export function clicks() {
  let aside = document.getElementById("aside");
  let menu = document.getElementById("menu");
  let exit = document.getElementById("exit");
  let up = document.querySelector(".left .up ul");
  exit.addEventListener("click", function () {
    aside.classList.remove("active");
    exit.classList.add("d-none");
    menu.classList.remove("d-none");
    up.classList.remove("animate__animated", "animate__fadeInUp");
  });

  menu.addEventListener("click", function () {
    aside.classList.add("active");
    menu.classList.add("d-none");
    exit.classList.remove("d-none");
    up.classList.add("animate__animated", "animate__fadeInUp");
  });
}
