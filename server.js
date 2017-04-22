const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('toUpper', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var now =  new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('Server.log', log + '\n' , (err) => {
        if(err){
            console.log('unable to appendFile Server.log');
        } 
    });
    console.log(log);
    next();
}); 

// app.use((req, res , next) => {
//     res.render('maintenance.hbs');
// });

app.get('/', (req, res) => {
    res.send({
        title: 'Home Page'
        
    });
});
app.get('/Json', (req, res) => {
    res.send({
        name: 'Naqash Ahmad',
        cities: [
            'lahore',
            'Gujranwala',
            'Rawalpindi'
        ]
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: "About Page"
    });
});

app.listen(port, () => {
    console.log('Server is up');
});