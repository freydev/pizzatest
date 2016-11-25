document.addEventListener('DOMContentLoaded', event => {
    resize();
    
    window.addEventListener('resize', () => {
        resize();
    })

    function resize() {
        let elements = document.querySelectorAll('[data-hide-rate]');
        for (var i = elements.length; i--;) {
            elements[i].style.display = 'table-cell';
        }

        let hiddenRate = [];

        if (window.innerWidth < 1000) hiddenRate.push(1)
        if (window.innerWidth < 950) hiddenRate.push(2)
        if (window.innerWidth < 900) hiddenRate.push(3)
        if (window.innerWidth < 800) hiddenRate.push(4)
        if (window.innerWidth < 700) hiddenRate.push(5)
        if (window.innerWidth < 600) hiddenRate.push(6)

        for (var i1 = hiddenRate.length; i1--;) {
            let elements = document.querySelectorAll('[data-hide-rate=\'' + hiddenRate[i1] + '\']')
            for (var i = elements.length; i--;) {
                elements[i].style.display = 'none';
            }
        }        
    }
});