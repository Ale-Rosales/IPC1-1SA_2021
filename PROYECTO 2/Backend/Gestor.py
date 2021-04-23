import json
from UsuarioAdmin import Admin
from UsuarioDoctor import Doctor
from UsuarioPaciente import Paciente
from UsuarioEnfermera import Enfermera
from Medicamento import Remedio

class Gestor:

    def __init__(self):
        self.admin = []
        self.doctor = []
        self.paciente = []
        self.enfermera = []
        self.admin.append(Admin("Herbet", "Reyes", "admin", "1234"))
        self.paciente.append(Paciente("Carlos","Rosales","2021-03-31","masculino","carlosr","1234","12345678"))


    #Iniciar Sesion
    def iniciar_sesion(self,user,password):
        for x in self.admin:
            if x.user==user and x.password==password:
                return json.dumps(x.__dict__)
        """for y in self.paciente:
            if y.user ==user and y.password==password:
                return json.dumps(y.__dict__)"""
        return '{"nombre":"false"}'
    
    #Registar Usuarios (Pacientes)
    def registrar_usuario(self,nPaciente,aPaciente,fPaciente,sPaciente,uPaciente,cPaciente,tPaciente):
        self.paciente.append(Paciente(nPaciente,aPaciente,fPaciente,sPaciente,uPaciente,cPaciente,tPaciente))

    def imprimir(self):
        for y in self.paciente:
            print(y.nPaciente)

    #Read Pacientes
    def obtener_usuarios(self):
        return json.dumps([ob.__dict__ for ob in self.paciente])