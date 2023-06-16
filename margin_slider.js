document.addEventListener('DOMContentLoaded', function() {

    var images = document.querySelectorAll('#image');
  
    function changeMargin(marginValue) {

      Array.from(images).forEach(function(image) {
        image.style.margin = marginValue;
      });
    }

    function handleChange(value) {
      var marginValue;
  
      if (value === 1) {
        marginValue = '0%';
      } else if (value === 2) {
        marginValue = '0.2%';
      } else if (value === 3) {
        marginValue = '0.5%';
      } else if (value === 4) {
        marginValue = '1.5%';
      } else if (value === 5) {
        marginValue = '2.5%';
      } 
       else {
        marginValue = '0.5%'; 
      }
  
      changeMargin(marginValue);
    }
  
    function handleInputChange() {
      var inputValue = parseFloat(this.value);
      handleChange(inputValue);
    }
  

    var exIn = document.querySelector('#ex-in');
    exIn.addEventListener('input', handleInputChange);
  });