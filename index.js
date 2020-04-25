// importerar express
const express = require('express');

// Inizaliserar appen med express
const app = express();

// Skapa lista av ord
const wordList = ['Hello World', 'Example word'];

//Serverar statiska filer i express på public mappen
app.use('/', express.static(__dirname+'/public'));

// * VG nivå


app.get('/api/random/', (req ,res) => {
    // Skriver number mellan 0 och 1023 som blir närmaste heltal
    const randomNumber = Math.round(Math.random() * 1023);
    // Sätter in i Objetet nuber
    const jsonRandom = {'number' : randomNumber}
    // response bilr number object
    res.send(jsonRandom)
})

app.get('/api/custom_random/:num', (req, res) => {
    // Skriver number mellan 0 och tal från /:num som är från  req.param object 
    const randomNumber = Math.round(Math.random() * Number(req.params.num))
    // Sätter in i Objetet nuber
    const jsonRandom = { 'number': randomNumber}
    // response bilr number object
    res.send(jsonRandom)
})


// Skapa express verion av bodyParser så att man returnerar mellanprogram som anlyiserar body från ejs
app.use(express.urlencoded({ extended: true }))
app.get('/api/vowles', (req,res) => {
    // Skapar en tom array
    const numberOfVowels = []
    // For each av ord array
    wordList.forEach(word => {
        // Delar up ord till array av boktäver
        const wordSplit = word.split('');

        // Ny variabel number
        let number = 0;

        // For each av array av bokstäver
        wordSplit.forEach(letter => {
            // Switch case om varje bokstav i små bokstäver till vajre vokal 
            // const vowels = "aeiouy"
            // vowels.includes(letter)
            switch (letter.toLocaleLowerCase()) {
                case 'a':
                    // Om bokstaven är en vokal då plusas number med 1
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
        // antal vokaler i ordet skrivs in i array.
        numberOfVowels.push(number)
    })
    // Renderar en extern EJS fil som är 
    res.render('vg.ejs', {words : wordList, numbers : numberOfVowels })
})
app.post('/api/addword', (req, res) => {
    // När har requestad variabeln från vowels då säts det in i ny variabel
    const newWord = req.body.newWord;
    // pushar nya variabeln till ny ord
    wordList.push(newWord)
    // redirectar tillbaka till /api/vowels
    res.redirect('/api/vowles')
})

// Servern ska skicka ut i port 3000
app.listen(3000,() => {
    console.log('server online')
})
