# Use Node.js official image as a base
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Ensure proto files are also copied
COPY protos /usr/src/app/dist/protos



# Expose port for gRPC communication
EXPOSE 50052

# Start the application
CMD ["npm", "run", "start:prod"]
