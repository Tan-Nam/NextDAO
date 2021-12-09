const next = require('next')
const routes = require('./routes.js')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)
// Without express
const {createServer} = require('http')
app.prepare().then(() => {
  createServer(handler).listen(3005, (err) => {
      if(err) throw err;
      console.log('Ready on localhost:3005');
  })
})
