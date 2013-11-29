var forcedHashChange = false;


function fireSearch() {
    var searchString = $('#search').val();
    //searchString = searchString.replace(/[\/\(\)\[\]\.\?\*]*/g, '');
    //loadArticle('search', false, false, searchString ? searchString : '');
    //$('#search').focus();
    var results = find(searchString);
    showSearchResults(searchString, results);
}

function generateIndex() {
    /* register keyup event to search bar */
    $('#search').bind('keyup', function (evt) {
        //if(evt.keyCode === 13) {
        fireSearch();
        //}
    });

    /* register keyup event to search button */
    $('#searchButton').bind('click', function (evt) {
        fireSearch();
    });

    /* register focus event to search bar */
    $('#search').bind('focus', function (evt) {
        $('#search').val('');
    });

    /* build index */
    index = {};

    $('.left-panel ul .panel-category').each(function () {
        var category = $(this).children('a').text().toLocaleLowerCase();
        $(this).find('.panel-items li a').each(function () {

            var filePath = $(this).attr('href');
            var text = $(this).text();
            $.ajax({
                url: filePath,
                success: function (data) {
                    var site = $(data);
                    var content = '';

                    if (site) {
                        content  += site.find('h1').text();
                        content  += site.find('h2').text();
                        content  += site.find('.subsection-title + ul li').text();
                        content  += site.find('p').text();
                        content  += site.find('.description').text();
                        content  += site.find('ul.dummy li').text();
                        content  += site.find('h4.name').text()
                        content  += site.find('.sunlight-highlight-javascript').text()
                        content  += site.find('.sunlight-javascript').text()

                    }
                    index[text] = {
                        content: content,
                        path: filePath
                    };
                    console.log(index);
                }
            });
        });
    });
}

function find(searchString) {
    var results = [];
    for (var i in index) {
        var position = index[i].content.toLowerCase().indexOf(searchString.toLowerCase());
        if (position >= 0) {
            results.push({
                name: i,
                content: index[i].path,
                position: position,
                path: index[i].path
            });
        }
    }
    return results;
}

function showSearchResults(searchString, results) {
    var html = '';
    if(searchString !== '' && typeof searchString === 'string'){
        html += '<div class="results-wrapper arrow_box"><div id="searchResults"><ul class="result-list">';
        if(typeof results === 'object' && results.length === 0){
            html += '<li class="search-fail">Your search for<span class="searchString"> ' + searchString + ' </span>returned no results</li>';

        }else {
            for (var i in results) {
                var text = filterResult(searchString, index[results[i].name].content, results[i].position);
                html += '<li class="result-item"><h3>' + results[i].name + '</h3>';
                html += '<p class="text">';
                html += text;
                html += '</p>';
                html += '<a class="navlink" href="' + index[results[i].name].path + '">&rarr; goto</a></li>';
            }
        }

        html += '</ul></div></div>';
    }
    $('#search-wrapper').html(html);
}

function filterResult(searchString, result, position) {
    var start = position - 200 >= 0 ? position - 200 : 0;
    var end = position + searchString.length + (start === 0 ? 400 : 200) >= result.length ? result.length : position + searchString.length + (start === 0 ? 400 : 200);
    start = end === result.length ? (position - 400 >= 0 ? position - 400 : 0) : start;
    //result = result.replace(new RegExp('(' + searchString +')', 'gi'), '<span class="highlight">' + RegExp.$1 + '</span>');
    var str = result.substring(start, end);
    result = '';
    while (str.toLowerCase().indexOf(searchString.toLowerCase()) >= 0) {
        result += str.substring(0, str.toLowerCase().indexOf(searchString.toLowerCase())) + '<span class="highlight">' + str.substring(str.toLowerCase().indexOf(searchString.toLowerCase()), str.toLowerCase().indexOf(searchString.toLowerCase()) + searchString.length) + '</span>';
        str = str.substring(str.toLowerCase().indexOf(searchString.toLowerCase()) + searchString.length);
    }
    //console.log(str);
    result += str;
    return (start > 0 ? '... ' : '') + result + (end < result.length ? ' ...' : '');
}

$('document').ready(function () {

    // generate the index
    generateIndex();
});


/**
 * JS for rating system
 */
function buildRating() {
    var ratingStr = '<div id="rating">'
        + '<div id="stars">'
        + '<input type="hidden" value="0" id="starsClicked" />'
        + '<input type="hidden" value="" id="pageRated" />'
        + '<div class="star star-off" id="star1"></div>'
        + '<div class="star star-off" id="star2"></div>'
        + '<div class="star star-off" id="star3"></div>'
        + '<div class="star star-off" id="star4"></div>'
        + '<div class="star star-off" id="star5"></div>'
        + '</div>'
        + '<input type="button" value="send" id="btn" />'
        + '<img src="css/ajax-loader.gif" style="display:none;" />'
        + '</div>';

    $('#container').append(ratingStr);
}

function getStarNumber(el) {
    return parseInt(el.attr('id').charAt(4));
}

function clearAll() {
    $('.star').removeClass('star-on');
    $('.star').addClass('star-off');
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function sendRequest(obj) {
    $.ajax({
        url: 'http://fiddle.jshell.net/favicon.png',
        beforeSend: function (xhr) {
            xhr.overrideMimeType('text/plain; charset=x-user-defined');
        },
        success: function (data) {
            if (console && console.log) {
                console.log('Sample of data:', data.slice(0, 100));
            }
        }
    });
}


