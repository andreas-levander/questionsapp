import { assertEquals, assertExists, assertObjectMatch } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import * as statService from "../../services/statService.js";

Deno.test({
    name: "getTopList should exist if u have answered a question",
    async fn() {
        assertExists(await statService.getTopList());
    },
    sanitizeResources: false,
    sanitizeOps: false,
});