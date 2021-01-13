var mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://localhost/workshop', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(conn => global.conn = conn.db("workshop"))
    .catch(err => console.log(err))

function findAll(callback){
    global.conn.collection('cliente').find({}).toArray(callback);
}

function insert(customer, callback){
    global.conn.collection('cliente').insertOne(customer, callback);
}

var ObjectId = require("mongodb").ObjectId;

function deleteOne(id, callback){
    global.conn.collection('cliente').deleteOne({_id: new ObjectId(id)}, callback);
}

function findOne(id, callback){
    global.conn.collection("cliente").find(new ObjectId(id)).toArray(callback);
}

function update(id, customer, callback){
    global.conn.collection("cliente").replaceOne({_id: new ObjectId(id)}, customer, callback);
}

/* produto */
function listarProd(callback){
    global.conn.collection('produto').find({}).toArray(callback);
}

function inserirProd(customer, callback){
    global.conn.collection('produto').insertOne(customer, callback);
}

function deletarProd(id, callback){
    global.conn.collection('produto').deleteOne({_id: new ObjectId(id)}, callback);
}

function buscarProd(id, callback){
    global.conn.collection("produto").find(new ObjectId(id)).toArray(callback);
}

function atualizaProd(id, customer, callback){
    global.conn.collection("produto").replaceOne({_id: new ObjectId(id)}, customer, callback);
}

module.exports = { findAll, insert, deleteOne, findOne, update, listarProd, inserirProd, deletarProd, buscarProd, atualizaProd }
