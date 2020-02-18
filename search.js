const searchInput = document.getElementById("search-input");
const items = Array.from(document.getElementById("list-items").children, function(li){
    return {
        text: li.textContent,
        style: li.style,
        pre: li.firstChild,
        match: li.appendChild(document.createElement('span'))
                .appendChild(document.createTextNode("")),
        post: li.appendChild(document.createTextNode(""))
    }
});

function show (style) {
    style.height = '19px';
    style.opacity = 1;
    style.overflow = 'visible';
}

function hide (style) {
    style.height = 0;
    style.opacity = 0;
    style.overflow = 'hidden';
}

function searchAction () {
    const term = searchInput.value;
    var regx = new RegExp(term, 'i');

    for (var {text, style, pre, match, post} of items) {
        var matched = text.match(regx);
        if (matched) {
            pre.nodeValue = text.slice(0, matched.index);
            match.nodeValue = matched[0];
            post.nodeValue = text.slice(matched.index + matched[0].length);
            show(style);
        } else {
            hide(style);
        }
    }
}

var timeoutThings = {
    id : null,
    restart : function(thingsToDo) {
        cancelAnimationFrame(this.id);
        this.id = requestAnimationFrame(thingsToDo);
    }
}

var searchActivateEvent = function () {
    timeoutThings.restart(searchAction);
}

searchInput.addEventListener('keyup', searchActivateEvent, false);