import {Emitter} from "@socket.io/mongo-emitter"
import {mongoose} from "@typegoose/typegoose"
import {COLLECTIONS} from "../constants/collections"

let collection
let emitter: Emitter
mongoose.connection.once('open', function () {
    collection = mongoose.connection.db.collection(COLLECTIONS.CHILD_APPS_USE_HISTORY)
    emitter = new Emitter(collection)
})

export class SocketEmitter {

    private send(emitKey, data, rooms: string | string[]) {
        console.log('SOCKET', emitKey, data, rooms)
        if (rooms instanceof Array) {
            for (const room of rooms) {
                emitter.to(room).emit(emitKey, data)
            }
        }
        else if (rooms) {
            emitter.to(rooms).emit(emitKey, data)
        }
    }

    public async emitChild(emitKey: string, data: any, childId: string) {
        this.send(emitKey, data, `child_room_${childId}`)
    }

    public async emitUser(emitKey: string, data: any, parentId: string) {
        this.send(emitKey, data, `user_room_${parentId}`)
    }
}

export const socketEmitter = new SocketEmitter()