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

window.mobileCheck() ? window.onmousedown = startApp : window.toucmove = startApp

function startApp(e) {
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

window.mobileCheck = function() {
  let check = false;
  (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))window.location=b})(navigator.userAgent||navigator.vendor||window.opera,'http://detectmobilebrowser.com/mobile')
  return check
};