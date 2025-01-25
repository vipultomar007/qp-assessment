import app from "./app";
import { AppDataSource } from "./database/dataBase";

const PORT = process.env.PORT || 5000;

//start the server only after connecting to the db
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => console.error(`Failed to start the server: ${error}`));
