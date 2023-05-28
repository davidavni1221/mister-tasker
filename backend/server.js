const express = require('express');
const cors = require('cors');

const logger = require('./services/logger.service');
const socketService = require('./services/socket.service');

const taskRoutes = require('./api/task/task.routes');

const app = express();
const http = require('http').createServer(app);

// const {runWorker} = require('./services/tasker.mngr');

app.use(express.json()); // create the req.body object - from json
app.use(express.urlencoded({extended: false})); // create the req.body object

const corsOptions = {
  origin: [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:8080',
    'http://localhost:8080',
  ],
  credentials: true,
};
app.use(cors(corsOptions));

socketService.init(http, corsOptions);

app.use('/api/task', taskRoutes);

const port = process.env.PORT || 3030;
http.listen(port, () => {
  logger.info('Server is running on port: ' + port);
});
