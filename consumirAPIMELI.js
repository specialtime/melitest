'use strict'
const fetch = require('cross-fetch');
const fs = require('fs');
const readlineSync = require('readline-sync');

var sellerID = JSON.parse("["+ readlineSync.question('Ingrese el ID de Seller: ')+"]");
var urlCategory = "https://api.mercadolibre.com/categories/";
var items = [];
var categoryName = [];

function invocarAPI(element) {
    var cantItem = 0;
    var urlItem = "https://api.mercadolibre.com/sites/MLA/search?seller_id="+element;
    fetch(urlItem)
    .then(data => data.json())
    .then(data => {
        items = data.results;
        items.forEach(results=>{
            cantItem = cantItem + 1
            fetch(urlCategory+results.category_id)
            .then (data => data.json())
            .then(data =>{
                categoryName = data.name;
                fs.appendFile('log.txt',results.id+","+results.title+","+results.category_id+","+categoryName+"\n" ,'utf8' ,function (err) {
                    if (err) throw err;
                }); 
            })
        }) 
        console.log("Se guardaron "+cantItem+" items en log.txt");
    });
}

sellerID.forEach(invocarAPI);
