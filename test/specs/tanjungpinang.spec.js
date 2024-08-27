const TanjungPinangPage = require('../pageobjects/tanjungpinang.page');
const { saveScreenshot } = require('../helpers/screenshotHelper');

// Global setup and teardown
before(async () => {
    console.log('Global setup...');
    // Add any global setup code here if needed
});

after(async () => {
    console.log('Global teardown...');
    // Add any global teardown code here if needed
});

describe('Tanjung Pinang Page Tests', () => {

    describe('Select Tanjung Pinang and take a screenshot', () => {

        before(async () => {
            console.log('Setup for selecting Tanjung Pinang...');
            // Add specific setup for this test here
            await saveScreenshot(`screenshots/selectTanjungPinang/setup/${Date.now()}.png`);
        });

        after(async () => {
            console.log('Teardown for selecting Tanjung Pinang...');
            // Add specific teardown for this test here
            await saveScreenshot(`screenshots/selectTanjungPinang/teardown/${Date.now()}.png`);
        });

        it('should select Tanjung Pinang and take a screenshot', async () => {
            await TanjungPinangPage.selectTanjungPinang();
        });
    });

    describe('Search and select Tanjung Pinang', () => {

        before(async () => {
            console.log('Setup for searching and selecting Tanjung Pinang...');
            // Add specific setup for this test here
            await saveScreenshot(`screenshots/searchTanjungPinang/setup/${Date.now()}.png`);
        });

        after(async () => {
            console.log('Teardown for searching and selecting Tanjung Pinang...');
            // Add specific teardown for this test here
            await saveScreenshot(`screenshots/searchTanjungPinang/teardown/${Date.now()}.png`);
        });

        it('should search and select Tanjung Pinang', async () => {
            await TanjungPinangPage.selectDeparture();
            await TanjungPinangPage.searchForTanjungPinang();
        });
    });

    describe('Search and select Galang', () => {

        before(async () => {
            console.log('Setup for searching and selecting Galang...');
            // Add specific setup for this test here
            await saveScreenshot(`screenshots/searchGalang/setup/${Date.now()}.png`);
        });

        after(async () => {
            console.log('Teardown for searching and selecting Galang...');
            // Add specific teardown for this test here
            await saveScreenshot(`screenshots/searchGalang/teardown/${Date.now()}.png`);
        });

        it('should search and select Galang', async () => {
            await TanjungPinangPage.selectTujuan();
            await TanjungPinangPage.searchForGalang();
        });
    });

    describe('Select Pilih Penumpang', () => {

        before(async () => {
            console.log('Setup for selecting Pilih Penumpang...');
            // Add specific setup for this test here
            await saveScreenshot(`screenshots/selectPilihPenumpang/setup/${Date.now()}.png`);
        });

        after(async () => {
            console.log('Teardown for selecting Pilih Penumpang...');
            // Add specific teardown for this test here
            await saveScreenshot(`screenshots/selectPilihPenumpang/teardown/${Date.now()}.png`);
        });

        it('should select Pilih Penumpang', async () => {
            await TanjungPinangPage.selectPilihPenumpang();
            await TanjungPinangPage.managePassengers();
            await TanjungPinangPage.selectTambahkanPenumpang();
        });
    });

    describe('Pilih tanggal', () => {

        before(async () => {
            console.log('Setup for memilih tanggal...');
            // Add specific setup for this test here
            await saveScreenshot(`screenshots/pilihTanggal/setup/${Date.now()}.png`);
        });

        after(async () => {
            console.log('Teardown for memilih tanggal...');
            // Add specific teardown for this test here
            await saveScreenshot(`screenshots/pilihTanggal/teardown/${Date.now()}.png`);
        });

        it('should pilih tanggal', async () => {
            await TanjungPinangPage.selectTanggal();
        });
    });

    describe('Scroll and search pelayaran', () => {

        before(async () => {
            console.log('Setup for scroll and search pelayaran...');
            // Add specific setup for this test here
            await saveScreenshot(`screenshots/scrollSearchPelayaran/setup/${Date.now()}.png`);
        });

        after(async () => {
            console.log('Teardown for scroll and search pelayaran...');
            // Add specific teardown for this test here
            await saveScreenshot(`screenshots/scrollSearchPelayaran/teardown/${Date.now()}.png`);
        });

        it('should scroll and search pelayaran', async () => {
            await TanjungPinangPage.searchPelayaran();
        });
    });

    describe('Edit Pelayaran', () => {

        before(async () => {
            console.log('Setup for editing pelayaran...');
            // Add specific setup for this test here
            await saveScreenshot(`screenshots/editPelayaran/setup/${Date.now()}.png`);
        });

        after(async () => {
            console.log('Teardown for editing pelayaran...');
            // Add specific teardown for this test here
            await saveScreenshot(`screenshots/editPelayaran/teardown/${Date.now()}.png`);
        });

        it('should edit pelayaran', async () => {
            await global.browser.pause(3000);
            await TanjungPinangPage.selectEditPelayaran();
        });

        it('should edit departure', async () => {
            await TanjungPinangPage.selectEditDeparture();
            await TanjungPinangPage.searchForTanjung();
        });

        it('should edit arrival', async () => {
            await TanjungPinangPage.selectEditArrival();
            await TanjungPinangPage.searchForSebaik();
        });

        it('should edit penumpang', async () => {
            await TanjungPinangPage.selectEditPenumpang();
            await TanjungPinangPage.editPassengers();
            await TanjungPinangPage.selectTambahkanPenumpang();
        });

        it('should edit tanggal', async () => {
            await TanjungPinangPage.selectEditTanggal();
        });

        it('should scroll and search pelayaran', async () => {
            await TanjungPinangPage.searchPelayaran();
        });

        it('should go back to home', async () => {
            await global.browser.pause(3000);
            await TanjungPinangPage.selectButtonBack();
            await global.browser.pause(3000);
            await TanjungPinangPage.selectButtonBack();
        });
    });
});
