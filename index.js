// import express
const express = require('express');

// Initialize app with express
const app = express();

// Create array of two words
const wordList = ['Hello World', 'Example word'];

//Serve Static files in public folder
app.use('/', express.static(__dirname+'/public'));

// * VG nivå


app.get('/api/random/', (req ,res) => {
    // Write random integer number from 0 to 1023
    const randomNumber = Math.round(Math.random() * 1023);
    // Insert number in object
    const jsonRandom = {'number' : randomNumber}
    // Resopnse will be an object
    res.send(jsonRandom)
})

app.get('/api/custom_random/:num', (req, res) => {
    // Writes number between 0 and number from /: num which is from req.param object
    const randomNumber = Math.round(Math.random() * Number(req.params.num))
    // Inserts into object number
    const jsonRandom = { 'number': randomNumber}
    // response becomes number object
    res.send(jsonRandom)
})


// Create express version of bodyParser so that you return intermediate programs that analyze body from ejs 
app.use(express.urlencoded({ extended: true }))
app.get('/api/vowles', (req,res) => {
    // Create empty array
    const numberOfVowels = []
    // For each of the word array 
    wordList.forEach(word => { 
        // Splits words into array of letters
        const wordSplit = word.split('');

        // New Variable number
        let number = 0;

        // For each in array of letters
        wordSplit.forEach(letter => {
            // Switch case of each letter in lower case to each vowel
            /* const vowels = "aeiouy"
            vowels.includes(letter) */
            switch (letter.toLocaleLowerCase()) {
                case 'a':
                    // If the letter is a vowel then the number added with 1
                    number++
                    break;
                case 'e':
                    number++
                    break;
                case 'i':
                    number++
                    break;
                case 'o':
                    number++
                    break;
                case 'u':
                    number++
                    break;
                case 'y':
                    number++
                    break;
                default:
                    break;
            }
        })
        // The number of vowels in the word is entered into the array
        numberOfVowels.push(number)
    })
    // Renders an external EJS file that is
    res.render('vg.ejs', {words : wordList, numbers : numberOfVowels })
})
app.post('/api/addword', (req, res) => {
    // When has the requestad variable from vowels then it is inserted into new variable
    const newWord = req.body.newWord;
    // Pushes the new variable into new word
    wordList.push(newWord)
    // Redirect back to /api/vowels
    res.redirect('/api/vowles')
})

// The server should send out at port 3000
app.listen(3000,() => {
    console.log('server online')
})
