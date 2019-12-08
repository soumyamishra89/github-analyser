FROM mhart/alpine-node:12

COPY /dist ./github-analyser

EXPOSE 8080

CMD [ "node", "github-analyser/index.js"]