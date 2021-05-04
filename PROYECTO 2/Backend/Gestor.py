import json
from Usuarios import Usuario
from Medicamento import Remedio
from Citas import Cita
from Compras import Carrito
import re

class Gestor:

    def __init__(self):
        self.usuarios = []
        self.remedios = []
        self.citas = []
        self.compras = []
        self.usuarios.append(Usuario("Hebert", "Reyes", "SinFecha", "M", "admin", "1234", "SinEspecialidad", "SinTelefono", "Admin"))
        self.usuarios.append(Usuario("Alejandro", "Rosales", "2000-04-15", "M", "alejo", "123", "SinEspecialidad", "SinTelefono", "Paciente"))
        self.usuarios.append(Usuario("Andrea", "Fernanda", "SinFecha", "F", "andrea", "123", "SinEspecialidad", "SinTelefono", "Enfermera"))
        self.usuarios.append(Usuario("Hebert", "Reyes", "2021-04-08", "M", "herb", "123","Corazón", "SinTelefono", "Doctor"))

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
            if x.tipousuario == "Paciente" and x.usuario == usuario:
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
                self.crear_doctor(textdoc[0],textdoc[1],self.cambioFormato(textdoc[2]),textdoc[3],
                textdoc[4],textdoc[5],textdoc[6],textdoc[7],"Doctor")
                i = i+1
        except Exception as e:
            print(e)
    
    def actualizar_doctor(self,usuario,nombre,apellido,fechaNAC,sexo,usuarionuevo,contraseña,especialidad,telefono,tipousuario):
        for x in self.usuarios:
            if x.tipousuario == "Doctor" and x.usuario == usuario:
                self.usuarios[self.usuarios.index(x)] = Usuario(nombre,apellido,fechaNAC,sexo,usuarionuevo,contraseña,especialidad,telefono,"Doctor")
                return True
        return False

    def buscardoctor(self,usuario):
        for x in self.usuarios:
            if x.tipousuario == "Doctor":
                if x.usuario == usuario:
                    return x.__dict__
        return False

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
                self.crear_enfermera(textdoc[0],textdoc[1],self.cambioFormato(textdoc[2]),textdoc[3],
                textdoc[4],textdoc[5],"SinEspecialidad",textdoc[6],"Enfermera")
                i = i+1
        except Exception as e:
            print(e)

    def actualizar_enfermera(self,usuario,nombre,apellido,fechaNAC,sexo,usuarionuevo,contraseña,especialidad,telefono,tipousuario):
        for x in self.usuarios:
            if x.tipousuario == "Enfermera" and x.usuario == usuario:
                self.usuarios[self.usuarios.index(x)] = Usuario(nombre,apellido,fechaNAC,sexo,usuarionuevo,contraseña,"SinEspecialidad",telefono,"Enfermera")
                return True
        return False

    def buscarenfermera(self, usuario):
        for x in self.usuarios:
            if x.tipousuario == "Enfermera":
                if x.usuario == usuario:
                    return x.__dict__
        return False

    #MEDICAMENTOS
    def crear_remedio(self,nRemedio,pRemedio,dRemedio,cRemedio):
        self.remedios.append(Remedio(nRemedio,pRemedio,dRemedio,cRemedio))

    def obtener_remedios(self):
        return json.dumps([ob.__dict__ for ob in self.remedios])

    def eliminar_remedio(self,nRemedio):
        for x in self.remedios:
            if x.nRemedio == nRemedio:
                self.remedios.remove(x)
                return True
        return False

    def actualizar_remedio(self,nombreR,nombreRN,pRemedio,dRemedio,cRemedio):
        for x in self.remedios:
            if x.nRemedio == nombreR:
                self.remedios[self.remedios.index(x)]=Remedio(nombreRN,pRemedio,dRemedio,cRemedio)
                return True
        return False

    def cargar_remedios(self,data):
        try:
            aux = re.split('\n',data)
            i = 1
            while i <len(aux):
                retxt = re.split(',', aux[i])
                self.crear_remedio(retxt[0],retxt[1],retxt[2],retxt[3])
                i = i+1
        except Exception as e:
            print(e) 

    #CAMBIO DE FORMATO FECHA (PRUEBA)
    def cambioFormato(self,str):
        aux = str.split('/')
        cambio = aux[2] + '-' + aux[1] + '-' + aux[0]
        return cambio

    #CITAS
    def crear_cita(self,USpaciente,fecha,hora,motivo,nomDoc,estado):
        self.citas.append(Cita(USpaciente,fecha,hora,motivo,nomDoc,estado))

    def obtener_citas(self):
        pendientes = []
        for x in self.citas:
            if x.estado == "Pendiente":
                pendientes.append(x)
        return json.dumps([ob.__dict__ for ob in pendientes])

    def rechazar_cita(self,paciente,USpaciente,fecha,hora,motivo,nomDoc,estadonuevo):
        for x in self.citas:
            if x.USpaciente == paciente:
                self.citas[self.citas.index(x)] = Cita(USpaciente,fecha,hora,motivo,"SinDoctor","Rechazada")
                return True
        return False

    def aceptar_cita(self,paciente,USpaciente,fecha,hora,motivo,nomDoc,estadonuevo):
        for x in self.citas:
            if x.USpaciente == paciente:
                self.citas[self.citas.index(x)] = Cita(USpaciente,fecha,hora,motivo,nomDoc,"Aceptada")
                return True
        return False

    def aceptadas_citas(self):
        aceptadas = []
        for x in self.citas:
            if x.estado == "Aceptada":
                aceptadas.append(x)
        return json.dumps([ob.__dict__ for ob in aceptadas])

    def buscarcitas(self, usuario):
        for x in self.citas:
            if x.USpaciente == usuario:
                return x.__dict__
        return False

    #COMPRAS
    def buscaremedio(self,nRemedio):
        for x in self.remedios:
            if x.nRemedio == nRemedio:
                self.compras.append(x)
        return json.dumps([ob.__dict__ for ob in self.compras])

    def obtener_compras(self):
        return json.dumps([ob.__dict__ for ob in self.compras])

    def limpiar_carrito(self):
        for x in self.compras:
            self.compras.remove(x)
            return True
        return False 