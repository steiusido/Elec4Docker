# 1. Use Node 22 (LTS) to meet Vite and Tailwind's requirements
FROM node:22-alpine

# 2. Set the working directory
WORKDIR /app

# 3. Copy dependency files
COPY package*.json ./

# 4. Clean install dependencies. 
# Using 'npm ci' is preferred for Docker as it's faster and 
# ensures your package-lock.json is strictly followed.
RUN npm ci

# 5. Copy the rest of your application code
COPY . .

# 6. Build the application (Vite requires a build step for production)
RUN npm run build

# 7. Expose the port
EXPOSE 3000

# 8. Start the application
CMD ["npm", "start"]