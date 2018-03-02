import db from '../mongodb'
let activitySchema = db.Schema({
    type: Array,
    title: String,
    desc: String,
    html: String,
    markdown: String,
    level: Number,
    github: String,
    source: Number,
    isVisible: Boolean,
    releaseTime: Date,
    createTime: { type: Date, default: Date.now}
})
export default db.model('activity', activitySchema)