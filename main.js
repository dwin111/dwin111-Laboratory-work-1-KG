const canvas = document.getElementById('myCanvas');
const buttonClear = document.getElementById('clearButton');
const ctx = canvas.getContext('2d');
var click = 0;
var x = 0,y = 0,x1 = 0,y1 = 0;

ctx.font = '10px Arial';
ctx.fillStyle = 'black';

function drawEquilateralTriangle(x1, y1, x2, y2, color, vertexType) {
    const sideLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    // Обчислюємо координати третьої вершини трикутника
    const x3 = (x1 + x2) / 2 + Math.sqrt(3) * (y2 - y1) / 2;
    const y3 = (y1 + y2) / 2 - Math.sqrt(3) * (x2 - x1) / 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    if (vertexType === 'square') {
        ctx.fillRect(x1 - 5, y1 - 5, 10, 10);
        ctx.fillRect(x2 - 5, y2 - 5, 10, 10);
        ctx.fillRect(x3 - 5, y3 - 5, 10, 10);
    } else if (vertexType === 'circle') {
        ctx.beginPath();
        ctx.arc(x1, y1, 5, 0, 2 * Math.PI);
        ctx.arc(x2, y2, 5, 0, 2 * Math.PI);
        ctx.arc(x3, y3, 5, -5, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}



buttonClear.addEventListener('click', function(event){
    location.reload();
});

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    if(click == 1 ){
        x1 = event.clientX - rect.left;
        y1 = event.clientY - rect.top;
        click ++;
    }
    else if(click == 0){
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
        click++;
       }

    if(x*y*x1*y1 !=0 && click >1){
    drawEquilateralTriangle(x, y, x1, y1, document.getElementById('color-picker').value, document.getElementById('vertex-type').value);
    click=0;
    x = 0;
    y = 0
    x1 = 0;
    y1 = 0;
    }
});

document.getElementById('vertex-type').addEventListener('change', function() {
    clearCanvas();
});

document.getElementById('color-picker').addEventListener('input', function() {
    clearCanvas();
});
// Настройка масштаба
const scale = 20;
// Отрисовка осей
function drawAxes() {
  ctx.beginPath();
  ctx.moveTo(-canvas.width, canvas.width/2);
  ctx.lineTo(canvas.width, canvas.width/2);
  ctx.strokeStyle = 'black';
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(canvas.height/2, -canvas.height);
  ctx.lineTo(canvas.height/2, canvas.height);
  ctx.strokeStyle = 'black';
  ctx.stroke();
}

// Отрисовка сетки
function drawGrid() {
  for (let i = -canvas.width  / scale; i <= canvas.width  / scale; i++) {
    if (i === 0) continue;

    ctx.beginPath();
    ctx.moveTo(i * scale, -canvas.height );
    ctx.lineTo(i * scale, canvas.height);
    ctx.strokeStyle = 'lightgray';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-canvas.width , i * scale);
    ctx.lineTo(canvas.width, i * scale);
    ctx.strokeStyle = 'lightgray';
    ctx.stroke();
  }
}
// Очистка холста
function clearCanvas() {
  ctx.clearRect(-canvas.width, -canvas.height, canvas.width, canvas.height);
}
function drawCanvas(){
    for(var y = 20; y < canvas.height / 2 + 1; y+=scale){
        ctx.fillText((y / scale) * -1, canvas.width / 2 - 15, canvas.height / 2 + y );
        ctx.fillText((y / scale), canvas.width / 2 - 15, canvas.height / 2 - y);
    }
    for(var x = 0; x < canvas.width / 2; x+=scale){
        ctx.fillText((x / scale), canvas.width / 2 + x, canvas.height / 2 + 12);
        ctx.fillText((x / scale) * -1, canvas.width / 2 - x, canvas.height / 2 + 12);
    }
    // Додаємо підписи до осей
    ctx.fillText('X', canvas.width - 10, canvas.height / 2 + 10);
    ctx.fillText('Y', canvas.width / 2 - 10, 10);
    // Запуск отрисовки
    drawAxes();
    drawGrid();
}
drawCanvas();

// Обработка события изменения масштаба
document.getElementById('scale').addEventListener('change', () => {
  scale = document.getElementById('scale').value;
  clearCanvas();
  drawAxes();
  drawGrid();
});

