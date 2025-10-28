import axiosInstance from './../api/api'

// ------------------------------------
// AUTH SERVICES
//-------------------------------------

class AuthService {

    // Signup/Register user
    async signup({ name, email, password }) {
        try {
            const response = await axiosInstance.post('/auth/register', {
                name: name,
                email: email,
                password: password
            })
            return response

        } catch (error) {
            console.log('authService :: signup ::', error)
            throw error
        }
    }

    // login 
    async login({ email, password }) {
        try {
            const response = await axiosInstance.post('/auth/login', {
                email: email,
                password: password
            })
            localStorage.setItem('ecommerceToken', response.data.token)
            return response
        } catch (error) {
            console.log('authService error :: login ::', error)
            throw error
        }
    }

    // get logged in user
    async getUser({ token }) {
        try {
            const response = await axiosInstance.get('/auth/getUser', {
                headers: { Authorization: `Bearer ${token}` }
            });
            // return response.data;
            return response;
        } catch (error) {
            console.error('authService error :: getUser ::', error.response?.data || error);
            throw error;
        }
    }

    // update existing user
    async updateUser({ name, email, password, token }) {

        const updatedData = {}

        if (name) updatedData.name = name
        if (email) updatedData.email = email
        if (password) updatedData.password = password

        try {
            const response = await axiosInstance.put('/auth/update', 
                updatedData,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response
        } catch (error) {
            console.log('authService error :: updateUser ::', error)
            throw error
        }
    }
}

const authService = new AuthService()

export default authService