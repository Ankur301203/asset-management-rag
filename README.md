# Asset Management RAG

Wealth portfolio assistant for film stars and sports personalities managing 100+ crore investments. Built using **LangChain**, **MongoDB**, **MySQL**, and **FastAPI**, integrated with **Groq LLMs** for intelligent insights and answers.

---

## Features

* Ask natural language queries about client portfolios and transactions
* Hybrid retrieval: SQL Agent (MySQL) + Document Retriever (MongoDB)
* LLM-powered insights using Groq + LangChain
* Uses `llama3-70b-8192` model from Groq API for lightning-fast responses
* Swagger UI and Postman support for easy API interaction

---

## Project Structure

```
asset-management-rag/
│
├── backend/
│   ├── main.py
│   ├── langchain_agent.py       
│   ├── db_connectors.py         
│
├── .env                         
├── .env.example                
├── requirements.txt             
├── README.md                    
```

---

## Environment Variables

Copy `.env.example` and update it with your credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```env
MONGO_URI=mongodb://localhost:27017/valuefy
GROQ_API_KEY=your_groq_api_key_here
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=valuefy
```

---

## Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/your-username/asset-management-rag.git
cd asset-management-rag
python -m venv venv
venv\Scripts\activate       # On Windows
# source venv/bin/activate  # On Linux/macOS

pip install -r requirements.txt
```

### 2. Start the FastAPI Server

```bash
uvicorn backend.main:app --reload
```

Runs at: [http://127.0.0.1:8000](http://127.0.0.1:8000)
Docs at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## API Usage

### Endpoint

```http
POST /ask
```

### Request Body

```json
{
  "query": "What is the total portfolio value of Ankur Kumar?"
}
```

### Response

```json
{
  "response": "The total portfolio value of Ankur Kumar is ₹10.5 crores."
}
```

---

## How It Works

### Hybrid Retrieval:

| Source  | Powered By                     | Use Case Example                               |
| ------- | ------------------------------ | ---------------------------------------------- |
| MySQL   | LangChain SQL Agent            | "Give me the top 5 clients by portfolio value" |
| MongoDB | FAISS + HuggingFace Embeddings | "What is the risk appetite of Alia Bhatt?"     |

LLM: `llama3-70b-8192` via [Groq API](https://console.groq.com)

---

## Sample Queries to Try

```bash
# MySQL Powered
- What is the total portfolio value of Ankur Kumar?
- What are the top five portfolios of our wealth members?
- Give me the breakup of portfolio values per relationship manager.

# MongoDB Powered
- What is the risk appetite of MS Dhoni?
- What are Mukesh Ambani’s investment preferences?
```

---

## Testing with Postman

1. Open Postman and create a `POST` request:

   ```
   http://localhost:8000/ask
   ```

2. Under `Body` → `raw` → `JSON`:

```json
{
  "query": "What is the total exposure to Axis across all clients?"
}
```

3. Send & receive the intelligent response 🎯

---

## Deployment

You can deploy this with:

* **Render** / **Railway** / **Vercel** (for backend)
* Ensure `.env` variables are correctly configured on the platform

---

## Tech Stack

| Tool            | Usage                            |
| --------------- | -------------------------------- |
| **FastAPI**     | Backend API                      |
| **LangChain**   | Agent + Retrieval logic          |
| **Groq**        | LLM provider                     |
| **MySQL**       | Structured transaction data      |
| **MongoDB**     | Unstructured client profile data |
| **FAISS**       | Vector similarity for retrieval  |
| **HuggingFace** | Text embedding model             |

---

