/*automatic car img change for desktop*/
const images = document.querySelectorAll(".topSlider img");
let index = 0;
function changeImage() {
  try {
    images[index].classList.remove("active"); // Hide current image
    index = (index + 1) % images.length; // Move to next image
    images[index].classList.add("active"); // Show new image
  } catch (error) {}
}
setInterval(changeImage, 5000); // Change image every 5 seconds

//when on home go to cars
try {
  const seeAllBtn = document.querySelector(".seeAll");
  seeAllBtn.addEventListener("click", () => {
    window.location.href = "carsPage.html";
  });
} catch (error) {}

//go to home
try {
  const logo = document.querySelector(".logo");
  logo.addEventListener("click", () => {
    window.location.href = "index.html";
  });
} catch (error) {}

//go to login page
const loginBtn = document.querySelector(".notLogged h2");
try {
  loginBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
} catch (error) {}

//fetching all cars
fetch("/cars")
  .then((response) => response.json())
  .then(async (data) => {
    const carArray = data.cars;
    const favoriteCarIds = await fetchFavorites(); // Get the user's favorite car IDs

    if (window.innerWidth > 450) {
      carArray.forEach((car) => {
        const isFavorite = favoriteCarIds.includes(car._id);

        const html = `
        <div class="carPreview car-card" data-carid="${car._id}">
          <div><img src="http://localhost:4000/images/${
            car.images[0]
          }" alt="" /></div>
          <p class="name">${car.make} ${car.model}</p>
          <p>${car.gearbox}</p>
          <h2>$${car.price}</h2>
          <div class="yearAndMiles">
            <p>${car.year}</p>
            <p>${car.miles} MILES</p>
          </div>
          <div class="locationAndHeart">
            <img src="../defaultImages/pin.png" alt="" />
            <p>${car.city}</p>
            <img class="heart empty" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAd1JREFUaEPtmQtOwzAQRN2TUU4GnAw4GTAollxn1/vxmCgokSrR4s+82UmyTW/l5Mft5PrLBXB0Ba8KnLECr5vop1LK/ef1sb3/3P6u7zU2zMELB9Zoj7dmPZc3kQhB+Itr1VKeBSGR+QCpRg239ADArXen8HYYKlEdjYhv15CMeJBiAWQ3TvCqU4bVGAGMnMeiONq8I1412xZAdL5aiRHAl6DCk03ETQOx5mOeZoSoVQOQomNt3vL+2XwNoHcfUUEZI0frZgS+7iGZsNMrAUjZt072CFhkbG/kzghJWJ/hjPsRkaOxfRVSAOa1mKVWWKcH2JkpVaAv25EAZpz/JUB/DmSuIKxU9RVwRcg8cVjqHOuYFxQpQq7rr2NzxhDzfPTeyI6IkdSSuG5kcG62FZh1373/imZuhXisGWrmMEFrp1fGSfv+kWqntSjh8xUQmvj0F5pRV8iGSIlXc+XoSeoQRiXS4iMAq+I0JT4KwIaYFp8BYEFQxGcBZiFo4mcAshBU8bMAUQi6eAaAF2KJeBaABYH/Sw+FGfcQ6k9MkeeoFPHMClhtR3tzp4lfATCKE7t/+jVl1RM39xcSoe8KfbQKoK8ENTYt4UqAkJPZwRdA1jnWvKsCLCez65y+At8NZYYxvongZAAAAABJRU5ErkJggg=="
              style="display: ${isFavorite ? "none" : "inline-block"};" />
            <img class="heart filled" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAXpJREFUaEPtlw0OgjAMhcfJ1JOpJ1NPpjahZsJ+2q6FjmwJQRLXva99bGUKnY+pc/1hAOxdwVGBHitwm0WfQgjn7/Wcn1/zb3zOscEcuGBAjHjco3ik3HAsBMKvpKghXBJCOPMBBBNVXJICANl6EIXHf4NKYEY54uMYqUT8SakBSBcW8GanFKtRApBmXlM8xspWogTwtlDSEDOpNQfgwTpL1qSVcgDeso8wK70pAE/er1YhBQBbJh40DZY1mbqyUW8AcLbAjvQbKQCv/k++B4cE8PwOkCzk8QxA+3QPsGopDnmQQbk82ojVSgCEt+2U1cwBgKeWQtROe7GS+IMGt64934fqt3Htk3JPiKp4EEcF2NpOJPFcgK0gyOIlANYQLPFSACsItvgWAG0IkfhWAC0IsXgNgFaIJvFaAFKIZvGaAFwIFfHaAFQINfEWADUIVfFWADkIdfGWAEsIE/HWAAgR37G7VbtzulG1RTUDDQDNbEpijQpIsqY55wOCyUwxoVcsUwAAAABJRU5ErkJggg=="
              style="display: ${isFavorite ? "inline-block" : "none"};" />
          </div>
        </div>`;

        document
          .querySelector(".car-list")
          .insertAdjacentHTML("afterbegin", html);
      });
    } else {
      carArray.forEach((car) => {
        const isFavorite = favoriteCarIds.includes(car._id);

        const html = `
         <div class="car-card-mobile car-card" data-carid="${car._id}">
          <div><img src="http://localhost:4000/images/${
            car.images[0]
          }" alt="" /></div>

          <div>
            <p class="model">${car.model}</p>
            <p>${car.gearbox}</p>
            <div class="yearAndMilesMobile">
              <p>${car.year}</p>
              <p>${car.miles} MILES</p>
            </div>
            <div class="locationAndHeart">
               <img src="../defaultImages/pin.png" alt="" />
               <p class="city">${car.city}</p>
               <img class="heart empty" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAd1JREFUaEPtmQtOwzAQRN2TUU4GnAw4GTAollxn1/vxmCgokSrR4s+82UmyTW/l5Mft5PrLBXB0Ba8KnLECr5vop1LK/ef1sb3/3P6u7zU2zMELB9Zoj7dmPZc3kQhB+Itr1VKeBSGR+QCpRg239ADArXen8HYYKlEdjYhv15CMeJBiAWQ3TvCqU4bVGAGMnMeiONq8I1412xZAdL5aiRHAl6DCk03ETQOx5mOeZoSoVQOQomNt3vL+2XwNoHcfUUEZI0frZgS+7iGZsNMrAUjZt072CFhkbG/kzghJWJ/hjPsRkaOxfRVSAOa1mKVWWKcH2JkpVaAv25EAZpz/JUB/DmSuIKxU9RVwRcg8cVjqHOuYFxQpQq7rr2NzxhDzfPTeyI6IkdSSuG5kcG62FZh1373/imZuhXisGWrmMEFrp1fGSfv+kWqntSjh8xUQmvj0F5pRV8iGSIlXc+XoSeoQRiXS4iMAq+I0JT4KwIaYFp8BYEFQxGcBZiFo4mcAshBU8bMAUQi6eAaAF2KJeBaABYH/Sw+FGfcQ6k9MkeeoFPHMClhtR3tzp4lfATCKE7t/+jVl1RM39xcSoe8KfbQKoK8ENTYt4UqAkJPZwRdA1jnWvKsCLCez65y+At8NZYYxvongZAAAAABJRU5ErkJggg=="
                  style="display: ${isFavorite ? "none" : "inline-block"};" />
               <img class="heart filled" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAXpJREFUaEPtlw0OgjAMhcfJ1JOpJ1NPpjahZsJ+2q6FjmwJQRLXva99bGUKnY+pc/1hAOxdwVGBHitwm0WfQgjn7/Wcn1/zb3zOscEcuGBAjHjco3ik3HAsBMKvpKghXBJCOPMBBBNVXJICANl6EIXHf4NKYEY54uMYqUT8SakBSBcW8GanFKtRApBmXlM8xspWogTwtlDSEDOpNQfgwTpL1qSVcgDeso8wK70pAE/er1YhBQBbJh40DZY1mbqyUW8AcLbAjvQbKQCv/k++B4cE8PwOkCzk8QxA+3QPsGopDnmQQbk82ojVSgCEt+2U1cwBgKeWQtROe7GS+IMGt64934fqt3Htk3JPiKp4EEcF2NpOJPFcgK0gyOIlANYQLPFSACsItvgWAG0IkfhWAC0IsXgNgFaIJvFaAFKIZvGaAFwIFfHaAFQINfEWADUIVfFWADkIdfGWAEsIE/HWAAgR37G7VbtzulG1RTUDDQDNbEpijQpIsqY55wOCyUwxoVcsUwAAAABJRU5ErkJggg=="
                  style="display: ${isFavorite ? "inline-block" : "none"};" />
             </div> 
            <p class="price">$${car.price}</p>
          </div>
        </div>`;

        document
          .querySelector(".car-list")
          .insertAdjacentHTML("afterbegin", html);
      });
    }
  })
  .catch((error) => console.log("Error fetching car data:", error));

//Get cars by the make
const searchField = document.querySelector(".searchField input");
const searchBtn = document.querySelector(".searchBtn");

try {
  searchBtn.addEventListener("click", () => {
    fetch(`/carsByMake?make=${searchField.value}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        alert(data.message);

        if (!data.cars) return;

        data.cars.forEach((car) => {
          console.log(car.make);
          localStorage.setItem("carMake", car.make);
        });

        window.location.href = "carsByMake.html";
      });
  });
} catch {}

// Fetch and display cars by the make
if (window.location.pathname.endsWith("carsByMake.html")) {
  fetch(`/carsByMake?make=${localStorage.getItem("carMake")}`)
    .then((response) => {
      return response.json();
    })
    .then(async (data) => {
      console.log(data.cars);
      const favoriteCarIds = await fetchFavorites();

      data.cars.forEach((car) => {
        const isFavorite = favoriteCarIds.includes(car._id);

        const html =
          window.innerWidth > 450
            ? `
        <div class="carPreview car-card" data-carid="${car._id}">
          <div><img src="http://localhost:4000/images/${
            car.images[0]
          }" alt="" /></div>
          <p class="name">${car.make} ${car.model}</p>
          <p>${car.gearbox}</p>
          <h2>$${car.price}</h2>
          <div class="yearAndMiles">
            <p>${car.year}</p>
            <p>${car.miles} MILES</p>
          </div>
          <div class="locationAndHeart">
            <img src="../defaultImages/pin.png" alt="" />
            <p>${car.city}</p>
            <img class="heart empty" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAd1JREFUaEPtmQtOwzAQRN2TUU4GnAw4GTAollxn1/vxmCgokSrR4s+82UmyTW/l5Mft5PrLBXB0Ba8KnLECr5vop1LK/ef1sb3/3P6u7zU2zMELB9Zoj7dmPZc3kQhB+Itr1VKeBSGR+QCpRg239ADArXen8HYYKlEdjYhv15CMeJBiAWQ3TvCqU4bVGAGMnMeiONq8I1412xZAdL5aiRHAl6DCk03ETQOx5mOeZoSoVQOQomNt3vL+2XwNoHcfUUEZI0frZgS+7iGZsNMrAUjZt072CFhkbG/kzghJWJ/hjPsRkaOxfRVSAOa1mKVWWKcH2JkpVaAv25EAZpz/JUB/DmSuIKxU9RVwRcg8cVjqHOuYFxQpQq7rr2NzxhDzfPTeyI6IkdSSuG5kcG62FZh1373/imZuhXisGWrmMEFrp1fGSfv+kWqntSjh8xUQmvj0F5pRV8iGSIlXc+XoSeoQRiXS4iMAq+I0JT4KwIaYFp8BYEFQxGcBZiFo4mcAshBU8bMAUQi6eAaAF2KJeBaABYH/Sw+FGfcQ6k9MkeeoFPHMClhtR3tzp4lfATCKE7t/+jVl1RM39xcSoe8KfbQKoK8ENTYt4UqAkJPZwRdA1jnWvKsCLCez65y+At8NZYYxvongZAAAAABJRU5ErkJggg=="
              style="display: ${isFavorite ? "none" : "inline-block"};" />
            <img class="heart filled" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAXpJREFUaEPtlw0OgjAMhcfJ1JOpJ1NPpjahZsJ+2q6FjmwJQRLXva99bGUKnY+pc/1hAOxdwVGBHitwm0WfQgjn7/Wcn1/zb3zOscEcuGBAjHjco3ik3HAsBMKvpKghXBJCOPMBBBNVXJICANl6EIXHf4NKYEY54uMYqUT8SakBSBcW8GanFKtRApBmXlM8xspWogTwtlDSEDOpNQfgwTpL1qSVcgDeso8wK70pAE/er1YhBQBbJh40DZY1mbqyUW8AcLbAjvQbKQCv/k++B4cE8PwOkCzk8QxA+3QPsGopDnmQQbk82ojVSgCEt+2U1cwBgKeWQtROe7GS+IMGt64934fqt3Htk3JPiKp4EEcF2NpOJPFcgK0gyOIlANYQLPFSACsItvgWAG0IkfhWAC0IsXgNgFaIJvFaAFKIZvGaAFwIFfHaAFQINfEWADUIVfFWADkIdfGWAEsIE/HWAAgR37G7VbtzulG1RTUDDQDNbEpijQpIsqY55wOCyUwxoVcsUwAAAABJRU5ErkJggg=="
              style="display: ${isFavorite ? "inline-block" : "none"};" />
          </div>
        </div>`
            : `<div class="car-card-mobile car-card" data-carid="${car._id}">
          <div>
            <img
              src="http://localhost:4000/images/${car.images[0]}"
              alt=""
            />
          </div>

          <div>
            <p class="model">${car.model}</p>
            <p>${car.gearbox}</p>
            <div class="yearAndMilesMobile">
              <p>${car.year}</p>
              <p>${car.miles} MILES</p>
            </div>
            <div class="locationAndHeart">
              <img src="../defaultImages/pin.png" alt="" />
              <p class="city">${car.city}</p>
              <img class="heart empty"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAd1JREFUaEPtmQtOwzAQRN2TUU4GnAw4GTAollxn1/vxmCgokSrR4s+82UmyTW/l5Mft5PrLBXB0Ba8KnLECr5vop1LK/ef1sb3/3P6u7zU2zMELB9Zoj7dmPZc3kQhB+Itr1VKeBSGR+QCpRg239ADArXen8HYYKlEdjYhv15CMeJBiAWQ3TvCqU4bVGAGMnMeiONq8I1412xZAdL5aiRHAl6DCk03ETQOx5mOeZoSoVQOQomNt3vL+2XwNoHcfUUEZI0frZgS+7iGZsNMrAUjZt072CFhkbG/kzghJWJ/hjPsRkaOxfRVSAOa1mKVWWKcH2JkpVaAv25EAZpz/JUB/DmSuIKxU9RVwRcg8cVjqHOuYFxQpQq7rr2NzxhDzfPTeyI6IkdSSuG5kcG62FZh1373/imZuhXisGWrmMEFrp1fGSfv+kWqntSjh8xUQmvj0F5pRV8iGSIlXc+XoSeoQRiXS4iMAq+I0JT4KwIaYFp8BYEFQxGcBZiFo4mcAshBU8bMAUQi6eAaAF2KJeBaABYH/Sw+FGfcQ6k9MkeeoFPHMClhtR3tzp4lfATCKE7t/+jVl1RM39xcSoe8KfbQKoK8ENTYt4UqAkJPZwRdA1jnWvKsCLCez65y+At8NZYYxvongZAAAAABJRU5ErkJggg=="
              style="display: ${isFavorite ? "none" : "inline-block"};" /> <img
              class="heart filled"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAXpJREFUaEPtlw0OgjAMhcfJ1JOpJ1NPpjahZsJ+2q6FjmwJQRLXva99bGUKnY+pc/1hAOxdwVGBHitwm0WfQgjn7/Wcn1/zb3zOscEcuGBAjHjco3ik3HAsBMKvpKghXBJCOPMBBBNVXJICANl6EIXHf4NKYEY54uMYqUT8SakBSBcW8GanFKtRApBmXlM8xspWogTwtlDSEDOpNQfgwTpL1qSVcgDeso8wK70pAE/er1YhBQBbJh40DZY1mbqyUW8AcLbAjvQbKQCv/k++B4cE8PwOkCzk8QxA+3QPsGopDnmQQbk82ojVSgCEt+2U1cwBgKeWQtROe7GS+IMGt64934fqt3Htk3JPiKp4EEcF2NpOJPFcgK0gyOIlANYQLPFSACsItvgWAG0IkfhWAC0IsXgNgFaIJvFaAFKIZvGaAFwIFfHaAFQINfEWADUIVfFWADkIdfGWAEsIE/HWAAgR37G7VbtzulG1RTUDDQDNbEpijQpIsqY55wOCyUwxoVcsUwAAAABJRU5ErkJggg=="
              style="display: ${isFavorite ? "inline-block" : "none"};" />
            </div>
            <p class="price">$${car.price}</p>
          </div>
        </div> `;

        document
          .querySelector(".carsByMakeContainer")
          .insertAdjacentHTML("afterbegin", html);
      });
    });
}

//go to individual car
try {
  const carsContainer = document.querySelector(".carsContainer");
  carsContainer.addEventListener("click", async (event) => {
    if (event.target.closest(".car-card")) {
      if (event.target.closest(".heart")) {
        return;
      }

      await fetch(`/cars/${event.target.closest(".car-card").dataset.carid}`)
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("ClickedCarId", JSON.stringify(data.car._id));
        });

      window.location.href = `individualCar.html`;
    }
  });
} catch (error) {}

//fetching individual car
if (localStorage.getItem("ClickedCarId")) {
  const carId = JSON.parse(localStorage.getItem("ClickedCarId"));

  fetch(`/cars/${carId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.car);
      localStorage.setItem(
        "clickedCar",
        `${data.car.year} ${data.car.color} ${data.car.make} ${data.car.model}, PRICE: $${data.car.price}`
      );

      const carPhotosElements =
        window.innerWidth < 450
          ? `<div class="image-slider">
          <button class="prev">&#10094;</button>

          <div class="slider-container">
            <img class="slider-image" src="http://localhost:4000/images/${data.car.images[0]}"/>
          </div>

          <button class="next">&#10095;</button>
        </div>`
          : ` <div><img src="http://localhost:4000/images/${data.car.images[0]}"/></div>

        <div><img src="http://localhost:4000/images/${data.car.images[1]}"/></div>
  
        <div><img src="http://localhost:4000/images/${data.car.images[2]}"/></div> `;

      const carPhotos = document.querySelector(".carPhotos");
      carPhotos.insertAdjacentHTML("afterbegin", carPhotosElements);

      const images = data.car.images;
      let currentIndex = 0;

      const btnPrev = document.querySelector(".image-slider .prev");
      const btnNext = document.querySelector(".image-slider .next");
      const imageOfSlider = document.querySelector(
        ".image-slider .slider-image"
      );

      try {
        btnNext.addEventListener("click", () => {
          currentIndex += 1;

          if (currentIndex === 3) {
            currentIndex = 0;
          }

          imageOfSlider.src = `http://localhost:4000/images/${images[currentIndex]}`;
        });

        btnPrev.addEventListener("click", () => {
          currentIndex -= 1;

          if (currentIndex < 0) {
            currentIndex = images.length - 1;
          }

          imageOfSlider.src = `http://localhost:4000/images/${images[currentIndex]}`;
        });
      } catch {}

      const spectsElements = `
        <div class="spectsHeader"><h2>Verified</h2></div>

        <div class="name">
          <h1>${data.car.make} ${data.car.model}</h1>
          <div class="carDelivery"><h4>CAR DELIVERY</h4></div>
        </div>


        <div class="carPrice">
          <h2>$${data.car.price}</h2>
        </div>

        <div class="infoContainer">
          <div class="info">
            <p>CITY:</p>
            <h3>${data.car.city}</h3>

            <p>YEAR:</p>
            <h3>${data.car.year}</h3>
          </div>

          <div class="info">
            <p>MILES:</p>
            <h3>${data.car.miles}</h3>

            <p>GEARBOX:</p>
            <h3>${data.car.gearbox}</h3>
          </div>

          <div class="info">
            <p>COLOR:</p>
            <h3>${data.car.color}</h3>

            <p>FUEL TYPE:</p>
            <h3>${data.car.fueltype}</h3>
          </div>
        </div>

        <div class="Description">
          <h2>CAR DESCRIPTION</h2>
          <p>
            ${data.car.description}
          </p>
        </div>`;

      const spects = document.querySelector(".spects");
      spects.insertAdjacentHTML("afterbegin", spectsElements);

      const priceElements = `<h1>$${data.car.price}</h1>`;
      const price = document.querySelector(".price");
      price.insertAdjacentHTML("afterbegin", priceElements);
    })
    .catch((error) => {
      console.log(error);
    });
} else {
  console.log("No car found");
}

//Posting/selling a car
try {
  document.querySelector(".createAdBtn").addEventListener("click", async () => {
    if (localStorage.getItem("isLoggedIn") !== "yes")
      return alert("You need to log in to sell a car!");

    const model = document.getElementById("model").value.trim();
    const make = document.getElementById("make").value;
    const year = document.getElementById("year").value.trim();
    const color = document.getElementById("color").value.trim();
    const miles = document.getElementById("miles").value.trim();
    const fueltype = document.getElementById("fueltype").value.trim();
    const gearbox = document.getElementById("gearbox").value.trim();
    const city = document.getElementById("city").value.trim();
    const price = document.getElementById("price").value.trim();
    const imagesInput = document.getElementById("images");
    const armored = document.querySelector(".armored input").checked;
    const carOwnerEmail = localStorage.getItem("loggedUserEmail");

    // Check if all required fields are filled
    if (
      !model ||
      !make ||
      !year ||
      !color ||
      !miles ||
      !fueltype ||
      !gearbox ||
      !city ||
      !price ||
      imagesInput.files.length === 0
    ) {
      return alert("Please fill in all required fields and upload images.");
    }

    // Create FormData and append fields
    const formData = new FormData();
    formData.append("model", model);
    formData.append("make", make);
    formData.append("year", year);
    formData.append("color", color);
    formData.append("miles", miles);
    formData.append("fueltype", fueltype);
    formData.append("gearbox", gearbox);
    formData.append("city", city);
    formData.append("price", price);
    formData.append("armored", armored);
    formData.append("carOwnerEmail", carOwnerEmail);

    // Append images (limit to 3 images)
    if (imagesInput.files.length > 3) {
      return alert("You can upload a maximum of 3 images.");
    }

    for (let i = 0; i < imagesInput.files.length; i++) {
      formData.append("images", imagesInput.files[i]); // Append each image
    }

    try {
      const response = await fetch("/sellACar", {
        method: "POST",
        body: formData, // Send FormData
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  });
} catch (error) {}

//Sign up user
try {
  document
    .querySelector(".createAccBtn")
    .addEventListener("click", async () => {
      //the field names must be the exact same as the ones expecified in the schema
      const name = document.querySelector(".fullName").value;
      const email = document.querySelector(".email").value;
      const password = document.querySelector(".password").value;
      const passwordConfirm = document.querySelector(".passwordConfirm").value;

      if (!name || !email || !password || !passwordConfirm) {
        return alert("Please fill up all the fields!");
      }

      if (password !== passwordConfirm) {
        return alert("Passwords do not match!");
      }

      const userData = { name, email, password, passwordConfirm };

      try {
        const response = await fetch("/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        const data = await response.json();
        alert(data.message);

        window.location.href = "http://localhost:4000//login.html";
      } catch (error) {
        console.log(error);
        alert("Something went wrong!");
      }
    });
} catch (error) {}

//Log in user
try {
  document.querySelector(".loginBtn").addEventListener("click", async () => {
    const isAlreadyLogged = localStorage.getItem("isLoggedIn");
    if (isAlreadyLogged === "yes") {
      return alert("You are already logged in!");
    }

    const email = document.querySelector(".email").value;
    const password = document.querySelector(".password").value;

    if (!email || !password) {
      return alert("Please provide email and password!");
    }

    const userData = { email, password };

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      alert(data.message);

      if (data.message !== "User logged in!") return;

      localStorage.setItem("isLoggedIn", "yes");

      if (response.status === 200) {
        window.location.href = "http://localhost:4000//index.html";
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  });
} catch {}

//Hide the "log in" at the header when there's logged in user,
try {
  if (localStorage.getItem("isLoggedIn") === "yes") {
    const notLogged = document.querySelector(".notLogged");

    notLogged.classList.toggle("hidden");
  } else {
    const logged = document.querySelector(".logged");

    logged.classList.toggle("hidden");
  }
} catch {}

//Dinamically insert the username in the logged field at the header
fetch("/getUser", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    if (data.currentUser) {
      console.log("Logged in user:", data.currentUser);
      localStorage.setItem("loggedUserId", data.currentUser._id);
      localStorage.setItem("loggedUserEmail", data.currentUser.email);

      if (window.innerWidth > 450) {
        const logged = document.querySelector(".logged");
        const html = `<h2>${data.currentUser.name}</h2>`;

        logged.insertAdjacentHTML("afterbegin", html);
      } else {
        const nameAndEmailInMenu = document.querySelector(
          ".menu .menuScndChild .nameAndEmail"
        );
        const html = `  
        <h2>${data.currentUser.name}</h2>
        <h2>${data.currentUser.email}</h2>`;

        nameAndEmailInMenu.insertAdjacentHTML("afterbegin", html);
      }
    } else {
      console.log("No user found or not logged in.");
    }
  })
  .catch((error) => console.error("Error fetching user:", error));

//Dinamically insert the username and user email
//in the logged field in favorites page/ user page
if (window.location.pathname.endsWith("favorites.html")) {
  fetch("/getUser")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.currentUser.name, data.currentUser.email);

      const profile = document.querySelector(".filter-panel .profile");
      const html = `
      <h2>${data.currentUser.name}</h2>
      <p>${data.currentUser.email}</p>`;

      profile.insertAdjacentHTML("beforeend", html);
    });
}

//Go to favorites page/ user page
try {
  document.querySelector(".logged").addEventListener("click", (e) => {
    const h2Element = e.target.closest("h2");

    if (h2Element) {
      window.location.href = "http://localhost:4000//favorites.html";
    }
  });
} catch {}

//Favorite a car
//The function below only works if the empty heart is clicked you took away the click
//of the card in "Go to individal car"
try {
  document
    .querySelector(".all-cars-and-cars-by-make-list")
    .addEventListener("click", async (event) => {
      const heartIcon = event.target.closest(".heart");
      if (!heartIcon) return; // Only trigger when clicking a heart

      const carCard = event.target.closest(".car-card");
      if (!carCard) return;

      const carId = carCard.dataset.carid;
      const emptyHeartIcon = carCard.querySelector(".heart.empty");
      const filledHeartIcon = carCard.querySelector(".heart.filled");

      const userId = localStorage.getItem("loggedUserId");
      if (!userId) {
        alert("You need to log in to favorite a car.");
        return;
      }

      try {
        const response = await fetch(`/favoriteCar/${carId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensures cookies (JWT) are sent
          body: JSON.stringify({ userId }), // Send userId in the request body
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          const isFavorited = data.favorites.includes(carId);
          emptyHeartIcon.style.display = isFavorited ? "none" : "inline-block";
          filledHeartIcon.style.display = isFavorited ? "inline-block" : "none";
        } else {
          console.error("Failed to update favorite status:", data.message);
        }
      } catch (error) {
        console.error("Error favoriting car:", error);
      }
    });
} catch (error) {}

//get the user favorite cars
if (window.location.pathname.endsWith("favorites.html")) {
  fetch("/getUser", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favoriteCarIds = data.currentUser.favorites;
      console.log(data.currentUser, favoriteCarIds);
      favoriteCarIds.forEach((carId) => {
        fetch(`/cars/${carId}`)
          .then((response) => response.json())
          .then((carData) => {
            const carList = document.querySelector(".car-list-favorites");

            const isFavorite = favoriteCarIds.includes(carId);

            const html =
              window.innerWidth > 450
                ? ` <div class="carPreview car-card" data-carid="${
                    carData.car._id
                  }">
                  <div><img src="http://localhost:4000/images/${
                    carData.car.images[0]
                  }" /></div>
                  <p class="name">${carData.car.make} ${carData.car.model}</p>
                  <p>${carData.car.gearbox}</p>
                  <h2>$${carData.car.price}</h2>
                  <div class="yearAndMiles">
                    <p>${carData.car.year}</p>
                    <p>${carData.car.miles} MILES</p>
                  </div>
                  <div class="locationAndHeart">
                    <img src="../defaultImages/pin.png" alt="" />
                    <p>${carData.car.city}</p>
                    <img class="heart empty" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAd1JREFUaEPtmQtOwzAQRN2TUU4GnAw4GTAollxn1/vxmCgokSrR4s+82UmyTW/l5Mft5PrLBXB0Ba8KnLECr5vop1LK/ef1sb3/3P6u7zU2zMELB9Zoj7dmPZc3kQhB+Itr1VKeBSGR+QCpRg239ADArXen8HYYKlEdjYhv15CMeJBiAWQ3TvCqU4bVGAGMnMeiONq8I1412xZAdL5aiRHAl6DCk03ETQOx5mOeZoSoVQOQomNt3vL+2XwNoHcfUUEZI0frZgS+7iGZsNMrAUjZt072CFhkbG/kzghJWJ/hjPsRkaOxfRVSAOa1mKVWWKcH2JkpVaAv25EAZpz/JUB/DmSuIKxU9RVwRcg8cVjqHOuYFxQpQq7rr2NzxhDzfPTeyI6IkdSSuG5kcG62FZh1373/imZuhXisGWrmMEFrp1fGSfv+kWqntSjh8xUQmvj0F5pRV8iGSIlXc+XoSeoQRiXS4iMAq+I0JT4KwIaYFp8BYEFQxGcBZiFo4mcAshBU8bMAUQi6eAaAF2KJeBaABYH/Sw+FGfcQ6k9MkeeoFPHMClhtR3tzp4lfATCKE7t/+jVl1RM39xcSoe8KfbQKoK8ENTYt4UqAkJPZwRdA1jnWvKsCLCez65y+At8NZYYxvongZAAAAABJRU5ErkJggg=="
                      style="display: ${
                        isFavorite ? "none" : "inline-block"
                      };" />
                    <img class="heart filled" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAXpJREFUaEPtlw0OgjAMhcfJ1JOpJ1NPpjahZsJ+2q6FjmwJQRLXva99bGUKnY+pc/1hAOxdwVGBHitwm0WfQgjn7/Wcn1/zb3zOscEcuGBAjHjco3ik3HAsBMKvpKghXBJCOPMBBBNVXJICANl6EIXHf4NKYEY54uMYqUT8SakBSBcW8GanFKtRApBmXlM8xspWogTwtlDSEDOpNQfgwTpL1qSVcgDeso8wK70pAE/er1YhBQBbJh40DZY1mbqyUW8AcLbAjvQbKQCv/k++B4cE8PwOkCzk8QxA+3QPsGopDnmQQbk82ojVSgCEt+2U1cwBgKeWQtROe7GS+IMGt64934fqt3Htk3JPiKp4EEcF2NpOJPFcgK0gyOIlANYQLPFSACsItvgWAG0IkfhWAC0IsXgNgFaIJvFaAFKIZvGaAFwIFfHaAFQINfEWADUIVfFWADkIdfGWAEsIE/HWAAgR37G7VbtzulG1RTUDDQDNbEpijQpIsqY55wOCyUwxoVcsUwAAAABJRU5ErkJggg=="
                      style="display: ${
                        isFavorite ? "inline-block" : "none"
                      };" />
                  </div>
                </div>`
                : `<div class="car-card-mobile car-card" data-carid="${
                    carData.car._id
                  }">
                    <div>
                      <img src="http://localhost:4000/images/${
                        carData.car.images[0]
                      }">
                    </div>

                    <div>
                      <p class="model">${carData.car.model}</p>
                      <p>${carData.car.gearbox}</p>
                      <div class="yearAndMilesMobile">
                        <p>${carData.car.year}</p>
                        <p>${carData.car.miles} MILES</p>
                      </div>
                      <div class="locationAndHeart">
                        <img src="../defaultImages/pin.png" alt="" />
                        <p class="city">${carData.car.city}</p>
                        <img class="heart empty"
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAd1JREFUaEPtmQtOwzAQRN2TUU4GnAw4GTAollxn1/vxmCgokSrR4s+82UmyTW/l5Mft5PrLBXB0Ba8KnLECr5vop1LK/ef1sb3/3P6u7zU2zMELB9Zoj7dmPZc3kQhB+Itr1VKeBSGR+QCpRg239ADArXen8HYYKlEdjYhv15CMeJBiAWQ3TvCqU4bVGAGMnMeiONq8I1412xZAdL5aiRHAl6DCk03ETQOx5mOeZoSoVQOQomNt3vL+2XwNoHcfUUEZI0frZgS+7iGZsNMrAUjZt072CFhkbG/kzghJWJ/hjPsRkaOxfRVSAOa1mKVWWKcH2JkpVaAv25EAZpz/JUB/DmSuIKxU9RVwRcg8cVjqHOuYFxQpQq7rr2NzxhDzfPTeyI6IkdSSuG5kcG62FZh1373/imZuhXisGWrmMEFrp1fGSfv+kWqntSjh8xUQmvj0F5pRV8iGSIlXc+XoSeoQRiXS4iMAq+I0JT4KwIaYFp8BYEFQxGcBZiFo4mcAshBU8bMAUQi6eAaAF2KJeBaABYH/Sw+FGfcQ6k9MkeeoFPHMClhtR3tzp4lfATCKE7t/+jVl1RM39xcSoe8KfbQKoK8ENTYt4UqAkJPZwRdA1jnWvKsCLCez65y+At8NZYYxvongZAAAAABJRU5ErkJggg=="
                          style="display: ${
                            isFavorite ? "none" : "inline-block"
                          };" /> 
                        <img class="heart filled"
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAXpJREFUaEPtlw0OgjAMhcfJ1JOpJ1NPpjahZsJ+2q6FjmwJQRLXva99bGUKnY+pc/1hAOxdwVGBHitwm0WfQgjn7/Wcn1/zb3zOscEcuGBAjHjco3ik3HAsBMKvpKghXBJCOPMBBBNVXJICANl6EIXHf4NKYEY54uMYqUT8SakBSBcW8GanFKtRApBmXlM8xspWogTwtlDSEDOpNQfgwTpL1qSVcgDeso8wK70pAE/er1YhBQBbJh40DZY1mbqyUW8AcLbAjvQbKQCv/k++B4cE8PwOkCzk8QxA+3QPsGopDnmQQbk82ojVSgCEt+2U1cwBgKeWQtROe7GS+IMGt64934fqt3Htk3JPiKp4EEcF2NpOJPFcgK0gyOIlANYQLPFSACsItvgWAG0IkfhWAC0IsXgNgFaIJvFaAFKIZvGaAFwIFfHaAFQINfEWADUIVfFWADkIdfGWAEsIE/HWAAgR37G7VbtzulG1RTUDDQDNbEpijQpIsqY55wOCyUwxoVcsUwAAAABJRU5ErkJggg=="
                          style="display: ${
                            isFavorite ? "inline-block" : "none"
                          };" />
                        </div>
                          <p class="price">$${carData.car.price}</p>
                        </div>
                  </div> `;

            carList.insertAdjacentHTML("afterbegin", html);
          });
      });
    })
    .catch((error) => {});
}

//Unfavorite the car
const userId = localStorage.getItem("loggedUserId");
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("filled")) {
    const carCard = event.target.closest(".car-card");
    const carId = carCard.dataset.carid;

    //This route toggles wheter a car is added or removed from the user favorites
    fetch(`/favoriteCar/${carId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        //Using window.location.pathname.endsWith("favorites.html")
        //because the car-card should only be remove if you are in the favorites pages
        if (
          data.favorites &&
          window.location.pathname.endsWith("favorites.html")
        ) {
          carCard.remove(); // Remove the car-card from the favorites page
        }
      })
      .catch((error) => console.error("Error:", error));
  }
});

//Fetch the user favorite cars
//the favorites routes get the favorites based on the jwt
async function fetchFavorites() {
  try {
    const response = await fetch("/favorites", {
      method: "GET",
      credentials: "include", // Ensure cookies (JWT) are sent with the request
    });

    const data = await response.json();
    if (!data.favorites) return [];

    return data.favorites.map((car) => car._id); // Extract only car IDs
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
}

//go to respective page when clicking one of the fields, like search car, sell car, etc
//in favorites page
const fields = document.querySelectorAll(".field p");
fields.forEach((field) => {
  field.addEventListener("click", () => {
    if (field.dataset.url) {
      window.location.href = field.dataset.url;
    }
  });
});

//Send email
const sendEmailBtn = document.querySelector(".sendMsgBtn");
try {
  sendEmailBtn.addEventListener("click", async () => {
    const name = document.querySelector(".sendEmailName").value;
    const email = document.querySelector(".sendEmailEmail").value;
    const number = document.querySelector(".sendEmailNumber").value;
    const message = document.querySelector(".sendEmailMessage").value;

    const carId = JSON.parse(localStorage.getItem("ClickedCarId"));

    const carOwnerEmail = await (async function fetchCarData() {
      const response = await fetch(`/cars/${carId}`);
      const carData = await response.json();
      return carData.car.carOwnerEmail;
    })();

    const subject = localStorage.getItem("clickedCar");

    if (!name || !email || !number || !message) {
      return alert("All fields are required!");
    }

    const rawNumber = number.replace(/\D/g, ""); // Remove all non-numeric characters

    if (rawNumber.length !== 10) {
      return alert("Please insert a valid phone number! (xxx) xxx-xxxx");
    }

    const spinnerContainer = document.querySelector(".spinnerContainer");
    const body = document.body;
    if (localStorage.getItem("isLoggedIn") === "yes") {
      spinnerContainer.classList.add("display");
      body.classList.add("no-scroll");
    }

    fetch("/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        number,
        message,
        carOwnerEmail,
        subject,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        spinnerContainer.classList.remove("display");
        body.classList.remove("no-scroll");
        alert(data.message);
      })
      .catch((error) => console.log(error));
  });
} catch {}

//Check if the passed phone number is valid and format it (xxx) xxx-xxxx
try {
  document
    .querySelector(".sendEmailNumber")
    .addEventListener("input", function (event) {
      let input = event.target;
      let value = input.value.replace(/\D/g, ""); // Remove all non-numeric characters

      if (value.length > 10) {
        value = value.slice(0, 10); // Limit to 10 digits
      }

      let formattedValue = "";

      if (value.length > 0) {
        formattedValue += `(${value.substring(0, 3)}`;
      }
      if (value.length > 3) {
        formattedValue += `) ${value.substring(3, 6)}`;
      }
      if (value.length > 6) {
        formattedValue += `-${value.substring(6, 10)}`;
      }

      input.value = formattedValue;
    });
} catch {}

//Log out
const logOutP = document.querySelector(".logOut");
const logOutPMobile = document.querySelector(".logOutContainer h2");
try {
  if (window.innerWidth > 450) {
    logOutP.addEventListener("click", () => {
      fetch("/logout", { method: "POST" })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message); // Logs "Logged out successfully"

          localStorage.removeItem("ClickedCarId");
          localStorage.removeItem("carMake");
          localStorage.removeItem("clickedCar");
          localStorage.setItem("isLoggedIn", "no"); // Mark user as logged out
          localStorage.removeItem("loggedUserId");
          localStorage.removeItem("loggedUserEmail");

          window.location.href = "login.html"; // Redirect to login page
        })
        .catch((error) => console.error("Logout failed:", error));
    });
  } else {
    logOutPMobile.addEventListener("click", () => {
      fetch("/logout", { method: "POST" })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message); // Logs "Logged out successfully"

          localStorage.removeItem("ClickedCarId");
          localStorage.removeItem("carMake");
          localStorage.removeItem("clickedCar");
          localStorage.setItem("isLoggedIn", "no"); // Mark user as logged out
          localStorage.removeItem("loggedUserId");
          localStorage.removeItem("loggedUserEmail");

          window.location.href = "login.html"; // Redirect to login page
        })
        .catch((error) => console.error("Logout failed:", error));
    });
  }
} catch (error) {}

//Go to sign up, if you dont have an account
const dontHaveAccBtn = document.querySelector(".logInBtn span");
try {
  dontHaveAccBtn.addEventListener("click", () => {
    window.location.href = "signup.html";
  });
} catch {}

//Go to log in if already have an account
const haveAnAcc = document.querySelector(".signupBtn span");
try {
  haveAnAcc.addEventListener("click", () => {
    window.location.href = "login.html";
  });
} catch {}

//Navigate through header
const headerH2s = document.querySelectorAll(".header .navigation h2");
headerH2s.forEach((h2) => {
  h2.addEventListener("click", () => {
    window.location.href = h2.dataset.url;
  });
});

//Show/ hide the menu on mobile
try {
  const menuBtn = document.querySelector(".menuBtn");
  const closeMenuBtn = document.querySelector(".closeMenuBtn");
  const menu = document.querySelector(".menu");
  const body = document.body; // Body for scroll control
  menuBtn.addEventListener("click", () => {
    menu.classList.add("display");
    body.classList.add("no-scroll");
  });

  closeMenuBtn.addEventListener("click", () => {
    menu.classList.remove("display");
    body.classList.remove("no-scroll");
  });
} catch {}

//Navigate through menu
if (window.innerWidth < 450) {
  const menuH2Elements = document.querySelectorAll(
    ".menu .menuScndChild .navigation div h2"
  );

  menuH2Elements.forEach((h2) => {
    h2.addEventListener("click", () => {
      if (
        h2.textContent === "Favorites" &&
        localStorage.getItem("isLoggedIn") != "yes"
      ) {
        return alert("You need to log in.");
      }

      window.location.href = h2.dataset.url;
    });
  });
}

//Go to home on mobile
if (window.innerWidth < 450) {
  const webcarsLogo = document.querySelector(".header2 h1");
  webcarsLogo.addEventListener("click", () => {
    window.location.href = webcarsLogo.dataset.url;
  });
}

//Show "Sign up" if there's NO logged user
//hide "Sign up" if there's a logged user
const signUpContainer = document.querySelector(
  ".menu .menuScndChild .navigation .signUpContainer"
);
try {
  if (
    localStorage.getItem("isLoggedIn") === "no" ||
    !localStorage.getItem("isLoggedIn")
  ) {
    signUpContainer.classList.remove("hidden");
  } else {
    signUpContainer.classList.add("hidden");
  }
} catch {}

//Show "log in" if there's NO logged user,
//hide "Log in" if there's a logged user
const loginContainer = document.querySelector(
  ".menu .menuScndChild .navigation .logInContainer"
);
try {
  if (
    localStorage.getItem("isLoggedIn") === "no" ||
    !localStorage.getItem("isLoggedIn")
  ) {
    loginContainer.classList.remove("hidden");
  } else {
    loginContainer.classList.add("hidden");
  }
} catch {}

//Show "log out" if there's a logged user
//hide "log out" if there's NO logged user
const logOutContainer = document.querySelector(
  ".menu .menuScndChild .navigation .logOutContainer"
);
try {
  if (
    localStorage.getItem("isLoggedIn") === "no" ||
    !localStorage.getItem("isLoggedIn")
  ) {
    logOutContainer.classList.add("hidden");
  } else {
    logOutContainer.classList.remove("hidden");
  }
} catch {}
