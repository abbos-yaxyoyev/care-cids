import { ChildrenException } from "../../../common/db/models/children/exception"
import { childAppService } from "../../../common/service/children/app/childApp.service"
import { childAppUseHistoryService } from "../../../common/service/children/app/childAppUseHistory.service"
import { childrenService } from "../../../common/service/children/children.service"
import { CommonDtoGroup } from "../../../common/validation/common.dto"
import { ChildAppDto } from "../../../common/validation/dto/childApp.dto"
import { validateIt } from "../../../common/validation/validate"
import { sendViaFirebase } from "../../../notification/firebase"

export async function syncChildAppsHandler(request, reply) {
    const data = await validateIt(request.body, ChildAppDto, [CommonDtoGroup.CREATE])
    const child = request.user

    await Promise.all(data.apps.map(
        async (app) => {
            app.childId = child._id
            const { _id: appId } = await childAppService.findByNameAndUpdate({ ...app })
            await childAppUseHistoryService.findByDayAndUpdate({
                ...app,
                appId,
                date: new Date(app.date)
            })
        }
    ))

    return reply.success()
}

export async function childAppsGetHandler(request, reply) {
    const child = request.user
    const childApps = await childAppService.getChildApps(child._id)
    return reply.success(childApps)
}

// for parent
export async function childrenAppsGetHandler(request, reply) {
    const { childId, offset } = request.body //? validateIt ?
    const child = await childrenService.findById(childId)
    if (!child) throw ChildrenException.NotFound(childId)
    const apps = await childAppUseHistoryService.childAppsPagin(child._id, offset)
    return reply.success(apps)
}

export async function childrenAppSetLimitGetHandler(request, reply) {
    const { appId, usageLimit } = request.body
    const app = await childAppService.findById(appId)
    await childAppService.updateOne(app._id, { usageLimit })
    const child = await childrenService.findById(app.childId.toString())
    // apps changes
    const params = {
        type: 'app_changed',
        data: {
            appId: appId
        }
    }
    await sendViaFirebase(child.firebase_token, params) //?
    return reply.success(appId)
}