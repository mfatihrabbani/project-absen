import jwt from "jsonwebtoken";

export const isLogin = (req, res, next) => {
	const token = req.cookies['auth'];

	if(!token) return res.status(404).send("Token empty");

	try{
		console.log(token);
		const decoded = verifyToken(token);
		console.log(decoded);
		req.user = decoded;
		next();
	}catch(err){
		console.log(err);
		res.status(400).send("Failed verify")
	}
}

export const isActive = (req, res, next) => {
	const token = req.cookies["auth"];

	try{
		const decoded = verifyToken(token);
		console.log(decoded.status);

		if(decoded.status == "Aktif"){
			req.user = decoded;
			next()
		}else{
			res.send("Your account is banned, please contact Admin Thanks :)");
		}
	}catch{
		res.status(400).send("Failed verify")
	}
}

export const isAdmin = (req, res, next) => {
	const token = req.cookies["auth"];

	try{
		const decoded = verifyToken(token);
		console.log(decoded.role);

		if(decoded.role == "admin"){
			req.user = decoded;
			next()
		}else{
			res.status(400).end();
		}
	}catch{
		res.status(400).send("Failed verify")
	}
}
	
const verifyToken = (token) => {
	if(!token) return res.status(400).send("Empty Token");

	console.log(token)

	const authSplit = token.split(" ");

	const [authType, authToken] = [authSplit[0], authSplit[1]];

	if(authType !== "Bearer") return res.status(400).send("Invalid Token");

	const result = jwt.verify(authToken, "rahasia");

	return result;

}


