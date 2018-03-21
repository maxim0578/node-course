const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.port || 3000;


var app = express(); //make new express app. calling express as function

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs')



hbs.registerHelper('getCurrentYear',()=>{
    //return  'test'
    return new Date().getFullYear()
});

app.use((req,res,next)=>{
  res.render('maintenance.hbs')
//  next();

});
app.use(express.static(__dirname + '/private'));
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.path}`;
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err)
    {
      console.log(err);
    }
  });
next();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
// set up all http routers.

// Next to the varible app we can start setting up all of our HTTP route handlers. For example,
//if someone visits the root of the website we're going to want to send something back.
//Maybe it's some JSON data, maybe it's an HTML page.
// We can register a handler using app.get function. This will let us set up a handler for an HTTP get request.
//There are two arguments we have to pass into app.get:
// The first argument is going to be a URL
// The second argument is going to be the function to run; the function that tells Express what to send back to
//the person who made at the request
// In our case we're looking for the root of the app. So we can just use forward slash (/) for the first argument.
//In the second argument, we'll use a simple arrow function (=>) as shown here:


// app.get('/',(req,res)=>{
//   res.send('<h1>Hello Express<h1>');
// });
//route1
// app.get('/',(req,res)=>{
//     res.send({
//       name:'Aravind',
//       age:40,
//       likes:['cricket','reading']
//     })
// });


app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'Home page',
    homePage :'Cricket Web site'
  })
});


//route2
// app.get('/about',(req,res)=>{
//     res.send('About Page')
// });

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
      pageTitle:'About page',
    })
});
// Using app.get we're able to specify as many routes as we like. For now we just have an about route and a / route,
// which is also referred to as the root route. The root route returns some data, which happens to be JSON,
// and the about route returns a little bit of HTML. call back funtion is called handler.
//route3
app.get('/error',(req,res)=>{
  res.send({
    errorCode:300,
    errorMessage:'ErrorCode300'
  })
});

app.listen(port, ()=>{
  console.log(`server is up on${port}`);
});
