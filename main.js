const HEADER = document.getElementById('header');
var CAROUSEL_IDX = 0;
var CAROUSEL_TOTAL = $("div.slideshow-item").length;

//Event: Navigation
$("#nav-menu").children("a").click(navigate);


$(function() {
    const carousel = $("div.slideshow-wrapper ul");
    const items = carousel.find("li.slideshow-item");
    const itemWidth = carousel.find('li:first').width();
    let clickCount = 0;

    $("a.prev").click(moveLeft);
    $("a.next").click(moveRight);

    refreshChildPosition();

    function moveLeft() {
        clickCount--;
    
        //Find the first item and append it as the last item.
        lastItem = carousel.find('li:last');
        lastItem.remove().prependTo(carousel);
    
        lastItem.css('left', itemWidth*clickCount);				
        //Animate the slider to right as item width 
        carousel.finish().animate({
            left: '+='+itemWidth
        },300);
    }
    
    function moveRight() {
        clickCount++;
            
        //Animate the slider to left as item width 
        carousel.finish().animate({
            left : '-='+itemWidth
        },300, function(){
            //Find the first item and append it as the last item.
            lastItem = carousel.find('li:first');
            lastItem.remove().appendTo(carousel);
            lastItem.css('left', ((items.length-1)*(itemWidth))+(clickCount*itemWidth));
        });
    }
    
    function refreshChildPosition(){
        items.each(function(){
            $(this).css('left', itemWidth*items.index($(this)));
        });
    }
})

//Event: Scroll
window.onscroll = function() {
    scrollFunc()
};

function navigate() {
    var target = this.innerText.toLowerCase();
    var y = $("#"+target).offset().top;
    window.scrollTo(0, y-90);
}


function scrollFunc() {
    //Set navbar position
    if (window.scrollY < 60) {
        const heigth = 100 - window.scrollY; 
        HEADER.setAttribute('style', 'height:'+heigth+'px;');
    } else {
        HEADER.setAttribute('style', 'height: 40px;');
    }

    //Set active 
    document.getElementsByClassName('active-menu')[0].classList.remove('active-menu');
    for (let i = 0; i < document.getElementsByClassName('container').length; i++) {
        if (document.getElementsByClassName('container')[i].getBoundingClientRect().y >= 90) {
            i > 0 ? i = i-1 : i = i;
            const id = document.getElementsByClassName('container')[i].id;
            document.querySelectorAll("a#nav-"+id)[0].classList.add('active-menu');
            break;
        }
    }
}