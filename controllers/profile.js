import db from "../models/database.js"

export const getUserById = (req, res) => {

	const { id, name } = req.user;

	const sql = `SELECT name, class, major FROM profileuser WHERE id_user = ${id} `

	db.query(sql, (err, result) => {
		if(err) throw err;

		const profile = JSON.parse(JSON.stringify(result));

		console.log(profile);

		res.render("../views/profile.ejs", {
			username: name,
			profile: profile
		})
	})
}

export const updateUserById = (req, res) => {
	const { name, grade, major } = req.body;
	const id = req.user.id;

	var sql = `SELECT * FROM profileUser WHERE id_user = ${id};`;

	db.query(sql, (err, result) => {
		if(err) throw err;

		if(result.length == 0){

			var sql = `INSERT INTO profileUser (id_user, name , class, major) VALUES (${id}, '${name}', '${grade}', '${major}');`

			db.query(sql, err => {
				if(err) throw err;

				console.log({
					status: "User Profile input and updated",
					data: {
						name : name,
						kelas : grade,
						jurusan : major
					}
				})

				res.redirect("/profile");
			})
		}else{
			var sql = `UPDATE profileUser SET name = '${name}', class = '${grade}', major = '${major}' WHERE id_user = ${id};`

		db.query(sql, err => {
			if(err) throw err;

			console.log({
				status:"User Profile updated",
				data: {
					name: name,
					kelas: grade,
					jurusan: major
				}
			})

			res.redirect("/profile");

		})
	}
})
}

export const renderProfileUpdate = (req, res) => {
	const name = req.user.name;
	res.render("../views/profileUpdate.ejs", {
		name: name
	});
}