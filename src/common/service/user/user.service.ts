import {ModelType} from "@typegoose/typegoose/lib/types"
import {UserException} from "../../db/models/user/exception"
import {User, UserModel} from "../../db/models/user/model"
import {generateOtp, sendOtp} from "../../helpers/otp.helper"
import {CommonServices} from "../common.service"

class UserService extends CommonServices<User> {
    constructor(model: ModelType<User>) {super(model)}
    public async findByPhone(phoneNumber) {
        return await this.findOne({phoneNumber})
    }
    public async findByIdError(id) {
        const user = await this.findById(id)
        if (!user) throw UserException.NotFound(id)
        return user
    }
    public async findByPhoneError(phoneNumber) {
        const user = await this.findByPhone(phoneNumber)
        if (!user) throw UserException.NotFound(phoneNumber)
        return user
    }
    public async sendOtp(phoneNumber) {
        const user = await this.findByPhoneError(phoneNumber)
        const otp = generateOtp()
        await sendOtp(phoneNumber, otp)
        return await this.updateOne(user._id, {otp: otp})
    }
    public async checkOtp(phoneNumber, otp) {
        const user = await this.findByPhoneError(phoneNumber)
        if (user.otp != otp) throw UserException.IncorrectOtp(otp)
        return await this.updateOne(user._id, {otp: null})
    }
}

export const userService = new UserService(UserModel)