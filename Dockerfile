# Use an official Node.js runtime as a parent image for the build stage
FROM node:16 AS build

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies for building the application
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the NestJS application
RUN npm run build

# Use a smaller Node.js base image for the production stage
FROM node:16-alpine AS production

# Set the working directory to /app
WORKDIR /app

# Copy the built application files from the build stage to the working directory
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install --production

COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Expose port 3000 for the application to listen on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
