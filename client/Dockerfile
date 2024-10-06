FROM node:22.5.0
COPY ./ ./client

WORKDIR /client

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm i

EXPOSE 5173
