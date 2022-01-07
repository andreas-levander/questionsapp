import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";
import { app } from "../../../app.js"



Deno.test({
    name: "Test /api/questions/random should return json",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/api/questions/random")
        .expect("Content-Type", "application/json; charset=utf-8");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});