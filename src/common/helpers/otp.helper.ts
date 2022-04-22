import axios from "axios"

export function generateOtp() {
    return Math.random().toString().substring(
        2, 6
    )
}

export async function sendOtp(phoneNumber, otp) {
    await axios.get(`https://api.telegram.org/bot1128733761:AAEvL5aYSpQei5Q52H1TjVd8LKTrlD8zbn8/sendMessage?chat_id=-1001772537675&parse_mode=html&text=Code%20for%20${phoneNumber}%20${otp}`)
}