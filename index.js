const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));


let products =
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

//Handlebar
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



//POSTMAN PART
// Get all products
app.get('/products', (req,res) => {
    res.json(products);
});

//Get a product based on its ID
app.get('/products/:id', (req,res) => {
    const productId = Number(req.params.id);
    console.log(productId);

    //const car = cars.find(car => car.id === id)
    const product = products.find(product => product.id === productId);

    if (product){
    res.json(product);
    }

    else{
        res.status(404).json({
            msg: "Not found"
        });
    }
});

// DELETE
app.delete('/products/:id', (req,res) => {
    const productId = Number(req.params.id);
    
    // check if we have a product with the id
    const product = products.find(product => product.id === productId);

    if(product){
        // cars = cars.filter(car => car.id !== idToRemove);
        products = products.filter(product => product.id !== productId);
        res.status(200).json({
            id: productId
        });  
    }
    else{
        res.status(404).json({
            msg: 'Could not find the product'
        });
    }
});

// Create 
app.post('/api/products', (req,res) => {
    //console.log(req.body);
    //res.send('ok');
    const lastId = products[products.length-1].id;
    const newId = lastId + 1;
    //console.log(newId);

    //res.send('ok');
    
    newProduct = {
        id: newId,
        name: req.body.name,
        genre: req.body.genre,
        type: req.body.type,
        reviews: req.body.reviews,
        price: req.body.price
    }

    products.push(newProduct);

    res.location('https://localhost:4000/products/' + newId);
    res.status(201).json(newProduct);
    
});


// Update
app.patch('/products/:id', (req,res) => {
    const idToUpdate = Number(req.params.id);
    const newName = req.body.name;
    const newGenre = req.body.genre;
    const newType = req.body.type;
    const newReviews = req.body.reviews;
    const newPrice = req.body.price;

    products.forEach(product => {
        if(product.id === idToUpdate){
            product.name = newName;
            product.genre = newGenre;
            product.type = newType;
            product.reviews = newReviews;
            product.price = newPrice;
        }
    });


    const product = products.find(product => product.id === idToUpdate);
    if(product){
        res.status(200).json(product);
    }
    else{
        res.status(404).json({msg: 'Could not find the product'});
    }
});



app.use(express.static('public'));


// To show that the port is running
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));