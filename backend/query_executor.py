# from backend.db_connectors import get_mysql_connection, get_mongo_collection

# def run_mysql_query(query: str) -> str:
#     conn = get_mysql_connection()
#     cursor = conn.cursor()
#     cursor.execute(query)
#     rows = cursor.fetchall()
#     cursor.close()
#     conn.close()
#     return str(rows)

# def run_mongo_query(query: str) -> str:
#     collection = get_mongo_collection()
#     # just returning dummy for now, implement NLP parsing later
#     return "MongoDB result based on: " + query
