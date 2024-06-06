const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testSearchCity() {
  let options = new chrome.Options();
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--disable-gpu');
  options.addArguments('--start-maximized'); // Tarayıcıyı tam ekran aç

  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  try {
    // Uygulamayı aç
    await driver.get('http://localhost:3000');

    // Şehir arama alanını bul ve şehir adını gir
    await driver.findElement(By.css('input[placeholder="Search for city"]')).sendKeys('London', Key.RETURN);

    // London seçeneğini bul ve tıkla
    let londonOption = await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'London, GB')]")), 10000);
    await driver.sleep(1000); // Seçeneklerin yüklenmesi için bekle
    await londonOption.click();

    // Hava durumu verilerinin yüklenmesini bekle ve kontrol et
    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'clear sky')]")), 10000);
    let weatherDescription = await driver.findElement(By.xpath("//*[contains(text(), 'clear sky')]")).getText();
    console.log('Weather Description:', weatherDescription);

    // Diğer kontrolleri ekleyin
  } finally {
    await driver.quit(); // Tarayıcıyı kapat
  }
}

testSearchCity();

