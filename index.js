$(document).ready(function () {
    let interval = null;
    let width = 100;
    let growthAmount = 12;
    let intervalChange = 250;
    let numberOfCircles = 1;
    let elements = $();
  
  
  
    $('#start').click(function (e) {
      e.preventDefault();
      updateValues()
      $(this).text($(this).text() === 'start' ? 'stop' : 'start')
      if (interval === null) {
        render(width);
        let newDimension = parseInt(width)
        interval = setInterval(() => {
          newDimension += parseInt(growthAmount)
          $('.circle').each(function () {
            $(this).width(newDimension)
            $(this).height(newDimension)
          });
        }, intervalChange);
      } else {
        clearInterval(interval)
        interval = null;
        numberOfCircles = 1
        width = 100;
        growthAmount = 12;
        intervalChange = 250;
        elements = $();
        $('#circlesValue').val("")
      }
    })
  
    function updateValues() {
      width = $('#width').val() === '' ? width : $('#width').val();
      growthAmount = $('#growthAmount').val()  === '' ? growthAmount : $('#growthAmount').val();
      intervalChange = $('#interval').val()  === '' ? intervalChange : $('#interval').val();
      numberOfCircles = $('#circlesValue').val() === '' ? numberOfCircles :  $('#circlesValue').val();
    }
  
    function render(width) {
      if (numberOfCircles <= 0) {
        $('#container').append(elements)
        return;
      }
      let randomX = Math.floor((Math.random() * ($(window).width() / 2) + width)) + 1
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);
      randomColor = randomColor === "ffffff" ? "000000" : randomColor;
      let circle = $("<div>", {
        "class": "circle",
        "css": {
          "left": `${randomX}px`,
          "height": width,
          "width": width,
          "background-color": `#${randomColor}`
        },
        "click": function () {
          $(this).remove();
        },
        "mouseover": function () {
          $(this).fadeTo(500, 0.0)
        },
        "mouseleave": function () {
          $(this).fadeTo(500, 1.0)
        }
      });
      elements = elements.add(circle);
      numberOfCircles--;
      render(width)
    }
  })