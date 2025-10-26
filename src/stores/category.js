import { defineStore } from "pinia";

import api from "@/api/axios";

export const useCategoryStore = defineStore('category',{
    state: () => ({
        categories: [],
        category: null,
        errorMessage: null
    }),
    actions: {
        async createCategory(category){
            try{
                const res = await api.post('/category',{category});
                this.categories.push(res.data);
                return res.data;
            }catch(e){
                this.errorMessage = this.errorMessage.response?.data?.message || "Failed to create category";
            }
        },
        async fetchallcategory(){
            try{
                const res = await api.get('/category');
                this.categories = res.data?.data;
                return res.data
            }catch(e){
                this.errorMessage = this.errorMessage.response?.data?.message || "Fialed to create category";
            }
        },
        async updatecategory(categoryData){
            try{
                const {id,category} = categoryData
                const res = await api.put(`/category/${id}`,{category})
                this.categories.push(res.data)
                return res.data
            }catch(e){
                this.errorMessage = this.errorMessage.response?.data?.message || "Fialed to update category"
            }
        },
        async deleteCategory(id){
            try{
                const res = await api.delete(`/category/${id}`)
                return res.data
            }catch(e){
                this.errorMessage = res.response?.data?.message || "Fialed delete category"
            }
        }
    }
})