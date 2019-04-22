

var supertest = require("supertest");
var should = require("should");
var webdriver = require("selenium-webdriver");
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://ec2-13-59-161-15.us-east-2.compute.amazonaws.com:3000/#/");
var driver;
// UNIT test begin

describe("Testing search box functionalities",function(){

    beforeEach(function(done){
        // driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
        // System.setProperty("webdriver.chrome.driver", "C:\Selenium\chromedriver.exe");
        // driver = new webdriver.Builder().forBrowser('chrome').build();
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

    it("Should go to candidate page", function(done) {
        var searchBox = driver.findElement(webdriver.By.id("textBox"));
        searchBox.sendKeys('Ted Cruz');
        searchBox.getAttribute('value').then(function (value) {
            assert.equal(value, 'Ted Cruz');
        });

        driver.findElement(webdriver.By.id("searchBtn")).click();
        //Check that new page is /candidate-result
        driver.findElement(webdriver.By.linkText("Name: Ted Cruz")).click();
        done();
    });



});