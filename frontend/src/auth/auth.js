import axiosInstance from './../api/api'
import { token } from './../api/api'

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

    async login({ email, password }) {
        try {
            const response = await axiosInstance.post('/auth/login', {
                email,
                password
            });

            if (response.status === 200) {
                localStorage.setItem('ecommerceToken', response.data.token);
            }

            return response;
        } catch (error) {
            console.log('authService error :: login ::', error);

            // Create a clean, user-friendly error message
            let message = "Something went wrong. Please try again.";

            if (error.response) {
                if (error.response.status === 404) {
                    message = "User not found";
                } else if (error.response.status === 401) {
                    message = "Invalid email or password";
                } else if (error.response.data?.message) {
                    message = error.response.data.message;
                }
            } else if (error.message) {
                message = error.message;
            }

            throw new Error(message);
        }
    }


    // get logged in user
    async getUser() {
        if (!token) throw new Error('User not found')
        try {
            const response = await axiosInstance.get('/auth/getUser', {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response;
        } catch (error) {
            let message = 'Something went wrong, please try again.'

            if (error) {
                if (error.status === 403) {
                    message = 'Token expired, please login again'
                }
            }

            throw new Error(message);
        }
    }

    // update existing user
    async updateUser({ name, email, password }) {

        const updatedData = {}

        if (name) updatedData.name = name
        if (email) updatedData.email = email
        if (password) updatedData.password = password

        try {
            const response = await axiosInstance.put('/auth/update',
                updatedData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            return response
        } catch (error) {
            console.log('authService error :: updateUser ::', error)
            throw error
        }
    }

    // logout
    async logout() {
        localStorage.removeItem('ecommerceToken')
    }
}

const authService = new AuthService()

export default authService