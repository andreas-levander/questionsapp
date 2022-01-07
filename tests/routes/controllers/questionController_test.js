import { app } from "../../../app.js"
import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";


Deno.test("get requests to /questions should redirect to login", async () => {
    const request = await superoak(app);
    const response = await request.get("/questions")
        .expect(302)
        .expect("location", "/auth/login");
});



Deno.test({
    name: "get requests to /quiz should redirect to login",
    async fn() {
        const request = await superoak(app);
        const response = await request.get("/quiz")
            .expect(302)
            .expect("location", "/auth/login");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "get requests to /statistics should redirect to login",
    async fn() {
        const request = await superoak(app);
        const response = await request.get("/statistics")
            .expect(302)
            .expect("location", "/auth/login");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});