# Use Node 18 Alpine (Lightweight)
FROM node:18-alpine

# Set directory inside the container
WORKDIR /app

# Copy package.json AND package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy the rest of the backend code
COPY . .

# Expose the internal port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]