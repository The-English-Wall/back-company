import Organization from "./organization.model.js"

export class OrganizationService {

    async findAllOrganization() {
        return await Organization.findAll({
            where: {
                status: true,
            }
        })
    }

    async finOneOrganization(id, organizationId) {
        return await Organization.findOne({
            where: {
                status: true,
                id: organizationId || id
            }
        })
    }

    async createOrganization(data) {
        return await Organization.create(data)
    }

    async updateOrganization(id, data) {
        await Organization.update(data, {
            where: { id }
        })
        return this.finOneOrganization(id)
    }

    async updateSupplierList(id, supplierList) {
        const company = await this.finOneOrganization(id)
        if (!company) {
            throw new Error(`Company with id ${id} not found`, 404)
        }

        const updatedSupplierList = supplierList

        return this.updateOrganization(id, { supplierList: updatedSupplierList })
    }

    async deleteOrganization(organization) {
        return await organization.update({
            status: false
        })
    }
}