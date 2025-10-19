import { defineStore } from "pinia";
import api from "@/api/axios";

export const useAuthStore = defineStore('auth',{
    // for create state
    state: () => ({
        // user
        user: null,
        isAuth: false,
        // isLogin: false,
        errorMessage: null,
    }),

    // for create function
    actions: {
        // function register
        async register(name,email,password) {
            try{
                // fetch api from route register
                const res = await api.post('/register',{name,email,password});
                this.isAuth = true
                this.errorMessage = null
                return res.data
            }catch(err){
                console.error(err);
            }
        },

        async getProfile(){
            try{
                const res = await api.get('/getProfile');
                this.user = res.data.user;
                this.isAuth = true;
                this.errorMessage= null
                return res.data.user
            }catch(err){
                console.error(err);
                this.user = null;
                this.isAuth = false;

                if (err.response && err.response.status === 401) {
                    this.err.response = "Not authenticated";
                }else{
                    this.errorMessage = "Failed to fetch profile";
                }
            }
        },

        async login(identifier,password) {
            try{
                // fetch api from route register
                const res = await api.post('/login',{identifier,password});
                this.isAuth = true;
                this.errorMessage = null
                return res.data
            } catch(err){
                if(err.errorMessage && err.response.status === 400){
                    this.errorMessage = err.response.data.message;
                }else{
                    this.errorMessage = "Something went wrong, please try again."
                }
            }
        },
        async logout() {
            try{
                const res = await api.post('/logout');
                this.isAuth = false;
                this.errorMessage = null
                return res.data
            }catch(e){
                return this.errorMessage = e
            }
        }
    }
})