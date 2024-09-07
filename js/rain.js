'use strict';

var ScreenSize = {
    width: innerWidth,
    height: innerHeight
};

var getRandomValue = function (min, max){
    return Math.random() * (max - min) + min;
};

//конструктор - описывает капли дождя
var Raindrop = function (){
    this._reset();
};
//отрисовывает капли на странице, принимает на вход канвас(ctx)
Raindrop.prototype.render = function (ctx){
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);                           //ставим точку
    ctx.lineTo(this.x + this.size, this.y - this.size);   //рисуем линию под углом
    ctx.closePath();
    ctx.stroke();
};
//изменяем координаты капель, смещаем по 'x' и 'y'
Raindrop.prototype.update = function (){
    this.x += this.hVelocity;       //добавляем 2 параметра: горизонтальная скорость и вертикальная скорость (тут можно вести все что угодно, хоть 1,2,3 - просто мы ввели эти параметры что бы расчитать скорость полета капли в зависимости от ее размера)
    this.y += this.velocity;
    //проверка того что капли ушли за экран, если это так то мы рисуем ее заново
    if(this.isOffscreen()){
        this._reset();
    }
};
//проверка того что капли ушли за экран, если это так то мы рисуем ее заново
Raindrop.prototype.isOffscreen = function (){
    return this.y > ScreenSize.height + this.size ||    //сравниваем координаты капли с размерами экрана
           this.x > ScreenSize.width + this.size ||
           this.x < -this.size;
};
//свойства капли
Raindrop.prototype._reset = function (){
    this.size = getRandomValue(1, 6);     //размер капли
    
    this.x = getRandomValue(-ScreenSize.width * 0.3, ScreenSize.width * 1.6);     //координата капли на экране
    this.y = getRandomValue(0, ScreenSize.height);                                //координата капли на экране
    
    this.velocity = this.size;          //расчитываем скорость полета капли
    this.hVelocity = -this.size / 3;    //расчитываем скорость полета капли
};

/*
var Cucumber = function(){
    Raindrop.call(this);
};

Cucumber.prototype = Object.create(Raindrop.prototype);

Cucumber.prototype.render = function (ctx){
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.size * 3, this.angle, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
};

Cucumber.prototype.update = function(){
    Raindrop.prototype.update.call(this);
    this.angle += 0.01;
};

Cucumber.prototype._reset = function(){
    Raindrop.prototype._reset.call(this);
    this.angle += getRandomValue(0, Math.PI * 2);
};
*/


var cleanupFrame = function (ctx){
    ctx.clearRect(0, 0, ScreenSize.width, ScreenSize.height);
};

//функция которая отрисовывает капли
var renderFrame = function (ctx, raindrops){
    cleanupFrame(ctx);                  //чистит предыдущий кадр и 
                                        //        \/  заново отрисовывает капли которые обновились
    raindrops.forEach(function (it){    //проходим по всему массиву капель
        it.render(ctx);                 //и отрисовываем их на канвасе
        it.update();                    //
    });
    //бесконечный цикл. Мы из этой функции (renderFrame) запускаем с небольшим таймаутом еще один renderFrame, который чистит предыдущий кадр и заново отрисовывает все капли которые обновились
    requestAnimationFrame(renderFrame.bind(null, ctx, raindrops));
};

var setup = function(){
    var drops = 2000;       //количество капель
    var canvas = document.querySelector('#rain');
    var ctx = canvas.getContext('2d');
    
    canvas.width = ScreenSize.width;
    canvas.height = ScreenSize.height;

    var raindrops = new Array(drops)    //создали массив размером 600 елементов
        .fill('')                       //и заполняем его обьектами
        .map(function(){
            return new Raindrop();      //которые являются каплями
        });

    renderFrame(ctx, raindrops);        //функция которая отрисовывает капли
};

setup();
