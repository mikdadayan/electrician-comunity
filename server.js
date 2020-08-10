const express = require("express");
const app = express();

const connectDB = require('./config/db');


//Connect Database
connectDB();

app.use(express.json())

app.get('/', (req, res, next) => {
  res.send("API RUNING")
})

//define routes
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SERVER STARTED! on PORT ${PORT}`);
});
