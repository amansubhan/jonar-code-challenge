FIRST_LAUNCH="FIRST_LAUNCH"
if [ ! -e $FIRST_LAUNCH ]; then
    touch $FIRST_LAUNCH
    echo "-- First container startup --"
    npm run seed
    npm run start
else
    echo "-- Not first container startup --"
    npm run start
fi