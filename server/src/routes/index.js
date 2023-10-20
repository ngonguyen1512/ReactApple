import authRouter from './auth';
import categoryRouter from './category';
import sampleRouter from './sample';
import sliderRouter from './slider';
import productRouter from './product';
import pricesRouter from './price';
import userRouter from './user';
import menuRouter from './menu';
import transferRouter from './transfer';
import accountRouter from './account';
import functionRouter from './function';
import permissionRouter from './permission'
import providerRouter from './provider'
import invoiceRouter from './invoice'
import likeRouter from './like'

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/category', categoryRouter)
    app.use('/api/v1/sample', sampleRouter)
    app.use('/api/v1/slider', sliderRouter)
    app.use('/api/v1/product', productRouter)
    app.use('/api/v1/price', pricesRouter)
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/menu', menuRouter)
    app.use('/api/v1/transfer', transferRouter)
    app.use('/api/v1/account', accountRouter)
    app.use('/api/v1/function', functionRouter)
    app.use('/api/v1/permission', permissionRouter)
    app.use('/api/v1/provider', providerRouter)
    app.use('/api/v1/invoice', invoiceRouter)
    app.use('/api/v1/like', likeRouter)

    return app.use('/', (req, res) => {
        res.send('Server on...');
    })
}

export default initRoutes;