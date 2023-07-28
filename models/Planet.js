const { Schema, model, Types} = require('mongoose')

const planetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    picture: String,
    description: String,
    likes: [
        {
          type: Types.ObjectId,
          ref: 'Like'
        }
    ]
}, {
    timestamps: true
})

const Planet = model('Planet', planetSchema)

module.exports = Planet