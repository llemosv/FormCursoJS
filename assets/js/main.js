class ValidarFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario');
    this.events();
  }

  events() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e);
    } )
  }

  handleSubmit(e){
    e.preventDefault();
    const validFields = this.validFields();
    const validPasswords = this.validPasswords();

    if(validFields && validPasswords) {
      alert('Formulário enviado.');
      this.formulario.submit();
    }
  }

  validPasswords(){
    let valid = true;

    const senha = this.formulario.querySelector('.senha');
    const repetirSenha = this.formulario.querySelector('.repetir-senha');

    if(senha.value !== repetirSenha.value){
      this.createError(senha, 'Campos senha e repetir senha devem ser iguais.');
      this.createError(repetirSenha, 'Campos senha e repetir senha devem ser iguais.');
      valid = false;
    } 

    if(senha.value.length < 6 || senha.value.length > 12) {
      this.createError(senha, 'Senha deve conter entre 6 e 12 caracteres.');
      valid = false;
    }

    return valid;
  }

  validFields(){
    let valid = true;

    for(let errTxt of this.formulario.querySelectorAll('.error-Msg')){
      errTxt.remove();
    }

    for(let field of this.formulario.querySelectorAll('.validar')){
      //selecionando o irmão anterior do input (label)
      let label = field.previousElementSibling.innerHTML;
      if(!field.value){
        this.createError(field, `O campo "${label}" não pode estar vazio.`);
        valid = false;
      }

      if(field.classList.contains('cpf')){
        if(!this.validateCPF(field)) valid = false;
      }

      if(field.classList.contains('usuario')){
        if(!this.validateUserCaracter(field)) valid = false;
      }
    }
    return valid;
  }

  validateUserCaracter(field) {
    const user = field.value;
    let valid = true;

    if(user.length < 3 || user.length > 12) {
      this.createError(field, 'Usuário deve conter entre 3 e 12 caracteres.');
      valid = false;
    }

    if(!/[a-zA-Z0-9\-\/]/.test( user )){
      this.createError(field, 'Usuário deve conter apenas letras e/ou números.');
      valid = false;
    }
    return valid;
  }

  validateCPF(field) {
    const cpf = new ValidaCPF(field.value);

    if(!cpf.valida()){
      this.createError(field, 'CPF inválido.');
      return false;
    }
    return true;
  }

  createError(field, msgErr) {
    const div = document.createElement('div')
    div.innerHTML = msgErr;
    div.classList.add('error-Msg');
    //insere a div com o erro logo após o input que o erro ocorre
    field.insertAdjacentElement('afterend', div);
  }

}

const validar = new ValidarFormulario();