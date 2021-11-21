var windowSize = 0;
function myFunction() {
    var x = document.getElementById("links");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }

    x = document.getElementById("search");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
}
window.addEventListener("resize", function(event) {
    if(this.window.innerWidth > 600){
        if(windowSize == 0){
            var x = document.getElementById("links");
            x.style.display = "block";
            x = document.getElementById("search");
            x.style.display = "block";
            x = document.getElementById("icon");
            x.style.display = "none";
            windowSize = 1;
        }
    }
    if(this.window.innerWidth < 600){
        if(windowSize == 1){
            var x = document.getElementById("links");
            x.style.display = "none";
            x = document.getElementById("search");
            x.style.display = "none";
            x = document.querySelector('.icon');
            x.style.display = "flex";
        }
        windowSize = 0;
    }
})