import express from 'express'

export const router = express.Router();

import {
    findAllOrganization,
    findOneOrganization,
    createOrganization,
    updateOrganization,
    updateSupplierListOrganization,
    deleteOrganization
} from './organization.controller.js'

import { validateExistOrganization } from './organization.middleware.js'

router.route('/')
    .get(findAllOrganization)
    .post(createOrganization)
router.route('/:id')
    .get(validateExistOrganization, findOneOrganization)
    .patch(updateOrganization)
    .delete(deleteOrganization)

router.route('/:id/supplier-list')
    .patch(updateSupplierListOrganization)