//animation for info floating div
$(document).ready(function () {
  $('#info-icon').hover(
    function () {
      $('#info').animate({ opacity: 1 });
    },
    function () {
      $('#info').animate({ opacity: 0 });
    }
  );
});