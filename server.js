//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs"); 

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
   
// Function to find the highest lowercase letter
function findHighestLowercase(alphabets) {
  const lowercases = alphabets.filter(char => char.toLowerCase() === char);
  return lowercases.length > 0 ? [lowercases[lowercases.length - 1]] : [];
}

app.get('/bfhl', (req, res) => {
    res.render("index", { response: null }); 
});

app.post('/bfhl', (req, res) => {
  const { jsonData, userId, email, rollNumber } = req.body;

  if (!jsonData) {
    return res.status(400).json({ message: 'Something seems wrong!' });
  }

  const parsedData = JSON.parse(jsonData); // Parse the data as JSON

  const numbers = parsedData.filter(item => !isNaN(item));
  const alphabets = parsedData.filter(item => isNaN(item));

  const highestLowercase = findHighestLowercase(alphabets);

  const response = {
    is_success: true,
    user_id: userId,
    email,
    roll_number: rollNumber,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase,
  };

  // Render the response on the HTML page
  res.render('index', { response });
});

app.listen(3000, function(){
    console.log("server running on port 3000");
});
