FROM node:14.15.4-alpine3.12 as prod
WORKDIR /usr/src/app

RUN npm install --global pm2

COPY package*.json /usr/src/app/

RUN npm ci --no-optional --ignore-scripts

COPY . /usr/src/app/

RUN npm run build
RUN npm prune --production

EXPOSE 3000

CMD [ "pm2-runtime", "npm", "--", "start" ]