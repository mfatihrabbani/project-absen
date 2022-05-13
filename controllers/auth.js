import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/database.js";

export const validateLogin = async (req, res) => {
	const { email, password } = req.body;

	if(!email || !password ) return res.send("email and password required");

	var sql = `SELECT * FROM datauser WHERE email = '${email}';`


	db.query(sql , async (err, result) => {

		if(err) throw err;

		if(result.length == 0){
			return res.status(400).send("Login Failed");
		}else{

			const resultEmail = result[0].email;
			const resultPassword = result[0].password;
			const resultName = result[0].username;
			const resultId = result[0].id;
			const resultRole = result[0].role;
			const resultStatusUser = result[0].statususer;

			const checkHashPassword = await bcrypt.compare(password, resultPassword)

			console.log(checkHashPassword);

			if(email == resultEmail){
				if(checkHashPassword){

					const token = jwt.sign({
						name: resultName,
						id: resultId,
						status: resultStatusUser,
						role: resultRole
					}, "rahasia");

					res.cookie("auth", "Bearer " + token, {
						httpOnly: true,
					});
					res.status(200);
					console.log({
						status: "Login Success",
						email: email,
						role: resultRole
					});
					res.redirect("/home");

				}else{
					return res.send("Password Wrong")
				}
			}else{
				return res.send("Email not found")
			}
		}
	})
} 

export const renderLogin = (req, res) => {
	res.render("../views/login.ejs");
}


export const registerUser = async (req, res) => {
	const { name, email, password } = req.body;

	const salt = await bcrypt.genSalt(10);

	const hashedPassword = await bcrypt.hash(password, salt);
	

	console.log(password);
	console.log(hashedPassword);

	if(password.length < 8) return res.send("Password long must 8");

	if(!name || !email || !password) return res.send("Data required");

	var sql = `SELECT email, username FROM datauser WHERE email = '${email}';`;

	db.query(sql, (err, result) => {
		if(err) throw err;

		if(result.length > 0) return res.send("User already taken").end();

		var sql = `INSERT INTO datauser (username , email, password, role) VALUES ('${name}', '${email}', '${hashedPassword}', 'siswa');`

		db.query(sql, (err) => {
		if(err) throw err;

		console.log({
			status: "Register Success",
			name: name,
			email: email
		});

		return res.send({
			status: "Success",
			name: name,
			email: email
		});

	})

})


}

export const renderRegister = (req, res) => {
	res.render("../views/register.ejs");
}

export const logoutUser = (req, res) => {

	const authToken = req.cookies["auth"];

	if(!authToken) return res.redirect("/login");

	res.clearCookie("auth");

	console.log("Logged Out");

	res.redirect("/login");

}