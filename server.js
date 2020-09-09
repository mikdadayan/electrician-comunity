const express = require('express');
const app = express();
const path = require('path')

const connectDB = require('./config/db');

//Connect Database
connectDB();

app.use(express.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
		return res.status(200).json({});
	}
	next();
});

if(process.env.NODE_ENV === "production"){
	app.use(express.static('client/build'));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

//define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`SERVER STARTED! on PORT ${PORT}`);
});
