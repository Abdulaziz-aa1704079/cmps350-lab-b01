import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import router from "./router.js";

const port = 8080;
const app = express();

app.engine(".hbs", engine({
  extname: ".hbs",
  // defaultLayout: false,
  // defaultLayout: "main",
}));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.static("public"));

app.use(morgan("dev"));
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server started @http://localhost:${port}`);
});
