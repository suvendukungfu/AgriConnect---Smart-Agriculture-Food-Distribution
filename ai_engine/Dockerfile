# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy requirements file first (leverage Docker layering/caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . .

# Expose port 8000
EXPOSE 8000

# Command to run the application using Gunicorn for production scalability
# 4 workers typically recommended for most use cases
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
