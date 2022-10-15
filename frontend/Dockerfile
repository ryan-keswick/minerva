FROM --platform=$TARGETPLATFORM node:16.17.1 as base
WORKDIR /app

COPY frontend/ .
COPY ./prisma ./prisma
RUN yarn install --frozen-lockfile
RUN yarn build
RUN yarn prisma generate

FROM --platform=$TARGETPLATFORM base as release
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/next.config.js ./next.config.js

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

COPY --from=base --chown=nextjs:nodejs /app/.next ./.next

EXPOSE 3000

USER nextjs

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

CMD ["yarn", "start:production"]
