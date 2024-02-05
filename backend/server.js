const cors = require('cors')
require('dotenv').config()
const Airtable = require('airtable')
const express = require('express')
const app = express()

app.use(cors())

const base = new Airtable({apiKey: process.env.API_KEY}).base('appgxnMTUbADkra8u')

const table = base('Table 1');

const getRecords = () => {
    return new Promise((resolve, reject) => {
        table.select({
            view: 'Grid view',
            fields: ['Name', 'Quote']
        }).firstPage((err, records) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const data = records.map(record => ({
                    id: record.id,
                    name: record.get('Name'),
                    quote: record.get('Quote')
                }));
                resolve(data);
            }
        });
    });
    }
    
app.get('/data',  async (req, res) => {
    
    try{
        const data =await getRecords()
        res.json(data);
    }
    catch(e){
        res.status(500).send('Error retrieving data from Airtable');
    }
})



app.listen(3000, () => console.log("Server listening on port 3000"))