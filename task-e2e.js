require("dotenv").config();
const request = require("supertest");
const expect = require("chai").expect;
const data_booking = require("./data-booking.json");

let token;
let bookingId;

// get data from .ENV file
const url = process.env.BASE_URL;

// get data booking from .json file
let data = data_booking;


describe("E2E Testing API", async function () {

    // Hook sebelum execute test case
    beforeEach(function () {
        this.timeout(5000);
    });



    // API AUTH
    it("1. GET TOKEN", async function () {
        // send request
        const response = await request(url)
            .post("/auth")
            .set("Content-Type", "application/json")
            .send({
            username: process.env.USERNAME_API,
            password: process.env.PASSWORD_API
        });

        // save token
        token = response.body.token;

        // assertion
        expect(response.status).to.equal(200);
        expect(token).to.exist;
     
    });
  
   

    // API CREATE BOOKING
    it("2. CREATE BOOKING", async function () {
        // send request
        const response = await request(url)
            .post("/booking")
            .set("Accept", "*/*")
            .set("Content-Type", "application/json")
            .send(data);

        // get booking ID  
        bookingId = response.body.bookingid;

        // assertion
        expect(response.status).to.equal(200);
        expect(response.body.bookingid).to.exist;
        expect(response.body.booking.firstname).to.equal(data.firstname);
        expect(response.body.booking.lastname).to.equal(data.lastname);
        expect(response.body.booking.totalprice).to.equal(data.totalprice);
        expect(response.body.booking.depositpaid).to.equal(data.depositpaid);
        expect(response.body.booking.bookingdates.checkin).to.equal(data.bookingdates.checkin);
        expect(response.body.booking.bookingdates.checkout).to.equal(data.bookingdates.checkout);
        expect(response.body.booking.additionalneeds).to.equal(data.additionalneeds);
    });
  


    
    // API GET BOOKING
    it("3. GET BOOKING", async function () {
        // send request
        const response = await request(url)
            .get(`/booking/${bookingId}`)
            .set("Accept", "*/*")
            .set("Content-Type", "application/json");

        // assertion
        expect(response.status).to.equal(200);
        expect(response.body.firstname).to.equal(data.firstname);
        expect(response.body.lastname).to.equal(data.lastname);
        expect(response.body.totalprice).to.equal(data.totalprice);
        expect(response.body.depositpaid).to.equal(data.depositpaid);
        expect(response.body.bookingdates.checkin).to.equal(data.bookingdates.checkin);
        expect(response.body.bookingdates.checkout).to.equal(data.bookingdates.checkout);
        expect(response.body.additionalneeds).to.equal(data.additionalneeds);
    });
   


 
    // API DELETE BOOKING
    it("4. DELETE BOOKING", async function () {
        // send request
        const response = await request(url)
            .delete(`/booking/${bookingId}`)
            .set("Cookie", `token=${token}`)
            .set("Content-Type", "application/json");

        // assertion
        expect(response.status).to.equal(201);
    });

  });
  