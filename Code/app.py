from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

conn = mysql.connector.connect(
    host="localhost",
    user="your_username",
    password="your_password",
    database="library_db"
)
cursor = conn.cursor(dictionary=True)

@app.route('/add-book', methods=['POST'])
def add_book():
    data = request.json
    sql = "INSERT INTO books (title, author, isbn, copies, image_url) VALUES (%s, %s, %s, %s, %s)"
    cursor.execute(sql, (data['title'], data['author'], data['isbn'], data['copies'], data['image']))
    conn.commit()
    return jsonify({"status": "success", "message": "Book added"})

@app.route('/books', methods=['GET'])
def get_books():
    cursor.execute("SELECT * FROM books")
    return jsonify(cursor.fetchall())

if __name__ == '__main__':
    app.run(debug=True)
