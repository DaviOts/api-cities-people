import { server } from "./server/Server.js";
import { Knex } from "./server/database/knex/index.js";

const startServer = () => {
  server.listen(process.env.PORT || 3333, () => {
    console.log(`App rodando na porta ${process.env.PORT || 3333}`);
  });
};


if (process.env.NODE_ENV === "production") {
  Knex.migrate.latest()
    .then(() => {
      startServer();
    })
    .catch((err) => {
    console.log(err);
    });
} else {
  startServer();
}

