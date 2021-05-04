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

//CERRAR SESION
function cerrar(){
  alert(`Cerrando Sesion`)
  localStorage.removeItem("usuario")
  window.location.href='../PaginaPrincipal/PaginaInicio.html'
}

//VER DATA PACIENTE
function verpaciente(usuario){
  fetch('http://35.184.158.26:5000/pacientes/'+usuario)
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
    
      fetch('http://35.184.158.26:5000/pacientes/'+user.value, {
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

//CREAR CITA PACIENTE
function crearcita(){
  let fecha = document.getElementById("ciFecha");
  let hora = document.getElementById("ciHora");
  let motivo = document.getElementById("ciMoti")

  fetch('http://35.184.158.26:5000/citas', { 
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
  fetch('http://35.184.158.26:5000/citas/'+usuario)
  .then(response => response.json())
  .then(data =>{
    text+= `
                  <div class="col-sm-3 col-md-3 col-lg-3" style="margin-top: 10px; text-align:center; text-transform: uppercase; border: 0.5px solid black; background: rgb(238, 101, 51); color: #ffffff;">
                  <div class="card bg-light" style="width: auto;">
                  <div class="card-body">
                      <h6 style="font-weight: bold;">Estado: ${data.estado}</h6>
                      <h8>Doctor Asignado: ${data.nomDoc}</h8>
                      </br></br>
                  </div>
                  </div>
                  </div>`
      document.getElementById("cardsc").innerHTML = text;
  });
}

//MOSTRAR MEDICAMENTOS
let text="";
fetch('http://35.184.158.26:5000/obtenermedicamento')
.then(response => response.json())
.then(data =>{
    var i;
    for(i=0;i<data.length;i++){
        text+= `
                <div class="col-sm-3 col-md-3 col-lg-3" style="margin-top: 10px; border: 1px solid black;">
                <div class="card bg-light" style="width: auto;">
                <div class="card-body">
                    <h4 style="position:relative; left: 20px; font-weight: bold;">${data[i].nRemedio}</h4>
                    <h5 style="position:relative; left: 20px;">Descripción: ${data[i].dRemedio}</h5>
                    <p style="position:relative; left: 20px;">Cantidad: ${data[i].cRemedio}</p>
                    <p style="position:relative; left: 20px;">Precio(Q): ${data[i].pRemedio}</p>
                    <button style="position:relative; left: 300px; color: white; background: rgb(240, 49, 49); text-transform: uppercase;" class="btn btn btn-danger" onclick="comprarmedicamentos('${data[i].nRemedio}')">Comprar</button>
                    </br></br>
                </div>
                </div>
                </div>`
    }
    document.getElementById("cardsc2").innerHTML = text;
});

/*
//ACTUALIZAR MEDICAMENTOS
function actualizaremedio(){
  let text="";
  fetch('http://35.184.158.26:5000/obtenermedicamento')
  .then(response => response.json())
  .then(data =>{
      var i;
      for(i=0;i<data.length;i++){
          text+= `
                  <div class="col-sm-3 col-md-3 col-lg-3" style="margin-top: 10px; border: 1px solid black;">
                  <div class="card bg-light" style="width: auto;">
                  <div class="card-body">
                      <h4 style="position:relative; left: 20px; font-weight: bold;">${data[i].nRemedio}</h4>
                      <h5 style="position:relative; left: 20px;">Descripción: ${data[i].dRemedio}</h5>
                      <p style="position:relative; left: 20px;">Cantidad: ${data[i].cRemedio}</p>
                      <p style="position:relative; left: 20px;">Precio(Q): ${data[i].pRemedio}</p>
                      <button style="position:relative; left: 300px; color: white; background: rgb(240, 49, 49); text-transform: uppercase;" class="btn btn btn-danger" onclick="onclick="comprarmedicamentos('${data[i].nRemedio}')"">Q${data[i].pRemedio}</button>
                      </br></br>
                  </div>
                  </div>
                  </div>`
      }
      document.getElementById("cardsc2").innerHTML = text;
  });
}
*/

//COMPRAS REALIZADAS AGREGAR
function comprarmedicamentos(nRemedio){
  let text4=""
  text4 = `<table class="table" style="margin:40px">
  <thead>
  <tr>
  <th scope="col">#</th>
  <th scope="col">Medicamento</th>
  <th scope="col">Precio(Q)</th>
  </tr>
  </thead>
  <tbody>`

  fetch('http://35.184.158.26:5000/compras/'+nRemedio)
  .then(response => response.json())
  .then(data =>{
      var i;
      for(i=0;i<data.length;i++){
          text4+= `
                  <tr>
                  <th scope="row">${i+1}</th>
                  <td>${data[i].nRemedio}</td>
                  <td>${data[i].pRemedio}</td>
                  </tr>
                  `
    }
      text4+=`</tbody>
              </table>`
      document.getElementById("carrito").innerHTML = text4;
  });
}

//MOSTRAR COMPRAS
let text4=""
  text4 = `<table class="table" style="margin:40px">
  <thead>
  <tr>
  <th scope="col">#</th>
  <th scope="col">Medicamento</th>
  <th scope="col">Precio(Q)</th>
  </tr>
  </thead>
  <tbody>`

  fetch('http://35.184.158.26:5000/obtenercompras')
  .then(response => response.json())
  .then(data =>{
      var i;
      for(i=0;i<data.length;i++){
          text4+= `
                  <tr>
                  <th scope="row">${i+1}</th>
                  <td>${data[i].nRemedio}</td>
                  <td>${data[i].pRemedio}</td>
                  </tr>
                  `
    }
      text4+=`</tbody>
              </table>`
      document.getElementById("carrito").innerHTML = text4;
  });

//ACTUALIZAR COMPRAS
function carritonuevo(){
  let text4=""
  text4 = `<table class="table" style="margin:40px">
  <thead>
  <tr>
  <th scope="col">#</th>
  <th scope="col">Medicamento</th>
  <th scope="col">Precio(Q)</th>
  </tr>
  </thead>
  <tbody>`

  fetch('http://35.184.158.26:5000/obtenercompras')
  .then(response => response.json())
  .then(data =>{
      var i;
      for(i=0;i<data.length;i++){
          text4+= `
                  <tr>
                  <th scope="row">${i+1}</th>
                  <td>${data[i].nRemedio}</td>
                  <td>${data[i].pRemedio}</td>
                  </tr>
                  `
    }
      text4+=`</tbody>
              </table>
              `
      document.getElementById("carrito").innerHTML = text4;
  });
}

//LIMPIAR CARRITO
function carritolimpio(){
  fetch('http://35.184.158.26:5000/compras',{
      method:'DELETE'
  })
  .then(res => res.text())
  .then(res=> {
      carritonuevo()
  })
}

//COMPRA REALIZADA PDF
function createHeadersCompra(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 60,
      align: "center",
      padding: 0
    });
  }
  return result;
}

function convertirDataCompra(nRemedio){
  var data ={
    "Medicamento": nRemedio.nRemedio,
    "Precio(Q)": nRemedio.pRemedio
  }
  return data
}

function PDFCompra(){
  fetch('http://35.184.158.26:5000/obtenercompras')
  .then(response => response.json())
  .then(data=>{
    //Declarando los headers
    let headers = createHeadersCompra([
      "Medicamento",
      "Precio(Q)"
    ]);
    // Insertamos la data
    let datos=[]
    Total = 0;
    for(let i =0;i<data.length;i++){
      datos.push(Object.assign({},convertirDataCompra(data[i])))
    }
    console.log(datos)
    var contentJsPdf = {
      headers,
      datos
  };
  for(let i=0; i<data.length; i++){
    Total += parseFloat(data[i].pRemedio);
  }
    var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
    doc.setFont("courier");
    doc.setFontType("bolditalic");
    doc.setFontSize(30);
    doc.text(90, 20, 'Productos Comprados');
    doc.table(100, 35, datos, headers, { autoSize: false });
    doc.text(210, 90, 'Total Compra(Q): '+Total);
    doc.save("CompraPaciente.pdf")
  })
}