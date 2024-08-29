const { join } = require('path');

exports.config = {
    runner: 'local',
    maxInstances: 1,
    port: 4723,
    path: '/',
    specs: [
        './test/specs/**/*.js'
    ],
    capabilities: [{
        maxInstances: 1,
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:platformVersion': '10',
        'appium:deviceName': 'emulator-5554',
        'appium:app': '/Users/achmaddhany/Documents/MKP/E-TICKETING/PublicServiceAndTransport/tiketkapal-v1.0.5/tiketkapal-v1.0.5.apk',
        'appium:noReset': true,
        'appium:newCommandTimeout': 120000,
        'appium:udid': 'emulator-5554',
        
        // Tambahan
        'appium:avdLaunchTimeout': 300000, // Timeout tambahan untuk launching AVD
        'appium:appWaitDuration': 50000, // Waktu tunggu tambahan saat menunggu aplikasi aktif
        'appium:avdReadyTimeout': 300000, // Waktu tunggu tambahan hingga emulator siap
        'appium:skipDeviceInitialization': false, // Untuk performa lebih baik, tetap inisialisasi
        'appium:skipServerInstallation': false, // Pastikan server di-install setiap kali
        
        'appium:autoGrantPermissions': true, // Otomatis berikan semua permissions ke aplikasi
        'appium:ignoreHiddenApiPolicyError': true, // Mengabaikan error kebijakan API tersembunyi
    }],
    
    logLevel: 'info',
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    services: ['appium'],
    appium: {
        command: 'appium',
        args: {
           // Sesuaikan host dan port untuk emulator lokal
            address: '127.0.0.1',
            port: 4723,
        },
},

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    screenshotPath: './screenshots',
    onPrepare: function (config, capabilities) {
        // Implementasi jika ada
    },
    onComplete: function () {
        // Implementasi jika ada
    }
};
