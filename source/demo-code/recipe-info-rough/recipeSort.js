function displayCuisine() {
    let displayLabel = document.getElementById("cuisine-collapse").innerHTML;
    if(displayLabel == "↓"){
      document.getElementById("cuisine-collapse-body").style.display = flex;
      document.getElementById("cuisine-collapse").innerHTML = "↑";
    }
    else if(displayLabel == "↑"){
        document.getElementById("cuisine-collapse-body").style.display = flex;
        document.getElementById("cuisine-collapse").innerHTML = "↓";
    }
  }