FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm install

# Copy source code
COPY . .

# Expo expects these for mobile dev
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0

EXPOSE 8081

# Starting with --tunnel is often the easiest way to connect a physical phone to a Docker container
CMD ["npx", "expo", "start", "--tunnel"]
