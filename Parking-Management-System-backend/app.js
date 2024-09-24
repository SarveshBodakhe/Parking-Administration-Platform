const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 6005;
app.use(cors());

// Use body-parser middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  'mongodb+srv://Sarvesh:Sarvesh123@cluster1.jz8t5ag.mongodb.net/Entry'
);

// Entry Schema
const entrySchema = new mongoose.Schema({
  name: String,
  vehicleno: String,
  email: String,
  phonenumber: String,
  time: String,
});

// Define the schema for exit data
const exitSchema = new mongoose.Schema({
  name: String,
  vehicleno: String,
  email: String,
  phonenumber: String,
  time: String,
});

const feeSchema = new mongoose.Schema({
  name: String,
  vehicleno: String,
  email: String,
  phonenumber: String,
  paymentDetails: {
    cardtype: String,
    cardname: String,
    cardnumber: String,
    expmonth: String,
    expyear: String,
    cvv: String,
  },
});

const Entry = mongoose.model('Entry', entrySchema);

// Create the Exit model using the exitSchema
const Exit = mongoose.model('Exit', exitSchema);

const Fee = mongoose.model('Fee', feeSchema);

// Endpoint for handling entry form submissions
app.post('/entry', async (req, res) => {
  const entryData = req.body;
  console.log('Received entry data:', entryData);
  try {
    const entry = new Entry(entryData);
    await entry.save();
    console.log('Entry data saved to MongoDB:', entry);
    res.send('Entry form submitted successfully!');
  } catch (error) {
    console.log('Error while saving the entry data to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint for handling exit form submissions
const isEqual = (entry, exit) => {
  // Check if entry and exit data are equal
  return (
    entry.name === exit.name &&
    entry.vehicleno === exit.vehicleno &&
    entry.email === exit.email &&
    entry.phonenumber === exit.phonenumber &&
    entry.time === exit.time
  );
};

app.post('/exit', async (req, res) => {
  const exitData = req.body;
  console.log('Received exit data:', exitData);
  try {
    // Find the corresponding entry data based on vehicle number
    const entry = await Entry.findOne({ vehicleno: exitData.vehicleno });

    if (entry) {
      // Compare entry data with exit data
      const isEqualData = isEqual(entry, exitData);

      if (isEqualData) {
        // Entry data matches exit data, proceed to save exit data
        const exit = new Exit(exitData);
        await exit.save();
        console.log('Exit data saved to MongoDB:', exit);
        res.json({ match: true });
      } else {
        // Entry data does not match exit data
        console.log('Entry data does not match exit data');
        res.json({ match: false });
      }
    } else {
      // No corresponding entry data found
      console.log('No corresponding entry data found');
      res.json({ match: false });
    }
  } catch (error) {
    console.log('Error saving exit data to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint for handling fee payment form submissions
app.post('/fee', async (req, res) => {
  const feeData = req.body;
  console.log('Received fee payment data:', feeData);

  try {
    const fee = new Fee(feeData); // Create a new Fee instance
    await fee.save(); // Save the fee payment data to MongoDB
    console.log('Fee payment data saved to MongoDB:', fee);
    res.send('Fee payment form submitted successfully!');
  } catch (error) {
    console.log('Error saving fee payment data to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(6006, () => {
  console.log(`Server is running at http://localhost:6006`);
});
