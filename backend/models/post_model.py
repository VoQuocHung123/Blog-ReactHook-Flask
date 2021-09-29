class Post:
    def __init__(self,id=0,author_name='',title='',body='',hinhanh=''):
        self.id = id
        self.author_name = author_name
        self.title = title
        self.body = body
        self.hinhanh=hinhanh
    def serialize(self):
        return{
            "id":self.id,
            "author_name":self.author_name,
            "title":self.title,
            "body":self.body,
            "hinhanh":self.hinhanh
        }