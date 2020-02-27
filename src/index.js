const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

app.set('port', (process.env.PORT || 8080));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname,'public')));
// app.use('/static',express.static('monDossier'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.get('/', (req, res) => res.render('index' , {title : 'HOME PAGE'}));
app.get('/login', (req, res) => res.render('login' , {title : 'LOGIN PAGE'}));
app.get('/register', (req , res) => res.render('register' , {title : 'REGISTER PAGE' }));
app.get('/logout' , (req ,res) => { res.redirect('/login') });
app.get('/home' , (req , res) =>{ res.render('home' , {name : req.body.login}) });
// app.use((req, res) =>{
//   res.redirect('/');
// })

var options = {useNewUrlParser:true , useUnifiedTopology: true};

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/test',options);

// mongoose.connect('mongodb+srv://nodetest:nodetest123@clusternkc-91ego.mongodb.net/test?retryWrites=true&w=majority'
// ,options);

// mongodb+srv://nodetest:<password>@clusternkc-91ego.mongodb.net/test?retryWrites=true&w=majority
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected to database')
});
(require('./routes'))(app)

app.listen(port, () => console.log('Server Running on port 8080 '));