name: CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '14'

      - name: Install dependencies
        run: |
          npm install
          npm install -g appium webdriverio

      - name: Download APK
        run: |
          curl -L -o app.apk https://github.com/dhanytom1922/tiketkapal-automation/releases/download/automation/tiketkapal-v1.0.5.apk

      - name: Set up Android SDK
        run: |
          sudo apt-get update
          sudo apt-get install -y openjdk-11-jdk wget unzip
          mkdir -p $HOME/android-sdk/cmdline-tools
          cd $HOME/android-sdk/cmdline-tools
          wget https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip
          unzip commandlinetools-linux-8512546_latest.zip
          mkdir -p $HOME/android-sdk/cmdline-tools/latest
          mv cmdline-tools/* $HOME/android-sdk/cmdline-tools/latest
          yes | $HOME/android-sdk/cmdline-tools/latest/bin/sdkmanager --licenses
          $HOME/android-sdk/cmdline-tools/latest/bin/sdkmanager "platforms;android-30" "system-images;android-30;google_apis;x86" "emulator" "platform-tools"

      - name: Set up environment variables
        run: |
          echo "ANDROID_HOME=$HOME/android-sdk" >> $GITHUB_ENV
          echo "ANDROID_SDK_ROOT=$HOME/android-sdk" >> $GITHUB_ENV
          echo "PATH=$PATH:$HOME/android-sdk/emulator:$HOME/android-sdk/platform-tools:$HOME/android-sdk/cmdline-tools/latest/bin" >> $GITHUB_ENV

      - name: Create and Start Emulator
        run: |
          echo no | $HOME/android-sdk/cmdline-tools/latest/bin/avdmanager create avd -n test -k "system-images;android-30;google_apis;x86" --force
          emulator -avd test -noaudio -no-boot-anim -no-snapshot -no-skin -no-window &
          adb wait-for-device
          adb shell input keyevent 82
          adb shell pm grant com.example.yourapp android.permission.WRITE_EXTERNAL_STORAGE
          adb shell pm grant com.example.yourapp android.permission.READ_EXTERNAL_STORAGE

      - name: Run tests
        run: |
          npx wdio run ./wdio.conf.js
