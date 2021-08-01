// we have to load javascript into index.html only


//this is Client side Javascript that is gonna run inside the browser
//the goal of this is to be able to fetch the forecast information
console.log("Client side javascript loaded")


//FETCH API is used to make http request from client side javascript 
/* 
     Description about Fetch : 1)it si not part of JAvascript 
                                2) it is a browser based API, hence can be used in alll modern browsers
                                3)But not accessible in Node.js, hence the code below cannot be used in back end node script
*/

/*
fetch('http://localhost:3000/weather?address=Mumbai' ).then((response)=>{   //async call like request
                                                            //.then is like - first get data from url and then do .....
                                                            //in then we provide a callback function.
    response.json().then((data)=>{
        if(data.error)
        {
            console.log(data.error)
        }
        else{
            //console.log(data.place)
            //console.log(data.forecast)
            //console.log(data.temperature_current)
        }
    })
}) 
*/

const weather_form = document.querySelector('form') //we will select things we want to style , as we do in css
                                                    //this line document.querySelector returns a js representation of the element form
                                                    //we will store that representation and use it to manipulate the elemetn, or user can interact with that element

const search = document.querySelector('input') //to grab the value tyoed in the by user in input

const message1 = document.querySelector('#message-1')    /// grab the indiviuald p's from index.hbs
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')


//document.querySelector('button').onclick()
//enhhh
weather_form.addEventListener('submit', (eventobject)=>{
    eventobject.preventDefault()

    const location = search.value                    // we catch the value typed in by the user in input, after it clicks on submit
    //console.log(location)                 //make sure the script code in the html/hbs files is started only after all elements are rendered
                                                    // i.e. in the end of the body and not in the end, or else it will give error.

    message1.textContent = "Loading ...."        //timepass  
    message2.textContent =""    


    //fetch("http://localhost:3000/weather?address="+location  ).then((response)=>{        //if not heroku , if heroku use below line
    fetch('/weather?address='+location  ).then((response)=>{  //migrating above commented fetch call in the submit event
        
        response.json().then((data)=>{
            
            if(data.error)
            {
                //console.log("fethc error")
                message1.textContent= data.error
            }
            else{
                message1.textContent = data.place                               //place the contents into the p's selected
                message2.textContent = data.forecast
                //message3.textContent = data.temperature_current
            }
        })
   
    })                                                                          //fetch ends
})