console.log("register validator success!");
const exRegEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const $ = (id) => document.getElementById(id);
    //añade las clases que marcan los errores
const addClassesInvalid = function(input) {
    input.previousElementSibling.classList.add('invalidForm--label')
    input.classList.add('invalidForm')}
    
    //Quita el color rojo de los campos y labels en foco
function removeClasses(){ 
    for (let i = 0; i < $('form-register').elements.length - 3; i++) {
        const inputName = $('form-register').elements[i].name;
        $(inputName).addEventListener("focus", function () {
            this.classList.remove('invalidForm')
            this.previousElementSibling.classList.remove('invalidForm--label')
        });


    }
}
//name
$("name").addEventListener("blur", function () {
    switch (true) {
        case !this.value:
            addClassesInvalid(this);
            $('error-name').innerHTML = "El nombre es obligatorio"
            break;
        case this.value.length < 3:
            addClassesInvalid(this);
            $('error-name').innerHTML = "Mínimo 3 caracteres"
            break;
        default:
            this.previousElementSibling.classList.remove('invalidForm--label')
            this.classList.remove('invalidForm')
            $('error-name').innerHTML = null
            break;
    }
});

//surname
$("surname").addEventListener("blur", function () {
    switch (true) {
        case !this.value:
            addClassesInvalid(this);
            $('error-surname').innerHTML = "El apellido es obligatorio"
            break;
        case this.value.length < 3:
            addClassesInvalid(this);
            $('error-surname').innerHTML = "Mínimo 3 caracteres"
            break;
        default:
            this.previousElementSibling.classList.remove('invalidForm--label')
            this.classList.remove('invalidForm')
            $('error-surname').innerHTML = null
            break;
    }
});

//email
$("email").addEventListener("blur", function () {
    switch (true) {
        case !this.value:
            addClassesInvalid(this);
            $('error-email').innerHTML = "El email es obligatorio"
            break;
        case !exRegEmail.test(this.value):
            addClassesInvalid(this);
            $('error-email').innerHTML = "El mail tiene un formato inválido"
            break;
        default:
            this.previousElementSibling.classList.remove('invalidForm--label')
            this.classList.remove('invalidForm')
            $('error-email').innerHTML = null
            break;
    }
});

//password
$("password").addEventListener("blur", function () {
    switch (true) {
        case !this.value:
            addClassesInvalid(this);
            $('error-password').innerHTML = "La contraseña es obligatoria"
            break;
        case this.value.length < 8:
            addClassesInvalid(this);
            $('error-password').innerHTML = "Mínimo 3 caracteres"
            break;
        case this.value.length > 12:
            addClassesInvalid(this);
            $('error-password').innerHTML = "Maximo 12 caracteres"
            break;
        default:
            this.previousElementSibling.classList.remove('invalidForm--label')
            this.classList.remove('invalidForm')
            $('error-password').innerHTML = null
            break;
    }
});

//passwordConfirm
$("passwordConfirm").addEventListener("blur", function () {
    switch (true) {
        case !this.value:
            addClassesInvalid(this);
            $('error-passwordConfirm').innerHTML = "La contraseña es obligatoria"
            break;
        case this.value.length < 8:
            addClassesInvalid(this);
            $('error-passwordConfirm').innerHTML = "Las contraseñas deben coincidir"
            break;
        case this.value.length > 12:
            addClassesInvalid(this);
            $('error-passwordConfirm').innerHTML = "Las contraseñas deben coincidir"
            break;
        default:
            this.previousElementSibling.classList.remove('invalidForm--label')
            this.classList.remove('invalidForm')
            $('error-passwordConfirm').innerHTML = null
            break;
    }
});

$("form-register").addEventListener("submit", function (e) {
  e.preventDefault();

  let error = false;

  for (let i = 0; i < this.elements.length - 2; i++) {
    if (!this.elements[i].value) {
      error = true;
      this.elements[i].classList.add("invalidForm");
      this.elements[i].previousElementSibling.classList.add(
        "invalidForm--label"
      );
    }
  }
  
if (!error) {
    this.onsubmit()
}else{
    removeClasses()
    $('msg-error').hidden = false
}
   
});




