import json
from Usuarios import Usuario
import re

class Gestor:

    def __init__(self):
        self.usuarios = []
        self.usuarios.append(Usuario("Hebert", "Reyes", "SinFecha", "M", "admin", "1234", "SinEspecialidad", "SinTelefono", "Admin"))
        self.usuarios.append(Usuario("Carlos", "Rosales", "2000-04-15", "M", "carlosr", "1234", "SinEspecialidad", "SinTelefono", "Paciente"))
        self.usuarios.append(Usuario("Andrea", "Fernanda", "1998-04-08", "F", "andrefer", "1234", "Psicologa", "SinTelefono", "Paciente"))
        self.usuarios.append(Usuario("Hebert", "Reyes", "2021-04-08", "M", "admin", "1234", "SinEspecialidad", "SinTelefono", "Paciente"))
        self.usuarios.append(Usuario("Fernando", "Rosales", "SinFecha", "M", "fercho", "1234", "Cirujano", "SinTelefono", "Doctor"))
        self.usuarios.append(Usuario("Andrea", "Fernanda", "SinFecha", "F", "andrefer", "1234", "Psicologa", "SinTelefono", "Enfermera"))


    #INICIAR SESION
    def iniciar_sesion(self,user,password):
        for x in self.usuarios:
            if x.usuario == user and x.contraseña == password:
                return json.dumps(x.__dict__)
        return '{"usuario":"false"}'

    #PACIENTES
    def crear_paciente(self,nombre,apellido,fechaNAC,sexo,usuario,contraseña,especialidad,telefono,tipousuario):
        self.usuarios.append(Usuario(nombre,apellido,fechaNAC,sexo,usuario,contraseña,"SinEspecialidad",telefono,"Paciente"))

    def obtener_pacientes(self):
        pacientes = []
        for x in self.usuarios:
            if x.tipousuario == "Paciente":
                pacientes.append(x)
        return json.dumps([ob.__dict__ for ob in pacientes])
        
    def eliminar_paciente(self,usuario):
        for x in self.usuarios:
            if x.tipousuario == "Paciente":
                if x.usuario == usuario:
                    self.usuarios.remove(x)
                    return True
        return False

    def cargar_pacientes(self, data):
        try:
            aux = re.split('\n', data)
            i = 1
            while i < len(aux):
                textpaci = re.split(',', aux[i])
                self.crear_paciente(textpaci[0],textpaci[1],self.cambioFormato(textpaci[2]),textpaci[3],
                textpaci[4],textpaci[5],"SinEspecialidad",textpaci[6],"Paciente")
                i = i+1
        except Exception as e:
            print(e)
    
    def actualizar_paciente(self,usuario,nombre,apellido,fechaNAC,sexo,usuarionuevo,contraseña,especialidad,telefono,tipousuario):
        for x in self.usuarios:
            if x.tipousuario == "Paciente":
                if x.usuario == usuario:
                    self.usuarios[self.usuarios.index(x)] = Usuario(nombre,apellido,fechaNAC,sexo,usuarionuevo,contraseña,"SinEspecialidad",telefono,"Paciente")
                return True
        return False

    def buscarpaciente(self, usuario):
        for x in self.usuarios:
            if x.tipousuario == "Paciente":
                if x.usuario == usuario:
                    return x.__dict__
        return False
    
    #DOCTORES
    def crear_doctor(self,nombre,apellido,fechaNAC,sexo,usuario,contraseña,especialidad,telefono,tipousuario):
        self.usuarios.append(Usuario(nombre,apellido,fechaNAC,sexo,usuario,contraseña,especialidad,telefono,"Doctor"))

    def obtener_doctores(self):
        doctores = []
        for x in self.usuarios:
            if x.tipousuario == "Doctor":
                doctores.append(x)
        return json.dumps([ob.__dict__ for ob in doctores])
        
    def eliminar_doctor(self,usuario):
        for x in self.usuarios:
            if x.tipousuario == "Doctor":
                if x.usuario == usuario:
                    self.usuarios.remove(x)
                    return True
        return False

    def cargar_doctores(self, data):
        try:
            aux = re.split('\n', data)
            i = 1
            while i < len(aux):
                textdoc = re.split(',', aux[i])
                self.crear_doctor(textdoc[0],textdoc[1],textdoc[2],textdoc[3],
                textdoc[4],textdoc[5],textdoc[6],textdoc[7],"Doctor")
                i = i+1
        except Exception as e:
            print(e)
    
    #ENFERMERAS
    def crear_enfermera(self,nombre,apellido,fechaNAC,sexo,usuario,contraseña,especialidad,telefono,tipousuario):
        self.usuarios.append(Usuario(nombre,apellido,fechaNAC,sexo,usuario,contraseña,"SinEspecialidad",telefono,"Enfermera"))

    def obtener_enfermeras(self):
        enfermeras = []
        for x in self.usuarios:
            if x.tipousuario == "Enfermera":
                enfermeras.append(x)
        return json.dumps([ob.__dict__ for ob in enfermeras])
        
    def eliminar_enfermera(self,usuario):
        for x in self.usuarios:
            if x.tipousuario == "Enfermera":
                if x.usuario == usuario:
                    self.usuarios.remove(x)
                    return True
        return False

    def cargar_enfermeras(self, data):
        try:
            aux = re.split('\n', data)
            i = 1
            while i < len(aux):
                textdoc = re.split(',', aux[i])
                self.crear_enfermera(textdoc[0],textdoc[1],textdoc[2],textdoc[3],
                textdoc[4],textdoc[5],"SinEspecialidad",textdoc[6],"Enfermera")
                i = i+1
        except Exception as e:
            print(e)

    #MEDICAMENTOS


    #CAMBIO DE FORMATO FECHA (PRUEBA)
    def cambioFormato(self,str):
        aux = str.split('/')
        cambio = aux[2] + '-' + aux[1] + '-' + aux[0]
        return cambio
