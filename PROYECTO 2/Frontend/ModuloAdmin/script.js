// Used to toggle the menu on small screens when clicking on the menu button
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
text2 = `<table class="table" style="margin:40px">
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

fetch('http://localhost:5000/obtenerusuarios')
.then(response => response.json())
.then(data =>{
    var i;
    for(i=0;i<data.length;i++){
        text2+= `
                <tr>
                <th scope="row">${i+1}</th>
                <td>${data[i].nPaciente}</td>
                <td>${data[i].aPaciente}</td>
                <td>${data[i].fPaciente}</td>
                <td>${data[i].sPaciente}</td>
                <td>${data[i].uPaciente}</td>
                <td>${data[i].cPaciente}</td>
                <td>${data[i].tPaciente}</td>
                </tr>
                `
    }
    text2+=`</tbody>
            </table>`
    document.getElementById("tablapaciente").innerHTML = text2;
});
