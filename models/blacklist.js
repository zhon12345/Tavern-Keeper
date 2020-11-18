const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	name: String,
	id : String,
});

module.exports = mongoose.model("blacklist", Schema);