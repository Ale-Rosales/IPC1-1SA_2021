#Importacioens de Flask
from flask import Flask,request,jsonify
from flask_cors import CORS

from Gestor import Gestor
from Usuarios import Usuario

#Crear la app

app = Flask(__name__)
app.config["DEBUG"] = True

CORS(app)

gestor = Gestor()

#EndPoints

@app.route('/',methods = ['GET'])
def home():
    return 'SERVER IS WORKING'

@app.route('/login/<user>/<password>')
def login(user,password):
    return gestor.iniciar_sesion(user,password)

#PACIENTES
@app.route('/pacientes',methods=['POST'])
def registrarpacientes():
    dato = request.json
    gestor.crear_paciente(dato['nombre'],dato['apellido'],dato['fechaNAC'],dato['sexo'],
    dato['usuario'],dato['contraseña'],'SinEspecialidad',dato['telefono'],'Paciente')
    return '{"data":"Creado"}'

@app.route('/obtenerpacientes')
def obtener_pacientes():
    return gestor.obtener_pacientes()

@app.route('/pacientes/<usuario>',methods=['DELETE'])
def eliminar_paciente(usuario):
    if(gestor.eliminar_paciente(usuario)):
        return '{"data":"Eliminado"}'
    return '{"data":"Error"}'

@app.route('/cargapacientes', methods=['POST'])
def carga_pacientes():
    dato = request.json
    gestor.cargar_pacientes(dato['data'])
    return '{"data":"Pacientes Cargados"}'

@app.route('/pacientes/<usuario>',methods=['PUT'])
def actualizar_paciente(usuario):
    dato = request.json
    if gestor.actualizar_paciente(usuario,dato['nombre'],dato['apellido'],dato['fechaNAC'],dato['sexo'],
    dato['usuario'],dato['contraseña'],'SinEspecialidad',dato['telefono'],'Paciente'):
        return '{"data":"Actualizado"}'
    return '{"data":"Error"}'

@app.route('/pacientes/<usuario>')
def buscarpaciente(usuario):
    return gestor.buscarpaciente(usuario)

#DOCTORES
@app.route('/doctores',methods=['POST'])
def registrardoctores():
    dato = request.json
    gestor.crear_doctor(dato['nombre'],dato['apellido'],dato['fechaNAC'],dato['sexo'],
    dato['usuario'],dato['contraseña'],dato['especialidad'],dato['telefono'],'Doctor')
    return '{"data":"Creado"}'

@app.route('/obtenerdoctores')
def obtener_doctores():
    return gestor.obtener_doctores()

@app.route('/doctores/<usuario>',methods=['DELETE'])
def eliminar_doctor(usuario):
    if(gestor.eliminar_doctor(usuario)):
        return '{"data":"Eliminado"}'
    return '{"data":"Error"}'

@app.route('/cargadoctores', methods=['POST'])
def carga_doctores():
    dato = request.json
    gestor.cargar_doctores(dato['data'])
    return '{"data":"Doctores Cargados"}'

#ENFERMERAS
@app.route('/enfermeras',methods=['POST'])
def registrarenfermeras():
    dato = request.json
    gestor.crear_enfermera(dato['nombre'],dato['apellido'],dato['fechaNAC'],dato['sexo'],
    dato['usuario'],dato['contraseña'],'SinEspecialidad',dato['telefono'],'Enfermera')
    return '{"data":"Creado"}'

@app.route('/obtenerenfermeras')
def obtener_enfermeras():
    return gestor.obtener_enfermeras()

@app.route('/enfermeras/<usuario>',methods=['DELETE'])
def eliminar_enfermera(usuario):
    if(gestor.eliminar_enfermera(usuario)):
        return '{"data":"Eliminado"}'
    return '{"data":"Error"}'

@app.route('/cargaenfermeras', methods=['POST'])
def cargar_enfermeras():
    dato = request.json
    gestor.cargar_enfermeras(dato['data'])
    return '{"data":"Enfermeras Cargadas"}'

#MEDICAMENTOS


#Iniciar el Servidor
if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)
