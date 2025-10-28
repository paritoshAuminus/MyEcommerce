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
    async getProduct({id}) {
        try {
            const response = await axiosInstance.get(`/products/${id}`)
            return response.data
        } catch (error) {
            console.log('services error :: getProduct ::', error)
            throw error
        }
    }

    //-------------------------------------------------------
    // TODO: ADD METHOD HERE TO GET PRODUCT A/C TO CATEGORIES
    //-------------------------------------------------------

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