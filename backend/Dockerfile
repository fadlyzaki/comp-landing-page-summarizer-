FROM python:3.11-slim

WORKDIR /app

# Install system dependencies for lxml
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libxml2-dev \
    libxslt1-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port (Cloud Run sets PORT env var)
EXPOSE 8080

# Run the ADK API server
CMD ["sh", "-c", "adk api_server agents --host 0.0.0.0 --port ${PORT:-8080} --allow_origins='*'"]
