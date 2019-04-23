var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://ec2-13-59-161-15.us-east-2.compute.amazonaws.com:3000/#/");

// UNIT test begin

describe("SAMPLE unit test",function(){

    // #1 should return home page

    it("should return home page",function(){

        // calling home page api
        server
            .get("/")
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                res.body.error.should.equal(false);
            });
    });

    it("should return 404",function() {
        server
            .get("/random")
            .expect(404)
            .end(function (err, res) {
                res.status.should.equal(404);
            });
    });

    it("should return to candidate result page",function() {
        server
            .get("/candidate-result")
            .expect(200)
            .end(function(err,res) {
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                res.body.error.should.equal(false);
            });
    });

    it("should return to election result page",function() {
        server
            .get("/election-result")
            .expect(200)
            .end(function(err,res) {
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                res.body.error.should.equal(false);
            });
    });

    it("should return to sponsor result page",function() {
        server
            .get("/donor-result")
            .expect(200)
            .end(function(err,res) {
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                res.body.error.should.equal(false);
            });
    });

    it("should return to bill result page",function() {
        server
            .get("/bill-result")
            .expect(200)
            .end(function(err,res) {
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                res.body.error.should.equal(false);
            });
    });
});