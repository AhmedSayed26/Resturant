import { Aside, clicks } from "../aside.js";
import { showMealDetails } from "../popup.js";
import { displayMeals } from "../categories/categ.js";
import { addMealClicks } from "../categories/categ.js";
Aside();
clicks();
let row = document.querySelector(".row");
let textContent;
let areaName;
async function GetApiHomePage() {
  let request = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let response = await request.json();
  return response;
}
async function display() {
  let response = await GetApiHomePage();

  let htmlContent = response.meals
    .slice(0, 20)
    .map(
      (meal) => `
        <div class="col-md-3 ">
            <div class="p-3  text-white rounded shadow h-100 text-center">
                <i class="fa-solid fa-drumstick-bite text-white h1 d-block mx-auto mb-2"></i>
                <h4 id="textContent" data-area="${meal.strIngredient}">${
        meal.strIngredient
      }</h4>
                <p style="font-size: 14px;">
                    ${
                      meal.strDescription
                        ? meal.strDescription
                            .split(" ")
                            .slice(0, 20)
                            .join(" ") + "..."
                        : "No description available."
                    }
                </p>
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
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${areaName}`
      );
      const response = await request.json();
      displayMeals(response.meals);
      displayMeals(response.meals);
      addMealClicks();
    });
  });
}
