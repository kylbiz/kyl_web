if (typeof UI !== 'undefined') {
  
    UI.registerHelper('$eq', function (a, b) {
      return (a === b); //Only text, numbers, boolean - not array & objects
    });

    UI.registerHelper('$active',function(a,b){
      if (a === b)
        return 'active';
      else
        return  '';
    });
  
    UI.registerHelper("$mapped", function(arr) {
      if(!Array.isArray(arr)){
        try {
          arr = arr.fetch()
        }
        catch (e){
          console.log("Error in $mapped: perhaps you aren't sending in a collection or array.")
          return [];
        }
      }

      var $length = arr.length;

      var mappedArray = arr.map(function(item,index) {
        item.$length = $length;
        item.$index = index;
        item.$first = index === 0;
        item.$last  = index === $length-1;
        return item;
      });

      return mappedArray || [];
    });
  
    
    
    UI.registerHelper('$', function() {
      return Helpers.superScope;
    });
  
  
}