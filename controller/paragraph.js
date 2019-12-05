var paragraph = {};
var wordIndex = {};

paragraph.indexPara = function(req, res) {
    var doc = req.body.doc;
    doc = doc.toLowerCase();

    if(doc=="") {
        res.render('index', { title: 'TapSearch', status:'Please enter a document!' , fileStatus:''});
        return;
    }
    var paras = doc.split(/\n\s*\n/g);
    paras.forEach(function (para, index) {
        var words = para.split(/\s/g);   
        words.forEach(function (word) {
            word = word.replace(/[.,]/g, '');
            if(wordIndex[word]===undefined) {
                wordIndex[word] = {};
            }
            wordIndex[word][index] = (wordIndex[word][index] ===  undefined ? 1 : wordIndex[word][index]+1); 
        })  
    });
    res.render('search', { title: 'TapSearch' });
}

paragraph.indexPDF= function(text, res) {
    var doc = text.toLowerCase();
    var paras = doc.split(/\n\s*\n/g);
    paras.forEach(function (para, index) {
        var words = para.split(/\s/g);   
        words.forEach(function (word) {
            word = word.replace(/[.,]/g, '');
            if(wordIndex[word]===undefined) {
                wordIndex[word] = {};
            }
            wordIndex[word][index] = (wordIndex[word][index] ===  undefined ? 1 : wordIndex[word][index]+1); 
        })  
    });
}

paragraph.search = function(req, res) {
    var keyword = req.body.keyword.toLowerCase();
    if(wordIndex[keyword]===undefined) {
        res.statusMessage = keyword + ' is not present';
        res.render('noans', { statusmessage: res.statusMessage, title: 'Answer not present' });  
        return;
    }

    var sorted = Object.keys(wordIndex[keyword]).sort(function (a,b) {
        return wordIndex[keyword][b] - wordIndex[keyword][a]; 
    })
    
    for (var i=0; i<sorted.length; i++) {
        sorted[i]++;
    }
    res.render('ans', { sorted: sorted.slice(0,10), title: 'Success!!', keyword });  
}

paragraph.clear = function(req, res) {
    paragraph = {};
    wordIndex = {};
    res.redirect('/');
}

module.exports = paragraph;