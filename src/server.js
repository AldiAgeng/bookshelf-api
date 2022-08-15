const Hapi = require("@hapi/hapi");
const routes = require("./routes/routes");
require("dotenv").config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();
