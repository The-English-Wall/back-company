import z from 'zod'

import { extractValidationData } from '../../common/utils/extractErrorData.js'

const companySchema = z.object({
    companyName: z.string().min(2).max(50),
    type: z.string().min(3).max(60),
    idType: z.string().min(3).max(60),
    address: z.string().min(3).max(50),
    codeArea: z.string(),
    phone: z.string().min(3).max(25),
    email: z.string().email({ message: 'Invalid email type' }),
    country: z.string().min(3).max(20),
    department: z.string().min(3).max(20),
    city: z.string().min(3).max(20),
    contactName: z.string().min(3).max(40),
    legalType: z.string().min(3).max(20),
    legalManagerName: z.string().min(3).max(25),
    legalManagerId: z.string().min(3).max(25),
    legalManagerEmail: z.string().email({ message: 'Invalid email type' }),
    taxId: z.number().positive(),
    supplierList: z.array(z.object({
        id: z.number().positive(),
        supplierName: z.string()
    })).optional()
})

export const validateOrganization = (data) => {
    const result = companySchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: companyData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        companyData
    }
}

export const validatePartialOrganization = (data) => {
    const result = companySchema.partial().safeParse(data)

    const {
        hasError,
        errorMessages,
        data: companyData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        companyData
    }
}