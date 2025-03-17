// index.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';
import bodyParser from 'body-parser';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors()); // Allow all origins, or use your specific configuration
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('tiny'));
app.disable('x-powered-by');

// Routes
app.use('/api', router);

const port = 8080;

// Home GET Request
app.get('/', (req, res) => {
    res.status(200).json("Home GET Request");
});

// Start server only when we have valid connection
connect().then(() => {
    app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
    });
}).catch(error => {
    console.error("Invalid database connection:", error);
});
