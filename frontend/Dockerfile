FROM --platform=$BUILDPLATFORM node:16.17.1-alpine3.16 as base
WORKDIR /app

FROM base as build
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
COPY ../prisma ./prisma/
RUN yarn build
RUN yarn prisma generate

FROM base as release
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/next.config.js ./next.config.js

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

COPY --from=build --chown=nextjs:nodejs /app/.next ./.next

EXPOSE 3000

USER nextjs

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

CMD ["yarn", "start:production"]
