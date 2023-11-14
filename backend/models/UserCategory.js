const mongoose = require('mongoose');

let userCategorySchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    categoryId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }
});

const UserCategory = mongoose.model("UserCategory", userCategorySchema);
module.exports = { UserCategory };

