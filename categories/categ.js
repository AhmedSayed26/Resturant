import { Aside, clicks } from "../aside.js";
import { showMealDetails } from "../popup.js";

Aside();
clicks();

let row = document.querySelector(".row");
let allCategories = [];

async function GetApiCategoriesPage() {
  const request = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const response = await request.json();
  return response.categories;
}

async function displayCategories() {
  allCategories = await GetApiCategoriesPage();

  const htmlContent = allCategories
    .map(
      (cate) => `
        <div class="col-md-3 mb-3 overflow-hidden position-relative" data-type="category" category-id="${
          cate.strCategory
        }" data-type="category">
          <div class="assets position-relative w-100 overflow-hidden">
            <img src="${cate.strCategoryThumb}" class="img-fluid rounded" />
            <div class="overLay rounded d-flex justify-content-center align-items-center flex-column">
              <h3 class="text-center text-black">${cate.strCategory}</h3>
              <p class="text-black p-2">${cate.strCategoryDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}...</p>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  $(document).ready(function () {
    $(".loader").fadeOut(400, function () {
      $(".loading-screen").slideUp(400, function () {
        $("body").css({ overflow: "auto" });
        $(".loading-screen").remove();
      });
    });
  });

  row.innerHTML = htmlContent;
  addCategoryClicks();
}
displayCategories();

function addCategoryClicks() {
  const cards = document.querySelectorAll(".col-md-3");
  cards.forEach((card) => {
    card.addEventListener("click", async () => {
      const category = card.getAttribute("category-id");
      const request = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const response = await request.json();
      displayMeals(response.meals);
    });
  });
}

export function displayMeals(meals) {
  const htmlContent = meals
    .map(
      (meal) => `
        <div class="col-md-3 mb-3 overflow-hidden position-relative" data-type="category"  meal-id="${meal.idMeal}">
          <div class="assets position-relative w-100 overflow-hidden">
            <img src="${meal.strMealThumb}" class="img-fluid rounded" />
            <div class="overLay rounded d-flex justify-content-center align-items-center">
              <h2 class="text-black">${meal.strMeal}</h2>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  row.innerHTML = htmlContent;
  addMealClicks();
}

export function addMealClicks() {
  const mealCards = document.querySelectorAll(".col-md-3");
  mealCards.forEach((card) => {
    card.addEventListener("click", async () => {
      const mealId = card.getAttribute("meal-id");
      const request = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const response = await request.json();
      const meal = response.meals[0];
      console.log(meal);
      console.log(mealId);
      showMealDetails(meal, true);
    });
  });
}
