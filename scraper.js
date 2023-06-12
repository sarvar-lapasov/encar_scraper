//scraper.js
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const { v4: uuidv4 } = require("uuid");

puppeteer.use(StealthPlugin());

async function getCars() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const urls = [
        "http://www.encar.com/dc/dc_carsearchlist.do?carType=kor#!%7B%22action%22%3A%22(And.Hidden.N._.(C.CarType.Y._.(C.Manufacturer.%ED%98%84%EB%8C%80._.(C.ModelGroup.%EC%8F%98%EB%82%98%ED%83%80._.Model.%EC%8F%98%EB%82%98%ED%83%80%20%EB%94%94%20%EC%97%A3%EC%A7%80(DN8_).))))%22%7D",

        "http://www.encar.com/dc/dc_carsearchlist.do?carType=kor#!%7B%22action%22%3A%22(And.Hidden.N._.(C.CarType.Y._.(C.Manufacturer.%ED%98%84%EB%8C%80._.(C.ModelGroup.%EC%8F%98%EB%82%98%ED%83%80._.Model.%EC%8F%98%EB%82%98%ED%83%80%20%ED%95%98%EC%9D%B4%EB%B8%8C%EB%A6%AC%EB%93%9C%20(DN8_).))))%22%7D",

        "http://www.encar.com/dc/dc_carsearchlist.do?carType=kor#!%7B%22action%22%3A%22(And.Hidden.N._.(C.CarType.Y._.(C.Manufacturer.%ED%98%84%EB%8C%80._.(C.ModelGroup.%EC%8F%98%EB%82%98%ED%83%80._.Model.%EC%8F%98%EB%82%98%ED%83%80%20%EB%89%B4%20%EB%9D%BC%EC%9D%B4%EC%A6%88%20%ED%95%98%EC%9D%B4%EB%B8%8C%EB%A6%AC%EB%93%9C.))))%22%7D",

        "http://www.encar.com/dc/dc_carsearchlist.do?carType=kor#!%7B%22action%22%3A%22(And.Hidden.N._.(C.CarType.Y._.(C.Manufacturer.%ED%98%84%EB%8C%80._.(C.ModelGroup.%EC%8F%98%EB%82%98%ED%83%80._.Model.LF%20%EC%8F%98%EB%82%98%ED%83%80%20%ED%95%98%EC%9D%B4%EB%B8%8C%EB%A6%AC%EB%93%9C.))))%22%7D",

        "http://www.encar.com/dc/dc_carsearchlist.do?carType=kor#!%7B%22action%22%3A%22(And.Hidden.N._.(C.CarType.Y._.(C.Manufacturer.%ED%98%84%EB%8C%80._.(C.ModelGroup.%EC%8F%98%EB%82%98%ED%83%80._.Model.%EC%8F%98%EB%82%98%ED%83%80%20%EB%8D%94%20%EB%B8%8C%EB%A6%B4%EB%A6%AC%EC%96%B8%ED%8A%B8.))))%22%7D",

        "http://www.encar.com/dc/dc_carsearchlist.do?carType=kor#!%7B%22action%22%3A%22(And.Hidden.N._.(C.CarType.Y._.(C.Manufacturer.%ED%98%84%EB%8C%80._.(C.ModelGroup.%EC%8F%98%EB%82%98%ED%83%80._.Model.YF%20%EC%8F%98%EB%82%98%ED%83%80.))))%22%7D",

        "http://www.encar.com/dc/dc_carsearchlist.do?carType=kor#!%7B%22action%22%3A%22(And.Hidden.N._.(C.CarType.Y._.(C.Manufacturer.%ED%98%84%EB%8C%80._.(C.ModelGroup.%EC%8F%98%EB%82%98%ED%83%80._.Model.NF%20%EC%8F%98%EB%82%98%ED%83%80.))))%22%7D",

        "http://www.encar.com/dc/dc_carsearchlist.do?carType=kor#!%7B%22action%22%3A%22(And.Hidden.N._.(C.CarType.Y._.(C.Manufacturer.%ED%98%84%EB%8C%80._.(C.ModelGroup.%EC%8F%98%EB%82%98%ED%83%80._.Model.EF%20%EC%8F%98%EB%82%98%ED%83%80.))))%22%7D",

        "http://www.encar.com/dc/dc_carsearchlist.do?carType=kor#!%7B%22action%22%3A%22(And.Hidden.N._.(C.CarType.Y._.(C.Manufacturer.%ED%98%84%EB%8C%80._.(C.ModelGroup.%EC%8F%98%EB%82%98%ED%83%80._.Model.%EC%8F%98%EB%82%98%ED%83%80%20II.))))%22%7D",

        "http://www.encar.com/dc/dc_carsearchlist.do?carType=kor#!%7B%22action%22%3A%22(And.Hidden.N._.(C.CarType.Y._.(C.Manufacturer.%ED%98%84%EB%8C%80._.(C.ModelGroup.%EC%8F%98%EB%82%98%ED%83%80._.Model.%EC%8F%98%EB%82%98%ED%83%80%20(DN8_).))))%22%7D",

        "http://www.encar.com/dc/dc_carsearchlist.do?carType=kor#!%7B%22action%22%3A%22(And.Hidden.N._.(C.CarType.Y._.(C.Manufacturer.%ED%98%84%EB%8C%80._.(C.ModelGroup.%EC%8F%98%EB%82%98%ED%83%80._.Model.%EC%8F%98%EB%82%98%ED%83%80%20%EB%89%B4%20%EB%9D%BC%EC%9D%B4%EC%A6%88.))))%22%7D",

        "http://www.encar.com/dc/dc_carsearchlist.do?carType=kor#!%7B%22action%22%3A%22(And.Hidden.N._.(C.CarType.Y._.(C.Manufacturer.%ED%98%84%EB%8C%80._.(C.ModelGroup.%EC%8F%98%EB%82%98%ED%83%80._.Model.LF%20%EC%8F%98%EB%82%98%ED%83%80.))))%22%7D",

        "http://www.encar.com/dc/dc_carsearchlist.do?carType=kor#!%7B%22action%22%3A%22(And.Hidden.N._.(C.CarType.Y._.(C.Manufacturer.%ED%98%84%EB%8C%80._.(C.ModelGroup.%EC%8F%98%EB%82%98%ED%83%80._.Model.%EC%8F%98%EB%82%98%ED%83%80%20%ED%95%98%EC%9D%B4%EB%B8%8C%EB%A6%AC%EB%93%9C.))))%22%7D",

        "http://www.encar.com/dc/dc_carsearchlist.do?carType=kor#!%7B%22action%22%3A%22(And.Hidden.N._.(C.CarType.Y._.(C.Manufacturer.%ED%98%84%EB%8C%80._.(C.ModelGroup.%EC%8F%98%EB%82%98%ED%83%80._.Model.NF%20%EC%8F%98%EB%82%98%ED%83%80%20%ED%8A%B8%EB%9E%9C%EC%8A%A4%ED%8F%BC.))))%22%7D",

        "http://www.encar.com/dc/dc_carsearchlist.do?carType=kor#!%7B%22action%22%3A%22(And.Hidden.N._.(C.CarType.Y._.(C.Manufacturer.%ED%98%84%EB%8C%80._.(C.ModelGroup.%EC%8F%98%EB%82%98%ED%83%80._.Model.%EB%89%B4%20EF%20%EC%8F%98%EB%82%98%ED%83%80.))))%22%7D",

        "http://www.encar.com/dc/dc_carsearchlist.do?carType=kor#!%7B%22action%22%3A%22(And.Hidden.N._.(C.CarType.Y._.(C.Manufacturer.%ED%98%84%EB%8C%80._.(C.ModelGroup.%EC%8F%98%EB%82%98%ED%83%80._.Model.%EC%8F%98%EB%82%98%ED%83%80%20III.))))%22%7D",
    ];
    const allCars = [];

    // Process URLs sequentially using a for loop
    for (const url of urls) {
        try {
            await page.goto(url, { waitUntil: "networkidle2" });
            await page.waitForSelector("#sr_photo > li");
            await page.waitForTimeout(3000); // Add a delay to ensure the page content is loaded

            const cars = await page.$$eval("#sr_photo > li", (cars) => {
                return cars.map((car) => {
                    const titleElement = car.querySelector(".inf");
                    const priceElement = car.querySelector(".detail");
                    const imageElement = car.querySelector("img");

                    const title = titleElement ? titleElement.innerText : null;
                    const price = priceElement ? priceElement.innerText : null;
                    const image = imageElement ? imageElement.src : null;

                    return { title, image, price };
                });
            });

            allCars.push(...cars);
        } catch (error) {
            console.error(`Error fetching data from URL: ${url}`, error);
        }
    }

    // Add unique IDs to each car object
    const carsWithId = allCars.map((car) => {
        const id = uuidv4();
        return { ...car, id };
    });

    // Filter out duplicate cars based on title, image, and price
    const uniqueCars = carsWithId.filter((car, index, self) => {
        return (
            index ===
            self.findIndex(
                (c) =>
                    c.title === car.title &&
                    c.image === car.image &&
                    c.price === car.price
            )
        );
    });

    await browser.close();
    return uniqueCars;
}

module.exports = {
    getCars,
};
