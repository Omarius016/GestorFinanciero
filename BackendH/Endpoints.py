from mysql_connection import register_user, user_exists_in_db, get_user_and_password, update_password, delete_user
from fastapi import FastAPI, Depends, HTTPException, status, Form
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone

app = FastAPI() #Definir la app

SECRET_KEY = "test"
ALGORITHM = "HS256" #Algoritmo a usar, de los mas comunes
ACCESS_TOKEN_DURATION = 1440  # en minutos osea 1 dia

#Estandar de autenticacion
oauth2 = OAuth2PasswordBearer(tokenUrl="login")

class User(BaseModel):
    username: str
    email: str
    disabled: bool

class UserInDB(User):
    password: str

# Contexto de encriptación
crypt = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        #expire = datetime.utcnow() + expires_delta
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        #expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_DURATION)
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_DURATION)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

#Verificar y recuperar info del usuario actual a partir del token
async def get_current_user(token: str = Depends(oauth2)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        #Decodificar el token a partir de la llave secreta y el algoritmo
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        #Extrae el nombre de usuario del payload del tokensito
        username: str = payload.get("sub")
        #Si el username no esta en el token da error de credenciales
        if username is None:
            raise credentials_exception
        #Aqui obtiene info del usuario desde la BD
        user = get_user_and_password(username)
        #Si el usuario no existe en la BD manda a error
        if user is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return user
#------------------------------------------------------------------------------------------------
#Ruta para registrar nuevos usuarios
@app.post("/register")
async def register_user_endpoint(
        username: str = Form(...),
        email: str = Form(...),
        password: str = Form(...)):
    
    #Verificar si el usuario ya existe
    if user_exists_in_db(username):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
    
    #Encriptar el password antes de guardarlo
    hashed_password = crypt.hash(password)

    # Intentar registrar el usuario
    success = register_user(username, email, hashed_password)
    if success:
        return {"message": "User registered successfully"}
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists or an error occurred")
#------------------------------------------------------------------------------------------------
@app.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    # Get user and encrypted password from database
    user_data = get_user_and_password(form.username)

    if not user_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User does not exist")
    
    # Verify password
    if not crypt.verify(form.password, user_data["password"]):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect password")
    
    # Set token expiration time
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_DURATION)
    
    # Create access token
    access_token = create_access_token(data={"sub": form.username}, expires_delta=access_token_expires)
    
    # Return access token and token type
    return {"access_token": access_token, "token_type": "bearer"}  
#------------------------------------------------------------------------------------------------
@app.get("/users/me") #Sin autorizacion, no pasas padrino ENDPOINT PROTEGIDO
async def read_users_me(user: User = Depends(get_current_user)):
    return user
#------------------------------------------------------------------------------------------------
@app.put("/users/change_password")
async def change_password(
    old_password: str = Form(...),
    new_password: str = Form(...),
    user: dict = Depends(get_current_user)
):
    # Verify current password
    if not crypt.verify(old_password, user["password"]):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Current password is incorrect")
    
    # Encrypt new password
    new_password_hash = crypt.hash(new_password)

    # Update password in database
    if not update_password(user["username"], new_password_hash):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not update password"
        )
    
    return {"message": "Password updated successfully"}
#------------------------------------------------------------------------------------------------
@app.delete("/users/delete_account")
async def delete_account(user: dict = Depends(get_current_user)):
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    if delete_user(user["username"]):
        return {"message": "User account successfully deleted"}
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error deleting account")
#------------------------------------------------------------------------------------------------