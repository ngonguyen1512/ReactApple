import userRouter from './user'
import menuRouter from './menu'
import likeRouter from './like'
import authRouter from './auth'
import pricesRouter from './price'
import sampleRouter from './sample'
import sliderRouter from './slider'
import productRouter from './product'
import accountRouter from './account'
import invoiceRouter from './invoice'
import providerRouter from './provider'
import categoryRouter from './category'
import transferRouter from './transfer'
import functionRouter from './function'
import permissionRouter from './permission'
import uplodaImageRouter from './uplodaImage'

const initRoutes = (app) => {
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/menu', menuRouter)
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/like', likeRouter)
    app.use('/api/v1/price', pricesRouter)
    app.use('/api/v1/sample', sampleRouter)
    app.use('/api/v1/slider', sliderRouter)
    app.use('/api/v1/account', accountRouter)
    app.use('/api/v1/product', productRouter)
    app.use('/api/v1/invoice', invoiceRouter)
    app.use('/api/v1/transfer', transferRouter)
    app.use('/api/v1/function', functionRouter)
    app.use('/api/v1/category', categoryRouter)
    app.use('/api/v1/provider', providerRouter)
    app.use('/api/v1/image', uplodaImageRouter)
    app.use('/api/v1/permission', permissionRouter)

    return app.use('/', (req, res) => {
        res.send('Server on...');
    })
}

export default initRoutes;