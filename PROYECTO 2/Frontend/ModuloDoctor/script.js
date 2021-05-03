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
  localStorage.removeItem("nombre")
  window.location.href='../PaginaPrincipal/PaginaInicio.html'
}

//VER DATA DOCTOR
function verdoctor(usuario){
  fetch('http://localhost:5000/doctores/'+usuario)
  .then(response => response.json())
  .then(data =>{
      document.getElementById("nameDOC").value = data.nombre;
      document.getElementById("lastnameDOC").value = data.apellido;
      document.getElementById("borndateDOC").value = data.fechaNAC;
      document.getElementById("genderDOC").value = data.sexo;
      document.getElementById("usserDOC").value = data.usuario;
      document.getElementById("passDOC").value = data.contraseña;
      document.getElementById("speDOC").value = data.especialidad;
      document.getElementById("phoneDOC").value = data.telefono;
  });
}

//MODIFICAR DOCTOR
function modificardoctor(){
  let user = document.getElementById("usserDOC");
  let usernew = document.getElementById("usserNDOC");
  let nombre = document.getElementById("nameDOC");
  let apellido = document.getElementById("lastnameDOC");
  let fecha = document.getElementById("borndateDOC");
  let sexo = document.getElementById("genderDOC");
  let contra = document.getElementById("passDOC");
  let espe = document.getElementById("speDOC");
  let telefono = document.getElementById("phoneDOC");

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
        "especialidad":"${espe.value}",
        "telefono":"${telefono.value}"
      }`
    
      fetch('http://localhost:5000/doctores/'+user.value, {
        method: 'PUT',
        headers,
        body: reque,
      })
      .then(response => response.json())
      .then(result => {
        localStorage.removeItem("usuario")
        localStorage.removeItem("nombre")
        localStorage.setItem("usuario",usernew.value)
        localStorage.setItem("nombre",nombre.value)
        alert('Perfil Modificado, cerrar sesión para comprobar.')
        console.log('Success:', result);
        actualizardoctor()
        nombre.value=''
        apellido.value=''
        fecha.value=''
        sexo.value=''
        usernew.value=''
        user.value=''
        contra.value=''
        espe.value=''
        telefono.value=''
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

//MOSTRAR CITAS
let text="";
fetch('http://localhost:5000/obtenercitas')
.then(response => response.json())
.then(data =>{
    var i;
    for(i=0;i<data.length;i++){
        text+= `
                <div class="col-sm-3 col-md-3 col-lg-3" style="margin-top: 10px; border: 1px solid black;">
                <div class="card bg-light" style="width: auto;">
                <div class="card-body">
                    <h6 style="position:relative; left: 20px;">Usuario Paciente: ${data[i].USpaciente}</h6>
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
  fetch('http://localhost:5000/obtenercitas')
  .then(response => response.json())
  .then(data =>{
      var i;
      for(i=0;i<data.length;i++){
          text+= `
                  <div class="col-sm-3 col-md-3 col-lg-3" style="margin-top: 10px; border: 1px solid black;">
                  <div class="card bg-light" style="width: auto;">
                  <div class="card-body">
                      <h6 style="position:relative; left: 20px;">Usuario Paciente: ${data[i].USpaciente}</h6>
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
  fetch('http://localhost:5000/citas/'+USpaciente)
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
          "nomDoc":"${localStorage.getItem("nombre")}",
          "estado":"${"Aceptada"}"
        }`
          fetch('http://localhost:5000/citas/'+ USpaciente, {
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
          })
          .catch(error => {
            console.error('Error:', error);
          });
  });
}

//RECHAZAR CITAS
function rechazocita(USpaciente){
  fetch('http://localhost:5000/citas/'+USpaciente)
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
          fetch('http://localhost:5000/rechazos/'+ USpaciente, {
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