import axios from 'axios'
const API_URL = 'http://localhost:5000';

const create = async (user) => {
  try {
    let response = await axios.post(API_URL + "/api/users/", user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });
    return response.data
  } catch (err) {
    console.log(err);
  }
};

const list = async (signal) => {
    try {
      let response = await axios.get(API_URL + '/api/users/', {
        cancelToken: signal,
      })
      return response.data
    } catch(err) {
      console.log(err)
    }
  }
  
  const read = async (userId) => {
    try {
      let response = await axios.get(API_URL + '/api/users/' + userId, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      return response.data
    } catch(err) {
      console.log(err)
    }
  }
  
  const update = async (params, credentials, user) => {
    try {
      let response = await axios.put(API_URL + '/api/users/' + params.userId, JSON.stringify(user), {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
      })
      return response.data
    } catch(err) {
      console.log(err)
    }
  }

  const signin = async (userData) => {
    const response = await axios.post(API_URL + '/auth/signin', userData); // Making the POST request to the API
    if(response.data)
    {
        localStorage.setItem('user', JSON.stringify(response.data)); // Storing the user in local storage and returning the response
    }
    return response.data;
}
  
  const signout = async () => {
    try {
      let response = await axios.get(API_URL + '/auth/signout/')
      return await response.data
    } catch(err) {
      console.log(err)
    }
  }
  
  const remove = async (params, credentials) => {
    try {
      let response = await axios.delete(API_URL + '/api/users/' + params.userId, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return response.data
    } catch(err) {
      console.log(err)
    }
  }

  const getPfP = async (params) => {
    try {
      let response = await axios.get(API_URL + params, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  const follow = async (params, credentials, followId) => {
    try {
    let response = await axios.put('/api/users/follow/', {
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify({userId:params.userId, followId: followId})
    })
    return response.data
    } catch(err) {
    console.log(err)
    }
   }

   const unfollow = async (params, credentials, unfollowId) => {
    try {
    let response = await axios.put('/api/users/unfollow/', {
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify({userId:params.userId, unfollowId:
   unfollowId})
    })
    return response.data
    } catch(err) {
    console.log(err)
    }
   }

const userService = { create, list, read, update, remove, signin, signout, getPfP, follow, unfollow }
export default userService;
