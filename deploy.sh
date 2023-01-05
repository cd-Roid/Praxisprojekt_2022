#!/bin/bash

echo "Deploying to production..."
sudo git pull

echo "Building application..."
sudo docker compose -f "docker-compose.prod.yml" up -d --build         