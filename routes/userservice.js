//tämä menee kantaan
const Pool = require('pg').Pool;
const conopts = {
  user: 'postgres',
  password: 'La1vaLa1va',
  host: 'localhost',
  database: 'viikkoprojekti'
  //port: 5432
}

const pool = new Pool (conopts);

//hae kaikki
const getTopics=(callback)=>{
    pool.query("SELECT * FROM topic", (error, data) => {
        console.dir(error)
        console.dir(data.rows);
        callback(data.rows);
    })
}

//hae ID:llä
const getOne = (id, callback)=> {
    pool.query("SELECT * FROM topic WHERE id=$1", [id], (err, results) => {
        if (err) throw err;
        console.dir(results.rows);
        callback(results.rows);
    })
} 

//lisää uusi Topic
const insertTopic = (newtopic, cb) => {
    const { title, description, timetomaster, timespent, source, startlearningdate, inprogress } = newtopic;
    pool.query('INSERT INTO topic (title, description, timetomaster, timespent, source, startlearningdate, inprogress) VALUES ($1, $2, $3, $4, $5, $6, $7)',
     [title, description, timetomaster, timespent, source, startlearningdate, inprogress], (err, results) => {
        if (err) throw err;
        console.dir(results);
        cb(results.rowCount);
    })
}

const deleteTopic = (id, callback) => {
    pool.query('DELETE FROM topic WHERE id=$1', [id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        callback(results.rowCount);
    })
}

const updateTopic = (aihe,rid, cb) => {
    console.dir(aihe);
    const { title, description, timetomaster, timespent, source, startlearningdate, inprogress } = aihe;
    pool.query('UPDATE topic SET title=$1, description=$2, timetomaster=$3, timespent=$4, source=$5, startlearningdate=$6, inprogress=$7 WHERE id=$8', 
    [title, description, timetomaster, timespent, source, startlearningdate, inprogress, rid], (err, results) => {
        if (err) throw err;
        console.dir(results);
        cb(results.rowCount);
    })
}

module.exports = {getTopics, getOne, insertTopic, deleteTopic, updateTopic};