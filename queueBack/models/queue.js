const mongoose = require('mongoose')

const queueSchema = new mongoose.Schema({
    name: String,
    date: Date,
    queue: [
        {
            name: String,
            location: String
        }
    ],
    //hasPassword: Boolean,
    //passwordHash: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

queueSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    //delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('Queue', queueSchema)