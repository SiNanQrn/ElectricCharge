FROM node:16-alpine
ADD . /code
WORKDIR /code
ENV http_proxy=http://192.168.0.107:7890
ENV https_proxy=http://192.168.0.107:7890
RUN npm install -g cnpm --registry=http://registry.npmmirror.com && cnpm i --verbose
EXPOSE 5001
CMD ["node", "./index.js"]