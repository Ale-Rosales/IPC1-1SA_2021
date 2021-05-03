//DECLARACION DE HEADERS
let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');

//FUNCIONES QUE TRAE LA PLANTILLA
$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }
});

$('.tab a').on('click', function (e) {
  e.preventDefault();
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  target = $(this).attr('href');
  $('.tab-content > div').not(target).hide();
  $(target).fadeIn(600); 
});

// FUNCION PARA INICIAR SESION
function IniciarSesion(){
  let usuario = document.getElementById("lUser");
  let pass = document.getElementById("lPass");

  if(usuario.value == ''){
    alert('Debe llenar todos los campos')
    return
  }else if(pass.value == ''){
    alert('Debe llenar todos los campos')
    return
  }

  fetch(`http://localhost:5000/login/${usuario.value}/${pass.value}`)
  .then(response => response.json())
  .then(data => {
      if(data.tipousuario == "Admin"){
        alert(`Bienvenido: ${data.usuario}`)
        window.location.href='../ModuloAdmin/ModuloAdmin.html'
      }else if(data.tipousuario == "Paciente"){
        alert(`Bienvenido: ${data.usuario}`)
        localStorage.setItem("usuario",data.usuario)
        window.location.href='../ModuloPaciente/ModuloPaciente.html'
      }else if(data.tipousuario == "Doctor"){
        alert(`Bienvenido: ${data.usuario}`)
        localStorage.setItem("usuario",data.usuario)
        localStorage.setItem("nombre",data.nombre)
        window.location.href='../ModuloDoctor/ModuloDoctor.html'
      }else if(data.tipousuario == "Enfermera"){
        alert(`Bienvenido: ${data.usuario}`)
        localStorage.setItem("usuario",data.usuario)
        window.location.href='../ModuloEnfermera/ModuloEnfermera.html'
      }else if(data.usuario == "false"){
        alert('Verifique sus Credenciales')
        pass.value='';
        usuario.value='';}
  })
}

//FUNCION PARA REGISTRAR USUARIOS
function CrearUsuario(){
  let nombre = document.getElementById("rNombre");
  let apellido = document.getElementById("rApellido");
  let fecha = document.getElementById("rFecha");
  let sexo = findSelection('genero')
  let usuario = document.getElementById("rUser");
  let pass = document.getElementById("rPass");
  let tel = document.getElementById("rCel");

  if(nombre.value == ''){
    alert('Debe llenar los campos obligatorios')
    return
  }else if(apellido.value == ''){
    alert('Debe llenar los campos obligatorios')
    return
  }else if(fecha.value == ''){
    alert('Debe llenar los campos obligatorios')
    return
  }else if(!sexo){
    alert('Debe llenar los campos obligatorios')
    return
  }else if(usuario.value == ''){
    alert('Debe llenar los campos obligatorios')
    return
  }else if(pass.value == ''){
    alert('Debe llenar los campos obligatorios')
    return
  }

  fetch('http://localhost:5000/pacientes',
  {
      method:'POST',
      headers,
      body: `{
              "nombre":"${nombre.value}",
              "apellido":"${apellido.value}",
              "fechaNAC":"${fecha.value}",
              "sexo":"${sexo}",
              "usuario":"${usuario.value}",
              "contraseña":"${pass.value}",
              "especialidad":"SinEspecialidad",
              "telefono":"${tel.value}",
              "tipousuario":"Paciente"
              }`
  })
  .then(response => response.json())
  .then(
      result => {

        console.log(nombre.value)
        console.log(apellido.value)
        console.log(fecha.value)
        console.log(sexo)
        console.log(usuario.value)
        console.log(pass.value)
        console.log(tel.value)

          console.log('Success:', result);
          nombre.value=''
          apellido.value=''
          fecha.value=''
          sexo.value = unselect()
          usuario.value=''
          pass.value=''
          tel.value=''
          alert('Usuario creado')
        }
  )
  .catch(
      error => {
          console.error('Error:', error);
          nombre.value=''
          apellido.value=''
          fecha.value=''
          sexo.value= unselect()
          usuario.value=''
          pass.value=''
          tel.value=''
          alert('Hubo un error al crear usuario')
        }
  )

}

//FUNCIONES VARIAS PARA LA SELECCION DE GENERO
function unselect(){
  document.querySelectorAll('[name=genero]').forEach((x) => x.checked=false);
}

function findSelection(field) {
  var test = document.getElementsByName(field);
  var sizes = test.length;
  for (i=0; i < sizes; i++) {
          if (test[i].checked==true) {
          return test[i].value;
          }
  }
}