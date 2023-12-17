# NEWS PORTAL API DOCUMENTATION

>## INITIALIZE:
> Pre-download PostgreSQL
> https://www.postgresql.org/download/
> Run command in console:
>> npm install
>> npx prisma migrate dev --name init
>> npm start

>## USERS:
> **GET**
> http://localhost:8080/getUserById/:id - Get user by ID. Requre headers: Authorization: token
> http://localhost:8080/getUserInfoById/:id - Get Info about user by ID
> http://localhost:8080/getUserSocialsById/:id - Get all user socials by ID
> **POST**
> http://localhost:8080/createUser - Create user in DB. Return token for authzorization. Save token in localstorage
> http://localhost:8080/auth - User authorization. Return token for authzorization. Save token in localstorage