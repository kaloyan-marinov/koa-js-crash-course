const Koa = require("koa");
const KoaRouter = require("koa-router");
const json = require("koa-json");

const app = new Koa();
const router = new KoaRouter();

/* JSON Prettier Middleware */
app.use(json());

/*
simple piece of middleware, just to output something
(just to set the context body, because we don't have a router yet;
remember - Koa doesn't ship with a router)
*/
// app.use(async (ctx) => (ctx.body = { msg: "Hello World!" }));

router.get("/test", (ctx) => (ctx.body = "Hello Test!"));

/* Router Middleware */
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log("Server started..."));
