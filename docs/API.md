# NEWS PORTAL API DOCUMENTATION

>## INITIALIZE:
> Сначала установи PostgreSQL
> https://www.postgresql.org/download/
> Потом создай базу с любым именем
> Создай файл .env и напиши это
> postgres://postgres:YourPassword@localhost:5432/YourDatabaseName
> Запусти эти команды в консоле:
>> npm install
>> npx prisma migrate dev --name init
>> npm start

>## USERS:
> ###**GET**
> http://localhost:8080/getUserById/:id - Получить пользователя по ID. Требуется headers: Authorization: token
> http://localhost:8080/getUserInfoById/:id - Получить инфо о пользователе по ID
> http://localhost:8080/getUserSocialsById/:id - Получить все социальные сети пользователя по ID

> ###**POST**
> http://localhost:8080/createUser - Создаёт пользователя в БД. Отдает токен. Сохрани его в localStorage
>**BODY**
> - login: test
> - password: test123
> - email: test@test.test

>http://localhost:8080/auth - Авторизация пользователя. Отдает токен. Сохрани его в localStorage
>**BODY**
> - login: test
> - password: test123
