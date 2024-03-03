import { defineStore } from 'pinia';
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const URL = "http://localhost:8080";

export const useApiStore = defineStore('api', {
  state: () => {
    return { }
  },
  actions: {
    async createUser(login, password, email) { 
        try {        
            const token = await axios.post(`${URL}/createUser`, {
                login: login,
                password: password,
                email: email,
            })
            if (token.status === 200){
                const id = jwtDecode(token.data).data.id;
                const req = await this.getUserInfoById(id);

                sessionStorage.setItem("user", JSON.stringify(req));

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
          const token = await axios.post(`${URL}/auth`, {
            login: login,
            password: password,
          })
          if (token.status === 200){
              const id = jwtDecode(token.data).data.id;
              const req = await this.getUserInfoById(id);

              sessionStorage.setItem("user", JSON.stringify(req));

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
        const token = await axios.get(`${URL}/getUserInfoById/${id}`, {
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
      async getUserInfoByLink(link){
          try {
              const token = await axios.get(`${URL}/getUserInfoByLink/${link}`, {
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

        const postiki = await axios.post(`${URL}/createPost`, {
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
        const token = await axios.get(`${URL}/getPostById/${id}`)
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

      async getAllUserPosts(id){

          let posts = [];
          const req = await axios.get(`${URL}/getUserPosts/${id}`)

          for (let i = 0; i < req.data.length; i++) {
              const user = await axios.get(`${URL}/getUserInfoById/${req.data[i].userId}`);
              posts.push({post: req.data[i],
                  likes: await this.getPostLikes(req.data[i].id),
                  dislikes: await this.getPostDislikes(req.data[i].id),
                  view: await this.getPostViews(req.data[i].id),
                  user: user.data
              });
          }
          return posts

      },

    async getAllPosts(limit){
      
      let posts = [];
      const req = await axios.get(`${URL}/getAllPosts/${limit}`)

      for (let i = 0; i < req.data.length; i++) {
        const user = await axios.get(`${URL}/getUserInfoById/${req.data[i].userId}`);
        posts.push({post: req.data[i], 
          likes: await this.getPostLikes(req.data[i].id), 
          dislikes: await this.getPostDislikes(req.data[i].id), 
          view: await this.getPostViews(req.data[i].id), 
          user: user.data
        });
      }
      return posts
        
    },

    async postLike(id, post){
      await axios.post(`${URL}/postLike`, {
        id: id,
        post: post,
      }, {headers: {
          Authorization: `${localStorage.getItem("token")}`
        }
      })   

    },

    async postDislike(id, post){
      await axios.post(`${URL}/postDislike`, {
        id: id,
        post: post,
      }, {headers: {
          Authorization: `${localStorage.getItem("token")}`
        }
      })
    },

    async getPostLikes(id) {
      let getLike = await axios.get(`${URL}/getPostLikes/${id}`);
      return getLike.data;
    },

    async getPostDislikes(id) {
      let getDislike = await axios.get(`${URL}/getPostDislikes/${id}`);
      return getDislike.data;
    },

    async getUserPostLike(id, post){
      let like = await axios.post(`${URL}/getUserPostLike`, {
        id: id,
        post: post,
      }, {headers: {
          Authorization: `${localStorage.getItem("token")}`
        }
      })   
      return like.data;
    },

    async getUserPostDislike(id, post){
      let like = await axios.post(`${URL}/getUserPostDislike`, {
        id: id,
        post: post,
      }, {headers: {
          Authorization: `${localStorage.getItem("token")}`
        }
      })   
      return like.data;
    },

    async addView(id){

      await axios.put(`${URL}/addView/${id}`, {}, {
          headers: {
              Authorization: `${localStorage.getItem("token")}`
          }
      })   
      
    },

    async getPostViews(id) {
      let getView = await axios.get(`${URL}/getPostViews/${id}`);
      return getView.data;
    },

      async uploadUserAvatar(id, img) {
          const file = new FormData();
          file.append("avatar", img)

          await axios.put(`${URL}/uploadUserAvatar/${id}`, file, {
              headers: {
                  "Authorization": localStorage.getItem("token"),
                  "Content-Type": "multipart/form-data"
              }
          });

          const req = await this.getUserInfoById(id);
          sessionStorage.setItem("user", JSON.stringify(req));
      },

      async uploadPublicAvatar(id, img) {
          const file = new FormData();
          file.append("avatar", img)

          await axios.put(`${URL}/uploadpublicAvatar/${id}`, file, {
              headers: {
                  "Authorization": localStorage.getItem("token"),
                  "Content-Type": "multipart/form-data"
              }
          });
      },

    async updateUserInfo(id, about, nickname, link) {
      await axios.put(`${URL}/updateUserInfo`, {
        id: id,
        about: about,
        nickname: nickname,
        link: link
      }, {headers: {
          Authorization: `${localStorage.getItem("token")}`
        }
      })

        const req = await this.getUserInfoById(id);
        sessionStorage.setItem("user", JSON.stringify(req));

    },

    async createPostComment(id, post, comment, date) {
      await axios.post(`${URL}/createPostComment`, {
        id: id,
        post: post,
        comment: comment,
        date: date
      }, {headers: {
          Authorization: `${localStorage.getItem("token")}`
        }
      })
    },

    // паблики

    async createPublic(userId, name, description, avatar, site, comment){
        console.log(`id: ${userId}, name: ${name}, desc: ${description}, site: ${site}, comm: ${comment}`)

        const pub = await axios.post(`${URL}/createPublic`, {
            userId: userId,
            name: name,
            description: description,
            avatar: "null",
            site: site,
            comment: comment
        }, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`
          }
        })

        await this.uploadPublicAvatar(pub.data.id, avatar);
    },

    async getAllPublics(limit){
        let publics = [];
        const req = await axios.get(`${URL}/getAllPublics/${limit}`)

        for (let pub of req.data) {
            if (pub.status === "true") {
                const subCount = await this.getPublicSubCount(pub.id);
                publics.push({public: pub, subs: subCount})
            }
        }

        return publics;
    },

      async getPublic(id) {
        const req = await axios.get(`${URL}/getPublicById/${id}`);
        return req.data;
      },

      async getPublicSubCount(id) {
          const req = await axios.get(`${URL}/getPublicSubsCount/${id}`)
          return req.data;
      },

      async searchPublic(value) {
        let publics = [];
          const req = await axios.post(`${URL}/searchPublic`, {
              value: value
          })

          for (let pub of req.data) {
              if (pub.status === "true") {
                  const subCount = await this.getPublicSubCount(pub.id);
                  publics.push({public: pub, subs: subCount})
              }
          }

          return publics;
      }

  },
})