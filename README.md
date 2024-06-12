# 🌟 NestJS Modbus Application

This is a NestJS application that reads from a Modbus device at regular intervals. The application is containerized using Docker.

## Prerequisites

- 🟢 Node.js and npm
- 🐳 Docker
- 📦 Docker Compose

## Getting Started

### 🚀 Running in Development Mode

1. **Install dependencies**:

    ```bash
    npm install
    ```

2. **Start the application**:

    ```bash
    npm run start:dev
    ```

   This will start the NestJS application in watch mode. The application will be available at `http://localhost:3000`.

3. **Endpoints**:

    - Get the Modbus value: `GET http://localhost:3000/control/modbus`

### 🐳 Deploying with Docker

1. **Build the Docker image**:

    ```bash
    docker-compose build
    ```

2. **Start the Docker containers**:

    ```bash
    docker-compose up
    ```

   This will start both the NestJS application and a Modbus server container. The application will be available at `http://localhost:3000`.

3. **Stopping the Docker containers**:

    To stop the Docker containers, press `Ctrl+C` in the terminal where `docker-compose up` is running. Alternatively, you can run:

    ```bash
    docker-compose down
    ```

### 📤 Sharing the Docker Image with a Colleague

You can share the Docker image with a colleague by saving the image to a file and then having your colleague load the image on their machine.

1. **Build and tag the Docker image**:

    ```bash
    docker-compose build
    docker tag your-app:latest your-app:version
    ```

2. **Save the Docker image to a file**:

    ```bash
    docker save -o your-app-version.tar your-app:version
    ```

3. **Example**:

    ```bash
    docker-compose build
    docker tag my-nestjs-app:latest my-nestjs-app:1.0
    docker save -o my-nestjs-app-1.0.tar my-nestjs-app:1.0
    ```

4. **Share the Docker image file**:

    Share the `your-app-version.tar` file with your colleague using any file transfer method (e.g., USB drive, cloud storage).

5. **Load the Docker image on your colleague's machine**:

    Your colleague can load the Docker image using:

    ```bash
    docker load -i your-app-version.tar
    ```

6. **Run the container on your colleague's machine**:

    Ensure your colleague has the `docker-compose.yml` file. Then they can start the containers with:

    ```bash
    docker-compose up
    ```

### 🛠 Docker Configuration

#### Dockerfile

The `Dockerfile` is used to build the Docker image for the NestJS application. It includes steps to:

- Use the official Node.js image
- Set the working directory
- Copy package files and install dependencies
- Copy the rest of the application code
- Build the NestJS application
- Expose the application port
- Start the application

#### docker-compose.yml

The `docker-compose.yml` file defines the services for the application:

- **app**: The NestJS application service.
- **modbus-server**: A Modbus TCP server for testing.

### 🐛 Troubleshooting

If you encounter issues with Docker, ensure that the Docker daemon is running. You can start the Docker daemon with:

- **Linux**:

    ```bash
    sudo systemctl start docker
    ```

- **macOS and Windows**:

    Open the Docker Desktop application from the Applications or Start menu.

### 📄 License

This project is licensed under the MIT License.
