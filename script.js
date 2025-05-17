import { Aside, clicks } from "./aside.js";
import { showMealDetails } from "./popup.js";
Aside();
clicks();
let row = document.querySelector(".row");
let allMeals = [];
async function GetApiHomePage() {
  let request = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let response = await request.json();
  return response;
}
async function display() {
  let response = await GetApiHomePage();
  allMeals = response.meals;

  let htmlContent = response.meals
    .map(
      (meal) => `
      <div class="col-md-3 mb-3 overflow-hidden position-relative " data-type="meal" meal-id="${meal.idMeal}">
        <div class="assets position-relative w-100 overflow-hidden">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid rounded" />
          <div class="overLay rounded d-flex justify-content-center align-items-center ">
            <h2 class="text-black">${meal.strMeal}</h2>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  row.innerHTML = htmlContent;
  addMealClicks();
  $(document).ready(function () {
    $(".loader").fadeOut(700, function () {
      $(".loading-screen").slideUp(700, function () {
        $("body").css({ overflow: "auto" });
        $(".loading-screen").remove();
      });
    });
  });
}
function addMealClicks() {
  const mealCards = document.querySelectorAll(".col-md-3[data-type='meal']");
  mealCards.forEach((card) => {
    card.addEventListener("click", () => {
      const mealId = card.getAttribute("meal-id");
      const meal = allMeals.find((m) => m.idMeal === mealId);
      console.log(mealId);
      if (meal) {
        showMealDetails(meal, false);
      }
    });
  });
}
display();
