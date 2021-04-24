FROM node:lts-alpine as builder
WORKDIR /sf-midway-admin
# set timezone
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' > /etc/timezone

RUN npm set registry https://registry.npm.taobao.org
# cache step
COPY package.json /sf-midway-admin/package.json
RUN npm install
# build
COPY ./ /sf-midway-admin
RUN npm run build
# clean dev dep
RUN rm -rf node_modules && rm package-lock.json
RUN npm install --production

# bootstrap set port
EXPOSE 7001

CMD ["npm", "run", "start_no_daemon"]
