java -jar pitstop-0.1.0.war
SLEEP 5
java -jar testdatafeed.jar
start "" http://localhost:8080
