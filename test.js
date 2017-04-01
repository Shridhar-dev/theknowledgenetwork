var request = require('request');
var xml2js = require('xml2js');


function search(term, done)
{
    request('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term='+term+'&reldate=60&datetype=edat&retmax=100&usehistory=y&retmode=JSON', function (error, response, body) {
        var result = JSON.parse(body);
        done(result.esearchresult.idlist);
    });
}

function fetchAbstracts(ids, done) {
    var idString = ids.join(',');
    var parser = new xml2js.Parser();

    request('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id='+ idString + '&retmode=xml&rettype=abstract', function(error, reponse, body){
        var result = parser.parseString(body, function(err, result){
            done(result);
        })
    })
}

search('cancer', function(ids){
    fetchAbstracts(ids, function(abs){
        console.log(abs.PubmedArticleSet.PubmedArticle[0]); 
    });
});
