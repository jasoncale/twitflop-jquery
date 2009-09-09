(function($) {

  jQuery.fn.tweetog = function(options) {
    return this.each(function() {    
      $opts = jQuery.extend({}, jQuery.fn.tweetog.defaults, options);
      $url = "http://twitter.com/status/user_timeline/"+ $opts['user'] +".json?count="+ $opts['history'] +"&callback=?";
  		$last_tweet = "";
  		$this = $(this);
		
		  jQuery.fn.tweetog.get_tweet($url);
    });
  };

  jQuery.fn.tweetog.defaults = {
    user: 'mrjase',
    history: '20',
    output: '<p>[TW_TEXT]</p>'
  };
  
  jQuery.fn.tweetog.replace_keys = {
    TW_TEXT: 'text',
    TW_USER: 'user["name"]'
  };

  jQuery.fn.tweetog.get_tweet = function (url) {
	  jQuery.getJSON(url, function (data) {
	    data = data.reverse();  
	    for (var i = data.length - 1; i >= 0; i--){
	      if (!data[i].text.match(/^@/)) {
	        jQuery.fn.tweetog.display_tweet(data[i]);
	        break;
	      };
	    };	    
	  });
   };

   jQuery.fn.tweetog.display_tweet = function (tweet) {       
     var output = $opts['output'];
     var keys = jQuery.fn.tweetog.replace_keys;       
     for (key in keys) { 
       output = output.replace("["+key+"]", eval("tweet." + keys[key]));
     }
     
     $last_tweet = output;
     $this.append($last_tweet);
   }

  function twitter_callback () { return true; }

})(jQuery);
