import config from './config';

let id= [];
// Data class holds helper functions that make api requests 
export default class Data {
  api(path, method= 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    // Options object sends requests with HTTP method, request headers and stringified body 
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    
    if(requiresAuth){
        // The btoa() method creates a base-64 encoded ASCII string from a "string" of data. 
      // We'll use btoa() to encode the user ID (in this case emailAddress) and password credentials passed to the api() 
      // method. The credentials will be passed as an object containing emailAddress and password 
      
          const encodedCredentials = Buffer.from(`${credentials.emailAddress }:${credentials.password}`).toString('base64');
          options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  // getUser helper function, retrieves user data from API 
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
     
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  // createUser helper function, posts new user data 
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

 // Courses helper function, retrieves courses data from API 

 async getCourses () {
    const response = await this.api('/courses', 'GET', null)
    if(response.status === 200) {
        return response.json().then(data => data)
    } else if (response.status === 401 ) {
      
      return response.status
      
    } else {
        throw new Error();
    }
 }

 // getCourse helper function, retrieves individual course data from API 
 async getCourse (id) {
    const response = await this.api(`/courses/${id}`, 'GET', null)
    if(response.status === 200) {
        return response.json().then(data => data)
    } else if (response.status === 404 ) {
        return response.status
    } else {
        throw new Error();
    }
 }

 // createCourse helper function, posts new course data 
 async createCourse (course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'POST',course, true, { emailAddress, password })
    if(response.status === 201) {
        return []
    } else if (response.status === 400) {
      return  response.json().then(data => {
            return data.errors;
        });
    } else {
         throw new Error();
    }
 }

 // update helper function, updates course data to API 
 async updateCourse (course, id, emailAddress, password){
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { emailAddress, password })
    if(response.status === 204){
        return []

    } else if (response.status === 400){
      return  response.json().then(data => {
            return data.errors;
        });
    } else {
        throw new Error();
    }

 }
  // delete helper function, deletes course

  async deleteCourse ( id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE',null, true, { emailAddress, password })
        if(response.status === 204) {
            return [];
        } else if(response.status === 403) {
            response.jason().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
          
        }
      
  }

}