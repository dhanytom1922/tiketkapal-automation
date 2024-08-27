// Method to check for text changes (e.g., notification or element text)
async checkForTextChange(selector, actionFn, expectedTextChange) {
  // Ambil teks awal dari elemen yang ingin kita cek
  await waitForElement(selector);
  const initialText = await (await $(selector)).getText();

  // Lakukan aksi yang memicu perubahan teks (misalnya managePassengers)
  await actionFn();

  // Ambil teks setelah aksi dilakukan
  const newText = await (await $(selector)).getText();

  // Periksa apakah teks berubah seperti yang diharapkan
  expect(newText).to.not.equal(initialText, 'Expected text to change after action');
  
  // Jika Anda tahu teks spesifik apa yang seharusnya muncul, gunakan ini:
  if (expectedTextChange) {
      expect(newText).to.equal(expectedTextChange, `Expected text to change to: ${expectedTextChange}`);
  }
}