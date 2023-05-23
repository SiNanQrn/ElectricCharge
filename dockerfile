FROM node:16-alpine
ADD . /code
WORKDIR /code
RUN npm i
EXPOSE 5001
CMD ["node", "./wechat.js"]