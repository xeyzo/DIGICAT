const filename = '../data/task.json'
let todo = require(filename)
const helper = require('../helpers/helper.js')

function get() {
    return new Promise((resolve, reject) => {
        if (todo.length === 0) {
            reject({
                message: 'no data',
                status: 401
            })
        }
        resolve(todo)
    })
}
function find(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(todo, id)
        .then(todo => resolve(todo))
        .catch(err => reject(err))
    })
}
function create(newPost) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(posts) }
        newData = { ...id, ...newData }
        todo.push(newData)
        helper.writeJSONFile(filename, todo)
        resolve(newData)
    })
}


function update(id, newData) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
        .then(data => {
            const index = data.findIndex(p => p.id == data.id)
            id = { id: data.id }
            todo[index] = { ...id, ...newData }
            helper.writeJSONFile(filename, todo)
            resolve(todo[index])
        })
        .catch(err => reject(err))
    })
}
function deleted(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(todo, id)
        .then(() => {
            todo = todo.filter(p => p.id !== id)
            helper.writeJSONFile(filename, todo)
            resolve()
        })
        .catch(err => reject(err))
    })
}
module.exports = {
    create,
    get,
    find, 
    update,
    deleted
}