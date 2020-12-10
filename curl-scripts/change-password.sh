curl "https://tic-tac-toe-api-production.herokuapp.com/change-password" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}"\
    --data '{
        "passwords":{
    "old" : "'"${OLDPW}"'",
    "new" : "'"${NEWPW}"'"
    }
}'

# TOKEN='5620bda1713760545817aeb6549952c1' OLDPW='2' NEWPW='22' sh curl-scripts/change-password.sh


