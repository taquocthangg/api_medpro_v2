import users from "./users"
import auth from "./auth"

const initRoutes = (app) =>{

    app.use('/api/v1/users' ,users)
    app.use('/api/v1/auth' ,auth)

    return app.use('/', (req, res) =>{
        return res.send('Ok')
    })
}

module.exports = initRoutes