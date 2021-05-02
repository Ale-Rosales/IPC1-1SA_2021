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

//PRUEBITA PDF PACIENTES
function createHeadersPaci(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 50,
      align: "center",
      padding: 0
    });
  }
  return result;
}

function convertirDataPaciente(usuario){
  var data ={
    "Nombre": usuario.nombre,
    "Apellido": usuario.apellido,
    "Fecha de Nacimiento": usuario.fechaNAC,
    "Sexo": usuario.sexo,
    "Usuario": usuario.usuario,
    "Contraseña": usuario.contraseña,
    "Teléfono": usuario.telefono
  }
  return data
}

function PDFPaciente(){
  fetch('http://localhost:5000/obtenerpacientes')
  .then(response => response.json())
  .then(data=>{
    //Declarando los headers
    let headers = createHeadersPaci([
      "Nombre",
      "Apellido",
      "Fecha de Nacimiento",
      "Sexo",
      "Usuario",
      "Contraseña",
      "Teléfono"
    ]);
    // Insertamos la data
    let datos=[]
    for(let i =0;i<data.length;i++){
      datos.push(Object.assign({},convertirDataPaciente(data[i])))
    }
    console.log(datos)
    var contentJsPdf = {
      headers,
      datos
  };
    var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
    doc.setFont("courier");
    doc.setFontType("bolditalic");
    doc.setFontSize(30);
    doc.text(90, 20, 'Listado de Pacientes');
    doc.table(20, 30, datos, headers, { autoSize: false });
    doc.save("Pacientes.pdf")
  })
}

//PRUEBITA PDF DOCTORES
function createHeadersDoc(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 45,
      align: "center",
      padding: 0
    });
  }
  return result;
}

function convertirDataDoctor(usuario){
  var data ={
    "Nombre": usuario.nombre,
    "Apellido": usuario.apellido,
    "Fecha de Nacimiento": usuario.fechaNAC,
    "Sexo": usuario.sexo,
    "Usuario": usuario.usuario,
    "Contraseña": usuario.contraseña,
    "Especialidad": usuario.especialidad,
    "Teléfono": usuario.telefono
  }
  return data
}

function PDFDoctor(){
  fetch('http://localhost:5000/obtenerdoctores')
  .then(response => response.json())
  .then(data=>{
    //Declarando los headers
    let headers = createHeadersDoc([
      "Nombre",
      "Apellido",
      "Fecha de Nacimiento",
      "Sexo",
      "Usuario",
      "Contraseña",
      "Especialidad",
      "Teléfono"
    ]);
    // Insertamos la data
    let datos=[]
    for(let i =0;i<data.length;i++){
      datos.push(Object.assign({},convertirDataDoctor(data[i])))
    }
    console.log(datos)
    var contentJsPdf = {
      headers,
      datos
  };
    var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
    doc.setFont("courier");
    doc.setFontType("bolditalic");
    doc.setFontSize(30);
    doc.text(90, 20, 'Listado de Doctores');
    doc.table(15, 30, datos, headers, { autoSize: false });
    doc.save("Doctores.pdf")
  })
}

//PRUEBITA PDF ENFERMERAS
function createHeadersEnfe(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 50,
      align: "center",
      padding: 0
    });
  }
  return result;
}

function convertirDataEnfe(usuario){
  var data ={
    "Nombre": usuario.nombre,
    "Apellido": usuario.apellido,
    "Fecha de Nacimiento": usuario.fechaNAC,
    "Sexo": usuario.sexo,
    "Usuario": usuario.usuario,
    "Contraseña": usuario.contraseña,
    "Teléfono": usuario.telefono
  }
  return data
}

function PDFEnfermera(){
  fetch('http://localhost:5000/obtenerenfermeras')
  .then(response => response.json())
  .then(data=>{
    //Declarando los headers
    let headers = createHeadersEnfe([
      "Nombre",
      "Apellido",
      "Fecha de Nacimiento",
      "Sexo",
      "Usuario",
      "Contraseña",
      "Teléfono"
    ]);
    // Insertamos la data
    let datos=[]
    for(let i =0;i<data.length;i++){
      datos.push(Object.assign({},convertirDataEnfe(data[i])))
    }
    console.log(datos)
    var contentJsPdf = {
      headers,
      datos
  };
    var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
    doc.setFont("courier");
    doc.setFontType("bolditalic");
    doc.setFontSize(30);
    doc.text(90, 20, 'Listado de Enfermeras');
    doc.table(20, 30, datos, headers, { autoSize: false });
    doc.save("Enfermeras.pdf")
  })
}


//PRUEBITA PDF MEDICAMENTOS
function createHeadersMedica(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 90,
      align: "center",
      padding: 0
    });
  }
  return result;
}

function convertirDataMedicamentos(remedio){
  var data ={
    "Nombre": remedio.nRemedio,
    "Precio(Q)": remedio.pRemedio,
    "Descripción": remedio.dRemedio,
    "Cantidad": remedio.cRemedio
  }
  return data
}

function PDFMedicamento(){
  fetch('http://localhost:5000/obtenermedicamento')
  .then(response => response.json())
  .then(data=>{
    //Declarando los headers
    let headers = createHeadersMedica([
      "Nombre",
      "Precio(Q)",
      "Descripción",
      "Cantidad"
    ]);
    // Insertamos la data
    let datos=[]
    for(let i =0;i<data.length;i++){
      datos.push(Object.assign({},convertirDataMedicamentos(data[i])))
    }
    console.log(datos)
    var contentJsPdf = {
      headers,
      datos
  };
    var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
    doc.setFont("courier");
    doc.setFontType("bolditalic");
    doc.setFontSize(30);
    doc.text(90, 20, 'Listado de Medicamentos');
    doc.table(15, 30, datos, headers, { autoSize: false });
    doc.save("Medicamentos.pdf")
  })
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
                <td><button onclick="nimodo()" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/view.png" height="15" width="23"/></button></td>
                <td><button onclick="verpaciente()" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/edit.png" height="18" width="22"/></button></td>
                <td><button onclick="eliminarpaciente('${data[i].usuario}')" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/delete.png" height="20" width="20"></button></td>
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
                  <td><button onclick="nimodo()" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/view.png" height="15" width="23"/></button></td>
                  <td><button onclick="verpaciente()" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/edit.png" height="18" width="22"/></button></td>
                  <td><button onclick="eliminarpaciente('${data[i].usuario}')" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/delete.png" height="20" width="20"></button></td>
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
        console.log('Success:', result);
        actualizarpaciente()
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
                <td><button onclick="nimodo()" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/view.png" height="15" width="23"/></button></td>
                <td><button onclick="" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/edit.png" height="18" width="22"/></button></td>
                <td><button onclick="eliminardoctor('${data[i].usuario}')" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/delete.png" height="20" width="20"></button></td>
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
                  <td><button onclick="nimodo()" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/view.png" height="15" width="23"/></button></td>
                  <td><button onclick="" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/edit.png" height="18" width="22"/></button></td>
                  <td><button onclick="eliminardoctor('${data[i].usuario}')" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/delete.png" height="20" width="20"></button></td>
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
3
      }
      reader.onerror = function (evt) {
          
      }
  }
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
                <td><button onclick="nimodo()" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/view.png" height="15" width="23"/></button></td>
                <td><button onclick="" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/edit.png" height="18" width="22"/></button></td>
                <td><button onclick="eliminarenfermera('${data[i].usuario}')" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/delete.png" height="20" width="20"></button></td>
                </tr>
                `
  }
    text4+=`</tbody>
            </table>`
    document.getElementById("tablaenfermera").innerHTML = text4;
});

//ACTUALIZAR ENFERMERAS
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
          text4 += `
                  <tr>
                  <th scope="row">${i+1}</th>
                  <td>${data[i].nombre}</td>
                  <td>${data[i].apellido}</td>
                  <td>${data[i].fechaNAC}</td>
                  <td>${data[i].sexo}</td>
                  <td>${data[i].usuario}</td>
                  <td>${data[i].contraseña}</td>
                  <td>${data[i].telefono}</td>
                  <td><button onclick="nimodo()" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/view.png" height="15" width="23"/></button></td>
                  <td><button onclick="" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/edit.png" height="18" width="22"/></button></td>
                  <td><button onclick="eliminarenfermera('${data[i].usuario}')" style="background-color:Transparent; background-repeat:no-repeat; border:none; cursor:pointer; overflow:hidden; outline:none;"><img src="imagenes/delete.png" height="20" width="20"></button></td>
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
    
      fetch('http://localhost:5000/enfermeras/'+user.value, { //FALTA CAMBIARLO
        method: 'PUT',
        headers,
        body: reque,
      })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
        actualizarenfermera()
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

//MOSTRAR REMEDIOS
let text="";
fetch('http://localhost:5000/obtenermedicamento')
.then(response => response.json())
.then(data =>{
    var i;
    for(i=0;i<data.length;i++){
        text+= `
                <div class="col-sm-3 col-md-3 col-lg-3" style="margin-top: 10px; border: 1px solid black;">
                <div class="card bg-light" style="width: auto;">
                <div class="card-body">
                    <h4 style="position:relative; left: 20px;">${data[i].nRemedio}</h4>
                    <h5 style="position:relative; left: 20px;">Descripción: ${data[i].dRemedio}</h5>
                    <p style="position:relative; left: 20px;">Cantidad: ${data[i].cRemedio}</p>
                    <p style="position:relative; left: 20px;">Precio(Q): ${data[i].pRemedio}</p>
                    <button style="position:relative; left: 300px; color: white; background: rgb(240, 49, 49); text-transform: uppercase;" class="btn btn btn-danger" onclick="eliminaremedio('${data[i].nRemedio}')">Eliminar</button>
                    </br></br>
                </div>
                </div>
                </div>`
    }
    document.getElementById("cardsc").innerHTML = text;
});

//ACTUALIZAR REMEDIOS
function actualizaremedio(){
  let text="";
  fetch('http://localhost:5000/obtenermedicamento')
  .then(response => response.json())
  .then(data =>{
      var i;
      for(i=0;i<data.length;i++){
          text+= `
                  <div class="col-sm-3 col-md-3 col-lg-3" style="margin-top: 10px; border: 1px solid black;">
                  <div class="card bg-light" style="width: auto;">
                  <div class="card-body">
                      <h4 style="position:relative; left: 20px;">${data[i].nRemedio}</h4>
                      <h5 style="position:relative; left: 20px;">Descripción: ${data[i].dRemedio}</h5>
                      <p style="position:relative; left: 20px;">Cantidad: ${data[i].cRemedio}</p>
                      <p style="position:relative; left: 20px;">Precio(Q): ${data[i].pRemedio}</p>
                      <button style="position:relative; left: 300px; color: white; background: rgb(240, 49, 49); text-transform: uppercase;" class="btn btn btn-danger" onclick="eliminaremedio('${data[i].nRemedio}')">Eliminar</button>
                      </br></br>
                  </div>
                  </div>
                  </div>`
      }
      document.getElementById("cardsc").innerHTML = text;
  });
}

//ELIMINAR REMEDIOS
function eliminaremedio(nRemedio){
  fetch('http://localhost:5000/remedios/'+nRemedio,{
      method:'DELETE'
  })
  .then(res => res.text())
  .then(res=> {
      actualizaremedio()
  })
}

//CARGAR REMEDIOS
function cargaremedios(){
  let file = document.getElementById("selectreme").files[0];
  if (file) {
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
          let cuerpo = {
              data:evt.target.result
          }
          fetch('http://localhost:5000/cargaremedios', {
          method: 'POST',
          headers,
          body: JSON.stringify(cuerpo),
          })
          .then(response => response.json())
          .then(result => {
              console.log('Success:', result);
              actualizaremedio()
          })
          .catch(error => {
              console.error('Error:', error);
          });
      }
      reader.onerror = function (evt) {
      }
  }
}

//MODIFICAR MEDICAMENTO
function modificarmedicamento(){
  let nombreR = document.getElementById("nameMEDI");
  let nombreRN = document.getElementById("nameNMEDI");
  let precio = document.getElementById("preMEDI");
  let cantidad = document.getElementById("cantMEDI");
  let descripcion = document.getElementById("descriMEDI");
  

  let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
      
        let reque = `{
          "nRemedio":"${nombreRN.value}",
          "pRemedio":"${precio.value}",
          "dRemedio":"${descripcion.value}",
          "cRemedio":"${cantidad.value}"
        }`
      
        fetch('http://localhost:5000/remedios/'+nombreR.value, {
          method: 'PUT',
          headers,
          body: reque,
        })
        .then(response => response.json())
        .then(result => {
          console.log('Success:', result);
          actualizaremedio()
          nombreR.value=''
          nombreRN.value=''
          precio.value=''
          cantidad.value=''
          descripcion.value=''
        })
        .catch(error => {
          console.error('Error:', error);
        });
}

//AGREGAR MEDICAMENTO
function agregaremedio(){
  let nombre = document.getElementById("nameMED");
  let precio = document.getElementById("preMED");
  let cantidad = document.getElementById("canMED")
  let descripcion = document.getElementById("deMED");

  fetch('http://localhost:5000/remedios', { 
    method: 'POST',
    headers,
    body: `{
        "nRemedio":"${nombre.value}",
        "pRemedio":"${precio.value}",
        "dRemedio":"${descripcion.value}",
        "cRemedio":"${cantidad.value}"
      }`,
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    actualizaremedio()
    nombre.value=''
    precio.value=''
    cantidad.value=''
    descripcion.value=''
  })
  .catch(error => {
    console.error('Error:', error);
  });
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

//NIMODO EL OJO
function nimodo(){
  alert('No sé que tenía que hacer esto xd')
}