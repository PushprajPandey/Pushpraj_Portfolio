FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Seed the database on first run
RUN python seed_resume.py

EXPOSE 8000

CMD ["python", "main.py"]
