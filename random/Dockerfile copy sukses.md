# Use an official Node.js 22 runtime as a parent image for x86_64
FROM node:22

# Set environment variables
ENV ANDROID_HOME=/opt/android-sdk
ENV HOME=/root  
ENV PATH="${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/emulator"
ENV ANDROID_AVD_HOME=${HOME}/.android/avd

# Install dependencies
RUN apt-get update && \
    apt-get install -y \
    wget \
    unzip \
    openjdk-17-jdk \
    libc6 \
    libbz2-1.0 \
    libncurses5 \
    libstdc++6 \
    libpulse0 \
    qemu-kvm \
    libvirt-daemon-system \
    libvirt-clients \
    bridge-utils && \
    rm -rf /var/lib/apt/lists/*

# Install Android SDK
RUN mkdir -p ${ANDROID_HOME}/cmdline-tools && \
    cd ${ANDROID_HOME}/cmdline-tools && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip && \
    unzip commandlinetools-linux-8512546_latest.zip && \
    mkdir -p ${ANDROID_HOME}/cmdline-tools/latest && \
    mv cmdline-tools/* ${ANDROID_HOME}/cmdline-tools/latest

# Update SDK Manager and accept licenses
RUN ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager --update && \
    yes | ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager --licenses

# Install required platforms, system images, and emulator for x86_64
RUN ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager "platforms;android-30" "system-images;android-30;google_apis;x86_64" "emulator" "platform-tools"

# Create AVD directory and symlink
RUN mkdir -p ${ANDROID_HOME}/avd && \
    ln -s ${HOME}/.android/avd ${ANDROID_HOME}/avd

# Create and set the working directory
WORKDIR /usr/src/app

# Copy the project files
COPY . .

# Install project dependencies
RUN npm install -g appium @wdio/cli && \
    npm install

# Create Android Virtual Device (AVD) for x86_64 (avoid re-creating if already exists)
RUN echo no | ${ANDROID_HOME}/cmdline-tools/latest/bin/avdmanager create avd -n test -k "system-images;android-30;google_apis;x86_64" --force || echo "AVD already exists"

# Expose necessary ports
EXPOSE 4723

# Debug steps to check permissions and paths
RUN ls -l ${ANDROID_HOME}/emulator
RUN file ${ANDROID_HOME}/emulator/emulator || echo "File type check failed"
RUN chmod +x ${ANDROID_HOME}/emulator/emulator
RUN ${ANDROID_HOME}/emulator/emulator -version || echo "Failed to run emulator"

# Start the emulator and Appium server
CMD ["sh", "-c", "emulator -avd test -noaudio -no-boot-anim -no-snapshot -no-skin -no-window -gpu swiftshader_indirect & adb wait-for-device && adb shell input keyevent 82 && adb shell pm grant com.example.yourapp android.permission.WRITE_EXTERNAL_STORAGE && adb shell pm grant com.example.yourapp android.permission.READ_EXTERNAL_STORAGE && appium"]
