FROM node:15
# optional: WORKDIR /app. this makes our working directory of our container become the /app directory WITHIIN the container which lets us run things like test and node in /app
WORKDIR /app
COPY package.json .  
# we can also do  /app. either will take the json and put it into our /app directory.

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . .
ENV PORT 3000
# we copy the rest of our files to our docker image, to our current directory to our /app with . or  ./
EXPOSE $PORT
CMD ["node," "index.js"]