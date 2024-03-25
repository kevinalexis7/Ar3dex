console.log("login validator success!");
const $ = (id) => document.getElementById(id);

    //añade las clases que marcan los errores
    const ClassesInvalid = function(input, msgError) {
    
        const inputLabel = document.querySelector(`label[for=${input.id}]`)
    
        inputLabel.classList.add('invalidForm--label')
        input.classList.add('invalidForm')
        $(`error-${input.id}`).innerHTML = msgError
        $(`error-${input.id}`).style.visibility = "visible"
    }

//Quita el color rojo de los campos y labels en foco
for (let i = 0; i < $('form-login').elements.length - 2; i++) {
    
    const inputName = $('form-login').elements[i].name;
    
    $(inputName).addEventListener("focus", function () {

    const inputLabel = document.querySelector(`label[for=${this.id}]`)

    this.classList.remove('invalidForm')
    inputLabel.classList.remove('invalidForm--label')
    $(`error-${this.id}`).innerHTML = "no small"
    $(`error-${this.id}`).style.visibility = "hidden"
    });
}


//email
$("email").addEventListener("blur", function () {
    switch (true) {
        case !this.value:
            ClassesInvalid(this);
            $('error-email').innerHTML = "El email es obligatorio"
            break;
        case !exRegEmail.test(this.value):
            ClassesInvalid(this);
            $('error-email').innerHTML = "El mail tiene un formato inválido"
            break;
        case checkEmail(this.value):
            ClassesInvalid(this);
            $('error-email').innerHTML = "El mail tiene un formato inválido"
            break;
    }
});

//password
$("password").addEventListener("blur", function () {
    switch (true) {
        case !this.value:
            ClassesInvalid(this, "La contraseña es obligatoria");
            break;
            case !exRegPassword.test(this.value):
            ClassesInvalid(this, "La contraseña es vulnerable");
            break;
    }
});

$("form-login").addEventListener("submit", function (e) {
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
    this.onsubmit()
}else{
    $('msg-error').hidden = false
}
   
});




