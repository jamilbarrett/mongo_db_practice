const { Schema, model, Types } = require('mongoose')

const likeSchema = new Schema({
    planet: {
        type: Types.ObjectId,
        ref: 'Planet'
    }
}, {
    timestamps: true
});


const Like = model('Like', likeSchema)

module.exports = Like