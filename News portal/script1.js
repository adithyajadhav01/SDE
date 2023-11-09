var cat;
var count;
var cc;

function doSomething(){
    cat = document.querySelector('input[name="category"]:checked').id;
    cc = document.querySelector('input[name="cc"]:checked').id;
    count = document.getElementById('count').selectedIndex + 1 ;
    document.querySelector('form').remove();
    News(count,cat,cc);
}

function News(count, cat, cc){
    const options = {
        method: 'GET',
        headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Key': '3ea0fb695cmshcc44272fbd4c5acp14fc6cjsn7dc6bc61783e',
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
    };

    var url = 'https://bing-news-search1.p.rapidapi.com/news?count=' + count + '&category=' + cat + '&cc=' + cc + '&safeSearch=Off&textFormat=Raw';
    var tree = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
        var link = document.createElement("h5");
        link.setAttribute("id", "id"+i);
        link.setAttribute("class", "heading");
        link.appendChild(document.createTextNode("loading"));
        tree.appendChild(link);

        var div = document.createElement("p");
        div.setAttribute("id", "des"+i);
        div.setAttribute("class", "description");
        div.appendChild(document.createTextNode("divText"));
        tree.appendChild(div);

        var link = document.createElement("a");
        link.setAttribute("id", "url"+i);
        link.setAttribute("class", "refurl");
        link.appendChild(document.createTextNode("loading"));
        tree.appendChild(link);

    }

    document.getElementById("main").appendChild(tree);
    
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < count;i++) {
                var j = i + 1;

                document.getElementById('id'+i).innerHTML ='<hr>' + '<br>' + j + '. Title: ' + data.value[i].name;
                document.getElementById('des'+i).innerHTML = 'Description:'.bold() + data.value[i].description;
                document.getElementById('url'+i).setAttribute("href",data.value[i].url);
                document.getElementById('url'+i).innerHTML = 'Reference URL:'.bold() + data.value[i].url;

            }

        })
        .catch(err => console.error(err));
}
