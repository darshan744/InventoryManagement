import app from "./app";
import environtments from "./environtments";
import logger from "./utils/Logger";

app.listen(environtments.port, () => {
  logger.info(`Server is running in port : ${environtments.port}`);
});
