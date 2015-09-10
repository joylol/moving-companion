
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;
    console.log(address);
    $body.append('<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '">');

    var nytAPI = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&sort=newest&api-key=011a93d67d31c89cab170295994b78af:6:72926236';
    $.getJSON(nytAPI, function(data) {
        console.log(data);

        $nytHeaderElem.text('New York Times Articles About ' + city);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>' + article.snippet + '</p>'+'</li>');
        };

    });

    return false;
};

$('#form-container').submit(loadData);
