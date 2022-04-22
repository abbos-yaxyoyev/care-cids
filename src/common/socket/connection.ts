import { locationChangeHandle } from "./handlers"

export async function onConnection(socket) {
    const user = socket.user
    const type = socket.type

    console.log(`Connected ${type}!`)
    console.log(`Decoded ${user}!`)

    switch (type) {
        case 'user': {
            socket.join(`user_room_${user._id}`)
            break
        }

        case 'children': {
            socket.join(`child_room_${user._id}`)
            break
        }
        default:
            return
    }

    console.log("locationChange");
    socket.on('locationChange', data => locationChangeHandle(socket, data))

    socket.on('disconnect', () => onDisconnect(socket.user))
}

export async function onDisconnect(user) {
    console.log('Disconnected!!!')
    console.log(user)
}
