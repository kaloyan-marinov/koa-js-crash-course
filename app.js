const Koa = require("koa");
const KoaRouter = require("koa-router");
const json = require("koa-json");
const path = require("path"); /* a core Node.js module for working filepaths */
const render = require("koa-ejs"); /* the template engine */
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new KoaRouter();

/* Replace with DB */
const things = ["My Family", "Programming", "Music"];

/* JSON Prettier Middleware */
app.use(json());
/* BodyParser Middleware */
app.use(bodyParser());

// Add additional properties to context
app.context.user = "Brad";

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

// Routes
router.get("/", index);
/* You can use the same route for different methods / request-types. */
router.get("/add", showAdd);
router.post("/add", add);

// List of things
async function index(ctx) {
  await ctx.render("index", {
    title: "Things I Love:",
    things: things,
  });
}

// Show add page
async function showAdd(ctx) {
  await ctx.render("add");
}

// Add thing
async function add(ctx) {
  const body = ctx.request.body;
  things.push(body.objectOfLove);
  ctx.redirect("/");
}

router.get("/test", (ctx) => (ctx.body = `Hello ${ctx.user}!`));

router.get("/greet/:name", (ctx) => (ctx.body = `Hello ${ctx.params.name}!`));

/* Router Middleware */
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log("Server started..."));
