
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const proxy = require('koa-proxy');

const ssr = require('./ssr');

const path = require('path');
const serve = require('koa-static');

const staticPath = path.join(__dirname, '../../riceshop-frontend/build');

const app = new Koa();
const router = new Router();


router.get('/', ssr);

app.use(proxy({
    host: 'http://localhost:8080',
    match: /^\/api\/*.*/
}));

app.use(bodyParser());



app.use(router.routes()).use(router.allowedMethods());

app.use(serve(staticPath));
app.use(ssr);


app.listen(4000, () => {
    console.log("app is listening port", 4000);
});

