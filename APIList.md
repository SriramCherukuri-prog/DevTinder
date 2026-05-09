#DevTinderAPIs

AuthRouter
- POST /signup
- POST /login
- POST /logout

ProfileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

ConnectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/acccepted
- POST/request/review/rejected
- STATUS : ignored,interested,appcepted,rejected

- GET /connections
- GET /requests/recieved
- GET /feed - Get all the users into platform

