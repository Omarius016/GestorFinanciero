import  mysql.connector

#Conectar a la base de datos
def get_connection():
    connection = mysql.connector.connect(
        user='root',
        password='admin123',
        host='localhost',
        database='FINANZASPERSONALES',
        port='3306')
    return connection


#Registrar usuario
def register_user(username, email, password):
    connection = get_connection()
    cursor = connection.cursor()

    # Checar si el usuario ya existe
    cursor.execute("SELECT * FROM users_db WHERE email = %s", (email,))
    if cursor.fetchone():
        cursor.close()
        connection.close()
        return False

    # Insertar nuevo usuario
    sql = """
        INSERT INTO users_db 
        (username, email, password, created_at, updated_at) 
        VALUES (%s, %s, %s, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    """
    values = (username, email, password)

    cursor.execute(sql, values)
    connection.commit()

    cursor.close()
    connection.close()
    return True

#Checar si el usuario existe en la base de datos
def user_exists_in_db(username: str) -> bool:
    connection = get_connection()
    cursor = connection.cursor()

    # Checar si el usuario existe por nombre de usuario
    cursor.execute("SELECT * FROM users_db WHERE username = %s", (username,))
    exists = cursor.fetchone() is not None

    cursor.close()
    connection.close()
    return exists

#Obtener usuario y contraseña
def get_user_and_password(username: str):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT username, password FROM users_db WHERE username = %s", (username,))
    result = cursor.fetchone()

    cursor.close()
    connection.close()

    if result:
        return {"username": result[0], "password": result[1]}  # Returns a dictionary with user and encrypted password
    else:
        return None

 
def update_password(username: str, new_password: str) -> bool:
    connection = get_connection()
    cursor = connection.cursor()
    
    # Actualizar la contraseña en la base de datos
    cursor.execute("UPDATE users_db SET password = %s WHERE username = %s", (new_password, username))
    connection.commit()
    
    cursor.close()
    connection.close()
    
    return cursor.rowcount > 0

#Eliminar usuario
def delete_user(username: str) -> bool:
    connection = get_connection()  
    cursor = connection.cursor()

    try:
        # Eliminar usuario de la base de datos
        query = "DELETE FROM users_db WHERE username = %s"
        cursor.execute(query, (username,))
        connection.commit()  # Confirmar eliminación

        # Checar si se eliminó alguna fila
        affected_rows = cursor.rowcount

        cursor.close()
        connection.close()

        # Si se eliminó al menos una fila, devolver True
        return affected_rows > 0
    except Exception as e:
        print(f"Error deleting user: {e}")
        return False

# Cerrar la conexión al final
# Ejemplo de uso
if __name__ == "__main__":
    # Verificar si la conexión es exitosa
    connection = get_connection()
    if connection.is_connected():
        print("Successfully connected to database")
    connection.close()

    # Llamar a la función register_user para probar
    success = register_user("new_user", "user@example.com", "password123")
    if success:
        print("User successfully registered")
    else:
        print("User already exists or an error occurred")
