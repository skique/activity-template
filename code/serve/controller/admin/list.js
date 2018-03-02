import listModel from '../../models/list'
import path from 'path'

module.exports = {
    async list (ctx, next) {
        console.log('----------------获取活动列表 list/list-----------------------');
        let { keyword, pageindex = 1, pagesize = 10} = ctx.request.query;
        console.log('keyword:'+keyword+','+'pageindex:'+pageindex +','+ 'pagesize:'+pagesize)
        try {
            
            let reg = new RegExp(keyword, 'i')
            let data = await ctx.findPage(listModel, {
                $or: [
                    {type: { $regex: reg}},
                    {title: { $regex: reg}}
                ]
            }, {limit: pagesize*1, skip: (pageindex-1)*pagesize});
            ctx.send(data)
        }catch (e){
            console.log(e)
            ctx.sendError(e)
        }
    },

    async add (ctx, next) {
        console.log('----------------添加活动 list/add-----------------------');
        let paramsData = ctx.request.body;
        try {
            let data = await ctx.findOne(listModel, {title: paramsData.title})
            if (data) {
                ctx.sendError('数据已经存在, 请重新添加!')
            }else{
                
                
                // paramsData.html = marked(paramsData.html);
                let data = await ctx.add(listModel, paramsData);
                ctx.send(paramsData)
            }
        }catch(e) {
            ctx.sendError(e)
        }
    },

    async update (ctx, next) {
        console.log('----------------更新活动 list/update-----------------------');
        let paramsData = ctx.request.body;
        try {
            // paramsData.html = marked(paramsData.html);
            let data = await ctx.update(listModel, {_id: paramsData._id}, paramsData)
            ctx.send()
        }catch(e) {
            if (e === '暂无数据') {
                ctx.sendError(e)
            }
        }
    },

    async del (ctx, next) {
        console.log('----------------删除活动 list/del-----------------------');
        let id = ctx.request.query.id
        try {
            ctx.remove(listModel, {_id: id})
            ctx.send()
        }catch(e){
            ctx.sendError(e)
        }
    }
}