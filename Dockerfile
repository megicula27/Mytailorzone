# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables (optional, override these in docker-compose.yml)
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]