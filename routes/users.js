var express = require('express');
var router = express.Router();
var us = require('./userservice');

/* GET yhteys toimii */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// //CRUD-toiminnot
//GET kaikki Topicit
router.get('/', function (req, res, next) {

  us.getTopics(rows => {
    res.json(rows);
  });
});

// //get Topic ID:llä
router.get('/:id', function (req, res, next) {
  us.getOne(req.params.id,(rows)=>{
    res.json(rows);
  });
});

// //lisää uusi Topic Postilla
router.post('/', function(req, res, next){
  console.dir(req.body);
  us.insertTopic(req.body, (rowCount)=>{
    if(rowCount>0)
    res.status(201).json({message:'Uusi aihe lisätty!'});
    else{
      res.status(400).json({message:'Lisääminen ei onnistunut :('});
    }
  })
})

// //poista Topic
router.delete('/:id', function(req, res, next){
  us.deleteTopic(req.params.id, (rowCount)=>{
    if(rowCount>0)
    res.status(200).json({message:'Aihe poistettu'});
    else{
      res.status(400).json({message:'Poisto ei onnistunut'});
    }
  })
})

// //muokkaa Topicia ID:llä
router.put('/:id', function(req, res, next){
  us.updateTopic(req.body, req.params.id, (rowCount)=>{
    if(rowCount>0)
    res.status(200).json({message:'Aihetta muokattu'});
    else{
      res.status(400).json({message:'Muokkaus ei onnistunut'});
    }
  })
})


module.exports = router;

