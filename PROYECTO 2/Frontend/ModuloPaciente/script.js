//DECLARACION DE HEADERS
let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');

//FUNCIONES DE LA PLANTILLA
function myFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}

//CERRAR SESION
function cerrar(){
  alert(`Cerrando Sesion`)
  localStorage.removeItem("usuario")
  window.location.href='../PaginaPrincipal/PaginaInicio.html'
}

//VER DATA PACIENTE
function verpaciente(usuario){
  fetch('http://localhost:5000/pacientes/'+usuario)
  .then(response => response.json())
  .then(data =>{
      document.getElementById("namePACI").value = data.nombre;
      document.getElementById("lastnamePACI").value = data.apellido;
      document.getElementById("borndatePACI").value = data.fechaNAC;
      document.getElementById("genderPACI").value = data.sexo;
      document.getElementById("usserPACI").value = data.usuario;
      document.getElementById("passPACI").value = data.contraseña;
      document.getElementById("phonePACI").value = data.telefono;
  });
}

//MODIFICAR PACIENTE
function modificarpaciente(){
  let user = document.getElementById("usserPACI");
  let usernew = document.getElementById("usserNPACI");
  let nombre = document.getElementById("namePACI");
  let apellido = document.getElementById("lastnamePACI");
  let fecha = document.getElementById("borndatePACI");
  let sexo = document.getElementById("genderPACI");
  let contra = document.getElementById("passPACI");
  let telefono = document.getElementById("phonePACI");

  let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    
      let reque = `{
        "nombre":"${nombre.value}",
        "apellido":"${apellido.value}",
        "fechaNAC":"${fecha.value}",
        "sexo":"${sexo.value}",
        "usuario":"${usernew.value}",
        "contraseña":"${contra.value}",
        "telefono":"${telefono.value}"
      }`
    
      fetch('http://localhost:5000/pacientes/'+user.value, {
        method: 'PUT',
        headers,
        body: reque,
      })
      .then(response => response.json())
      .then(result => {
        localStorage.removeItem("usuario")
        localStorage.setItem("usuario",usernew.value)
        alert('Perfil Modificado, cerrar sesión para comprobar.')
        console.log('Success:', result);
        nombre.value=''
        apellido.value=''
        fecha.value=''
        sexo.value=''
        usernew.value=''
        user.value=''
        contra.value=''
        telefono.value=''
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

//CREAR CITA PACIENTE
function crearcita(){
  let fecha = document.getElementById("ciFecha");
  let hora = document.getElementById("ciHora");
  let motivo = document.getElementById("ciMoti")

  fetch('http://localhost:5000/citas', { 
    method: 'POST',
    headers,
    body: `{
        "USpaciente":"${localStorage.getItem("usuario")}",
        "fecha":"${fecha.value}",
        "hora":"${hora.value}",
        "motivo":"${motivo.value}",
        "nomDoc":"${"SinDoctor"}",
        "estado":"${"Pendiente"}"
      }`,
  })
  .then(response => response.json())
  .then(result => {
    alert('Cita Creada')
    console.log('Success:', result);
    fecha.value=''
    hora.value=''
    motivo.value=''
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

//ESTADO CITA
function verestado(usuario){
  let text="";
  fetch('http://localhost:5000/citas/'+usuario)
  .then(response => response.json())
  .then(data =>{
    text+= `
                  <div class="col-sm-3 col-md-3 col-lg-3" style="margin-top: 10px; text-align:center; text-transform: uppercase; border: 0.5px solid black; background: rgb(238, 101, 51); color: #ffffff;">
                  <div class="card bg-light" style="width: auto;">
                  <div class="card-body">
                      <h6>Estado: ${data.estado}</h6>
                      <h8>Doctor Asignado: ${data.nomDoc}</h8>
                      </br></br>
                  </div>
                  </div>
                  </div>`
      document.getElementById("cardsc").innerHTML = text;
  });
}