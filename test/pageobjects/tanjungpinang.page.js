const { saveScreenshot } = require('../helpers/screenshotHelper');
const { waitForElement } = require('../helpers/waitHelper');

class TanjungPinangPage {
  get selectors(){
    return {
      tanjungpinang: 'android=new UiSelector().description("Tanjung pinang")',
      departure: 'android=new UiSelector().className("android.view.View").instance(7)',
      searchField: '//android.widget.EditText',
      tanjungpinangResult: '//android.view.View[@content-desc="TANJUNG PINANG"]',
      tujuan: 'android=new UiSelector().className("android.view.View").instance(8)',
      galangResult: '//android.view.View[@content-desc="GALANG"]',
      pilihPenumpang: 'android=new UiSelector().className("android.view.View").instance(9)',
      tambahkanPenumpang: 'android=new UiSelector().description("Tambahkan")',
      passengers: {
        tambahDewasa: 'android=new UiSelector().className("android.widget.Button").instance(1)',
        tambahAnak: 'android=new UiSelector().className("android.widget.Button").instance(3)',
        tambahBayi: 'android=new UiSelector().className("android.widget.Button").instance(5)',
        kurangDewasa: 'android=new UiSelector().className("android.widget.Button").instance(0)',
        kurangAnak: 'android=new UiSelector().className("android.widget.Button").instance(2)',
        kurangBayi: 'android=new UiSelector().className("android.widget.Button").instance(4)',
    },
      pilihTanggal: 'android=new UiSelector().className("android.view.View").instance(10)',
      pilihHari: 'android=new UiSelector().description("28, Wednesday, August 28, 2024")',
      pilihHariOK: 'android=new UiSelector().description("OK")',
      pilihHariCancel: 'android=new UiSelector().description("CANCEL")',
      cariPelayaran: 'android=new UiSelector().description("Cari Pelayaran")',
      editPelayaran: 'android=new UiSelector().description("Ubah")',
      editDeparture: 'android=new UiSelector().text("TANJUNG PINANG")',
      tanjungResult: 'android=new UiSelector().description("TANJUNG PINANG")',
      editArrival: 'android=new UiSelector().text("GALANG")',
      sebaikResult: 'android=new UiSelector().description("SEBAIK")',
      editPenumpang: 'android=new UiSelector().className("android.view.View").instance(10)',
      editTanggal: 'android=new UiSelector().text("2024-08-28")',
      pilihEditTanggal: 'android=new UiSelector().description("30, Friday, August 30, 2024")',
      pilihEditTanggalBaru: 'android=new UiSelector().text("2024-08-28")',
      buttonBack: 'android=new UiSelector().className("android.widget.Button").instance(0)',
    };
  }

  // Helper method to perform actions and take screenshots
  async performAction(selector, action = 'click', screenshotPath = '', clickCount = 1) {
    await waitForElement(selector);
    const element = await $(selector);
    
    for (let i = 0; i < clickCount; i++) {
        await element[action]();
    }

    if (screenshotPath) {
        await saveScreenshot(screenshotPath);
    }
  }

  async selectTanjungPinang() {
    await this.performAction(this.selectors.tanjungpinang, 'click', './screenshots/selectTanjungPinang/selectTanjungPinang.png');
  }

  async selectDeparture() {
    await this.performAction(this.selectors.departure, 'click', './screenshots/dariPelabuhan/selectDeparture.png');
}

async selectTujuan() {
    await this.performAction(this.selectors.tujuan, 'click', './screenshots/kePelabuhan/selectTujuan.png');
}

async selectPilihPenumpang() {
    await this.performAction(this.selectors.pilihPenumpang, 'click', './screenshots/tambahPenumpang/selectPilihPenumpang.png');
}

// Modify Passenger Counts
async modifyPassenger(type, action = 'plus', clickCount = 1) {
    const selector = action === 'plus' 
        ? this.selectors.passengers[`tambah${type}`] 
        : this.selectors.passengers[`kurang${type}`];

    const screenshotPath = `./screenshots/tambahPenumpang/${action}${type}.png`;
    await this.performAction(selector, 'click', screenshotPath, clickCount);
}

async managePassengers() {
    await this.modifyPassenger('Dewasa', 'plus', 3);
    await this.modifyPassenger('Dewasa', 'minus', 1);
    await this.modifyPassenger('Anak', 'plus', 2);
    await this.modifyPassenger('Anak', 'minus', 1);
    await this.modifyPassenger('Bayi', 'plus', 2);
    await this.modifyPassenger('Bayi', 'minus', 1);
}

async editPassengers() {
    await this.modifyPassenger('Dewasa', 'plus', 1);
    await this.modifyPassenger('Dewasa', 'minus', 1);
    await this.modifyPassenger('Anak', 'plus', 1);
    await this.modifyPassenger('Anak', 'minus', 1);
    await this.modifyPassenger('Bayi', 'plus', 1);
    await this.modifyPassenger('Bayi', 'minus', 1);
}

async selectTambahkanPenumpang() {
    await this.performAction(this.selectors.tambahkanPenumpang, 'click', './screenshots/tambahPenumpang/selectTambahkanPenumpang.png');
}

// Search and Select Destination
async searchAndSelect(term, resultSelector, screenshotPrefix, basePath) {
    await this.performAction(this.selectors.searchField, 'click', `./screenshots/${basePath}/${screenshotPrefix}/clickSearchField.png`);
    await (await $(this.selectors.searchField)).setValue(term);
    await waitForElement(resultSelector);
    await global.browser.pause(2000);
    await global.browser.back();
    await global.browser.pause(2000);
    await saveScreenshot(`./screenshots/${basePath}/${screenshotPrefix}/type${term}.png`);
    await this.performAction(resultSelector, 'click', `./screenshots/${basePath}/${screenshotPrefix}/select${term}.png`);
}

async searchForTanjungPinang() {
    await this.searchAndSelect('tanjung pinang', this.selectors.tanjungpinangResult, 'TanjungPinang', 'dariPelabuhan');
}

async searchForGalang() {
    await this.searchAndSelect('galang', this.selectors.galangResult, 'Galang', 'kePelabuhan');
}

async selectTanggal() {
    await this.performAction(this.selectors.pilihTanggal, 'click', './screenshots/PilihTanggal/selectPilihTanggal.png');
    await this.performAction(this.selectors.pilihHariCancel, 'click', './screenshots/PilihTanggal/selectPilihHariCancel.png');
    await this.performAction(this.selectors.pilihTanggal, 'click', './screenshots/PilihTanggal/selectPilihTanggal.png');
    await this.performAction(this.selectors.pilihHari, 'click', './screenshots/PilihTanggal/selectPilihHari.png');
    await this.performAction(this.selectors.pilihHariOK, 'click', './screenshots/PilihTanggal/selectPilihHariOK.png');
}
// Scroll down method
async scrollDown() {
    await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollForward()`);  
}

async searchPelayaran() {
  await this.scrollDown();
  await this.performAction(this.selectors.cariPelayaran, 'click', './screenshots/searchPelayaran/selectSearchPelayaran.png');
}


    
async selectButtonBack() {
  await this.performAction(this.selectors.buttonBack)
}

async selectEditPelayaran() {
  await this.performAction(this.selectors.editPelayaran, 'click', './screenshots/editPenumpang/selectEditPenumpang.png');
}

async selectEditDeparture() {
  await this.performAction(this.selectors.editDeparture, 'click', './screenshots/editDeparture/selectEditDeparture.png');
}

async searchForTanjung() {
  await this.searchAndSelect('tanjung pinang', this.selectors.tanjungResult, 'TanjungPinang', 'dariPelabuhan');
}

async selectEditArrival() {
  await this.performAction(this.selectors.editArrival, 'click', './screenshots/editArrival/selectEditArrival.png');
}

async searchForSebaik() {
  await this.searchAndSelect('sebaik', this.selectors.sebaikResult, 'Sebaik', 'kePelabuhan');
}

async selectEditPenumpang() {
  await this.performAction(this.selectors.editPenumpang, 'click', './screenshots/editPenumpang/selectEditPenumpang.png');
}

async selectEditTanggal() {
  await this.performAction(this.selectors.editTanggal, 'click', './screenshots/editTanggal/selectEditTanggal.png');
  await this.performAction(this.selectors.pilihHariCancel, 'click', './screenshots/PilihTanggal/selectPilihHariCancel.png');
  await this.performAction(this.selectors.pilihEditTanggalBaru, 'click', './screenshots/PilihTanggal/selectPilihEditTanggal.png');
  await this.performAction(this.selectors.pilihEditTanggal, 'click', './screenshots/PilihTanggal/selectPilihEditTanggal.png');
  await this.performAction(this.selectors.pilihHariOK, 'click', './screenshots/PilihTanggal/selectPilihHariOK.png');
}
}



module.exports = new TanjungPinangPage();