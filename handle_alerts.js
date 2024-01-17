const { Builder, By, until } = require('selenium-webdriver');

// Fungsi untuk menangani alert
async function handleAlerts() {
  // Buat instance WebDriver
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Buka halaman web
    await driver.get('https://the-internet.herokuapp.com/javascript_alerts');

    // Uji tombol "Click for JS Alert"
    await testButton(driver, 'Click for JS Alert');

    // Tambahkan delay 2 detik
    await sleep(2000);

    // Uji tombol "Click for JS Confirm"
    await testButton(driver, 'Click for JS Confirm');

    // Tambahkan delay 2 detik
    await sleep(2000);

    // Uji tombol "Click for JS Prompt"
    await testButton(driver, 'Click for JS Prompt');
  } finally {
    // Tutup browser setelah selesai
    await driver.quit();
  }
}

// Fungsi untuk menguji tombol
async function testButton(driver, buttonText) {
  const button = await driver.findElement(By.xpath(`//button[text()="${buttonText}"]`));

  // Klik tombol
  await button.click();

  // Tunggu hingga alert muncul
  await driver.wait(until.alertIsPresent());

  // Ambil instance alert
  const alert = await driver.switchTo().alert();

  // Ambil teks alert dan cetak di konsol
  console.log(`Button: ${buttonText}, Alert Text: ${await alert.getText()}`);

  // Terima alert
  await alert.accept();
}

// Fungsi untuk delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Panggil fungsi handleAlerts
handleAlerts();
