FROM gcr.io/kauri-197812/kauri-contract-abis:latest-dev

# setup workspace
RUN mkdir -p /usr/src/app

COPY . /usr/src/app
WORKDIR /usr/src/app/packages/kauri-components
RUN yarn install
RUN npm run build

WORKDIR /usr/src/app/packages/kauri-web
RUN node scripts/remove-bsc-debug-flag.js
RUN yarn install
RUN npm run build

# env settings
ENV GETH_BLOCKCHAIN=35.231.60.112:8545
ENV MONOLITH_EXTERNAL_API=api.dev.kauri.io
ENV MONOLITH_API=monolith.dev:8080
EXPOSE 3000

CMD "npm" "run" "start"
