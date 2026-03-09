FROM python:3.12-slim
WORKDIR /app

COPY requirements.txt ./
RUN apt-get update && apt-get install -y gdal-bin libgdal-dev && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

EXPOSE 4011
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "4011"]
