java -jar pitstop-0.1.0.war &
sleep 5
java -jar testdatafeed.jar &
sleep 10
if which xdg-open > /dev/null
then
  xdg-open http://localhost:8080
elif which gnome-open > /dev/null
then
  gnome-open http://localhost:8080
fi
