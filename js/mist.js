(function(){
    const smokeClose = document.querySelector('.smoke__close');
    const smoke = document.querySelector('.smoke');

    smokeClose.addEventListener('click', function() {
        const paragraphs = document.querySelectorAll('.smoke__string');
        
        paragraphs.forEach(paragraph => {
            const spans = paragraph.querySelectorAll('span');
            spans.forEach((span, index) => {
                setTimeout(() => {
                    if (index % 2 === 0) {
                        span.style.animation = 'smoky-mirror 3s both';
                    } else {
                        span.style.animation = 'smoky 3s both';
                    }
                }, index * 100); // Задержка для каждого спана в пределах одного <p>
            });
        });
    
        setTimeout(() => {
            smokeClose.style.animation = 'smoky2 3s both';
        }, 5000);
    
        setTimeout(() => {
            const before = document.querySelector('.smoke__close::before');
            const after = getComputedStyle('.smoke__close::after');
            before.style.animation = 'close-smoky 3s both';
            after.style.animation = 'close-smoky 3s both';
        }, 5000);

        setTimeout(() => {
            smoke.style.animation = 'smoke_wrapper 3s both';
        }, 7000);
        setTimeout(() => {
            smoke.style.display = 'none';
        }, 9000);
    });    
})();