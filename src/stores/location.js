import { defineStore } from "pinia";
import api from "@/api/axios";

export const useLocationStore = defineStore('location',{
    // initailize state
    state: () => ({
        locations: [],
        location: null,
        errorMessage: null
    }),
    // function
    actions:{
        // fetch route create location
        async createLocation(data){
            try{
                const res = await api.post('/location',data);
                this.location.push(res.data);
                return res.data;
            }catch(e){
                this.errorMessage = this.errorMessage.response?.data?.message || "Faild to create location";
            }
        },
        // fetch location
        async fetchLocation(){
            try{
                const res = await api.get("/location");
                this.locations = res.data?.data;
                this.errorMessage = null;
            }catch(err){
                this.errorMessage = err.response?.data?.message || "Failed to fetch location";
            }
        },
        // update location
        async updateLocation(locationData){
            try{
                const {id,name,poscode} = locationData;
                const res = await api.put(`/location/${id}`,{name,poscode});
                const updated = res.data.data;
                return updated
            }catch(err){
                this.errorMessage = this.errorMessage.response?.data?.message || "Updating Error";
            }
        },
        // delete location
        async deleteLocation(id){
            try{
                const res = await api.delete(`/location/${id}`);
                return res.data.data
            }catch(e){
                this.errorMessage = err.response?.data?.message || "Deleting error";
            }
        }
    }
})