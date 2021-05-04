//DECLARACION DE HEADERS
let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://35.184.158.26:5000');
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

//VER DATA ENFERMERA
function verenfermera(usuario){
  fetch('http://35.184.158.26:5000/enfermeras/'+usuario)
  .then(response => response.json())
  .then(data =>{
      document.getElementById("nameEN").value = data.nombre;
      document.getElementById("lastnameEN").value = data.apellido;
      document.getElementById("borndateEN").value = data.fechaNAC;
      document.getElementById("genderEN").value = data.sexo;
      document.getElementById("usserEN").value = data.usuario;
      document.getElementById("passEN").value = data.contraseña;
      document.getElementById("phoneEN").value = data.telefono;
  });
}

//CERRAR SESION
function cerrar(){
  alert(`Cerrando Sesion`)
  localStorage.removeItem("usuario")
  window.location.href='../PaginaPrincipal/PaginaInicio.html'
}

//MODIFICAR ENFERMERA
function modificarenfermera(){
  let user = document.getElementById("usserEN");
  let usernew = document.getElementById("usserNEN");
  let nombre = document.getElementById("nameEN");
  let apellido = document.getElementById("lastnameEN");
  let fecha = document.getElementById("borndateEN");
  let sexo = document.getElementById("genderEN");
  let contra = document.getElementById("passEN");
  let telefono = document.getElementById("phoneEN");

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
    
      fetch('http://35.184.158.26:5000/enfermeras/'+user.value, {
        method: 'PUT',
        headers,
        body: reque,
      })
      .then(response => response.json())
      .then(result => {
        localStorage.removeItem("usuario")
        localStorage.setItem("usuario",usernew.value)
        alert('Perfil Modificado, cerrar sesión para comprobar')
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

//MOSTRAR CITAS
let text="";
fetch('http://35.184.158.26:5000/obtenercitas')
.then(response => response.json())
.then(data =>{
    var i;
    for(i=0;i<data.length;i++){
        text+= `
                <div class="col-sm-3 col-md-3 col-lg-3" style="margin-top: 10px; border: 1px solid black;">
                <div class="card bg-light" style="width: auto;">
                <div class="card-body">
                    <h6 style="position:relative; left: 20px; font-weight: bold;">Usuario Paciente: ${data[i].USpaciente}</h6>
                    <h8 style="position:relative; left: 20px;">Fecha: ${data[i].fecha}</h8></br>
                    <h8 style="position:relative; left: 20px;">Hora: ${data[i].hora}</h8>
                    <p style="position:relative; left: 20px;">Motivo: ${data[i].motivo}</p>
                    <button style="position:relative; left: 300px; color: white; background: rgb(9, 139, 9); text-transform: uppercase;" class="btn btn btn-danger" onclick="aceptarcita('${data[i].USpaciente}')">Aceptar</button>
                    <button style="position:relative; left: 300px; color: white; background: rgb(240, 49, 49); text-transform: uppercase;" class="btn btn btn-danger" onclick="rechazocita('${data[i].USpaciente}')">Rechazar</button>
                    </br></br>
                </div>
                </div>
                </div>`
    }
    document.getElementById("cardsc").innerHTML = text;
});

//ACTUALIZAR CITAS
function actualizarcita(){
  let text="";
  fetch('http://35.184.158.26:5000/obtenercitas')
  .then(response => response.json())
  .then(data =>{
      var i;
      for(i=0;i<data.length;i++){
          text+= `
                  <div class="col-sm-3 col-md-3 col-lg-3" style="margin-top: 10px; border: 1px solid black;">
                  <div class="card bg-light" style="width: auto;">
                  <div class="card-body">
                      <h6 style="position:relative; left: 20px; font-weight: bold;">Usuario Paciente: ${data[i].USpaciente}</h6>
                      <h8 style="position:relative; left: 20px;">Fecha: ${data[i].fecha}</h8></br>
                      <h8 style="position:relative; left: 20px;">Hora: ${data[i].hora}</h8>
                      <p style="position:relative; left: 20px;">Motivo: ${data[i].motivo}</p>
                      <button style="position:relative; left: 300px; color: white; background: rgb(9, 139, 9); text-transform: uppercase;" class="btn btn btn-danger" onclick="aceptarcita('${data[i].USpaciente}')">Aceptar</button>
                      <button style="position:relative; left: 300px; color: white; background: rgb(240, 49, 49); text-transform: uppercase;" class="btn btn btn-danger" onclick="rechazocita('${data[i].USpaciente}')">Rechazar</button>
                      </br></br>
                  </div>
                  </div>
                  </div>`
      }
      document.getElementById("cardsc").innerHTML = text;
  });
}

//ACEPTAR CITAS
function aceptarcita(USpaciente){
  let doctor = document.getElementById("doctor");

  fetch('http://35.184.158.26:5000/citas/'+USpaciente)
  .then(response => response.json())
  .then(data =>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
      
        let reque = `{
          "USpaciente":"${data.USpaciente}",
          "fecha":"${data.fecha}",
          "hora":"${data.hora}",
          "motivo":"${data.motivo}",
          "nomDoc":"${doctor.value}",
          "estado":"${"Aceptada"}"
        }`
          fetch('http://35.184.158.26:5000/citas/'+ USpaciente, {
            method: 'PUT',
            headers,
            body: reque,
          })
          .then(response => response.json())
          .then(result => {
            console.log('Success:', result);
            alert('Cita Aceptada')
            veraceptadas()
            actualizarcita()
            doctor.value = ''
          })
          .catch(error => {
            console.error('Error:', error);
          });
  });
}

//ACTUALIZAR ACEPTADAS
function veraceptadas(){
  let text2="";
  fetch('http://35.184.158.26:5000/aceptadas')
  .then(response => response.json())
  .then(data =>{
      var i;
      for(i=0;i<data.length;i++){
          text2+= `
                  <div class="col-sm-3 col-md-3 col-lg-3" style="margin-top: 10px; border: 1px solid black; background: rgb(32, 105, 32);">
                  <div class="card bg-light" style="width: auto;">
                  <div class="card-body">
                      <h6 style="position:relative; left: 20px; font-weight: bold;">Usuario Paciente: ${data[i].USpaciente}</h6>
                      <h8 style="position:relative; left: 20px;">Fecha: ${data[i].fecha}</h8></br>
                      <h8 style="position:relative; left: 20px;">Hora: ${data[i].hora}</h8>
                      <p style="position:relative; left: 20px;">Motivo: ${data[i].motivo}</p>
                      <p style="position:relative; left: 20px; font-weight: bold;">Doctor Asignado: ${data[i].nomDoc}</p>
                  </div>
                  </div>
                  </div>`
      }
      document.getElementById("cardsc2").innerHTML = text2;
  });
}

//VER ACEPTADAS
let text2="";
fetch('http://35.184.158.26:5000/aceptadas')
.then(response => response.json())
.then(data =>{
    var i;
    for(i=0;i<data.length;i++){
        text2+= `
                <div class="col-sm-3 col-md-3 col-lg-3" style="margin-top: 10px; border: 1px solid black; background: rgb(32, 105, 32);">
                <div class="card bg-light" style="width: auto;">
                <div class="card-body">
                    <h6 style="position:relative; left: 20px; font-weight: bold;">Usuario Paciente: ${data[i].USpaciente}</h6>
                    <h8 style="position:relative; left: 20px;">Fecha: ${data[i].fecha}</h8></br>
                    <h8 style="position:relative; left: 20px;">Hora: ${data[i].hora}</h8>
                    <p style="position:relative; left: 20px;">Motivo: ${data[i].motivo}</p>
                    <p style="position:relative; left: 20px; font-weight: bold;">Doctor Asignado: ${data[i].nomDoc}</p>
                </div>
                </div>
                </div>`
    }
    document.getElementById("cardsc2").innerHTML = text2;
});

//RECHAZAR CITAS
function rechazocita(USpaciente){
  fetch('http://35.184.158.26:5000/citas/'+USpaciente)
  .then(response => response.json())
  .then(data =>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
      
        let reque = `{
          "USpaciente":"${data.USpaciente}",
          "fecha":"${data.fecha}",
          "hora":"${data.hora}",
          "motivo":"${data.motivo}",
          "nomDoc":"${"SinDoctor"}",
          "estado":"${"Rechazada"}"
        }`
          fetch('http://35.184.158.26:5000/rechazos/'+ USpaciente, {
            method: 'PUT',
            headers,
            body: reque,
          })
          .then(response => response.json())
          .then(result => {
            console.log('Success:', result);
            alert('Cita Rechazada')
            veraceptadas()
            actualizarcita()
          })
          .catch(error => {
            console.error('Error:', error);
          });
  });
}

//MOSTRAR SELECT PARA DOCTORES
  let text3=""
  text3 = `<select style="width:100px; height: 30px;">`
  fetch('http://35.184.158.26:5000/obtenerdoctores')
  .then(response => response.json())
  .then(data =>{
      var i;
      for(i=0;i<data.length;i++){
          text3+= `
                  <option value="${data[i].nombre}">${data[i].nombre}</option>
                  `
    }
      text3+=`</select>`
      document.getElementById("select").innerHTML = text3;
  });

//DOCTORES ACTUALIZADOS
function doctores(){
  let text3=""
  text3 = `<select style="width:100px; height: 30px;">`
  fetch('http://35.184.158.26:5000/obtenerdoctores')
  .then(response => response.json())
  .then(data =>{
      var i;
      for(i=0;i<data.length;i++){
          text3+= `
                  <option value="${data[i].nombre}">${data[i].nombre}</option>
                  `
    }
      text3+=`</select>`
      document.getElementById("select").innerHTML = text3;
  });
}