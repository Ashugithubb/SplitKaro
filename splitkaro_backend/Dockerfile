# Use official Node image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and lock file first (layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your source code
COPY . .

# Build the application
RUN npm run build

# Expose port (same as in main.ts)
EXPOSE 3001

# Start the app
CMD ["node", "dist/main.js"]
