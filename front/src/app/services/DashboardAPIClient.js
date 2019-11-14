import axios from 'axios'

class DashboardAPIClient
{
  static getAvailableServices() {
    return axios
      .get('http://localhost:8080/services')
      .then(function(response) {
        return response.data;
      }).catch(function(error) {
        return error.toJSON();
      });
  }

  static getUserAvailableServices(username) {
    return axios
      .get(`http://localhost:8080/services?user=${username}`)
      .then(function(response) {
        return response.data;
      }).catch(function(error) {
        return error.toJSON();
      });
  }

  static isUserExist(username) {
    return axios
      .get(`http://localhost:8080/authorize?name=${username}`)
      .then(function(response) {
        return response.data;
      }).catch(function(error) {
        return error.toJSON();
      })
  }

  static postUserService(service_name, username) {
    return axios.post('http://localhost:8080/services', {
      "user": username,
      "name": service_name,
      "params": ["Tom Cousin"]
    }).then(function(response) {
      return response.data;
    }).catch(function(error) {
      return error.toJSON();
    });
  }

  static deleteUserService(service_name, username) {
    return axios.delete(`http://localhost:8080/services?user=${username}&service_name=${service_name}`)
      .then(function(response) {
        return response.data;
      }).catch(function(error) {
        return error.toJSON();
      });
  }

  static getAvailableWidgets() {
    return axios
      .get('http://localhost:8080/widgets')
      .then(function(response) {
        return response.data;
      }).catch(function(error) {
        return error.toJSON();
      });
  }

  static getUserAvailableWidgets(username) {
    return axios
      .get(`http://localhost:8080/widgets?user=${username}`)
      .then(function(response) {
        return response.data;
      }).catch(function(error) {
        return error.toJSON();
      });
  }
}

export default DashboardAPIClient;
