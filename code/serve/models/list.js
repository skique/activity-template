import db from '../mongodb'
let listSchema = db.Schema({
    id: Number,
    type: Number,
    title: String,
    locked: Boolean,
})
export default db.model('activity', listSchema)