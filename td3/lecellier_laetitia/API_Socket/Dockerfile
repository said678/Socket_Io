FROM node:10.16.3 AS development

RUN mkdir /srv/chat && chown node:node /td/td3/lecellier_laetitia/API_Socket
USER node
WORKDIR /td/td3/lecellier_laetitia/API_Socket
COPY --chown=node:node package.json package-lock.json ./
RUN npm install --quiet
FROM node:10.16.3-slim AS production
USER node
WORKDIR /td/td3/lecellier_laetitia/API_Socket
COPY --from=development --chown=root:root /td/td3/lecellier_laetitia/API_Socket/node_modules ./node_modules
COPY . .
CMD ["node", "index.js"]