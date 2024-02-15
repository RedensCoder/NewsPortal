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
    // ИЗМЕНИТЬ ПОТОМ НА СТАТЬЮ И НОВОСТИ
    // async createArticles(title, content, tags, userId){

    //     const articles = await axios.post(`${this.url}/createAcrticles`, {
    //       id: userId,
    //       title: title,
    //       content: content,
    //       tags: tags,
    //     }, {headers: {
    //         Authorization: `${localStorage.getItem("token")}`
    //       }
    //     })   
    //   console.log(articles);
    // },

    async createPost(content, userId){

        const postiki = await axios.post(`${this.url}/createPost`, {
          id: userId,
          content: content,
        }, {headers: {
            Authorization: `${localStorage.getItem("token")}`
          }
        })   
      console.log(postiki);
    },

    async getPostById(id){
      try {
        const token = await axios.get(`${this.url}/getPostById/${id}`)
          if (token.status === 200){
            return token.data;
        }
      }
      catch(err){
          if(err.response.status === 400){
              return undefined;
          }
      }
    },

    async getAllPosts(limit){
      
      let posts = [];
      const req = await axios.get(`${this.url}/getAllPosts/${limit}`)

      // await token.data.forEach(async el => {
      //   const user = await axios.get(`http://localhost:8080/getUserInfoById/${el.userId}`);
      //   posts.push({post: el, user: await user.data})
      // });

      for (let i = 0; i < req.data.length; i++) {
        const user = await axios.get(`http://localhost:8080/getUserInfoById/${req.data[i].userId}`);
        posts.push({post: req.data[i], user: user.data});
      }
      return posts
        
    },

    async postLike(id, post){
      let like = await axios.post(`${this.url}/postLike`, {
        id: id,
        post: post,
      }, {headers: {
          Authorization: `${localStorage.getItem("token")}`
        }
      })   
      console.log(like);
    },

  },
})