var start = new Date().getTime();
var end = new Date().getTime();
var startingPonit = {x: 0, y: 0};
var endingPonit = {x: 0, y: 0};
var mousePosition = {x: 0, y: 0};

const colors = [
  "#6A27D9",
  "#278FD9",
  "#6F8BD9",
  "#C1C9E0",
];

const fontSizes = ["1rem", "0.5rem", "0.25rem"];
const animations = ["fall1", "fall2", "fall3"];

function selectRandom(arr = []){
  return arr[Math.floor(Math.random() * arr.length)];
}

function createGlowPoint(position) {
  const glow = document.createElement("div");
  
  glow.className = "glow";
  
  glow.style.left = `${position.x}px`
  glow.style.top = `${position.y}px`
  
  document.body.appendChild(glow)
  
  setTimeout(() => {
    document.body.removeChild(glow)
  }, 75)
}

function validations(){

  if (end - start > 50 && calcDistBetweenPoints(startingPonit, endingPonit) > 25) {
    return true;
  }
  return false;
}

function calcDistBetweenPoints(point1, point2){
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
}

function updateState(point ){
  end = new Date().getTime();
  endingPonit = point
}

function handleEffect(point){
  const star = document.createElement('span')

  const color = selectRandom(colors);

  star.classList.add('star')
  star.classList.add('fa-solid')
  star.classList.add("fa-star")
  star.style.left = `${point.x}px`
  star.style.top = `${point.y}px`
  star.style.color = color
  star.style.fontSize = selectRandom(fontSizes);
  star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
  star.style.animationName = selectRandom(animations);

  document.body.appendChild(star)
  setTimeout(() => {
    star.remove()
  }, 1500)
 
}

window.onmousemove = e => {
  const point = {
    x: e.clientX,
    y: e.clientY
  }
  updateState(point);

  createGlow(mousePosition, point)
  if (validations() ) {
    handleEffect(endingPonit)
    start = end
    startingPonit = endingPonit
  }

  mousePosition = point
  
}

const determinePointQuantity = distance => Math.max(
  Math.floor(distance / 10),
  1
);

const createGlow = (last, current) => {
  const distance = calcDistBetweenPoints(last, current),
        quantity = determinePointQuantity(distance);
  
  const dx = (current.x - last.x) / quantity,
        dy = (current.y - last.y) / quantity;
  
  Array.from(Array(quantity)).forEach((_, index) => { 
    const x = last.x + dx * index, 
          y = last.y + dy * index;
    
    createGlowPoint({ x, y });
  });
}