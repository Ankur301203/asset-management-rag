from pymongo import MongoClient
import mysql.connector

# MongoDB connection
def get_mongo_collection():
    client = MongoClient("mongodb://localhost:27017/")
    db = client["valuefy"]
    collection = db["knowledge_db"]
    return collection

# MySQL connection
def get_mysql_connection():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="ankur",
        database="valuefy"
    )
    return conn
