/**
 * Created with JetBrains RubyMine.
 * User: webonise
 * Date: 7/11/12
 * Time: 11:12 AM
 * To change this template use File | Settings | File Templates.
 */
(function(jwplayer){
    var template = function(player, config, div) {
        var play_var;
        var pause_var;
        function setup(evt) {
        };

        player.onReady(setup);
        this.resize = function(width, height) {
            div.style.position = 'absolute';
            div.style.height = '60px';
            div.style.width = '60px';
            div.style.left = Math.round(width/2-30)+'px';
            div.style.top = Math.round(height/2-30)+'px';
        };
        this.getSlomo =function (text)
        {
            player.getPlugin("dock").hide();
            var current_position = parseFloat(player.getPosition());
            var total_duration = parseFloat(player.getDuration());
            if(text=="start"){
                start_slow_motion(current_position,total_duration);
            }
            else if(text=="pause")
            {
                pause_slow_motion();
                player.pause(true);
            }
            else
            {
                stop_slow_motion();
            }

        };
        function start_slow_motion(current_position,total_duration)
        {
            play_var = setInterval(function(){player.play(true);
            player.onComplete(function() {pause_slow_motion()});},300);

            pause_var = setInterval(function(){player.play(false);
            player.onComplete(function() {pause_slow_motion()});},200);
        }

        function pause_slow_motion()
        {
            clearInterval(play_var);
            clearInterval(pause_var);
            player.pause(true);
        }
        function stop_slow_motion()
        {
            clearInterval(play_var);
            clearInterval(pause_var);
            player.play();
        }
    };

    jwplayer().registerPlugin('mlb_slomo', template);

})(jwplayer);
