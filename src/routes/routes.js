import express from 'express';
import { router as organizationRoute } from '../modules/Organization/organization.route.js'

export const router = express.Router()

router.use('/company', organizationRoute)



