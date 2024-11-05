const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.use('/img', express.static('img'));

const db = new sqlite3.Database('./pre.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the Present database.');
    }
});

db.all('SELECT * FROM raw_material', (err, rows) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(rows);
});

app.get('/raw_material', (req, res) => {
    db.all('SELECT * FROM raw_material', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});
 
app.post('/raw_material', (req, res) => {
    const { rawmaterialid, name, rawmaterialprices_kg, image } = req.body;
    const query = `INSERT INTO raw_material (rawmaterialid, name, rawmaterialprices_kg, image) VALUES (?, ?, ?)`;
    db.run(query, [rawmaterialid, name, rawmaterialprices_kg, image], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.rawmaterialid, name, rawmaterialprices_kg, image });
    });
});
 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'menu.html'));
});
 
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


