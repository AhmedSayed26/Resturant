export function showMealDetails(item, fromCategory = false) {
  const modal = document.getElementById("mealModal");
  const mealDetails = document.getElementById("row");

  let ingredientsHTML = "";

  for (let i = 1; i <= 15; i++) {
    const ingredient = item[`strIngredient${i}`];
    const measure = item[`strMeasure${i}`];
    if (ingredient) {
      ingredientsHTML += `<p class="me-1 btn btn-info"><span>${measure}</span> ${ingredient}</p>`;
    }
  }

  let itemTags = fromCategory
    ? `<button class="btn btn-light text-start ">${item.strTags} </button>`
    : `<button class="btn btn-light text-start d-none">${item.strMeal}</button>`;

  mealDetails.innerHTML = `
      <div class="col-md-4">
          <img src="${item.strMealThumb}" class="img-fluid rounded mb-3 d-block mx-auto" />
          <h2 class="text-center mb-3">${item.strMeal} </h2>
      </div>
      <div class="col-md-6">
          <h1>Instructions</h1>
          <p><strong>Instructions:</strong> ${item.strInstructions}</p>
          <p><strong>Area:</strong> ${item.strArea}</p>
          <p><strong>Category:</strong> ${item.strCategory}</p>
          <div class="d-flex flex-wrap">${ingredientsHTML}</div>
          ${itemTags}
          <div>
            <a href="${item.strSource}" target="_blank" class="btn btn-success mt-2 mb-2">Source</a>
            <a href="${item.strYoutube}" target="_blank" class="btn btn-danger mt-2 mb-2">YouTube</a>
          </div>
      </div>
    `;

  modal.classList.remove("d-none");
  document.body.classList.add("modal-open");
}
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("mealModal").classList.add("d-none");
  document.body.classList.remove("modal-open");
});
