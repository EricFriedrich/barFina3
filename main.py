from db import BaseDatos

def mostrar_menu():
    print("\n--- Menú ---")
    alimentos = base_datos.listar_menu('alimento')
    bebidas = base_datos.listar_menu('bebida')

    print("Alimentos:")
    for producto in alimentos:
        print(f"{producto['nombre']} - ${producto['precio']}")

    print("\nBebidas:")
    for producto in bebidas:
        print(f"{producto['nombre']} - ${producto['precio']}")

def mostrar_mesas():
    print("\n--- Mesas ---")
    for mesa in base_datos.listar_mesas():
        print(f"Mesa {mesa['numero']}: Capacidad {mesa['capacidad']}, Estado {mesa['estado']}")

def reservar_mesa():
    numero_mesa = input("Ingrese el número de mesa a reservar: ")
    base_datos.reservar_mesa(numero_mesa)

def liberar_mesa():
    numero_mesa = input("Ingrese el número de mesa a liberar: ")
    base_datos.liberar_mesa(numero_mesa)


def insertar_producto_menu():
    nombre = input("Ingrese el nombre del nuevo producto: ")
    precio = float(input("Ingrese el precio del nuevo producto: "))
    categoria = input("Ingrese la categoría del nuevo producto (alimento/bebida): ")
    base_datos.insertar_producto_menu(nombre, precio, categoria)
    print("Producto agregado al menú correctamente.")

def modificar_producto_menu():
    nombre_antiguo = input("Ingrese el nombre del producto a modificar: ")
    nombre_nuevo = input("Ingrese el nuevo nombre del producto: ")
    precio_nuevo = float(input("Ingrese el nuevo precio del producto: "))
    categoria = input("Ingrese la categoría del producto (alimento/bebida): ")
    base_datos.modificar_producto_menu(nombre_antiguo, nombre_nuevo, precio_nuevo, categoria)
    print("Producto modificado en el menú correctamente.")

if __name__ == "__main__":
    url_base_datos = 'mongodb+srv://efriper:Abc123@barcillo.hr3xztk.mongodb.net/'
    nombre_base_datos = 'bar'
    base_datos = BaseDatos(url_base_datos, nombre_base_datos)

    while True:
        print("\n--- Aplicación de Gestión de Bar ---")
        print("1. Mostrar menú")
        print("2. Mostrar mesas")
        print("3. Reservar mesa")
        print("4. Liberar mesa")
        print("6. Insertar producto en el menú")
        print("7. Modificar producto en el menú")
        print("8. Salir")
        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            mostrar_menu()
        elif opcion == "2":
            mostrar_mesas()
        elif opcion == "3":
            reservar_mesa()
        elif opcion == "4":
            liberar_mesa()
        elif opcion == "6":
            insertar_producto_menu()
        elif opcion == "7":
            modificar_producto_menu()
        elif opcion == "8":
            print("Saliendo del programa.")
            break
        else:
            print("Opción no válida. Por favor, seleccione una opción válida.")

    base_datos.cerrar_conexion()
