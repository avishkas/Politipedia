var supertest = require("supertest");
var should = require("should");
var webdriver = require("selenium-webdriver");
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var assert = require('assert');

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://ec2-13-59-161-15.us-east-2.compute.amazonaws.com:3000/#/");
var driver;
// UNIT test begin

describe("Testing election functionality",function(){
    this.timeout(30000);

    beforeEach(function(done){
        var service = new chrome.ServiceBuilder(path).build();
        chrome.setDefaultService(service);

        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
        driver.get("http://ec2-13-59-161-15.us-east-2.compute.amazonaws.com:3000/#/");

        done();
    });

    // afterEach(function(done) {
    //     driver.quit()
    // });

    it("Should go to election page", async() => {
        var searchBox = driver.findElement(webdriver.By.id("textBox"));
        await searchBox.sendKeys('2018');
        searchBox.getAttribute('value').then(function (value) {
            assert.equal(value, '2018');
        });

        await driver.findElement(webdriver.By.id("dropdownBasic1")).click();
        // dropDownMenu.getAttribute('value').then(function (value){
        //    assert.equal(value, 'Election');
        // });

        await driver.findElement(webdriver.By.id("dropdownElection")).click();

        await driver.findElement(webdriver.By.id("searchBtn")).click()
            .then(function() {
                return driver.getCurrentUrl();
            })
            .then(function(currentUrl) {
                driver.findElement(webdriver.By.linkText("Jeff Flake")).click();
            });
    });

});