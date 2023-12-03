$(()=>{
    const image = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"];
    let x = 0;
    let timer = setTimeout(show, 0, 0);

    const slider = $("#slider");
    slider.append('<div id="slide"></div><div id="thumb"></div><div id="progress"></div>')
        .css({
            position: 'relative',
            margin: 'auto',
            width: '80%',
            height: '80vh',
            boxShadow: '0 0 10px #666',
            overflow: 'hidden'
        })
        .click(function(e){
            if (e.pageX > $("body").width() / 2) show(1); 
            else show(-1);
        })

    const slide = $("#slide");
    slide.css({
        position: 'absolute',
        height: '100%',
        width: '100%',
    })
    
    const thumb = $("#thumb");
    thumb.css({
            position: 'absolute',
            width: '100%',
            bottom: 0,
            textAlign: 'center'
    })

    const progress = $("#progress");
    progress.css({
            position: 'absolute',
            top: '1px',
            height: '3px',
            width: 0,
            background: 'rgba(255,255,255,.4)',
            boxShadow: '0 0 3px #333'
    })

    image.forEach(img => thumb.append(`<img src="../img/${img}" alt="" />`));
    $("#thumb>img")
        .css({
            width: '1em',
            height: '1em',
            objectFit: 'cover',
            borderRadius: "50%",
            margin: '0 3px',
            border: '1px solid #fff'
        })
        .click(function(e) {
            e.stopPropagation();
            x = $(this).index() - 1;
            show(1);
        })
    
    function show(dir){
        clearTimeout(timer);
        x += dir;
        if(x < 0) x = image.length - 1;
        if(x >= image.length) x = 0;
        slide
            .css({ 
                left: `${100 * dir}%`,
                background: `url('../img/${image[x]}') center/cover`
            })
            .animate({ 'left': `0`}, function() {
                slider.css({background: `url('../img/${image[x]}') center/cover`})
            });
        progress
            .stop()
            .css( { width: 0 } )
            .animate({ width: '100%' }, 3000, 'linear');
        timer = setTimeout(show, 3000, 1);
    }
})