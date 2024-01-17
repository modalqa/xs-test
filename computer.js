const { Builder, By, Key, until } = require('selenium-webdriver');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function computerAutomation() {
  // Buat instance WebDriver
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navigasi ke halaman computer-database
    await driver.get('https://computer-database.gatling.io/computers');

    // Cari komputer berdasarkan nama "arra"
    await searchComputerByName(driver, 'arra');

    // Klik tombol "Add a new computer"
    await driver.findElement(By.id('add')).click();

    // Isi form tambah komputer dengan nama "niar"
    await addNewComputer(driver, 'niar');

    // Kembali ke halaman computer-database
    await driver.get('https://computer-database.gatling.io/computers');

    // Tunggu sebentar untuk memberikan waktu UI berubah
    await sleep(2000);

    // Klik tombol "Add a new computer" lagi
    await driver.findElement(By.id('add')).click();

    // Tunggu sebentar untuk memberikan waktu UI berubah
    await sleep(2000);

    console.log('Script completed successfully.');
  } finally {
    // Tutup browser setelah selesai
    await driver.quit();
  }
}

async function searchComputerByName(driver, name) {
  const searchInput = await driver.findElement(By.id('searchbox'));
  await searchInput.sendKeys(name, Key.RETURN);

  // Tunggu hingga tabel hasil pencarian muncul
  await driver.wait(until.elementLocated(By.css('table.computers')), 5000);

  console.log('Search by name success.');
}

async function addNewComputer(driver, name) {
  // Isi form tambah komputer
  await driver.findElement(By.id('name')).sendKeys(name);
  await driver.findElement(By.id('introduced')).sendKeys('2022-01-01');
  await driver.findElement(By.id('discontinued')).sendKeys('2023-01-01');

  // Simpan komputer baru
  await driver.findElement(By.css('input[type="submit"]')).click();

  console.log('Add computer success.');
}

// Panggil fungsi computerAutomation
computerAutomation();
