const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const connectDB = require('./connect');
const usersRouter = require('./routes/users');
const permissionsRouter = require('./routes/permissions');

app.use(express.json());
app.use(cors());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/permissions', permissionsRouter);

const PORT = process.env.PORT || 8080;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
	} catch (error) {
		console.log(error);
	}
};

start();
