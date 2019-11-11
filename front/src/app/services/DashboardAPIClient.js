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
}

export default DashboardAPIClient;
