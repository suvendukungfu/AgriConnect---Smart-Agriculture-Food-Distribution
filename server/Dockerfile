FROM node:18-alpine

WORKDIR /app

# Copy package files first for Docker layer caching
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy application code
COPY . .

EXPOSE 5000

# Use non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S agriconnect -u 1001

USER agriconnect

CMD ["node", "app.js"]
