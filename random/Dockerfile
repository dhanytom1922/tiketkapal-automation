FROM ubuntu:20.04

# Install dependensi sistem
RUN apt-get update && \
    apt-get install -y \
    curl \
    unzip \
    openjdk-17-jdk-headless \
    && rm -rf /var/lib/apt/lists/*

# Install Android SDK
RUN mkdir -p /sdk && \
    cd /sdk && \
    curl -o commandlinetools-linux-7583922_latest.zip https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip && \
    unzip commandlinetools-linux-7583922_latest.zip && \
    rm commandlinetools-linux-7583922_latest.zip && \
    ls -R /sdk

# Set environment variables
ENV ANDROID_HOME=/sdk
ENV PATH=${ANDROID_HOME}/cmdline-tools/latest/bin:${PATH}

# Install Android SDK packages
RUN chmod +x ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager && \
    sdkmanager --update && \
    sdkmanager "platform-tools" "platforms;android-33" "emulator"

# Install Appium
RUN npm install -g appium appium-doctor @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter @wdio/appium-service allure-commandline

# Set direktori kerja
WORKDIR /app

# Salin file konfigurasi dan skrip pengujian
COPY ./wdio.conf.js /app/wdio.conf.js
COPY ./test /app/test
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

# Install dependensi proyek
RUN npm install

# Jalankan Appium dan emulator
CMD ["sh", "-c", "appium & emulator -avd test -no-audio -no-boot-anim -gpu off"]
