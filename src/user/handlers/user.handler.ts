import { jwtSign } from "../../middleware/authentication"
import { childrenService } from "../../common/service/children/children.service"
import { userService } from "../../common/service/user/user.service"
import { CommonDtoGroup } from "../../common/validation/common.dto"
import { UserDto, UserDtoGroup } from "../../common/validation/dto/user.dto"
import { validateIt } from "../../common/validation/validate"

export async function signUpHandler(request, reply) {
    const data = await validateIt(request.body, UserDto, [CommonDtoGroup.CREATE])
    const { _id: user_id } = await userService.create(data)
    return reply.success(user_id)
}
export async function signInHandler(request, reply) {
    const data = await validateIt(request.body, UserDto, [UserDtoGroup.LOGIN])
    const user = await userService.findByPhone(data.phoneNumber)
    if (!user) await userService.create(data)
    const { _id: user_id } = await userService.sendOtp(data.phoneNumber)
    return reply.success(user_id)
}
export async function signVerifyHandler(request, reply) {
    const data = await validateIt(request.body, UserDto, [UserDtoGroup.VERIFY])
    const user = await userService.checkOtp(data.phoneNumber, data.otp)
    const userResponse = await validateIt(user.toObject(), UserDto, UserDtoGroup.RESPONSE)
    userResponse.children = await childrenService.countChildren(user._id)
    const token = await jwtSign(request, { userId: user._id })
    return reply.success({
        user: userResponse,
        token
    })
}
export async function profileHandler(request, reply) {
    const user = await validateIt(request.user.toObject(), UserDto, UserDtoGroup.RESPONSE)
    return reply.success(user)
}