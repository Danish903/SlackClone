import "@babel/polyfill/noConflict";
import server from "./server";

const origin =
   process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.ORIGIN;

const options = {
   cors: {
      origin,
      credentials: true
   },
   port: process.env.PORT || 4444
};

server.start(options, () => {
   console.log("The server is up at 4444!");
});
