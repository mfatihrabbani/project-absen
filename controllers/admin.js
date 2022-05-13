import db from "../models/database.js";

export const getDataAbsen = (req, res) => {

	const dateBody = req.body.date;

	console.log(dateBody);

	const date = getDate(dateBody);

	console.log(date);

	const sql = `SELECT datauser.username, dataabsen.status, dataabsen.dateAbsen FROM dataabsen JOIN datauser ON (datauser.id = dataabsen.id_user) WHERE dateAbsen = '${date}';`

	db.query(sql, (err, result) => {
		if(err) throw err;

		console.log(result[0])

		const results = JSON.parse(JSON.stringify(result));

		res.render("../views/dataAbsen.ejs", {
			results: results,
			tittle: "Data Absen"
		})
	})
}

export const getAllUser = (req, res) => {
	const sql = `SELECT datauser.id, datauser.username, datauser.statususer, profileuser.name, profileuser.class, profileuser.major FROM profileUser JOIN datauser ON (datauser.id = profileuser.id_user);`

	db.query(sql, (err, result) => {
		if(err) throw err;

		const results = JSON.parse(JSON.stringify(result))

		res.render("../views/usersManagement.ejs" , {
			results: results,
			tittle: "User Users Management"
		})

	})
}

export const banUser = (req, res) => {
	const id = req.params.id;

	const sql = `UPDATE datauser SET statususer = "NonAktif" WHERE id = ${id};`

	db.query(sql, (err) => {
		if(err) throw err;
	})

	res.redirect("/admin/users");
}

export const unbanUser = (req, res) => {
	const id = req.params.id;

	const sql = `UPDATE datauser SET statususer = "Aktif" WHERE id = ${id};`

	db.query(sql, (err) => {
		if(err) throw err;
	})

	res.redirect("/admin/users");
}

const getDate = (date) => {
	if(date == undefined){

		const d = new Date();
		if(d.getMonth() < 10 || d.getDate() <  10){
			var resultDateNumber = `${d.getFullYear()}-0${d.getMonth() + 1}-0${d.getDate()}`;

			var resultDateString = resultDateNumber.toString();

			return resultDateString;
		}else{
			var resultDateNumber = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

			var resultDateString = resultDateNumber.toString();

			console.log(resultDateString);

		return resultDateString;
		}
	}else{
		return date;
	}
}

export const renderAdminPage = (req, res) => {
	res.render("../views/admin.ejs");
}

