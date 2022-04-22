import {ModelType} from "@typegoose/typegoose/lib/types"
import {CommonException} from "../../constants/exceptions"
import {ChildrenException} from "../../db/models/children/exception"
import {Children, ChildrenModel} from "../../db/models/children/model"
import {Location, LocationModel} from "../../db/models/location/model"
import {UserException} from "../../db/models/user/exception"
import {User, UserModel} from "../../db/models/user/model"
import {generateOtp, sendOtp} from "../../helpers/otp.helper"
import {generateUuid} from "../../helpers/uuid.helper"
import {CommonServices} from "../common.service"

class LocationService extends CommonServices<Location> {
    constructor(model: ModelType<Location>) {super(model)}
}

export const locationService = new LocationService(LocationModel)