Для поиска можно использовать только русский или только английский язык

1. docker network create my-bridge-network
2. docker run -d --name redis --net my-bridge-network redis:8.0-rc1
3. docker build -t my-express-app .
4. docker run --net my-bridge-network -p 3002:3002 my-express-app

>>
5. http://localhost:3002