import { Aside, clicks } from "../aside.js";
import { showMealDetails } from "../popup.js";
Aside();
clicks();

let searchByName = document.getElementById("searchByName");
let searchByFirstLetter = document.getElementById("searchByFirstLetter");
let resultContainer = document.querySelector("#roww");

searchByName.addEventListener("input", async function () {
  let name = searchByName.value.trim();
  if (name.length === 0) {
    resultContainer.innerHTML = "";
    return;
  }
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let data = await res.json();
  display(data.meals);
});

searchByFirstLetter.addEventListener("input", async function () {
  let letter = searchByFirstLetter.value.trim();
  if (letter.length === 0) {
    resultContainer.innerHTML = "";
    return;
  }
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let data = await res.json();
  display(data.meals);
});

function display(meals) {
  if (!meals) {
    resultContainer.innerHTML = `<p class="text-danger text-center">No meals found</p>`;
    return;
  }

  let mealHTML = "";

  meals.forEach((meal) => {
    mealHTML += `
        <div class="col-md-3 mb-3 overflow-hidden position-relative " data-type="meal" meal-id="${meal.idMeal}">
        <div class="assets position-relative w-100 overflow-hidden">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid rounded" />
          <div class="overLay rounded d-flex justify-content-center align-items-center ">
            <h2 class="text-black">${meal.strMeal}</h2>
          </div>
        </div>
      </div>
      `;
  });

  mealHTML += `</div>`;

  resultContainer.innerHTML = mealHTML;
  addMealClicks();
  $(document).ready(function () {
    $(".loader").fadeOut(400, function () {
      $(".loading-screen").slideUp(400, function () {
        $("body").css({ overflow: "auto" });
        $(".loading-screen").remove();
      });
    });
  });
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
