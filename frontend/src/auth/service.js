import axiosInstance from "../api/api";

//------------------------------------
// ACCESSIBILITY RELATED SERVICES
//------------------------------------

class Services {

    //--------------------------------------
    // PRODUCT RELATED SERVICES
    //--------------------------------------

    // list all products
    async getProducts() {
        try {
            const response = await axiosInstance.get('/products')
            return response
        } catch (error) {
            console.log('services error :: getProducts ::', error)
            throw error
        }
    }

    // get one product
    async getProduct({ id }) {
        try {
            const response = await axiosInstance.get(`/products/${id}`)
            return response.data
        } catch (error) {
            console.log('services error :: getProduct ::', error)
            throw error
        }
    }

    //--------------------------------
    // CATEGORIES RELATED SERVICES
    //--------------------------------

    // get all categories
    async getCategories() {
        try {
            const response = await axiosInstance.get('/categories')
            return response
        } catch (error) {
            console.log('services error :: getCategories ::', error)
            throw error
        }
    }

    // get products filtered by category
    async filterProducts(categoryId) {
        try {
            // If categoryId is provided, include it as a query param
            const response = await axiosInstance.get('/products', {
                params: categoryId ? { categoryId } : {}
            });

            console.log('Filtered products:', response.data);
            return response.data;
        } catch (error) {
            console.error('service error :: filterProducts ::', error);
        }
    }


    //--------------------------------------
    // CART RELATED SERVICES
    //--------------------------------------

    //--------------------------------------
    // ORDERS RELATED SERVICES
    //--------------------------------------

    //--------------------------------------
    // REVIEWS RELATED SERVICES
    //--------------------------------------
}

const services = new Services()

export default services