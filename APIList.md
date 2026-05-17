## DevTinderAPIs

## AuthRouter
- POST /signup
- POST /login
- POST /logout

## ProfileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## ConnectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/acccepted
- POST/request/review/rejected
- STATUS : ignored,interested,appcepted,rejected

## userRouter
- GET /user/requests
- GET /user/connections


- GET /feed - Get all the users into platform
  /feed?page=1&limit=10 =>  1-10 => .skip(0) & .limit(10)
  /feed?page=2limt=10 = >  11-20 => .skip(10) & .limit(10)
  /feed?page=3limt=10 = >  21-30 => .skip(20) & .limit(10)
  /feed?page=4limt=10 = >  31-40 => .skip(30) & .limit(10)
  skip =>  page -1 *limit


