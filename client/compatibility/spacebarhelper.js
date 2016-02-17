if (typeof UI !== 'undefined') {
  
    UI.registerHelper('$eq', function (a, b) {
      return (a === b); //Only text, numbers, boolean - not array & objects
    });

    UI.registerHelper('$active',function(a,b){
      if (a === b)
        return 'active';
      else
        return  '';
    })
    UI.registerHelper('$', function() {
      return Helpers.superScope;
    });
}