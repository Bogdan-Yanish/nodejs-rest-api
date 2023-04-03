const express = require("express");
const request = require("supertest");

const { login } = require("../controllers/users");

const app = express();
const { DB_HOST } = process.env;

app.post("/api/users/login", login);

describe("test loginController", () => {
    const userTest = { email: "test@mail.com", password: "123456" };

    test("status success", async () => {
        const result = await request(DB_HOST)
            .post('/api/users/login')
            .set("Content-type", "application/json")
            .send(userTest);

        expect(result.statusCode).toBe(200);
    });

    test("return token", async () => {
        const result = await request(DB_HOST)
            .post('/api/users/login')
            .set("Content-type", "application/json")
            .send(userTest);
        expect(result.body.data.user.token).toBeTruthy();
    });

    test("return body with two fields", async () => {
        const result = await request(DB_HOST)
            .post('/api/users/login')
            .set("Content-type", "application/json")
            .send(userTest);
        const { user } = result.body.data;

        expect(typeof user.email).toBe("string");
        expect(typeof user.subscription).toBe("string");
    });
});

