const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    imgUrl: {
        type: String
    },

    upvotes: [
        String
    ],
        
    downvotes: [
        String
    ],

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
     }
})
// issueSchema.index({ upvotes: 1, downvotes: 1 }, { unique: true});

module.exports = mongoose.model("Issue", issueSchema)