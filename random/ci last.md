name: CI Pipeline

on:
  push:
    branches:
      - main

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and Push Docker Image
        uses: docker/build-push-action@v3
        with:
          context: .
          file: Dockerfile
          push: true
          tags: achmaddhany/tiketkapal:latest

  run-tests:
    needs: build-and-push
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Pull Docker Image
        run: docker pull achmaddhany/tiketkapal:latest

      - name: Run Docker Container and Execute Tests
        run: |
          docker run --rm -v $(pwd):/app achmaddhany/tiketkapal:latest /bin/bash -c \
          "emulator -avd test -noaudio -no-boot-anim -no-snapshot -no-skin -no-window & \
          sleep 60 && adb devices && adb wait-for-device && adb shell input keyevent 82 && \
          adb shell pm grant com.example.yourapp android.permission.WRITE_EXTERNAL_STORAGE && \
          adb shell pm grant com.example.yourapp android.permission.READ_EXTERNAL_STORAGE && \
          appium & sleep 10 && npm run tom-ganteng"
