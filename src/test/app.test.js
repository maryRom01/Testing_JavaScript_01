const app = require(".././app.js")
const supertest = require("supertest")
const request = supertest(app)

const expectedLength = 25;
const expectedObj = {id : 23};

describe("/test endpoint", () => {
    it("should return status code 200", async () => {
        const response = await request.get("/test")
        expect(response.status).toBe(200);
    })

    it("should return expected body length", async () => {
        const response = await request.get("/test")
        expect(response.body).toHaveLength(expectedLength);
        expect(response.body.length).toBeGreaterThan(0);
    })

    it("should return expected object in body", async () => {
        const response = await request.get("/test")
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining(expectedObj)
            ])
        );
    })
})