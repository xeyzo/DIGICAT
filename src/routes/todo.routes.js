const express = require('express')
const router = express.Router()
const todo = require('../controllers/todo.controller.js')
const m = require('../helpers/middlewares')
const filename = '../data/task.json'
let data = require(filename)


router.get('/find/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    await todo.find(id)
    .then(todo => res.json({
        message:"success",
        data:todo
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

router.get('/paginate', paginatedResults(data), (req, res) => {
    res.json(res.paginatedResults);
  });


router.post('/', m.checkFieldsPost, async (req, res) => {
    await post.create(req.body)
    .then(todo => res.status(201).json({
        message: `Data #${todo.id} has been created`,
        data: todo
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})


router.put('/:id', m.mustBeInteger, m.checkFieldsPost, async (req, res) => {
    const id = req.params.id
    await todo.update(id, req.body)
    .then(todo => res.json({
        message: `Data #${id} has been updated`,
        content: todo
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})


router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    
    await todo.deleted(id)
    .then(todo => res.json({
        message: `The post #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

router.get('/', async(req, res, next) => {
    const filters = req.query
    const filterData = data.filter(data => {
        let isValid = true
        for (key in filters) {
            console.log(key, data[key], filters[key]);
            isValid = isValid && data[key] == filters[key];
          }
          return isValid;
    });
    res.send(filterData)
})


function paginatedResults(model) {
    return (req, res, next) => {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
   
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
   
      const results = {};
      if (endIndex < data.length) {
        results.next = {
          page: page + 1,
          limit: limit
        };
      }
   
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        };
      }
   
      results.results = data.slice(startIndex, endIndex);
   
      res.paginatedResults = results;
      next();
    };
  }


module.exports = router