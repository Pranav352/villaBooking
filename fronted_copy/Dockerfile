FROM node:20-slim

WORKDIR /app

# Install dependencies
# Copying package.json first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy project
COPY . .

# Expose port (Vite default)
EXPOSE 5173

# Start command (Dev mode with host flag)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
