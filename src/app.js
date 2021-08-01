const path = require('path')
const express = require('express')
const hbs = require('hbs') //used for partials 
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

//console.log(__dirname)
//console.log(__filename)


const app = express()                         //express is basically just a function, we use it to initialise our app

const port = process.env.PORT  || 3000                      //heroku setup  


//Define paths for Express config
const publicDirectorypath = path.join(__dirname,'../public') //create a reference to public directory
const viewPaths = path.join(__dirname, '../templates/views')       //express expects default handlebars in views folder , we are modifying the name hence need to set the path
const partialPaths = path.join(__dirname, '../templates/partials')


//Setup hsndlebars engine and views location
app.set('view engine', 'hbs')//lets express know we have to use hbs to crate dynamic template3s
app.set('views', viewPaths)  //telling express that views are stored at templates in viewPaths.
hbs.registerPartials(partialPaths)

//Setup static directory to serve
app.use(express.static(publicDirectorypath)) //somehow it works , will be explained later. we can remove .get('')


//is .get() an async ?
app.get('', (req,res) =>{                                  //route for index.hbs
    res.render('index',{
        title: 'Weather app',
        name : "rohit"
    })       //render the name of the .hbs file
})


app.get('/about', (req, res)=>{                              //route for about.hbs
    res.render('about', {
        title : "About",
        name : "rohit"
    })
})

app.get('/weather',(req,res)=>{
    if(req.query.address.length===0)
    {
        return res.send({error :"Please type in the address"})
    }

    geocode(req.query.address, (error, data)=>{                   //integarating weather app into the webserver
        if(error)
        {
            return res.send({error})
        }
        else{
            weather(data, (error, data1)=>{
                if(error)
                {
                    return res.send({ error})
                }
                else{
                    res.send({
                        "temperature_current": data1.temp,
                        "forecast" : "This data observed was last recorded at : "+data1.observation_time+". The weather is "+data1.weather_condition +" .The current temperature is "+data1.temp +" and the possibility of rain is "+data1.percent_of_rain +" %. Wind speed is measured as "+ data1.wind_speed+" km/hr.",
                        "place" : data.place
                    })
                }
            })
        }
    })
    
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title : "Help",
        name : "rohit"
    })
})

app.get('*', (req, res)=>{
    res.send('My 404 page')
})


//somehow it works , will be explained later. we can remove .get('')


//this method start the application and server starts listening to the req.
//to be called only once
//asynchronous
//callback function included

app.listen(port, ()=>{                                                            //port because of heroku , nahi toh 3000 dalo
    console.log('server is up and running '+ port)
})
//this method is called to send back on a particular route when a req comes from that route
/*
app.get('', (req, res)=>{
    res.send("yoo")
})

app.get('/help', (req, res)=>{   // x: 'y; matlab json 
    res.send({
        name: 'Rohit',
        age : 23
    })
})

app.get('/about',(req,res)=>{     //here we pass array of json objects
    res.send([{
        name:'Rohit',
        age: 23
    },
    {
        lastname : "Rohra",
        phn: 123
    }])
})

app.get('/weather',(req,res)=>{
    res.send('Weather page')
})
*/
