const HEADER = document.getElementById('header');

$("#nav-menu").children("a").click(navigate);

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