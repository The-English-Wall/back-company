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
        next(new AppError(`Organization whit id ${id} not found`, 404))
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
        next(new AppError(`Organization whit id ${id} not found`, 404))
    }

    const updateOrganization = await organizationService.updateOrganization(organization.id, companyData)

    res.status(200).json(updateOrganization)
})

export const updateSupplierListOrganization = catchAsync(async (req, res, next) => {
    const { supplierList } = req.body

    if (!Array.isArray(supplierList)) {
        return next(new AppError('Supplier list must be an array', 422))
    }

    const { id } = req.params

    const updateCompany = await organizationService.updateSupplierList(id, supplierList)

    return res.status(200).json(updateCompany)
})

export const deleteOrganization = catchAsync(async (req, res, next) => {

    const { id } = req.params

    const organization = await organizationService.finOneOrganization(id)

    if (!organization) {
        next(new AppError(`Organization whit id ${id} not found`, 404))
    }

    await organizationService.deleteOrganization(organization)

    return res.status(200).json({
        status: 'succes',
        message: 'Company deleted successfully'
    })
})