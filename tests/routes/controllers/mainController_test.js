import { app } from "../../../app.js"
import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";



Deno.test("get requests to / should return html", async () => {
    const request = await superoak(app);
    await request.get("/").
    expect("Content-Type", "text/html; charset=utf-8");
  });

