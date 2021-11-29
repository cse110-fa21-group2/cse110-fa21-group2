function displaySortFilter() {
    let displayLabel = document.getElementById("display-sort-filter").innerHTML;
    console.log(displayLabel);
    if(displayLabel == "Show Sort/Filter"){
      document.getElementById("sort-filter-body").style.display = "block";
      document.getElementById("display-sort-filter").innerHTML = "Hide Sort/Filter";
    }
    else if(displayLabel == "Hide Sort/Filter"){
        document.getElementById("sort-filter-body").style.display = "none";
        document.getElementById("display-sort-filter").innerHTML = "Show Sort/Filter";
    }
  }

function displayCuisine() {
    let displayLabel = document.getElementById("cuisine-collapse").innerHTML;
    console.log(displayLabel);
    if(displayLabel == "↓"){
      document.getElementById("cuisine-collapse-body").style.display = "flex";
      document.getElementById("cuisine-collapse").innerHTML = "↑";
    }
    else if(displayLabel == "↑"){
        document.getElementById("cuisine-collapse-body").style.display = "none";
        document.getElementById("cuisine-collapse").innerHTML = "↓";
    }
  }

  function displayIntolerance() {
    let displayLabel = document.getElementById("intolerance-collapse").innerHTML;
    console.log(displayLabel);
    if(displayLabel == "↓"){
      document.getElementById("intolerance-collapse-body").style.display = "flex";
      document.getElementById("intolerance-collapse").innerHTML = "↑";
    }
    else if(displayLabel == "↑"){
        document.getElementById("intolerance-collapse-body").style.display = "none";
        document.getElementById("intolerance-collapse").innerHTML = "↓";
    }
  }