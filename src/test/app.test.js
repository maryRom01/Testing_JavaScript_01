const app = require(".././app.js")
const supertest = require("supertest")
const request = supertest(app)

const expectedLength = 25;
const expectedObj = {id : 23};
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$||^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}.[a-zA-Z]{2,3}$/;
let response;

describe("/test endpoint", () => {
    beforeAll(async () => {
        response = await request.get("/test")
    })

    it("should return status code 200", () => {
        expect(response.status).toBe(200);
    })

    it("should return expected body length", () => {
        expect(response.body).toHaveLength(expectedLength);
        expect(response.body.length).toBeGreaterThan(0);
    })

    it("should return expected object in body", () => {
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining(expectedObj)
            ])
        );
    })

    it("should test email validation", () => {
        response.body.forEach(element => {
            expect(element.email).toMatch(emailRegex);
        });
    })
})