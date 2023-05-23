FROM node:16-alpine
ADD . /code
WORKDIR /code
RUN npm i --registry=https://registry.npmmirror.com/
EXPOSE 5001
CMD ["node", "./wechat.js"]