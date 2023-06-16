document.addEventListener('DOMContentLoaded', function() {

    var images = document.querySelectorAll('#images img');
  
    function changeHeight(heightValue) {
      Array.from(images).forEach(function(image) {
        image.style.height = heightValue;
      });
    }
  
    function handleChange(value) {
      var heightValue;
  
      if (value === 1) {
        heightValue = '100px';
      } else if (value === 2) {
        heightValue = '160px';
      } else if (value === 3) {
        heightValue = '230px';
      } else if (value === 4) {
        heightValue = '300px';
      } else if (value === 5) {
        heightValue = '350px';
      } else {
        heightValue = '230px'; 
      } 
  
      changeHeight(heightValue);
    }
  
    function handleInputChange() {
      var inputValue = parseFloat(this.value);
      handleChange(inputValue);
    }
  
    var exIn = document.querySelector('#ex-in2');
    exIn.addEventListener('input', handleInputChange);
  });