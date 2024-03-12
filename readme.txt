Project:
 - the server is built with spring boot, using data REST, data JPA, websockets and WebMVC. The database is H2 for portability.
 - the client is built with React and uses Rest.js and a number of other libraries
 
 Running:
 -scripts are provided with needed commands, although these are best run manually so they can be killed easily.
 -the server is started with 'java -jar pitstop-0.1.0.war'
 -the client is hosted at localhost:8080
 -the restful api is at /api/pitstops
 -the server will wait for the livefeed to start and then begin polling it.
 -please note, if the application has been previously loaded it may need to be shift+f5 refreshed to clear the cache
 -the client can take a while to start displaying data, but once it starts it tends to keep up.
 
Usage:
- once the webpage is loaded, the table of pit stops is kept upto date using websockets. 
- you can click anywhere on a table row and add a comment, although I didn't get around to make it very usable

source directories:
- both are cleaned, so running 'npm update' and 'gradle bootRepackage' for client and server respectively is needed
- the build directory of the client is soft linked to the webapp directory of the server
- each has different git repositories/histories

Issues:
- tasks I did not manage to finsih were:
    - using spring security to only allow certain users to add comments
    - a toggle to get out of the live updating mode
    - stats on the time of day and total race time
    - feeding in the livefeed address to my application's main args[] 
- I assumed the time was recorded in seconds, but it was almost certainly minutes.
- most of my time was spent trying to navigate hypermedia rest with rest.js and react
- sending websocket messages was a bit tricky when entities weren't modified by REST
    -JPA listeners cannot be autowired with spring's websocket framework
    -sending the message from the syncing thread as I did was probably wrong as the entity may not have been persisted
    -I expect the correct place was from within the service, but there was still no easy way to link the message to the URI of the new entity in REST.
- most issues are recorded in the git history and time tracker
- the most used resource was probably: https://spring.io/guides/tutorials/react-and-spring-data-rest/, but a lot of the javascript needed updating.

Best regards
Graham Perry


