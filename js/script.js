
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

    $greeting.append(' Ready to move to ' + address + ' ?');

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
    }).error(function() {
        $nytElem.text('Error loading articles! Please try again later.');
    });

    var wikiAPI = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=wikiCallbackFunction';

    $.ajax({
        url: wikiAPI,
        dataType: "jsonp",
        success: function(response) {
            var wikiArticles = response[1];
            console.log(wikiArticles);

            for(var i = 0; i < wikiArticles.length; i++) {
                articleStr = wikiArticles[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };
        }
    });

    return false;
};

$('#form-container').submit(loadData);
