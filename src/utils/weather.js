/*const request = require('request')


const weather = (data, callback)=>{
    urlweather = "http://api.weatherstack.com/current?access_key=ddd912307679e5b21679922ebbf2c8ce&query="+data.latitude+","+data.longitude
    request({url: urlweather, json: true}, (error, response)=> {
        //const data = JSON.parse(response.body)
        //console.log(urlweather)
        if(error)                                                         //error handling : low level : internet gone case : where no response just error
        {
            callback("Unable to connect to internbet ")
        }
        else if(response.body.error){                                     //error handling : high level: lat and long/ place name not provided (basically &query=)
            callback("unable to find the latitide/ longitude")
        }
        else{
         callback(undefined, {temp: response.body.current.temperature ,percent_of_rain : response.body.current.precip*10 })
        }
    })
    
}


module.exports = weather

*/


//*******************************above code using destructurign and short hand *********************** */

const request = require('request')


const weather = ({latitude, longitude}, callback)=>{                 //idhar callback ek variable hai jsimein apan ek arrow  fucntion(error, data1) store kiye hai 
    url = "http://api.weatherstack.com/current?access_key=ddd912307679e5b21679922ebbf2c8ce&query="+latitude+","+longitude
    //console.log(urlweather)
    request({url, json: true}, (error, {body})=> {                        //use name as "url" only other options dont work
        //const data = JSON.parse(response.body)
        //console.log(urlweather)
        if(error)                                                         //error handling : low level : internet gone case : where no response just error
        {
            callback("Unable to connect to internbet ")
        }
        else if(body.error){                                     //error handling : high level: lat and long/ place name not provided (basically &query=)
            callback("unable to find the latitide/ longitude")
        }
        else{
         callback(undefined, {wind_speed : body.current.wind_speed , observation_time: body.current.observation_time, weather_condition : body.current.weather_descriptions[0],temp: body.current.temperature ,percent_of_rain : body.current.precip*100 })
        }
    })
    
}


module.exports = weather