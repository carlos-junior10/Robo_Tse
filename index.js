const puppeteer = require("puppeteer");

console.log("Iniciando o Robô TSE");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://sig.tse.jus.br/ords/dwtse/f?p=2001:101:::NO:::");

  //TODO Ano e Seta para cima
  await page.click("#P0_SLS_ANO_DIS_SF");
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("ArrowUp");
  }
  //TODO Ano e Seta para cima ^^^^

  await page.keyboard.press("Enter");

  //Aguardando (Abrangência) o elemento carregar
  await page.waitForSelector("#P0_SLS_ABRAN_DIS_SF", { visible: true });

  //TODO Abrangência e Seta para baixo
  await page.click("#P0_SLS_ABRAN_DIS_SF");
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press("ArrowDown");
  }
  //TODO Abrangência e Seta para baixo
  await page.keyboard.press("Enter");

  //Aguardando (UF) o elemento carregar
  await page.waitForSelector("#P0_SLS_UF_DIS_SF", { visible: true });

  await page.click("#P0_SLS_UF_DIS_SF");
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("ArrowDown");
  }
  await page.keyboard.press("Enter");

  await page.waitForSelector("#P0_SLS_MUNICIPIO_DIS_SF", { visible: true });
  await page.click("#P0_SLS_MUNICIPIO_DIS_SF");

  for (let i = 0; i < 217; i++) {
    await page.click("#P0_SLS_MUNICIPIO_DIS_SF");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page.waitForSelector(".t16CVS", { visible: true });
    await page.click(".t16CVS > a");
    await page.waitForTimeout(3000);
  }
  await page.screenshot({ path: "ultima_tela.png" });
  await browser.close();
})();
