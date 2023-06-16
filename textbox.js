//타이핑 애니메이션

const imagesDiv = document.getElementById('images');
const textBox = document.getElementById('textbox');
const typingDelay = 22;

let textIndex = 0;
let timerId;

function typeText(text) {
  textBox.textContent = text.substr(0, textIndex);
  textIndex++;
  if (textIndex <= text.length) {
    timerId = setTimeout(function() {
      typeText(text);
    }, typingDelay);
  }
}

imagesDiv.addEventListener('mouseover', function(event) {
  const target = event.target.closest('#image');
  if (target) {
    const text = target.querySelector('#image-text').textContent;
    textIndex = 0;
    clearTimeout(timerId);
    typeText(text);
    textBox.style.display = 'flex';
  }
});

imagesDiv.addEventListener('mouseout', function() {
  textBox.textContent = '';
  textBox.style.display = 'none';
  clearTimeout(timerId);
});

textBox.addEventListener('mouseover', function() {
  textBox.style.display = 'flex';
});

textBox.addEventListener('mouseout', function() {
  textBox.style.display = 'none';
});