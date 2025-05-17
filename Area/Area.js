import { Aside, clicks } from "../aside.js";
import { showMealDetails } from "../popup.js";

Aside();
clicks();

let row = document.querySelector(".row");
let textContent;
let areaName;

async function GetApiAreaPage() {
  let request = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let response = await request.json();
  return response.meals;
}

async function display() {
  let areas = await GetApiAreaPage();

  let htmlContent = areas
    .map(
      (meal) => `
        <div class="col-md-3 mb-3 overflow-hidden position-relative animate__animated animate__lightSpeedInRight">
          <div class="assets position-relative w-100 overflow-hidden">
            <div class="d-flex justify-content-center align-items-center flex-column">
                <i class="fa-solid fa-house-chimney text-white h1"></i>
                <a href="" data-area="${meal.strArea}" id="textContent" class="text-white text-start area-link">${meal.strArea}</a>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  row.innerHTML = htmlContent;

  textContent = document.querySelectorAll("#textContent");
  getAreaName();
  $(document).ready(function () {
    $(".loader").fadeOut(400, function () {
      $(".loading-screen").slideUp(400, function () {
        $("body").css({ overflow: "auto" });
        $(".loading-screen").remove();
      });
    });
  });
}

display();

export function getAreaName() {
  textContent = document.querySelectorAll("#textContent");
  textContent.forEach((item) => {
    item.addEventListener("click", async (e) => {
      e.preventDefault();
      areaName = e.target.getAttribute("data-area");
      console.log(areaName);
      const request = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
      );
      const response = await request.json();
      displayMeals(response.meals);
      const cards = document.querySelectorAll(".col-md-3");
      addMealClicks(cards);
    });
  });
}

async function displayMeals(meals) {
  let htmlContent = meals
    .map(
      (meal) => `
        <div meal-id=${meal.idMeal} class="col-md-3 mb-3 overflow-hidden position-relative animate__animated animate__lightSpeedInRight">
          <div class="assets position-relative w-100 overflow-hidden">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid rounded" />
            <div class="overLay rounded d-flex justify-content-center align-items-center">
              <h2 class="text-black">${meal.strMeal}</h2>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  row.innerHTML = htmlContent;
}

function addMealClicks(cards) {
  cards.forEach((card) => {
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
