const allowedOrigins = require('./allowedOrigin');

const corsOptions = {
    origin : allowedOrigins.includes('*') ? '*' : allowedOrigins,
    methods : ["*"],
    optionsSuccessStatus: 200
}

module.exports = corsOptions;