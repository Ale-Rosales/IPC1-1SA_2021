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

//MOSTRAR PACIENTES
let text2=""
text2 = `<table class="table" id="tablapaciente" style="margin:40px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Apellido</th>
<th scope="col">Fecha de nacimiento</th>
<th scope="col">Sexo</th>
<th scope="col">Usuario</th>
<th scope="col">Contraseña</th>
<th scope="col">Teléfono</th>

</tr>
</thead>
<tbody>`

fetch('http://localhost:5000/obtenerpacientes')
.then(response => response.json())
.then(data =>{
    var i;
    for(i=0;i<data.length;i++){
        text2+= `
                <tr>
                <th scope="row">${i+1}</th>
                <td>${data[i].nombre}</td>
                <td>${data[i].apellido}</td>
                <td>${data[i].fechaNAC}</td>
                <td>${data[i].sexo}</td>
                <td>${data[i].usuario}</td>
                <td>${data[i].contraseña}</td>
                <td>${data[i].telefono}</td>
                <td><button href="#" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/view.png" height="15" width="23"/></button></td>
                <td><button href="#" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/edit.png" height="18" width="22"/></button></td>
                <td><button href="#" onclick="eliminarpaciente('${data[i].usuario}')" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/delete.png" height="20" width="20"></button></td>
                </tr>
                `
  }
    text2+=`</tbody>
            </table>`
    document.getElementById("tablapaciente").innerHTML = text2;
});

//ACTUALIZAR PACIENTES
function actualizarpaciente(){
  let text2=""
  text2 = `<table class="table" id="tablapaciente" style="margin:40px">
  <thead>
  <tr>
  <th scope="col">#</th>
  <th scope="col">Nombre</th>
  <th scope="col">Apellido</th>
  <th scope="col">Fecha de nacimiento</th>
  <th scope="col">Sexo</th>
  <th scope="col">Usuario</th>
  <th scope="col">Contraseña</th>
  <th scope="col">Teléfono</th>
  
  </tr>
  </thead>
  <tbody>`
  
  fetch('http://localhost:5000/obtenerpacientes')
  .then(response => response.json())
  .then(data =>{
      var i;
      for(i=0;i<data.length;i++){
          text2+= `
                  <tr>
                  <th scope="row">${i+1}</th>
                  <td>${data[i].nombre}</td>
                  <td>${data[i].apellido}</td>
                  <td>${data[i].fechaNAC}</td>
                  <td>${data[i].sexo}</td>
                  <td>${data[i].usuario}</td>
                  <td>${data[i].contraseña}</td>
                  <td>${data[i].telefono}</td>
                  <td><button href="#" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/view.png" height="15" width="23"/></button></td>
                  <td><button href="#" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/edit.png" height="18" width="22"/></button></td>
                  <td><button href="#" onclick="eliminarpaciente('${data[i].usuario}')" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/delete.png" height="20" width="20"></button></td>
                  </tr>
                  `
      }
      text2+=`</tbody>
              </table>`
      document.getElementById("tablapaciente").innerHTML = text2;
  });
}

//ELIMINAR PACIENTE
function eliminarpaciente(usuario){
  fetch('http://localhost:5000/pacientes/'+usuario,{
      method:'DELETE'
  })
  .then(res => res.text())
  .then(res=> {
      actualizarpaciente()
  })
  
}

//CARGAR PACIENTES
function cargarpaciente(){
  let file = document.getElementById("selectpaci").files[0];
  if (file) {
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
          let cuerpo = {
              data:evt.target.result
          }

          console.log(JSON.stringify(cuerpo))
          fetch('http://localhost:5000/cargapacientes', {
          method: 'POST',
          headers,
          body: JSON.stringify(cuerpo),
          })
          .then(response => response.json())
          .then(result => {
              console.log('Success:', result);
              actualizarpaciente()
          })
          .catch(error => {
              console.error('Error:', error);
          });

      }
      reader.onerror = function (evt) {
          
      }
  }
}

//MOSTRAR DOCTORES
let text3=""
text3 = `<table class="table" id="tabladoctor" style="margin:40px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Apellido</th>
<th scope="col">Fecha de nacimiento</th>
<th scope="col">Sexo</th>
<th scope="col">Usuario</th>
<th scope="col">Contraseña</th>
<th scope="col">Especialidad</th>
<th scope="col">Teléfono</th>

</tr>
</thead>
<tbody>`

fetch('http://localhost:5000/obtenerdoctores')
.then(response => response.json())
.then(data =>{
    var i;
    for(i=0;i<data.length;i++){
        text3+= `
                <tr>
                <th scope="row">${i+1}</th>
                <td>${data[i].nombre}</td>
                <td>${data[i].apellido}</td>
                <td>${data[i].fechaNAC}</td>
                <td>${data[i].sexo}</td>
                <td>${data[i].usuario}</td>
                <td>${data[i].contraseña}</td>
                <td>${data[i].especialidad}</td>
                <td>${data[i].telefono}</td>
                <td><button href="#" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/view.png" height="15" width="23"/></button></td>
                <td><button href="#" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/edit.png" height="18" width="22"/></button></td>
                <td><button href="#" onclick="eliminardoctor('${data[i].usuario}')" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/delete.png" height="20" width="20"></button></td>
                </tr>
                `
  }
    text3+=`</tbody>
            </table>`
    document.getElementById("tabladoctor").innerHTML = text3;
});

//ACTUALIZAR DOCTORES
function actualizardoctor(){
  let text3=""
  text3 = `<table class="table" id="tabladoctor" style="margin:40px">
  <thead>
  <tr>
  <th scope="col">#</th>
  <th scope="col">Nombre</th>
  <th scope="col">Apellido</th>
  <th scope="col">Fecha de nacimiento</th>
  <th scope="col">Sexo</th>
  <th scope="col">Usuario</th>
  <th scope="col">Contraseña</th>
  <th scope="col">Especialidad</th>
  <th scope="col">Teléfono</th>

  </tr>
  </thead>
  <tbody>`

  fetch('http://localhost:5000/obtenerdoctores')
  .then(response => response.json())
  .then(data =>{
      var i;
      for(i=0;i<data.length;i++){
          text3+= `
                  <tr>
                  <th scope="row">${i+1}</th>
                  <td>${data[i].nombre}</td>
                  <td>${data[i].apellido}</td>
                  <td>${data[i].fechaNAC}</td>
                  <td>${data[i].sexo}</td>
                  <td>${data[i].usuario}</td>
                  <td>${data[i].contraseña}</td>
                  <td>${data[i].especialidad}</td>
                  <td>${data[i].telefono}</td>
                  <td><button href="#" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/view.png" height="15" width="23"/></button></td>
                  <td><button href="#" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/edit.png" height="18" width="22"/></button></td>
                  <td><button href="#" onclick="eliminardoctor('${data[i].usuario}')" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/delete.png" height="20" width="20"></button></td>
                  </tr>
                  `
    }
      text3+=`</tbody>
              </table>`
      document.getElementById("tabladoctor").innerHTML = text3;
  });
}

//ELIMINAR DOCTOR
function eliminardoctor(usuario){
  fetch('http://localhost:5000/doctores/'+usuario,{
      method:'DELETE'
  })
  .then(res => res.text())
  .then(res=> {
      actualizardoctor()
  })
  
}

//CARGAR DOCTORES
function cargardoctor(){
  let file = document.getElementById("selectdoc").files[0];
  if (file) {
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
          let cuerpo = {
              data:evt.target.result
          }

          console.log(JSON.stringify(cuerpo))
          fetch('http://localhost:5000/cargadoctores', {
          method: 'POST',
          headers,
          body: JSON.stringify(cuerpo),
          })
          .then(response => response.json())
          .then(result => {
              console.log('Success:', result);
              actualizardoctor()
          })
          .catch(error => {
              console.error('Error:', error);
          });

      }
      reader.onerror = function (evt) {
          
      }
  }
}

//MOSTRAR ENFERMERAS
let text4=""
text4 = `<table class="table" id="tablaenfermera" style="margin:40px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Apellido</th>
<th scope="col">Fecha de nacimiento</th>
<th scope="col">Sexo</th>
<th scope="col">Usuario</th>
<th scope="col">Contraseña</th>
<th scope="col">Teléfono</th>

</tr>
</thead>
<tbody>`

fetch('http://localhost:5000/obtenerenfermeras')
.then(response => response.json())
.then(data =>{
    var i;
    for(i=0;i<data.length;i++){
        text4+= `
                <tr>
                <th scope="row">${i+1}</th>
                <td>${data[i].nombre}</td>
                <td>${data[i].apellido}</td>
                <td>${data[i].fechaNAC}</td>
                <td>${data[i].sexo}</td>
                <td>${data[i].usuario}</td>
                <td>${data[i].contraseña}</td>
                <td>${data[i].telefono}</td>
                <td><button href="#" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/view.png" height="15" width="23"/></button></td>
                <td><button href="#" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/edit.png" height="18" width="22"/></button></td>
                <td><button href="#" onclick="eliminarenfermera('${data[i].usuario}')" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/delete.png" height="20" width="20"></button></td>
                </tr>
                `
  }
    text4+=`</tbody>
            </table>`
    document.getElementById("tablaenfermera").innerHTML = text4;
});

//ACTUALIZAR DOCTORES
function actualizarenfermera(){
  let text4=""
  text4 = `<table class="table" id="tablaenfermera" style="margin:40px">
  <thead>
  <tr>
  <th scope="col">#</th>
  <th scope="col">Nombre</th>
  <th scope="col">Apellido</th>
  <th scope="col">Fecha de nacimiento</th>
  <th scope="col">Sexo</th>
  <th scope="col">Usuario</th>
  <th scope="col">Contraseña</th>
  <th scope="col">Teléfono</th>

  </tr>
  </thead>
  <tbody>`

  fetch('http://localhost:5000/obtenerenfermeras')
  .then(response => response.json())
  .then(data =>{
      var i;
      for(i=0;i<data.length;i++){
          text4+= `
                  <tr>
                  <th scope="row">${i+1}</th>
                  <td>${data[i].nombre}</td>
                  <td>${data[i].apellido}</td>
                  <td>${data[i].fechaNAC}</td>
                  <td>${data[i].sexo}</td>
                  <td>${data[i].usuario}</td>
                  <td>${data[i].contraseña}</td>
                  <td>${data[i].telefono}</td>
                  <td><button href="#" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/view.png" height="15" width="23"/></button></td>
                  <td><button href="#" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/edit.png" height="18" width="22"/></button></td>
                  <td><button href="#" onclick="eliminarenfermera('${data[i].usuario}')" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/delete.png" height="20" width="20"></button></td>
                  </tr>
                  `
    }
      text4+=`</tbody>
              </table>`
      document.getElementById("tablaenfermera").innerHTML = text4;
  });
}

//ELIMINAR ENFERMERA
function eliminarenfermera(usuario){
  fetch('http://localhost:5000/enfermeras/'+usuario,{
      method:'DELETE'
  })
  .then(res => res.text())
  .then(res=> {
      actualizarenfermera()
  })
  
}

//CARGAR ENFERMERAS
function cargarenfermera(){
  let file = document.getElementById("selectenfe").files[0];
  if (file) {
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
          let cuerpo = {
              data:evt.target.result
          }

          console.log(JSON.stringify(cuerpo))
          fetch('http://localhost:5000/cargaenfermeras', {
          method: 'POST',
          headers,
          body: JSON.stringify(cuerpo),
          })
          .then(response => response.json())
          .then(result => {
              console.log('Success:', result);
              actualizarenfermera()
          })
          .catch(error => {
              console.error('Error:', error);
          });

      }
      reader.onerror = function (evt) {
          
      }
  }
}





/*//GENERAR PDF PACIENTES
function demoFromHTML() {
  let pdf = new jsPDF('p', 'pt', 'letter');
  source = $('#tablapaciente')[0];
  specialElementHandlers = {
      '#bypassme': function (element, renderer) {
          return true
      }
  };
  margins = {
      top: 4,
      bottom: 4,
      left: 4,
      width: 522
  };
  pdf.fromHTML(
  source, // HTML string or DOM elem ref.
  margins.left, // x coord
  margins.top, { // y coord
      'width': margins.width, // max width of content on PDF
      'elementHandlers': specialElementHandlers
  },

  function (dispose) {
      pdf.save('Test.pdf');
  }, margins);
}


//PRUEBA DE PDF
function PDF2(){
  var doc = new jsPDF();

  doc.text(20, 20, 'Hola mundo');
  doc.text(20, 30, 'Con un ejemplo sencillo si me funciono xd');
  
  // Save the PDF
  doc.save('documento.pdf');
}*/
