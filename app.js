const btn = document.querySelector(".popup-button");
const popupContainer = document.querySelector(".popup-container");
const mainName = document.querySelector(".main-name");
const selectForm = document.querySelector(".variant-container #variants");
const sizeContainer = document.querySelector(".size-container");
const buttonContainer = document.querySelector(".button-container");
const buttonBox = document.querySelectorAll(".button-box");
const exitBtn = document.querySelector(".exit-button");
// const addMinusBtn = document.querySelector("#minus");
// const addPlusBtn = document.querySelector("#plus");
const submitBtn = document.querySelector("[type=submit]");

async function loadJSON() {
  const rawData = await fetch("./xbox.json");
  const data = await rawData.json();
  return data;
}

shoppingCart = {};

async function getProperData() {
  const data = await loadJSON();
  let product = {};
  product.name = data.product.name;
  let newArrayDataOfOjbect = Object.values(data.sizes.items);
  let ramAmountPriceArr = [];
  for (let i = 0; i < newArrayDataOfOjbect.length; i++) {
    ramAmountPriceArr.push({
      ram: newArrayDataOfOjbect[i].description,
      amonut: newArrayDataOfOjbect[i].amount,
      price: newArrayDataOfOjbect[i].prices.price_retail,
    });
  }
  product["ram"] = ramAmountPriceArr;
  let arrOfColors = [];
  let arrayOfColors = Object.values(data.multiversions[0].items);
  for (let i = 0; i < arrayOfColors.length; i++) {
    let color = Object.values(arrayOfColors[i].values);
    arrOfColors.push(color[0].name);
  }
  product["colors"] = arrOfColors;
  return product;
}

function createH2(name) {
  const h2 = document.createElement("h2");
  h2.innerText = name;
  h2.style.fontSize = "17px";
  mainName.appendChild(h2);
}

function createRamButtons(ramArr) {
  for (let i = 0; i < ramArr.length; i++) {
    const btn = document.createElement("button");
    btn.classList.add("rambutton");
    btn.innerHTML = ramArr[i].ram;
    buttonContainer.appendChild(btn);
  }
}

function createOptions(colorsArr) {
  for (let i = 0; i < colorsArr.length; i++) {
    const option = document.createElement("option");
    option.setAttribute("value", colorsArr[i]);
    option.innerText = colorsArr[i];
    selectForm.appendChild(option);
  }
}

async function displayPopup() {
  popupContainer.classList.remove("hide");
  btn.classList.add("hide");
  slides[0].classList.add("active");

  const product = await getProperData();

  createH2(product.name);
  createRamButtons(product.ram);
  createOptions(product.colors);

  const ramButtons = document.querySelectorAll(".rambutton");
  ramButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      button.classList.toggle("glow");
      shoppingCart["ram"] = e.target.innerText;
      if (shoppingCart["ram"] !== e.target.innerText) {
        shoppingCart["ram"] = e.target.innerText;
      }
    });
  });
  const options = document.querySelector("#variants");
  options.addEventListener("change", (e) => {
    shoppingCart["color"] = e.target.value;
    if (shoppingCart["color"] !== e.target.value) {
      shoppingCart["color"] = e.target.value;
    }
  });

  const amount = document.querySelector("[type=number]");
  amount.addEventListener("change", (e) => {
    console.log(e.target.value);
    shoppingCart["amount"] = e.target.value;
    if (shoppingCart["amount"] !== e.target.value) {
      shoppingCart["amount"] = e.target.value;
    }
  });
}

function cleanAndHideDataAfterExit() {
  popupContainer.classList.add("hide");
  btn.classList.remove("hide");
  mainName.textContent = "";
  buttonContainer.innerHTML = "";
  selectForm.innerHTML = "";
}

btn.addEventListener("click", displayPopup);
exitBtn.addEventListener("click", cleanAndHideDataAfterExit);

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  alert(JSON.stringify(shoppingCart));
});

const slides = document.querySelectorAll(".item");
const nextSlide = document.querySelector(".arrow-right");
const prevSlide = document.querySelector(".arrow-left");
const totalSlides = slides.length;
let index = 0;

nextSlide.addEventListener("click", () => {
  next("next");
});

prevSlide.addEventListener("click", () => {
  next("prev");
});

function next(direction) {
  if (direction == "next") {
    index++;
    if (index == totalSlides) {
      index = 0;
    }
  } else {
    if (index == 0) {
      index = totalSlides - 1;
    } else {
      index--;
    }
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slides[index].classList.add("active");
}
