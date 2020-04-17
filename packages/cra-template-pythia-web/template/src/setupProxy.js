const proxy = require('http-proxy-middleware')
const {devEnv} = require('../package.json')

const targetMap = {
    test: 'http://test.com',
    rel: 'https://rel.com',
    pre: 'http://pre.com',
    production: 'https://prod.com',
}

module.exports = app => {
    app.use(
        proxy('/h5', {
            target: 'https://xxx',
            changeOrigin: true,
        })
    )
}
