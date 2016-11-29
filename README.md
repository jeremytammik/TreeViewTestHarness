# TreeViewTestHarness
Testing and learning tool for simple web services REST calls for Glue, Field and Forge 

The minimum readme: 

Two places you need to set your own keys and secrets: 

(1) Routes/forge.js

<pre>
var _apiKey = 'your client id comes here';
var _apiSecret = 'your secret comes here'; 
</pre> 

This is for 2-legged authentication. 

(2) Routes/forgeOAuth.js

    clientID: '<your client id comes here>',
    clientSecret: '<your secret comes here>',
    callbackURL: "<your callback comes here>"
    
callbackURL may look like this if you are using local host while debugging: 
http://localhost:1337/oauth_callback

oauth_callback is a callback defined in app.js.  
If you want to change the name of callback, you will need to change in app.js as well.   

(3) Alternatively, if you already have a tool to generate token, you can specify the token in the text box, then "Set". The rest will use the token's given.  

I'm aware this is still very rough. I intended to clean it further.  
