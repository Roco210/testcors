import { messagesModel } from "../../models/messages.model.js"

class MessagesMongo {

    async  findMsj (){
        try{
        const message = await messagesModel.find({})
        return message}
    catch(error){return error}
    }

    async createMsj(obj){
        try{
            const newMsj =await messagesModel.create(obj)
            return newMsj
        }
        catch(error){return error}
    }
}

export const msjModel = new MessagesMongo()