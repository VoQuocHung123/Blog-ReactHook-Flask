import sqlite3
from ..models import post_model
from flask.helpers import send_file
class PostAction:
    def __init__(self,db_connection):
        self.db_connection = db_connection
    def get_all(self):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = 'SELECT * FROM post'
        cursor.execute(sql)
        rows = cursor.fetchall()
        result = []
        for row in rows:
            post = post_model.Post(
                id=row[0],  
                author_name=row[1],
                title=row[2],
                body=row[3],
                hinhanh=row[4]
            )
            result.append(post.serialize())
        cursor.close()
        return result
    def get_by_id(self,id):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            SELECT * FROM post WHERE id = ?
        """
        cursor.execute(sql, (id, ))
        row = cursor.fetchone()
        if row == None:
            return 'Post not found', 404
        post = post_model.Post(
                id=row[0],  
                author_name=row[1],
                title=row[2],
                body=row[3],
                hinhanh=row[4]
            )
        return post
        
    def add(self,post:post_model.Post):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            INSERT INTO post VALUES(null,?,?,?,?)
        """
        cursor.execute(sql,(post.author_name,post.title,post.body,post.hinhanh))
        conn.commit()
        cursor.close()
        return 'Inserted successfully!'
    def delete(self,post:post_model.Post):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            DELETE FROM post WHERE id = ?
        """
        cursor.execute(sql, (post.id,))
        conn.commit()
        count = cursor.rowcount
        cursor.close()
        if count == 0:
            return 'Customer not found', 404
        return 'Deleted successfully', 200
    def update(self,id:int,post:post_model.Post):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
            UPDATE post
            SET author_name = ?, title = ?, body = ? ,hinhanh = ?
            WHERE id = ?
        """
        cursor.execute(sql, (post.author_name, post.title,post.body,post.hinhanh, id))
        conn.commit()
        n = cursor.rowcount
        cursor.close()
        if n == 0:
            return 'Customer not found', 404
        return 'Updated successfully', 200

    def LayAnh(self,id:int):
        conn =sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql ="""
        SELECT hinhanh FROM post WHERE id = ?
        """
        cursor.execute(sql,(id,))    
        row = cursor.fetchone()
        cursor.close()
        if row == None:
            return 'Sai ID thẻ ',404
        hinhanh = row[0]
        return hinhanh
    
    def LayTenAnh(self, id: int):
        conn = sqlite3.connect(self.db_connection)
        cursor = conn.cursor()
        sql = """
        SELECT hinhanh FROM post WHERE id = ?
        """
        cursor.execute(sql, (id,))
        row = cursor.fetchone()
        cursor.close()  
        return row[8]

    
    
