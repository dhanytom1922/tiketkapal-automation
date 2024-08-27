const BatamPage = require('../pageobjects/batam.page');
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

describe('Batam Page Tests', () => {

    describe('Select Batam and take a screenshot', () => {

        before(async () => {
            console.log('Setup for selecting Batam...');
            // Add specific setup for this test here
            await saveScreenshot(`screenshots/selectBatam/setup/${Date.now()}.png`);
        });

        after(async () => {
            console.log('Teardown for selecting Batam...');
            // Add specific teardown for this test here
            await saveScreenshot(`screenshots/selectBatam/teardown/${Date.now()}.png`);
        });

        it('should select Batam and take a screenshot', async () => {
            await BatamPage.selectBatam();
        });
    });

    // describe('Search and select Sekupang', () => {

    //     before(async () => {
    //         console.log('Setup for searching Sekupang...');
    //         // Add specific setup for this test here
    //         await saveScreenshot(`screenshots/searchSekupang/setup/${Date.now()}.png`);
    //     });

    //     after(async () => {
    //         console.log('Teardown for searching Sekupang...');
    //         // Add specific teardown for this test here
    //         await saveScreenshot(`screenshots/searchSekupang/teardown/${Date.now()}.png`);
    //     });

    //     it('should search and select Sekupang', async () => {
    //         await BatamPage.selectDeparture();
    //         await BatamPage.searchForSekupang();
    //     });
    // });

    // describe('Search and select Moro', () => {

    //     before(async () => {
    //         console.log('Setup for searching Moro...');
    //         // Add specific setup for this test here
    //         await saveScreenshot(`screenshots/searchMoro/setup/${Date.now()}.png`);
    //     });

    //     after(async () => {
    //         console.log('Teardown for searching Moro...');
    //         // Add specific teardown for this test here
    //         await saveScreenshot(`screenshots/searchMoro/teardown/${Date.now()}.png`);
    //     });

    //     it('should search and select Moro', async () => {
    //         await BatamPage.selectTujuan();
    //         await BatamPage.searchForMoro();
    //     });
    // });

    // describe('Select Pilih Penumpang', () => {

    //     before(async () => {
    //         console.log('Setup for selecting Pilih Penumpang...');
    //         // Add specific setup for this test here
    //         await saveScreenshot(`screenshots/selectPilihPenumpang/setup/${Date.now()}.png`);
    //     });

    //     after(async () => {
    //         console.log('Teardown for selecting Pilih Penumpang...');
    //         // Add specific teardown for this test here
    //         await saveScreenshot(`screenshots/selectPilihPenumpang/teardown/${Date.now()}.png`);
    //     });

    //     it('should select Pilih Penumpang', async () => {
    //         await BatamPage.selectPilihPenumpang();
    //         await BatamPage.managePassengers();
    //         await BatamPage.selectTambahkanPenumpang();
    //     });
    // });

    // describe('Pilih tanggal', () => {

    //     before(async () => {
    //         console.log('Setup for memilih tanggal...');
    //         // Add specific setup for this test here
    //         await saveScreenshot(`screenshots/pilihTanggal/setup/${Date.now()}.png`);
    //     });

    //     after(async () => {
    //         console.log('Teardown for memilih tanggal...');
    //         // Add specific teardown for this test here
    //         await saveScreenshot(`screenshots/pilihTanggal/teardown/${Date.now()}.png`);
    //     });

    //     it('should pilih tanggal', async () => {
    //         await BatamPage.selectTanggal();
    //     });
    // });

    // describe('Scroll and search pelayaran', () => {

    //     before(async () => {
    //         console.log('Setup for scroll and search pelayaran...');
    //         // Add specific setup for this test here
    //         await saveScreenshot(`screenshots/scrollSearchPelayaran/setup/${Date.now()}.png`);
    //     });

    //     after(async () => {
    //         console.log('Teardown for scroll and search pelayaran...');
    //         // Add specific teardown for this test here
    //         await saveScreenshot(`screenshots/scrollSearchPelayaran/teardown/${Date.now()}.png`);
    //     });

    //     it('should scroll and search pelayaran', async () => {
    //         await BatamPage.searchPelayaran();
    //     });
    // });

    // describe('Edit Pelayaran', () => {

    //     before(async () => {
    //         console.log('Setup for editing pelayaran...');
    //         // Add specific setup for this test here
    //         await saveScreenshot(`screenshots/editPelayaran/setup/${Date.now()}.png`);
    //     });

    //     after(async () => {
    //         console.log('Teardown for editing pelayaran...');
    //         // Add specific teardown for this test here
    //         await saveScreenshot(`screenshots/editPelayaran/teardown/${Date.now()}.png`);
    //     });

    //     it('should edit pelayaran', async () => {
    //         await global.browser.pause(3000);
    //         await BatamPage.selectEditPelayaran();
    //     });

    //     it('should edit departure', async () => {
    //         await BatamPage.selectEditDeparture();
    //         await BatamPage.searchForPunggur();
    //     });

    //     it('should edit arrival', async () => {
    //         await BatamPage.selectEditArrival();
    //         await BatamPage.searchForTanjungPinang();
    //     });

    //     it('should edit penumpang', async () => {
    //         await BatamPage.selectEditPenumpang();
    //         await BatamPage.editPassengers();
    //         await BatamPage.selectTambahkanPenumpang();
    //     });

    //     it('should edit tanggal', async () => {
    //         await BatamPage.selectEditTanggal();
    //     });

    //     it('should scroll and search pelayaran', async () => {
    //         await BatamPage.searchPelayaran();
    //     });

    //     it('should go back to home', async () => {
    //         await global.browser.pause(3000);
    //         await BatamPage.selectButtonBack();
    //         await global.browser.pause(3000);
    //         await BatamPage.selectButtonBack();
    //     });
    // });
});
