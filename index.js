const express = require('express');
const exphbs = require('express-handlebars');

const app = express();


const products =
[
    {
        id:1,
        name:"Kingdom Two Crowns",
        genre:"Adventure",
        type:"Single-player/Co-op",
        reviews:"Very Positive",
        price:"19,99€"
    },
    {
        id:2,
        name:"Lethal Company",
        genre:"Horror",
        type:"Single-player/Co-op",
        reviews:"Overwhelmingly Positive",
        price:"9,75€"
    },
    {
        id:3,
        name:"Stardew Valley",
        genre:"Farming Sim",
        type:"Single-player/Cop-op",
        reviews:"Overwhelmingly Positive",
        price:"13,99€"
    },
    {
        id:4,
        name:"Borderlands 2",
        genre:"Action",
        type:"Single-player/Co-op",
        reviews:"Overwhelmingly Positive",
        price:"29,99€"
    },
    {
        id:5,
        name:"Dead by Daylight",
        genre:"Survival Horror",
        type:"PvP/Co-op",
        reviews:"Very Positive",
        price:"19,99€"
    }
]


app.engine('handlebars',exphbs.engine({
    defaultLayout: 'main'
}));

app.set('view engine','handlebars');

app.get('/', (req,res) => {
    res.render('index',
    {
        title: 'Home',
        object: 'Video Games',
        products: products
    }
    );
});

app.use(express.static('public'));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));