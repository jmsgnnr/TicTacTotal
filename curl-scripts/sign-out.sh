# TOKEN=' 828f0cfb05fad0728198fb28bfec23d7' sh curl-scripts/sign-out.sh




curl "https://tic-tac-toe-api-production.herokuapp.com/sign-out" \
  --include \
  --request DELETE\
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
 
 
echo