(function($) {

    jQuery.fn.twitflop = function(options) {
        return this.each(function() {
            $opts = jQuery.extend({},
            jQuery.fn.twitflop.defaults, options);
            $url = "http://twitter.com/status/user_timeline/" + $opts['user'] + ".json?count=" + $opts['history'] + "&callback=?";
            $last_tweet = "";
            $this = $(this);

            jQuery.fn.twitflop.get_tweet($url);
        });
    };

    jQuery.fn.twitflop.defaults = {
        user: 'd',
        history: '20',
        output: '<p>[TW_TEXT]</p>'
    };

    jQuery.fn.twitflop.replace_keys = {
        TW_TEXT: 'text',
        TW_USER: 'user["name"]',
        TW_SCREEN_NAME: 'user["screen_name"]',
        TW_SOURCE: 'source',
        TW_CREATED_AT: 'created_at',
        TW_REPLY_TO: 'in_reply_to_screen_name',
        TW_REPLY_STATUS: 'in_reply_to_status_id'
    };

    jQuery.fn.twitflop.get_tweet = function(url) {
        jQuery.getJSON(url,
        function(data, status) {
          if (status == "success") {
            data = data.reverse();
            for (var i = data.length - 1; i >= 0; i--) {
                if (!data[i].text.match(/^@/)) {
                    jQuery.fn.twitflop.display_tweet(data[i]);
                    break;
                };
            };
          } else {
            jQuery.fn.twitflop.append_tweet("Couldn't find tweet");            
          }
        });
    };

    jQuery.fn.twitflop.display_tweet = function(tweet) {
        var output = $opts['output'];
        var keys = jQuery.fn.twitflop.replace_keys;
        for (key in keys) {
            output = output.replace("[" + key + "]", eval("tweet." + keys[key]));
        }

        $last_tweet = output;
        jQuery.fn.twitflop.append_tweet($last_tweet);
    }

    jQuery.fn.twitflop.append_tweet = function(copy) {
      $this.append(copy); 
    }

    function twitter_callback() {
        return true;
    }

})(jQuery);
