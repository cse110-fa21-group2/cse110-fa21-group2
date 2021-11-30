let windowSize = 0;
function myFunction() {
  let x = document.getElementById('links');
  if (x.style.display === 'block') {
    x.style.display = 'none';
  } else {
    x.style.display = 'block';
  }

  x = document.getElementById('search');
  if (x.style.display === 'block') {
    x.style.display = 'none';
  } else {
    x.style.display = 'block';
  }
}
window.addEventListener('resize', () => {
  if (this.window.innerWidth > 800) {
    if (windowSize === 0) {
      let x = document.getElementById('links');
      x.style.display = 'block';
      x = document.getElementById('search');
      x.style.display = 'block';
      x = document.getElementById('icon');
      x.style.display = 'none';
      windowSize = 1;
    }
  }
  if (this.window.innerWidth < 800) {
    if (windowSize === 1) {
      let x = document.getElementById('links');
      x.style.display = 'none';
      x = document.getElementById('search');
      x.style.display = 'none';
      x = document.getElementById('icon');
      x.style.display = 'block';
    }
    windowSize = 0;
  }
});
