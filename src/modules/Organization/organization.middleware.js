import { AppError, catchAsync } from '../../errors/index.js'
import { OrganizationService } from './organization.service.js'

const organizationService = new OrganizationService()

export const validateExistOrganization = catchAsync(async (req, res, next) => {

    const { id, organizationId } = req.params

    const organization = await organizationService.finOneOrganization(id, organizationId)

    if (!organization) {
        next(new AppError(`This organization doen't exist`, 404))
    }

    req.organization = organization;
    next()
})