# Use an official Node.js image as a base image
FROM node:21.1.0-alpine

# Set the working directory
WORKDIR /app
 
# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install project dependencies
RUN npm install

# Copy the remaining application code
COPY . .

# Expose the port your Vite app runs on (default is 3000 but its using 5173)
#EXPOSE 5173

# Start the Vite application
CMD ["npm", "run", "dev"]
 