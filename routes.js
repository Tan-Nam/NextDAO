const routes = require('next-routes')()

routes
.add('/VoteCB/contribute', 'VoteCB/index')
.add('/create','/CreateIdea')

module.exports = routes;