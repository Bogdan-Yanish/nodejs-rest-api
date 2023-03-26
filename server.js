const app = require('./app')
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})
