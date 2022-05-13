import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import db from "./models/database.js";
import routeLogin from "./routes/auth.js"
import routeAbsen from "./routes/absenRoute.js"
import routeAdmin from "./routes/admin.js"
import routeProfile from "./routes/profileRoute.js"

const app = express();

try{
	db.connect();
	console.log("database connected");
}catch{
	console.log("database not connected");
}

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/", routeLogin);
app.use("/admin", routeAdmin);
app.use("/home", routeAbsen);
app.use("/profile", routeProfile);


app.listen(3000, () => {
	console.log("Listening on port 3000");
})