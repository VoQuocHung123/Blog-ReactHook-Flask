import sqlite3
from hashlib import md5
from ..models import user_model

class UserAction:
    def __init__(self,db_connection):
        self.db_connection = db_connection
    def login(self,user: user_model.User):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            SELECT *
            FROM tb_user
            WHERE username LIKE ? AND password LIKE ?
        """
        hashed = md5(user.password.encode()).hexdigest()
        cursor.execute(sql, (user.username, hashed))
        row = cursor.fetchone()
        if row == None:
            return 'Invalid username or password', 401
        authenticated_user = user_model.User(
            user_id=row[0],
            username=row[1],
            role=row[3]
        )
        return authenticated_user, 200
    def signup(self,user: user_model.User):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            INSERT INTO tb_user VALUES (null,?,?,?)
        """
        hashed = md5(user.password.encode()).hexdigest()
        cursor.execute(sql, (user.username,hashed,user.role))
        conn.commit()
        return "Signup Successfully"
        
