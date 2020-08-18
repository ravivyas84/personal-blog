const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
    // Output directory: _site
  
    // Copy `img/` to `_site/img`
    eleventyConfig.addPassthroughCopy("assets"); 
    // Copy `css/fonts/` to `_site/css/fonts`
    // If you use a subdirectory, it’ll copy using the same directory structure.
    eleventyConfig.addPassthroughCopy("css"); 
    eleventyConfig.setTemplateFormats([
      "md",
      "css", // css is not yet a recognized template extension in Eleventy
      "txt",
      "njk"
    ]);

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
      return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    });

    eleventyConfig.addCollection("tagList", function(collection) {
      let tagSet = [];
      var arr = [];
      collection.getAll().forEach(function(item) {
        if( "tags" in item.data ) {
          let tags = item.data.tags;
  
          tags = tags.filter(function(item) {
            switch(item) {
              // this list should match the `filter` list in tags.njk
              case "all":
              case "nav":
              case "post":
              case "posts":
                return false;
            }
  
            return true;
          });
  
  

          arr = arr.concat(tags);
          // console.log("Item : " + item.data.toString());
          // console.log("Item : " + JSON.stringify(tags));



          
          
          
        }
      });
      var a = [], b = [], prev;
      arr.sort();
      for ( var i = 0; i < arr.length; i++ ) {
          if ( arr[i] !== prev ) {
              a.push(arr[i]);
              b.push(1);
          } else {
              b[b.length-1]++;
          }
          prev = arr[i];
      }
  
      // console.log("Tags : " + JSON.stringify(a))
      // console.log("Count : " + JSON.stringify(b))
  
      
      for (var i = 0; i < a.length; i++) {
        tagSet.push({name:a[i], count:b[i]});
      }

      tagSet.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));


      // console.log("Tags : " + JSON.stringify(tagSet)) 
      // console.log("I : " + i) 
      // returning an array in addCollection works in Eleventy 0.5.3
      return [...tagSet];
    });
  };

