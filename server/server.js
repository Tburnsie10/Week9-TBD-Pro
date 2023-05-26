const pg = require('pg');
const express = require('express');

const app = express();

app.use(express.json())
app.use(express.static('server/public'))

const DB_PASSWORD = process.env.DB_PASSWORD;

const pool = new pg.Pool({
  host: '127.0.0.1',
  port: 5432,
  database: 'tbd',
  user: 'tylerburns',
  password: DB_PASSWORD,
});

app.get('/books', (req, res) => {
    let queryText = 'SELECT * FROM books;'
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows);
    })
})

/* router.post('/', (req, res) => {
    const newSong = req.body;
    const queryText = `
        INSERT INTO songs 
            (artist, track, published, rank)
        VALUES 
            ('${newSong.artist}', '${newSong.track}', '${newSong.published}', ${newSong.rank});
    `;
    console.log(`The query we're sending to postgres:`, queryText);
    pool.query(queryText)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        });
}); */

app.post('/books', (req, res) => {
    let data = req.body
    console.log(data)
    let title = data.title
    let text = data.text
    let insertQuery = `INSERT INTO books (title, text)
                       VALUES 
                            ('${title}','${text}');`
    pool.query(insertQuery)
    .then((result) => {
       console.log('inserted:' +title+", "+text ) 
    })
    res.sendStatus(200);
})

app.listen(8000, () => {
    console.log('Shes a runnin on choppa localhost:8000');
});


/* 
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM songs;';
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        });
}); */