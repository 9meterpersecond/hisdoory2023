document.body.style.backgroundColor = 'gainsboro';


//카테고리 필터링
function filterImages(tag) {
  var images = document.querySelectorAll('#images img');

  for (var i = 0; i < images.length; i++) {
    var image = images[i];

    if (image.dataset.tag.includes(tag)) {
      image.style.display = 'inline-block';
      image.parentElement.style.display = 'inline-block';
    } else {
      image.style.display = 'none';
      image.parentElement.style.display = 'none';
    }
  }
}


//카테고리 버튼
  var buttons = document.getElementsByClassName('filter-button');
  
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      var tag = this.getAttribute('data-tag');
      filterImages(tag);
    });
  }


//지정섹션으로 가기 버튼
function gotosection(sectionId) {
  var section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: 'smooth' });
}


//텍스트박스 커서 따라가게
const textbox = document.getElementById("textbox");

document.onmousemove = (e) => {
  textbox.style.left = e.pageX + "px";
  textbox.style.top = e.pageY - 35 + "px";
}


//이미지 노크소리 data-tag값을 받아서 구분
const images = document.querySelectorAll('#images #image');

images.forEach(image => {
  image.addEventListener('click', function() {
    const dataTag = image.querySelector('img').getAttribute('data-tag');
    if (dataTag.includes('wood')) {
      const audio = new Audio('sound/wood_knock1.mp3');
      audio.play();
      audio.volume = 2.2;
    } else if (dataTag.includes('iron')) {
      const audio = new Audio('sound/irondoor.mp3');
      audio.play();
      audio.volume = 0.5;
    }
  });
});


//회전문
let time = 0;
let mouseX = window.innerWidth * 0.75;
let mouseY = window.innerHeight * 0.5; 
let x = 0;

const opt = {
  radius: 530,
  radiusY: 0.13,
  maxSpeed: 0.01,
  maxRotation: 10,
  minOpacity: 0.7,
  spacer: '*'
};

let rotimages;

const createInvaders = () => {
  const rotateimg = document.getElementById('rotateimg');
  rotimages = rotateimg.getElementsByTagName('img');
};

createInvaders();

const lerp = (a, b, n) => (1 - n) * a + n * b;

// scale 정의
const scale = (number, inMin, inMax, outMin, outMax) =>
  ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

const animate = () => {
  if (!rotimages) return;

  x = lerp(x, mouseX / window.innerWidth, 0.1);
  const rotation = -opt.maxRotation + x * opt.maxRotation * 2;
  const speed = -opt.maxSpeed + x * opt.maxSpeed * 2;
  const modY = 1 + x * -2;

  time -= speed;

  Array.from(rotimages).forEach((image, ind) => {
    const theta = 1 - ind / rotimages.length; //
    const posX = opt.radius * Math.sin(time + theta * Math.PI * 2);
    const posY = opt.radius * opt.radiusY * Math.cos(modY + time + theta * Math.PI * 2);
    const tilt = scale(x, -1, 1, -10, 10); 
    image.style.transform = `translate3d(${posX}px, ${posY}px, 0) rotate(${rotation}deg) rotateX(${tilt}deg)`;
    const opacity = scale(posY, -opt.radius * opt.radiusY, opt.radius * opt.radiusY, opt.minOpacity, 1);
    const zIndex = Math.round((posY + opt.radius * opt.radiusY) / (2 * opt.radius * opt.radiusY) * (rotimages.length - 1));

    image.style.zIndex = zIndex;
    image.style.filter = `blur(${0 - 10 * opacity}px)`;
    image.style.opacity = opacity;
    image.style.transform = `translate3d(${posX}px, ${posY}px, 0) rotate(${rotation}deg) skewY(${tilt}deg)`;
  });

  requestAnimationFrame(animate);
};

animate();
//마우스에 따라 각도 속도 변화
const handleMouse = e => {
  mouseX = e.clientX || e.touches[0].clientX;
  mouseY = e.clientY || e.touches[0].clientY;
  const mouseYPercentage = mouseY / window.innerHeight; //mouseY 값의 화면 높이 비율
  const minRadiusY = -0.2; 
  const maxRadiusY = 0.25; 
  opt.radiusY = minRadiusY + (maxRadiusY - minRadiusY) * mouseYPercentage;
};

window.addEventListener('mousemove', handleMouse);
window.addEventListener('touchstart', handleMouse);
window.addEventListener('touchmove', handleMouse);

