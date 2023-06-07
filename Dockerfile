FROM node:lts-alpine

# устанавливаем простой HTTP-сервер для статики
# RUN npm install -g http-server

# делаем каталог 'app' текущим рабочим каталогом
WORKDIR /app

# копируем оба 'package.json' и 'package-lock.json' (если есть)
COPY package*.json ./

# устанавливаем зависимости проекта
RUN npm install

# копируем файлы и каталоги проекта в текущий рабочий каталог (т.е. в каталог 'app')
COPY . .

COPY materialize-css node_modules/materialize-css

# собираем приложение для production с минификацией
# RUN npm run serve

# EXPOSE 8080
# CMD [ "http-server", "dist" ]
CMD npm run serve