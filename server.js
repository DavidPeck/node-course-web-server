const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var logger = `${now}: ${req.method} ${req.url}`; 

    console.log(logger);
    fs.appendFile('server.log', logger + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log.');
        }
    });

    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'This site Title',
        welcomeMessage: "welcome to the website!"
    });
    //res.send('<h1>Hello Express!</h1>');

    // res.send({
    //     name: 'David',
    //     likes: [
    //         'Backyard Hiking',
    //         'USA Curling'
    //     ]
    // })
});

app.get('/about', (req, res) => {
    //res.send('About page.');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Github Projects',
        welcomeMessage: "github project listings"
    })
})

app.get('/bad', (req, res) => {
    res.send({
        error: 'Bad request.'
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});