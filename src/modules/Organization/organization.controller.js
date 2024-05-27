import { ERROR_MESSAGES } from '../../common/utils/ErrorMessagesHanddle.js'
import { SUCCES_MESSAGES } from '../../common/utils/succesHandle.js'
import { AppError, catchAsync } from '../../errors/index.js'
import { validateOrganization, validatePartialOrganization } from './organization.schema.js'
import { OrganizationService } from './organization.service.js'

const organizationService = new OrganizationService()

export const findAllOrganization = catchAsync(async (req, res, next) => {

    const organization = await organizationService.findAllOrganization()

    return res.status(200).json(organization)
})

export const findOneOrganization = catchAsync(async (req, res, next) => {

    const { id } = req.params

    const organization = await organizationService.finOneOrganization(id)

    if (!organization) {
        next(new AppError(ERROR_MESSAGES.error_company_not_found, 404))
    }

    return res.json(organization)
})

export const createOrganization = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, companyData } = validateOrganization(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const organization = await organizationService.createOrganization(companyData)

    return res.status(201).json(organization)
})

export const updateOrganization = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, companyData } = validatePartialOrganization(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const { id } = req.params

    const organization = await organizationService.finOneOrganization(id)

    if (!organization) {
        next(new AppError(ERROR_MESSAGES.error_company_not_found, 404))
    }

    const updateOrganization = await organizationService.updateOrganization(organization.id, companyData)

    res.status(200).json(updateOrganization)
})

export const updateSupplierListOrganization = catchAsync(async (req, res, next) => {
    const { supplierList } = req.body

    if (!Array.isArray(supplierList)) {
        return next(new AppError(ERROR_MESSAGES.error_company_supplier_list, 422))
    }

    const { id } = req.params

    const updateCompany = await organizationService.updateSupplierList(id, supplierList)

    return res.status(200).json(updateCompany)
})

export const deleteOrganization = catchAsync(async (req, res, next) => {

    const { id } = req.params

    const organization = await organizationService.finOneOrganization(id)

    if (!organization) {
        next(new AppError(ERROR_MESSAGES.error_company_not_found, 404))
    }

    await organizationService.deleteOrganization(organization)

    return res.status(200).json(SUCCES_MESSAGES.success_company_deleted)
})