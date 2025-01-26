# Step 1: Use a Node.js base image
FROM node:16

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the source code to the container
COPY . .

# Step 6: Expose the port your app will run on
EXPOSE 5000

# Step 7: Start the application
CMD ["node", "dist/server.js"]
