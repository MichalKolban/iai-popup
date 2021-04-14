const btn = document.querySelector(".popup-button");
const popupContainer = document.querySelector(".popup-container");
const mainName = document.querySelector(".main-name");
const selectForm = document.querySelector(".variant-container #variants");
const sizeContainer = document.querySelector(".size-container");
const buttonBox = document.querySelectorAll(".button-box");

async function loadJSON() {
  const rawData = await fetch("./xbox.json");
  const data = await rawData.json();
  return data;
}

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
    sizeContainer.appendChild(btn);
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
  const product = await getProperData();

  createH2(product.name);
  createRamButtons(product.ram);
  createOptions(product.colors);

  const ramButtons = document.querySelectorAll(".rambutton");
  ramButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      shoppingCart["ram"] = e.target.innerText;
      if (cart["ram"] !== e.target.innerText) {
        cart["ram"] = e.target.innerText;
      }
    });
  });
  const options = document.querySelector("#variants");
  options.addEventListener("change", (e) => {
    let color = {};
    console.log(e.target.value);
    color["option"] = e.target.value;
  });

  // const quantity = document.querySelector('.add-container input')
  // quantity.addEventListener('change', (e)=> {
  //     e.preventDefault();
  //     console.log(e.target.value)
  // })
}

btn.addEventListener("click", displayPopup);

