var express = require('express');
var router = express.Router();
var controller = require('../controller');
var multer  = require('multer')
var pdfreader = require("pdfreader");
var fs = require('fs');

var pdfParser = new pdfreader.PdfReader();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.pdf');
  }
})
 
var upload = multer({ storage: storage })

router.get('/', function(req, res, next) {
  res.render('index', { title: 'TapSearch', status:'' });
});

router.post('/search', function(req, res, next) {
  controller.para.indexPara(req,res);
});

router.post('/fileSearch', upload.single('document'), function(req, res, next) {
  try {
    var file = req.file;
    if(!file) {
      res.render('index', { title: 'TapSearch' });
      res.sendStatus(400);
      return;
    }

    var rows = {};
    var text="";

    function printRows() {
      Object.keys(rows)
        .sort(function (y1, y2) {parseFloat(y1) - parseFloat(y2)})
        .forEach(function (y) {text += (rows[y] || []).join("") });
      }
      
    pdfParser.parseFileItems(file.path, function(
      err,
      item
      ) {
        if (!item || item.page) {
          printRows();
          controller.para.indexPDF(text);
          res.render('search', { title: 'TapSearch' });
          rows = {};
      } else if (item.text) {
        (rows[item.y] = rows[item.y] || []).push(item.text);
      }
    });    
  } catch (err) {
    res.sendStatus(400);
    return;
  }
});

router.get('/search/', function(req, res, next) {
  res.render('search', { title: 'TapSearch' });
});

router.post('/ans/', function(req, res, next) {
  controller.para.search(req,res);
});
router.get('/ans/', function (req,res,next) {
  res.render('ans', { sorted: null, title: 'Answer from router' });  
})

router.delete('/',function(req, res, next) {
  controller.para.clear(req,res);
});


module.exports = router;
