(function(){
document.addEventListener('DOMContentLoaded', () => { // Дождаться полной загрузки DOM перед выполнением кода
const slides = document.querySelector('.slider__slides'); // Выбрать контейнер для слайдов
const slideCount = document.querySelectorAll('.slider__slide').length; // Посчитать количество слайдов
let currentIndex = 0; // Инициализировать индекс текущего слайда как 0

const updateSlidePosition = () => { // Определить функцию для обновления позиции слайдов
    slides.style.transform = `translateX(-${currentIndex * 100}%)`; // Переместить контейнер слайдов по горизонтали для отображения текущего слайда
};

document.querySelector('.slider__left').addEventListener('click', () => { // Добавить обработчик клика для стрелки влево
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slideCount - 1; // Уменьшить индекс, или перейти к последнему слайду
    updateSlidePosition(); // Обновить позицию слайдов после изменения индекса
});

document.querySelector('.slider__right').addEventListener('click', () => { // Добавить обработчик клика для стрелки вправо
    currentIndex = (currentIndex < slideCount - 1) ? currentIndex + 1 : 0; // Увеличить индекс, или перейти к первому слайду
    updateSlidePosition(); // Обновить позицию слайдов после изменения индекса
});

updateSlidePosition(); // Установить начальную позицию слайдов
});
})();