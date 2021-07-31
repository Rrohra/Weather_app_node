/*const request =require('request')

const geocode = (address, callback)=>{
    const geocodeurl =  "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoicnJvaHJhIiwiYSI6ImNrcjN0Y2d3bjFsMm4yeGxkYXA0YmFrd2sifQ.kmVIPDRtDjPmBkLw09WgQw&limit=1"    //use encodeURIComponent(address) when working with special characters
    request({url : geocodeurl, json:true}, (error, response)=>{      //using the request fucntion to send http request
        if(error){
            callback("Unable to connect to internet") //data will get the default value of undefined
        }
        else if(response.body.features.length ===0){
            callback("Unable to find location , please search for another location")
        }
        else{
        
        callback(undefined, {
            latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0] ,       //getting the lat, lon values from api response json
            place : response.body.features[0].place_name                 //seedha {} isko hi pass kardiya toh bi chalega
        })
        }
    })
}

module.exports =geocode
*/



//*********************************above code using short hand and obejct destructing*********************8 */


const request =require('request')

const geocode = (address, callback)=>{
    const url =  "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoicnJvaHJhIiwiYSI6ImNrcjN0Y2d3bjFsMm4yeGxkYXA0YmFrd2sifQ.kmVIPDRtDjPmBkLw09WgQw&limit=1"    //use encodeURIComponent(address) when working with special characters
    //console.log(url)
    request({url, json:true}, (error, {body})=>{      //using the request fucntion to send http request //use name as "url" only other options dont work
        //console.log(url)
        if(error){
            //console.log(error)
            callback("Unable to connect to internet") //data will get the default value of undefined
        }
        else if(body.features.length ===0){
            callback("Unable to find location , please search for another location")
        }
        else{
        
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0] ,       //getting the lat, lon values from api response json
            place : body.features[0].place_name                 //seedha {} isko hi pass kardiya toh bi chalega
        })
        }
    })
}

module.exports =geocode