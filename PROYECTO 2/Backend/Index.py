#Importacioens de Flask
from flask import Flask,request,jsonify
from flask_cors import CORS

from Gestor import Gestor

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
    print('entra')
    return gestor.iniciar_sesion(user,password)

@app.route('/registro',methods=['POST'])
def registrar():
    dato = request.json
    gestor.registrar_usuario(dato['nPaciente'],dato['aPaciente'],dato['fPaciente'],dato['sPaciente'],
    dato['uPaciente'],dato['cPaciente'],dato['tPaciente'])
    print(dato['nPaciente'],dato['aPaciente'],dato['fPaciente'],dato['sPaciente'],
    dato['uPaciente'],dato['cPaciente'],dato['tPaciente'])
    return '{"data":"Creado"}'

@app.route('/obtenerusuarios')
def obtenerusuarios():
    return gestor.obtener_usuarios()

#Iniciar el Servidor
if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)