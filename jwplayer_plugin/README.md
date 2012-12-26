#JW PLayer plugin: 	  
JW Player is highly customizable video player. There are many plugins available for the JW Player.
Still if we want to create customized plugin, we can use JW Player api for that.
There are two ways of writing jwplayer plugin:   
1. Flash plugin  
2. Javascript plugin  

##Flash plugin:  
For flash plugin, the JW Player supports an API which allows developers to build ActionScript plugins to extend player functionality.
But this plugin will work only in flash mode, it doesn't support html5 mode. The flash plugin can written using actionscript. You can refer following link for creating flash plugin.  
[*Building Flash plugin guide* ](http://www.longtailvideo.com/support/jw-player/jw-player-for-flash-v5/17679/building-flash-plugins)

##Javascript plugin:   
Building javascript plugin has two advantages over flash plugin. First is JS plugin can be run in both mode i.e. flash and html5 mode without any extra effort and second advantage is that everyone has idea of javascript so it will be easier to write JS plugin.
Before writing plugin you must go through the JW Player API reference. The link for that [*JW PLayer API reference*](http://www.longtailvideo.com/support/jw-player/jw-player-for-flash-v5/12540/javascript-api-reference/).

Here is a very basic example plugin, which displays some text on top of the player:
###Example: Hello World   

  <pre><code> (function(jwplayer){

      var template = function(player, config, div) {
        function setup(evt) {
            div.style.color = 'white';
            div.innerHTML = config.text;
        };
        player.onReady(setup);
        this.resize = function(width, height) {};
      };

      jwplayer().registerPlugin('helloworld', template);

    })(jwplayer); 
<code><pre>	

Let's understand this code line by line.  

1. The first and last line create a  closure, which ensures your code won't interfere with any other JavaScript running on the page.  
2. The second line starts our template. Every player that uses this plugin will call the template, with the following parameters:  
   a) 	A reference to the player (for API calls)  
   b)   The plugin's configuration (simple JSON)  
   c)   A `<div>` on top of the player (where the plugin can insert visuals).  	
3. Line 3 starts a function called setup, which prints a configured text inside the plugin `<div>`.  
4. Line 7 ensures the setup is called after the player itself is ready. We recommend using an onReady listener, and holding off on all other API calls until this is fired.  
5. Additionally, there's the this.resize line, which is called by the player when it is resized (e.g. on startup). This function is required, but not always needed (like here).  
6. Finally, there's the registerPlugin call. This notifies the JW Player that a plugin was loaded.  

Now that we've got our plugin, we need to load it into a player. Store the plugin in a folder for e.g. plugins. Now for using this plugin, we can simply configure the jwplayer with plugins attribute in javascript. For testing purpose we can create an html file e.g. helloworld.html.

    <html>
        <head>
            <script src="./jwplayer.js" type="text/javascript"></script>
        </head>
        <body>
            <div id="player"></div>
            <script type="text/javascript">
            jwplayer('player').setup({
                flashplayer: './player.swf',
                file: './video.mp4',
                plugins: {
                './helloworld.js': {
                        text: 'Hello world!'
                    }
                }
           });
           </script>
        </body>
    </html>
This HTML file embeds the player, assigns the plugin to the player, and sets the text option of the plugin to Hello World'. Let's walk through it:
	
1. The header requires the jwplayer.js < script> tag. Without jwplayer.js, the JW Player won't work.
2. Next, we add a < div> tag with ID player. The player will be set up in there.
3. Then the jwplayer().setup() call is made. Its configuration contains a link to our plugin. The player will load the plugin file relative to the HTML page.
4. Our ./helloworld.js plugin sets an Object block with plugin options. This can be empty, but our plugin needs one option: the text to set.

###SLOMO plugin:  
There is one more plugin I've created for jwplayer i.e. slow motion, for playing jwplayer in slow motion.
You will have to just call the getSlomo function of the plugin on any event like click of a button and pass the text as "start" or "pause". 
When "start" is passed then the video will be in slow motion mode. When "pause" is passed then the slowmotion is paused.   
You can refer this plugin in the same folder.
for e.g. If you want to pause the slowmotion, you can use
jwplayer().getPlugin("mlb_slomo").getSlomo("pause");

