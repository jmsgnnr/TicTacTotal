#$ EMAIL='1@1 PASSWORD='1' PASSWORD_CONFIRMATION='1' sh curl-scripts/sign-in.sh



curl "https://tic-tac-toe-api-production.herokuapp.com/sign-in" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
--data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'