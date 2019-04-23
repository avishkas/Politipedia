var supertest = require("supertest");
var should = require("should");
var webdriver = require("selenium-webdriver");
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://ec2-13-59-161-15.us-east-2.compute.amazonaws.com:3000/#/");
var driver;
// UNIT test begin

describe("Testing search box bill functionality",function(){
    this.timeout(15000);

    beforeEach(function(done){
        var service = new chrome.ServiceBuilder(path).build();
        chrome.setDefaultService(service);

        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
        driver.get("http://ec2-13-59-161-15.us-east-2.compute.amazonaws.com:3000/#/");

        done();
    });

    afterEach(function(done) {
        driver.quit()
    });

    it("Should go to bill page", async() => {
        var searchBox = driver.findElement(webdriver.By.id("textBox"));
        await searchBox.sendKeys('252');
        searchBox.getAttribute('value').then(function (value) {
            assert.equal(value, '252');
        });

        await driver.findElement(webdriver.By.id("dropdownBasic1")).click();
        await driver.findElement(webdriver.By.id("dropdownBill")).click();
        // dropDownMenu.getAttribute('value').then(function (value){
        //     assert.equal(value, 'Bill');
        // });

        await driver.findElement(webdriver.By.id("searchBtn")).click()
            .then(function() {
                return driver.getCurrentUrl();
            })
            .then(function(currentUrl) {
                driver.findElement(webdriver.By.linkText("252")).click();
            });
    });

});