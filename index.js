require('dotenv').config();
const express = require('express');
const dbConnect = require('./confiq/dbConnction')
const cors = require('cors');

const categoryRouter = require('./routes/categoryRoute');
const adminRouter = require('./routes/adminRoute');
const productRouter = require('./routes/productRoute');
const mailingServiceRouter = require('./routes/mailingServiceRoute')

dbConnect();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use('/api/admin', adminRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product',productRouter);
app.use("/api/contactUs", mailingServiceRouter);
app.listen(port,()=>{
    console.log(`Server is live on : ${port}`)
})

