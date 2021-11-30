/**
 * Populates the ExpandedRecipeCard with data
 * @param {Object} data - JSON object to use for page data
 */
function openRecipeInfoTest(data) {
  // Header section
  const title = document.querySelector('.info-title');
  title.innerHTML = data.title;

  const starValue = data.spoonacularScore / 20;
  const roundedStars = Math.round(starValue);

  const stars = document.getElementById('recipe-info-stars');
  stars.src = `./source/images/${roundedStars}-star.svg`;

  const line = document.createElement('span');
  line.classList.add('divider');

  const rating = document.getElementById('recipe-info-rating');
  rating.innerHTML = `${starValue} stars`;
  rating.appendChild(line);

  const likes = document.getElementById('recipe-info-likes');
  likes.innerHTML = `${data.aggregateLikes} likes`;

  const image = document.getElementById('recipe-info-image');
  image.src = data.image;

  const desc = document.getElementById('info-description');
  desc.innerHTML = data.summary;

  const list = document.getElementById('info-ingredients-list');
  removeAllChildNodes(list);

  data.extendedIngredients.forEach((item) => {
    const listElement = document.createElement('li');
    listElement.classList.add('info-ingredient');
    listElement.innerHTML = item.originalString;
    list.appendChild(listElement);
  });
