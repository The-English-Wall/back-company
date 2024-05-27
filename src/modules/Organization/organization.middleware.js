import { AppError, catchAsync } from '../../errors/index.js'
import { OrganizationService } from './organization.service.js'
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { ERROR_MESSAGES } from '../../common/utils/ErrorMessagesHanddle.js';

const organizationService = new OrganizationService()

export const validateExistOrganization = catchAsync(async (req, res, next) => {

    const { id, organizationId } = req.params

    const organization = await organizationService.finOneOrganization(id, organizationId)

    if (!organization) {
        next(new AppError(ERROR_MESSAGES.error_company_not_exist, 404))
    }

    req.organization = organization;
    next()
})

export const protect = catchAsync(async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        next(new AppError(ERROR_MESSAGES.error_user_not_login, 401));
    }

    const decoded = await promisify(jwt.verify)(
        token,
        envs.SECRET_JWD_SEED
    );

    if (decoded.id && decoded.exp > 0) {
        req.token = token
        next()
    } else {
        next(new AppError(ERROR_MESSAGES.error_company_unauthorized, 401))
    }
});