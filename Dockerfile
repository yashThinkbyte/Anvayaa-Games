# Step 1: Use an official Node.js image as the base image
FROM node:16-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the React application
RUN npm run build

# Step 7: Use a lightweight HTTP server to serve the React app
# Install 'serve' package globally
RUN npm install -g serve

# Step 8: Expose the port on which the app will run
EXPOSE 3000

# Step 9: Command to run the app using 'serve'
CMD ["serve", "-s", "build", "-l", "3000"]
