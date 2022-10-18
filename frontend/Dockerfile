FROM --platform=$TARGETPLATFORM node:16.17.1 as base
RUN  --mount=type=bind,target=. \
     --mount=type=secret,id=DATABASE_URL \
     DATABASE_URL=$(cat /run/secrets/DATABASE_URL)
WORKDIR /app

COPY frontend/ .
COPY ./prisma ./prisma
RUN yarn install --frozen-lockfile
RUN yarn prisma generate
RUN yarn build

FROM --platform=$TARGETPLATFORM base as release
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/next.config.js ./next.config.js

RUN addgroup  nodejs && \
    adduser nextjs

COPY --from=base --chown=nextjs:nodejs /app/.next ./.next

EXPOSE 3000

USER nextjs

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

CMD ["yarn", "start:production"]
