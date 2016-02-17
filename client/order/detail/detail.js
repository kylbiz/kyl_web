Template.orderProgress.onRendered(function() {
  setTimeout(function() {
    var status = Session.get("productProgressStatus") || 0;
    for(var i = 0; i <= status; i++) {
      $(".dot").eq(i).addClass("active");
    }
  },300)
})


