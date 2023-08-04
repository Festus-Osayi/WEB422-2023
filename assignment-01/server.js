'use strict'
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const config = process.env.connectionString;
const app = express()
const TripDB = require("./tripsModel/tripDB");
const db = new TripDB();



/*
--- app use
*/

app.use(cors())
app.use(express.json())


/*
--- routes
*/

app.get('/', (req, res) => {
    res.json({ message: 'Api listening' })
})

/*
-- This route uses the body of the request to add a 
-- new "Trip" document to the collection and return the
-- newly created trip object / fail message to the client.
*/

app.post('/api/trips', (req, res) => {
    db.addNewTrip(req.body).then(function (data) {
        if (!data) {
            res.status(404).json({ message: 'unable to add a new trip'})
        } else {
            res.status(201).json(data)
        }
    }).catch(() => res.status(500).send({ message: 'Server error' }))
})

/*
-- This route must accept the numeric query parameters 
-- "page" and "perPage" ie: /api/trips?page=1&perPage=5. 
-- It will use these values to return all "Trip" objects 
-- for a specific "page" to the client.
*/

app.get('/api/trips', (req, res) => {
    const { page, perPage } = req.query;
    db.getAllTrips(page, perPage).then(function (data) {
        if (!data) {
            res.status(404).json({ message: 'unable to return trips' })
        }
        else {
            res.status(201).json(data)
        }
    }).catch((err) => {
        res.status(500).json({ message: 'Server error' })
    })
})


/*
This route must accept a route parameter that represents the _id of the desired trip object, ie: /api/trips/572bb8222b288919b68abf5a.  It will use this parameter to return a specific "Trip" object to the client.
*/

app.get('/api/trips/:id', (req, res) => {
    const id = req.params.id;
    db.getTripById(id).then(function (data) {
        if (!data) {
            res.status(404).json({ message: 'unable to fetch a user by the specified id' })
        }
        else {
            res.status(201).json(data)
        }
    }).catch(err => {
        res.status(500).json({ message: 'Server error' })
    })
})


/*
-- This route must accept a route parameter that represents the _id 
-- of the desired trip object, ie: /api/trips/ 
-- 572bb8222b288919b68abf5a as well as read the 
-- contents of the request body.  It will use these values to update a 
-- specific "Trip" document in the collection and return the object updated
-- / fail message to the client.
*/

app.put('/api/trips/:id', (req, res)=>{
    const id = req.params.id;
    const trip = req.body;
    db.updateTripById(trip, id).then(function (data) {
        if(!data){
            res.status(404).json({message: 'Unable to update a user'})
        }
        else{
            res.status(201).json(data)
        }
    }).catch(err=>{
        res.status(500).json({message: 'Server error'})
    })
})

/*
-- This route must accept a route parameter that represents the _id 
-- of the desired trip object, ie: /api/trips/572bb8222b288919b68abf5a.  
-- It will use this value to delete a specific "Trip" document from the 
-- collection and return nothing (for success) / fail message to the client.
*/
app.delete('/api/trips/:id', (req, res)=>{
    const id = req.params.id;
    db.deleteTripById(id).then(function (data) {
        if(!data){
            res.status(404).json({message: 'Unable to delete a user'})
        }
        else{
            res.status(201).json(data)
        }
    }).catch(err=>{
        res.status(500).send({message: 'Server error'})
    })
})


/*
-- Database connection
-- Port to listen on
*/

const PORT = process.env.HTTP_PORT || 8080

db.initialize(config).then(() => {
    app.listen(PORT, () => {
        console.log(`server listening on: ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
});










