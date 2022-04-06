const app = require(".././app.js")
const supertest = require("supertest")
const request = supertest(app)

const expectedLength = 25;
const expectedObj = {id : 23};
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$||^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}.[a-zA-Z]{2,3}$/;
let response;

describe("/test/get endpoint", () => {
    beforeAll(async () => {
        response = await request.get("/test/get")
    })

    it("should return status code 200", () => {
        expect(response.status).toBe(200);
    })

    it("should return expected body length", () => {
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body).toHaveLength(expectedLength);
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

describe("/test/courses endpoint", () => {
    const validReqBody = {
        "name" : "course1"
    }

    const invalidReqBody = {
        "name" : "cou"
    }

    it("should test response body", async() => {
        response = await request
            .post("/test/courses")
            .send(validReqBody);
        expect(response.body.name).toBe(validReqBody.name);
    })

    it("should return status code 400", async() => {
        response = await request
            .post("/test/courses")
            .send(invalidReqBody);
        expect(response.statusCode).toBe(400);
    })
})