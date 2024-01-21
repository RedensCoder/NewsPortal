import { defineStore } from 'pinia';
import axios from "axios";

export const useApiStore = defineStore('api', {
  state: () => {
    return { url: "http://localhost:8080" }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async createUser(login, password, email) { 
        try {        
            const token = await axios.post(`${this.url}/createUser`, {
                login: login,
                password: password,
                email: email,
            })
            if (token.status === 200){
                return token.data;
            }
        }
        catch(err){
            if(err.response.status === 409){
                return undefined;
            }
        }
    },
    async auth(login, password) {
      try {
          const token = await axios.post(`${this.url}/auth`, {
            login: login,
            password: password,
          })
          if (token.status === 200){
            return token.data;
        }
      }
      catch(err){
          if(err.response.status === 409){
              return undefined;
          }
      }
    },
    async getUserInfoById(id){
      try {
        const token = await axios.get(`${this.url}/getUserInfoById/${id}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`
          }
        })
          if (token.status === 200){
            return token.data;
        }
      }
      catch(err){
          if(err.response.status === 401){
              return undefined;
          }
      }
    },
  },
})