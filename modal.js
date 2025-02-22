function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtnModal = document.querySelector(".close");
const form = document.forms["reserve"];

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeBtnModal.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// REGEX
let checkString = /^[a-zA-Z]{2}/;
let checkMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Fonctions de vérification des différents inputs saisis par l'utilisateur

function validateFullName(){
  let fullname = document.querySelectorAll("input[type=text]");
  // Conversion nodeList en array js car méthode every ne fonctionne pas sur nodeList
  console.log(fullname);
  let array = Array.from(fullname);
  let error = document.getElementById("error-firstname");
  let error1 = document.getElementById("error-lastname");
  console.log(array);
  // Méthode every qui return true si tous les items.value du tableau checkString évaluée à true
  const itsAMatch = (array) => checkString.test(array.value) === true;
  let result = array.every(itsAMatch);
  console.log(result);
  // Si result === false alors
  if (!result){
    for(let i = 0; i < array.length; i++){
      fullname[i].classList.add("input-error");
      error.innerText = "Veuillez entrer au moins 2 caractères alphabétiques pour le champ du prénom";
      error1.innerText = "Veuillez entrer au moins 2 caractères alphabétiques pour le champ du nom";
    }
    return false;
  // Si result === true alors
  } else {
    for(let i = 0; i < array.length; i++){
      fullname[i].classList.remove("input-error");
      fullname[i].classList.add("input-validate");
      error.innerText = "";
      error1.innerText = "";
    }
    return true;
  }
}

//
function validateEmail() {
  let email = form.elements["email"];
  let error = document.getElementById("error-mail");
  if (checkMail.test(email.value) === false) {
    email.classList.add("input-error");
    error.innerText = "Saississez un email valide au format xxx@yyy.zzz";
    return false;
  } else {
    email.classList.remove("input-error");
    email.classList.add("input-validate");
    error.innerText = "";
    return true;
  }
}

function validateDate() {
  let input = document.querySelector("input#birthdate");
  let birthdate = form.elements["birthdate"].value;
  // console.log(birthdate); input 23/01/2022 output 2022-01-23
  let error = document.getElementById("error-date");

  // Création de l'objet de type date avec la date renseignée par l'utilisateur
  let UserDate = new Date(birthdate);
  // console.log(UserDate); Sun Jan 23 2022 01:00:00 GMT+0100 (heure normale d’Europe centrale)

  // La méthode getTime() retourne le nbr de millisecondes depuis le 01/01/1970

  let numberOfMsUserDate = UserDate.getTime();
  // console.log(numberOfMsUserDate);

  // Création de l'objet de type date avec la date du jour
  let today = new Date(Date.now());
  // console.log(today); Mon Apr 19 2022 15:45:32 GMT+0100 (heure normale d’Europe centrale)

  let numberOfMsToday = today.getTime();
  // console.log(numberOfMsToday);

  // 18 années = 5,676e+11millisecondes
  /* Si value non renseignée ou si le nbr de millisecondes depuis le 01/01/1970 de la date entrée par l'utilisateur est
  supérieur au nbr de millisecondes depuis le 01/01/1970 de la date du jour alors message d'erreur */

  if (birthdate === "") {
    input.classList.add("input-error");
    error.innerText = "Vous devez saisir une date de naissance";
    return false;
  } else if (numberOfMsUserDate > numberOfMsToday) {
    input.classList.add("input-error");
    error.innerText = "Vous ne pouvez pas être né dans le futur, saisissez une date de naissance antérieure à la date du jour";
  } else {
    input.classList.remove("input-error");
    input.classList.add("input-validate");
    input.style.backgroundColor = "#E8F0FE";
    error.innerText = "";
    return true;
  }
}

function validateQuantity(){
  let quantity = form.elements["quantity"];
  let error = document.getElementById("error-quantity");
  if (quantity.value === "" || quantity.value < 0){
    quantity.classList.add("input-error");
    quantity.classList.remove("input-validate");
    error.innerText = "Vous devez entrer un nombre nul ou positif de tournois";
    return false;
  } else {
    quantity.classList.remove("input-error");
    quantity.classList.add("input-validate");
    quantity.style.backgroundColor = "#E8F0FE";
    error.innerText = "";
    return true;
  }
}

/* Fonction qui parcoure chaque input de type radio et vérifie si l'un a son 
attribut checked === true */
function validateCity() {
  let cities = document.querySelectorAll("input[type=radio]");
  let error = document.getElementById("error-city");
  for (i = 0; i < cities.length; i++) {
    if (cities[i].checked) {
      error.innerText = "";
      return true; // Si on a trouvé une valeur, inutile de continuer
    }
  }
  // Si on arrive ici, c'est qu'aucune case n'est cochée alors message d'erreur
  error.innerText = "Vous devez choisir une ville";
  return false;
}

/* Fonction qui vérifie que le 1er input de type checkbox ait son attribut 
checked === true */
function validateTerms() {
  let terms = document.querySelector("input[type=checkbox]");
  let error = document.getElementById("error-terms");
  if (terms.checked === true) {
    error.innerText = "";
    return true;
  } else {
    error.innerText =
      "Vous devez vérifier que vous acceptez les termes et conditions";
    return false;
  }
}

/* Fonction déclenchée au clic sur le btn submit du formulaire qui évalue que toutes les fonctions précédentes 
return true si NON blocage de l'envoi du formulaire et si OUI alors le formulaire est envoyé et un message de 
réussite est affiché */
function validateForm(event) {

  if (validateFullName() === false) {
    return false;
  } else if (validateEmail() === false) {
    return false;
  } else if (validateDate() === false) {
    return false;
  } else if (validateQuantity() === false) {
    return false;
  } else if (validateCity() === false) {
    return false;
  } else if (validateTerms() === false) {
    return false;
  } else {
    event.preventDefault();
    form.remove();
    let modal = document.querySelector("div.modal-body");
    let message = document.createElement("p");
    message.classList.add("message-validation");
    message.innerText = "Merci ! Votre réservation a été reçue";
    modal.appendChild(message);
    let btnCloseModal = document.createElement("button");
    btnCloseModal.classList.add("btn-submit");
    btnCloseModal.innerText = "Fermer";
    btnCloseModal.addEventListener("click", closeModal);
    modal.appendChild(btnCloseModal);
  }
}
