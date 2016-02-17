$(document).ready(function() {
  $("#consult").click(function(event) {
  var _mvq = window._mvq || [];
  var listid = Math.random().toString(36).substring(2);

  window._mvq = _mvq;
  _mvq.push(['$setAccount', 'm-187092-0']);

  _mvq.push(['custom', 'jzqu1', /*编号*/ listid, '']);
  _mvq.push(['$logConversion']);   
  })
})


