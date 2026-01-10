# Docker Instructions for FERİT News

This project has been configured to run in a Docker container using Nginx.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) must be installed on your machine.

## How to Build and Run

1.  **Open Terminal** in this directory.

2.  **Build the Docker Image**:
    ```bash
    docker build -t ferit-news .
    ```

3.  **Run the Container**:
    ```bash
    docker run -d -p 8080:80 ferit-news
    ```

4.  **Access the Site**:
    Open your browser and navigate to: [http://localhost:8080](http://localhost:8080)

## Commands

- `docker ps`: View running containers.
- `docker stop <container_id>`: Stop a running container.
