async function init() {
  const element = document.querySelector('.main');

  const card = document.createElement('recipe-card');
  card.data = null;
  element.appendChild(card);
}

window.addEventListener('DOMContentLoaded', init);
