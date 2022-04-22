import fcmNode from 'fcm-node'
import {ENV} from '../common/config'

const fcm = new fcmNode(ENV.FIREBASE_SERVER_KEY)

export function sendViaFirebase(firebase_token, data) {

    const message = {
        to: firebase_token,
        data: data
    }

    fcm.send(message, function (error, response) {
        if (error) {
            console.log(`Firebase Error: ${error}`)
        }
        else {
            console.log(`Firebase Response: ${response}`)
        }
    })
}