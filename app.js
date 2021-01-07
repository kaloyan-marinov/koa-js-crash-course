const Koa = require("koa");
const KoaRouter = require("koa-router");
const json = require("koa-json");
const path = require("path"); /* a core Node.js module for working filepaths */
const render = require("koa-ejs"); /* the template engine */

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

render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "html",
  cache: false,
  debug: false,
});

// Index
router.get("/", async (ctx) => {
  await ctx.render("index", {
    title: "Things I Love:",
  });
});

router.get("/test", (ctx) => (ctx.body = "Hello Test!"));

/* Router Middleware */
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log("Server started..."));
