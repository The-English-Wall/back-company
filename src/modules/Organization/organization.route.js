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

import { validateExistOrganization, protect } from './organization.middleware.js'

router.route('/companyValidation', () => {
    return 'Conected'
})

router.route('/')
    .get(findAllOrganization)
    .post(createOrganization)
// .post(protect, createOrganization)
router.route('/:id')
    .get(validateExistOrganization, findOneOrganization)
    .patch(updateOrganization)
    // .patch(protect, updateOrganization)
    .delete(deleteOrganization)
// .delete(protect, deleteOrganization)

router.route('/:id/supplier-list')
    .patch(updateSupplierListOrganization)
// .patch(protect, updateSupplierListOrganization)