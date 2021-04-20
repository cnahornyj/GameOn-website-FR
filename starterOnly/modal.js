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
let checkString = /^[a-zA-Z]/;
let checkMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Fonctions de vérification des différents inputs saisis par l'utilisateur

//
function validateFirstName(){
let firstname = form.elements['firstname'];
let error = document.getElementById("error-firstname");
  if (checkString.test(firstname.value) === false) {
    firstname.classList.add("input-error");
    error.innerText = "Veuillez entrer 2 caractères alphabétiques ou plus pour le champ du prénom";
    return false;
  } else {
    firstname.classList.remove("input-error");
    firstname.classList.add("input-validate");
    error.innerText = "";
    return true;
  }
}

//
function validateLastName(){
let lastname = form.elements['lastname'];
let error = document.getElementById("error-lastname");
  if (checkString.test(lastname.value) === false) {
    lastname.classList.add("input-error");
    error.innerText = "Veuillez entrer 2 caractères alphabétiques ou plus pour le champ du nom";
    return false;
  } else {
    lastname.classList.remove("input-error");
    lastname.classList.add("input-validate");
    error.innerText = "";
    return true;
  }
}

//
function validateEmail(){
let email = form.elements['email'];
let error = document.getElementById("error-mail");
  if (checkMail.test(email.value) === false) {
    email.classList.add("input-error");
    error.innerText = "Saississez un email valide";
    return false;
  } else {
    email.classList.remove("input-error");
    email.classList.add("input-validate");
    error.innerText = "";
    return true;
  }
}

function validateDate(){
let input = document.querySelector("input#birthdate");
let birthdate = form.elements['birthdate'].value;
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

let numberOfMsToday  = today.getTime();
// console.log(numberOfMsToday);

// 18 années = 5,676e+11millisecondes
/* Si le nbr de millisecondes depuis le 01/01/1970 de la date entrée par l'utilisateur est
  supérieur au nbr de millisecondes depuis le 01/01/1970 de la date du jour alors message d'erreur */

  if (numberOfMsUserDate > numberOfMsToday){
    input.classList.add("input-error");
    error.innerText = "Vous devez entrer votre date de naissance";
    return false;
  } else {
    input.classList.remove("input-error");
    input.classList.add("input-validate");
    input.style.backgroundColor = "#E8F0FE";
    error.innerText = "";
    return true;
  }
}

/* Fonction qui parcoure chaque input de type radio et vérifie si l'un a son 
attribut checked === true */
function validateCity(){
  let cities = document.querySelectorAll("input[type=radio]");
  let error = document.getElementById("error-city");
  for(i=0; i<cities.length; i++){
		if(cities[i].checked){ 
      error.innerText = "";
			return true; // Si on a trouvé une valeur, inutile de continuer
		}
	}
	// Si on arrive ici, c'est qu'aucune case n'est cochée alors message d'erreur
	error.innerText = "Vous devez choisir une option";
	return false;
}

/* Fonction qui vérifie que le 1er input de type checkbox ait son attribut 
checked === true */
function validateTerms(){
  let terms = document.querySelector("input[type=checkbox]");
  let error = document.getElementById("error-terms");
  if (terms.checked === true){
    error.innerText = "";
    return true;
  } else {
    error.innerText = "Vous devez vérifier que vous acceptez les termes et conditions";
    return false;
  };
}

/* Fonction déclenchée au clic sur le btn submit du formulaire qui évalue que toutes les fonctions précédentes 
return true si NON blocage de l'envoi du formulaire et si OUI alors le formulaire est envoyé et un message de 
réussite est affiché */
function validateForm(){
  if (validateFirstName() === false){
    return false;
  } else if (validateLastName() === false){
    return false;
  } else if (validateEmail() === false){
    return false;
  } else if (validateDate() === false) {
    return false;
  } else if (validateCity() === false) {
    return false;
  } else if (validateTerms() === false) {
    return false;    
  } else {
    form.remove();
    let modal = document.querySelector("div.modal-body");
    let message = document.createElement("p");
    message.classList.add("message-validation");
    message.innerText = "Merci ! Votre réservation a été reçue";
    modal.appendChild(message);
  }
}


