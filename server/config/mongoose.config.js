const mongoose = require('mongoose')

//! DATABASE NAME 
const database = 'TideTunes'

mongoose.set("strictQuery", true);

mongoose.connect(`mongodb://localhost/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(`Established a connection to the database, ${database}.`))
.catch(err => console.log('Something went wrong while connecting to the database', err))