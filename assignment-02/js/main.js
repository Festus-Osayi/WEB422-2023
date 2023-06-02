/*********************************************************************************
*  WEB422 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Festus Osayi Student ID: 170276216 Date: 01-06-2023
*
********************************************************************************/

'use strict'


let tripData = []
let currentTrip = {}
let page = 1
const perPage = 10

let map = {
    leaflet: null
}

/*
This will be a callback function or a variable with an anonymous or arrow function as value. The function accepts a Trip object and returns a string which contains HTML markup code of table row with the Trip object data dynamically rendered within the table cells.
 */
const objectToTableRow = (Trip) =>

    `<tr data-id=${Trip._id} class=${Trip.usertype}>
        <td>${Trip.bikeid}</td>
        <td>${Trip['start station name']}</td>
        <td>${Trip['end station name']}</td>
        <td>${(Trip.tripduration / 60).toFixed(2)}</td>
    </tr>
    `



function loadTripData() {
    //url 
    const url = `https://combative-pike-pleat.cyclic.app/api/trips?page=${page}&perPage=${perPage}` ? `https://combative-pike-pleat.cyclic.app/api/trips?page=${page}&perPage=${perPage}` : { url: [] }

    // fetch the given url, if it does exists
    fetch(url)
        .then(response => response.json()).then(data => {
            // assign the data from the url to --> tripData
            tripData = data
            const tripStr = tripData.map(objectToTableRow).join("")
            document.querySelector('#trips-table tbody').innerHTML = tripStr
            document.querySelectorAll('#trips-table tbody tr')

                //  A 'click' events for all tr elements (just created above) within the tbody of the trips-table
                .forEach((row) => {
                    row.addEventListener('click', function (e) {
                        const clickedId = row.getAttribute('data-id')

                        currentTrip = tripData.find(findId => findId._id === clickedId)
                        console.log(currentTrip)

                        // Modal window
                        const modalTitle = `<h5 class="modal-title">Trip Details(Bike: ${currentTrip?.bikeid})</h5>`
                        document.querySelector('.modal-title').innerHTML = modalTitle
                        document.getElementById(`map-details`).innerHTML = `
                                    
                                        <strong>Start Station:</strong> ${currentTrip?.['start station name']}<br>
                                        <strong>End Location:</strong> ${currentTrip?.['end station name']}<br>
                                        <strong>Duration:</strong> ${(currentTrip?.tripduration / 60).toFixed(2)}<br>
                                    
                                `

                        // Open the "Trip" Modal window 
                        let myModal = new bootstrap.Modal(document.getElementById('trip-modal'), {
                            backdrop: 'static',
                            keyboard: false,
                            focus: true,
                        });

                        myModal.show();

                    })
                    document.getElementById('current-page').innerHTML = page
                })
        })


}

// click event for the previous pagination button
document.getElementById('previous-page').addEventListener('click', () => {

    if (page > 1) {
        page -= 1
        loadTripData()
    }

})

// a 'click' event for the "next page" pagination button

document.getElementById('next-page').addEventListener('click', function () {
    if (page >= 1) {

        page += 1
        loadTripData()
    }












})

document.addEventListener('DOMContentLoaded', function () {
    loadTripData()

})



// a 'shown.bs.modal' event for the "Trip" modal window

document.querySelector("#trip-modal").addEventListener("shown.bs.modal", function () {
    console.log(currentTrip['start station location'].coordinates[1])

    map = new L.Map('leaflet', {
        layers: [
            new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        ]
    });

    let start = L.marker([currentTrip['start station location'].coordinates[1], currentTrip['start station location'].coordinates[0]])
        .bindTooltip(currentTrip['start station name'],
            {
                permanent: true,
                direction: 'right'
            }).addTo(map);

    let end = L.marker([currentTrip['end station location'].coordinates[1], currentTrip['end station location'].coordinates[0]])
        .bindTooltip(currentTrip['end station name'],
            {
                permanent: true,
                direction: 'right'
            }).addTo(map);

    var group = new L.featureGroup([start, end]);

    map.fitBounds(group.getBounds(), { padding: [60, 60] });



});

// 'hidden.bs.modal' event for the "Trip" modal window

document.querySelector("#trip-modal").addEventListener("hidden.bs.modal", function () {
    map.remove()




});












