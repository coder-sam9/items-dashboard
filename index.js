const url =
  "https://crudcrud.com/api/d67002c133374dab9b702f679134a529/groceryitems";
async function handleFormSubmit(event) {
  try {
    const details = {
      name: event.target.name.value,
      description: event.target.description.value,
      price: event.target.price.value,
      quantity: event.target.quantity.value,
    };
    event.preventDefault();
    const reponse = await axios.post(url, details);
    console.log(reponse);
    console.log(reponse.data._id);
    const identifier = reponse.data._id;
    const ulElement = document.querySelector("ul");
    const newLi = document.createElement("li");
    newLi.innerHTML = `${details.name} - ${details.description} - ${details.price} - <span class="quantity">${details.quantity}</span>   `;

    const btn1 = document.createElement("button");
    btn1.style = "margin-right:5px";
    btn1.addEventListener("click", handleButton1);
    const btn1Text = document.createTextNode("Buy 1");
    btn1.appendChild(btn1Text);
    const btn2 = document.createElement("button");
    btn2.style = "margin-right:5px";
    btn2.addEventListener("click", handleButton2);
    const btn2Text = document.createTextNode("Buy 2");
    btn2.appendChild(btn2Text);
    const btn3 = document.createElement("button");
    btn3.style = "margin-right:5px";
    btn3.addEventListener("click", handleButton3);
    const btn3Text = document.createTextNode("Buy 3");
    btn3.appendChild(btn3Text);
    newLi.className = identifier;
    newLi.setAttribute("identifier", identifier);
    newLi.appendChild(btn1);
    newLi.appendChild(btn2);
    newLi.appendChild(btn3);
    ulElement.appendChild(newLi);
  } catch (error) {
    console.log(error);
  }
}
async function handleButton1(event) {
  try {
    event.preventDefault();
    const identifier = event.target.parentElement.getAttribute("identifier");
    const response = await axios.get(`${url}/${identifier}`);
    const currentDetails = response.data;

    let newQuantity = currentDetails.quantity - 1;
    if (newQuantity < 0) {
      alert("Not enough quantity available!");
      return;
    }
    const spanQuantity = event.target.parentElement.querySelector(".quantity");
    spanQuantity.innerText = newQuantity;
    await axios.put(`${url}/${identifier}`,{
    name: currentDetails.name,
    description: currentDetails.description,
    price: currentDetails.price,
    quantity: newQuantity, // Only update the necessary field
  });
  } catch (err) {
    console.log(err);
  }
}
async function handleButton2(event) {
  try {
    event.preventDefault();
    const identifier = event.target.parentElement.getAttribute("identifier");
    const response = await axios.get(`${url}/${identifier}`);
    const currentDetails = response.data;
    let newQuantity = currentDetails.quantity - 2;
    if (newQuantity < 0) {
      alert("Not enough quantity available!");
      return;
    }
    await axios.put(`${url}/${identifier}`,{
    name: currentDetails.name,
    description: currentDetails.description,
    price: currentDetails.price,
    quantity: newQuantity, // Only update the necessary field
  });
    const spanQuantity = event.target.parentElement.querySelector(".quantity");
    spanQuantity.innerText = newQuantity;
  } catch (err) {
    console.log(err);
  }
}
async function handleButton3(event) {
  try {
    event.preventDefault();
    const identifier = event.target.parentElement.getAttribute("identifier");
    const response = await axios.get(`${url}/${identifier}`);
    const currentDetails = response.data;

    let newQuantity = currentDetails.quantity - 3;
    if (newQuantity < 0) {
      alert("Not enough quantity available!");
      return;
    }
    await axios.put(`${url}/${identifier}`,{
    name: currentDetails.name,
    description: currentDetails.description,
    price: currentDetails.price,
    quantity: newQuantity, // Only update the necessary field
  });
    const spanQuantity = event.target.parentElement.querySelector(".quantity");
    spanQuantity.innerText = newQuantity;
  } catch (err) {
    console.log(err);
  }
}
