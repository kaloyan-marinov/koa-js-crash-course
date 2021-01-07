const Koa = require("koa");
const json = require("koa-json");

const app = new Koa();

app.use(json());

/*
simple piece of middleware, just to output something
(just to set the context body, because we don't have a router yet;
remember - Koa doesn't ship with a router)
*/
app.use(async (ctx) => (ctx.body = { msg: "Hello World!" }));

app.listen(3000, () => console.log("Server started..."));
