console.log("register validator success!");
const exRegEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const exRegPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

//para el popover
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

const $ = (id) => document.getElementById(id);

    //checkea el email
const checkEmail = async (email) => {
    try {

        const response = await fetch('http://http://localhost:3000/apis/users/check-email?email=' + email);
        const result = await response.json();

        return result.isRegisted
        
    } catch (error) {
        console.error
    }
}
    //añade las clases que marcan los errores
const ClassesInvalid = function(input, msgError) {
    
    const inputLabel = document.querySelector(`label[for=${input.id}]`)

    inputLabel.classList.add('invalidForm--label')
    input.classList.add('invalidForm')
    $(`error-${input.id}`).innerHTML = msgError
    $(`error-${input.id}`).style.visibility = "visible"
}
    
//Quita el color rojo de los campos y labels en foco
for (let i = 0; i < $('form-register').elements.length - 3; i++) {
    
    const inputName = $('form-register').elements[i].name;
    
    $(inputName).addEventListener("focus", function () {

    const inputLabel = document.querySelector(`label[for=${this.id}]`)

    this.classList.remove('invalidForm')
    inputLabel.classList.remove('invalidForm--label')
    $(`error-${this.id}`).innerHTML = "no small"
    $(`error-${this.id}`).style.visibility = "hidden"
    });
}


//name
$("name").addEventListener("blur", function () {
    switch (true) {
        case !this.value:
            ClassesInvalid(this, "El nombre es obligatorio");
            break;
        case this.value.length < 3:
            ClassesInvalid(this, "Mínimo 3 caracteres");
            break;
    }
});

//surname
$("surname").addEventListener("blur", function () {
    switch (true) {
        case !this.value:
            ClassesInvalid(this,"El apellido es obligatorio");
            break;
        case this.value.length < 3:
            ClassesInvalid(this, "Mínimo 3 caracteres");
            break;
    }
});

//email
$("email").addEventListener("blur", function () {
    switch (true) {
        case !this.value:
            ClassesInvalid(this,"El email es obligatorio");
            break;
        case !exRegEmail.test(this.value):
            ClassesInvalid(this, "No es un formato de email válido");
            break;
    }
});

//password
$("password").addEventListener("blur", function () {
    switch (true) {
        case !this.value:
            ClassesInvalid(this, "La contraseña es obligatoria");
            $('password-badge').firstElementChild.classList.add('invalidForm')
            $('password-badge').firstElementChild.style.backgroundColor = 'black'
            break;
            case !exRegPassword.test(this.value):
            ClassesInvalid(this, "La contraseña es vulnerable");
            $('password-badge').firstElementChild.classList.add('invalidForm')
            $('password-badge').firstElementChild.style.backgroundColor = 'black'
            break;
    }
});

//passwordConfirm
$("passwordConfirm").addEventListener("blur", function () {
    switch (true) {
        case !this.value:
            ClassesInvalid(this, "Las contraseñas deben coincidir");
            break;
        case this.value !== $('password').value:
            ClassesInvalid(this, "Las contraseñas deben coincidir");
            break;
    }
});

//botones de ojito (button-eye)
$("button-eye").addEventListener("click", function () {
    
    this.firstElementChild.classList.toggle('fa-eye');
    this.firstElementChild.classList.toggle('fa-eye-slash');
    $("password").type = $('password').type ===  "password" ? "text" : "password"
    $("passwordConfirm").type = $('passwordConfirm').type ===  "password" ? "text" : "password"
});

$("form-register").addEventListener("submit", function (e) {
  e.preventDefault();

  let error = false;

  for (let i = 0; i < this.elements.length - 2; i++) {
    if (!this.elements[i].value) {
        error = true;
        const inputLabel = document.querySelector(`label[for=${this.elements[i].id}]`)
          this.elements[i].classList.add("invalidForm");
          inputLabel.classList.add("invalidForm--label");
          $(`error-${this.elements[i].id}`).innerHTML = "Este campo es obligatorio"
          $(`error-${this.elements[i].id}`).style.visibility = "visible"
  }
}

  
if (!error) {
    this.submit()
}else{
    $('msg-error').hidden = false
}
   
});




