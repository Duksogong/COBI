const mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
    name : {
      type: String,
    }
});

const Category = mongoose.model("Category", categorySchema);
module.exports = { Category };

