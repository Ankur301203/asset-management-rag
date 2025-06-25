import os
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_community.utilities.sql_database import SQLDatabase
from langchain_community.agent_toolkits.sql.base import create_sql_agent
from langchain_community.agent_toolkits.sql.base import SQLDatabaseToolkit

from langchain.chains import RetrievalQA
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.docstore.document import Document

from backend.db_connectors import get_mysql_connection, get_mongo_collection

# Load environment
load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")

if not groq_api_key:
    raise ValueError("GROQ_API_KEY not found in .env file")

# Instantiate LLM from Groq
llm = ChatGroq(temperature=0, groq_api_key=groq_api_key, model_name="llama3-70b-8192")


# MySQL connection and agent
sql_connection = get_mysql_connection()
db = SQLDatabase.from_uri("mysql+mysqlconnector://root:ankur@localhost/valuefy")
toolkit = SQLDatabaseToolkit(db=db, llm=llm)
sql_agent = create_sql_agent(llm=llm, toolkit=toolkit, verbose=True)

# MongoDB connection and retriever setup
collection = get_mongo_collection()
docs = []

# Convert Mongo documents to LangChain format
for doc in collection.find():
    if doc:
        content = "\n".join(f"{k}: {v}" for k, v in doc.items())
        docs.append(Document(page_content=content))

# If no documents found
if not docs:
    raise ValueError("No documents found in MongoDB collection!")

# Embedding and vector index
embedding = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vectorstore = FAISS.from_documents(docs, embedding)
retriever_chain = RetrievalQA.from_chain_type(llm=llm, retriever=vectorstore.as_retriever())

# Query handler
def handle_query(query: str) -> str:
    query_lower = query.lower()
    try:
        if any(word in query_lower for word in ["portfolio", "transaction", "manager", "value", "amount", "stock"]):
            return sql_agent.run(query)
        else:
            return retriever_chain.run(query)
    except Exception as e:
        return f"Error: {e}"
