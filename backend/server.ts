import app from "./app";
import environtments from "./environtments";

app.listen(environtments.port, () => {
  console.log(`Server is running in port : ${environtments.port}`);
});
