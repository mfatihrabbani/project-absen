import db from "../models/database.js";

const getDate = () => {
	const d = new Date();

	if(d.getMonth() < 10 || d.getDate() < 10){
		var resultDateNumber = `${d.getFullYear()}-0${d.getMonth() + 1}-0${d.getDate()}`;
		var resultDateString = resultDateNumber.toString();
		return resultDateString;
	}else{
		var resultDateNumber = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
	var resultDateString = resultDateNumber.toString();
	return resultDateString;
	}
}

export const renderAbsen = (req, res) => {

	res.render("../views/home.ejs", {
		name: req.user.name,
		id: req.user.id,
		role: req.user.role
	})
}

export const userAbsen = (req, res) => {
	const id = req.params.id;
	const userId = req.user.id;
	console.log(userId);

	if(id != userId) return res.status(404).send("Error");

	const date = getDate();

	
	console.log(date);

	var sql = `SELECT * FROM dataabsen WHERE dateAbsen = '${date}' AND id_user = ${id};`

	db.query(sql, (err, result) => {
		if(err) throw err;

		try{
			if(result[0].id_user == id) return res.redirect("/true");
		}catch{
			console.log("Passed")
	}

	var sql = `INSERT INTO dataabsen (id_user, status, dateAbsen) VALUES (${id} , 'Hadir', '${date}');`

	db.query(sql, (err) => {
		if(err) throw err;

		console.log(`${id} Absen Success`);

		return res.redirect("/true");
	})
		
	
					
})
	
} 

export const renderAlreadyAbsen = (req, res) => {
	res.render("../views/alreadyAbsen.ejs");
}