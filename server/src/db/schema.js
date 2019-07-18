// 表结构设计
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 用户 
const UserSchema = new Schema({
    username: { type: String, default: '' },
    password: { type: String, default: '' },
    role: { type: String, default: '' },
    date: { type: Date, default: Date.now() },
},
{ versionKey: false }
)

// 数据源
const SourceSchema = new Schema({
    id: String,
    name: String,
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
    description: { type: String, default: '' },
    content: {
        data: Array,
        fieldMap: [{   // 字段映射关系
            fieldCode: String,
            fieldName: String
        }]
    }
},
{ versionKey: false }
)


const Models = {
    User: mongoose.model('user', UserSchema),
    Source: mongoose.model('source', SourceSchema)
}

module.exports = Models