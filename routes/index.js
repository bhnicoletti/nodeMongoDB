var express = require('express');
var flash = require('connect-flash');
var router = express.Router();
var data = {};
var msg = 0;

/*GET home page.*/
router.get('/', function (req, res) {
  global.db.listarProd((err, docs) => {
    if (err) { return console.log(err); }
    var data = {
      titulo: "Loja de Produtos",
      rota: "",
      rotaUrl: ""
    }
    res.render('loja', { docs, data, msg});
    msg = 0;
  });
});

/*GET home page.*/
router.get('/clientes', function (req, res) {
  global.db.findAll((err, docs) => {
    if (err) { return console.log(err); }
    var data = {
      titulo: "Lista de Clientes",
      rota: "clientes",
      rotaUrl: "clientes"
    }
    res.render('clientes', { docs,  data, msg});
    msg = 0;
  });
});

/* GET new page. */
router.get('/cliente', function(req, res, next) {
  var data = {
    titulo: "Novo Cadastro de Cliente",
     rota: 'cliente',
     rotaUrl: "clientes"
  }
  res.render('cliente', { data, msg, doc: {"nome":"","idade":"","uf":""}, action: '/cliente' });
  msg = 0;
});

/* POST new page. */
router.post('/cliente', function (req, res, next) {
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;
  global.db.insert({ nome, idade, uf }, (err, result) => {
    if (err) { return console.log(err); }
    msg = 1;
    res.redirect('/clientes');
  });
});

/* GET edit page. */
router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (err, docs) => {
      if(err) { return console.log(err); }
      var data ={
        titulo: "Alterar Cliente",
        rota: docs[0].nome,
         rotaUrl: docs[0]._id
      }
      res.render('cliente', { data, msg, doc: docs[0], action: '/edit/' + docs[0]._id });
      msg = 0;
    });
});

/* POST edit page. */
router.post('/edit/:id', function(req, res, next) {
  const id = req.params.id;
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;
  global.db.update(id, {nome, idade, uf}, (err, result) => {
        if(err) { return console.log(err); }
        msg = 1;
        res.redirect('/clientes');
    });
});

/* GET delete page. */
router.get('/delete/:id', function (req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (err, r) => {
    if (err) { return console.log(err); }
    msg = 1;
    res.redirect('/clientes');
  });
});

/* produto */
/* listar todos*/
router.get('/produtos', function (req, res) {
  global.db.listarProd((err, docs) => {
    if (err) { return console.log(err); }
    var data = {
      titulo: "Lista de Produtos", rota: "produtos", rotaUrl: "produtos"
    }
    res.render('produtos', { docs, data, msg });
    msg = 0;
  });
});
/*Lista produtos loja*/
router.get('/loja', function (req, res) {
  global.db.listarProd((err, docs) => {
    if (err) { return console.log(err); }
    var data = {
      titulo: "Loja de Produtos", rota: "", rotaUrl: ""
    }
    res.render('loja', { docs, data, msg  });
  });
});

/* GET new page. */
router.get('/produto', function(req, res, next) {
  var data = {
    titulo: "Novo Cadastro de Produto", rota: "produto", rotaUrl: 'produto'
  }
  res.render('produto', { data, msg, doc: {"descProduto":"","vlrCompra":"","vlrVenda":""}, action: '/produto' });
  msg = 0;
});

/* POST new page. */
router.post('/produto', function (req, res, next) {
  const descProduto = req.body.descProduto;
  const vlrCompra = req.body.vlrCompra;
  const vlrVenda = req.body.vlrVenda;
  console.log(req.body.vlrCompra);
  console.log(vlrCompra);
  global.db.inserirProd({ descProduto, vlrCompra, vlrVenda }, (err, result) => {
    if (err) { return console.log(err); }
    msg = 1;
    res.redirect('/produtos');
  });
});

/* GET edit page. */
router.get('/editProd/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.buscarProd(id, (err, docs) => {
      if(err) { return console.log(err); }
      var data = {
        titulo: "Alterar Produto", rota: docs[0].descProduto, rotaUrl:docs[0]._id
      }
      res.render('produto', { data, msg, doc: docs[0], action: '/editProd/' + docs[0]._id });
      msg = 0;
    });
});
/*Pagina produto*/
router.get('/lojaProd/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.buscarProd(id, (err, docs) => {
      if(err) { return console.log(err); }
      var data = {
        titulo: docs[0].descProduto,
        rota: docs[0].descProduto,
        rotaUrl:docs[0]._id, action: '/lojaProd/' + docs[0]._id
      }
      res.render('lojaProd', { data, msg,  doc: docs[0]});
      msg = 0;
    });
});

/* POST edit page. */
router.post('/editProd/:id', function(req, res, next) {
  const id = req.params.id;
  const descProduto = req.body.descProduto;
  const vlrCompra = req.body.vlrCompra;
  const vlrVenda = req.body.vlrVenda;
  global.db.atualizaProd(id, {descProduto, vlrCompra, vlrVenda}, (err, result) => {
        if(err) { return console.log(err); }
        msg = 1;
        res.redirect('/produtos');
    });
});

/* GET delete page. */
router.get('/deleteProd/:id', function (req, res) {
  var id = req.params.id;
  global.db.deletarProd(id, (err, r) => {
    if (err) { return console.log(err); }
    msg = 1;
    res.redirect('/produtos');
  });
});

module.exports = router;
