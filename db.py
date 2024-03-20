import pymongo

class BaseDatos:
    
    def __init__(self, url, nombre_base_datos):
        self.cliente = pymongo.MongoClient(url)
        self.db = self.cliente[nombre_base_datos]
        self.mesas_collection = self.db['mesas']
        self.menu_collection = self.db['menu']
        self.bebidas_collection = self.db['bebidas']

    def listar_mesas(self):
        return self.mesas_collection.find()
    
    def reservar_mesa(self, numero_mesa):
        mesa = self.mesas_collection.find_one({'numero': int(numero_mesa), 'estado': 'libre'})
        if mesa:
            self.mesas_collection.update_one({'numero': int(numero_mesa), 'estado': 'libre'}, {'$set': {'estado': 'reservada'}})
            print(f"Mesa {numero_mesa} reservada correctamente.")
        else:
            print(f"La mesa {numero_mesa} no está disponible para reservar.")

    def liberar_mesa(self, numero_mesa):
        mesa = self.mesas_collection.find_one({'numero': int(numero_mesa), 'estado': 'reservada'})
        if mesa:
            self.mesas_collection.update_one({'numero': int(numero_mesa), 'estado': 'reservada'}, {'$set': {'estado': 'libre'}})
            print(f"Mesa {numero_mesa} liberada correctamente.")
        else:
            print(f"La mesa {numero_mesa} no está reservada.")

    def obtener_mesa(self, numero_mesa):
        return self.mesas_collection.find_one({'numero': numero_mesa})

    def cambiar_estado_mesa(self, numero_mesa, nuevo_estado):
        self.mesas_collection.update_one({'numero': numero_mesa}, {'$set': {'estado': nuevo_estado}})

    def listar_menu(self, categoria):
        if categoria == 'alimento':
            return self.menu_collection.find({'categoria': 'alimento'})
        elif categoria == 'bebida':
            return self.bebidas_collection.find({'categoria': 'bebida'})

    def listar_bebidas(self):
        return self.bebidas_collection.find()

    def insertar_producto_menu(self, nombre, precio, categoria):
        if categoria == 'alimento':
            self.menu_collection.insert_one({'nombre': nombre, 'precio': precio, 'categoria': categoria})
        elif categoria == 'bebida':
            self.bebidas_collection.insert_one({'nombre': nombre, 'precio': precio, 'categoria': categoria})

    def modificar_producto_menu(self, nombre_antiguo, nombre_nuevo, precio_nuevo, categoria):
        if categoria == 'alimento':
            self.menu_collection.update_one({'nombre': nombre_antiguo}, {'$set': {'nombre': nombre_nuevo, 'precio': precio_nuevo}})
        elif categoria == 'bebida':
            self.bebidas_collection.update_one({'nombre': nombre_antiguo}, {'$set': {'nombre': nombre_nuevo, 'precio': precio_nuevo}})

    def cerrar_conexion(self):
        self.cliente.close()
