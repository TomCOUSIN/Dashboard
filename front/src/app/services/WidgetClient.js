import axios from 'axios';

class WidgetClient
{
  static fetchWeather(city_name, country_code) {
    return axios
      .get(`http://localhost:8080/widgets/weather?city_name=${city_name}&country_code=${country_code}`)
      .then(function (response) {
        return response.data;
      }).catch(function (error) {
        console.log(error);
      });
  }

  static fetchGithubUser(github_username) {
    return axios
      .get(`http://localhost:8080/widgets/github-user?user=${github_username}`)
      .then(function (response) {
        return response.data;
      }).catch(function (error) {
        console.log(error);
      });
  }

  static fetchGithubRepos(github_username) {
    return axios
      .get(`http://localhost:8080/widgets/github-repos?user=${github_username}`)
      .then(function (response) {
        return response.data;
      }).catch(function (error) {
        console.log(error);
      });
  }

  static postWeatherWidget(username, city_name, country_code) {
    return axios.post('http://localhost:8080/widgets', {
      "user": username,
      "service": "weather",
      "name": "weather",
      "params": [city_name, country_code]
    }).then(function(response) {
      return response.data;
    }).catch(function(error) {
      return error.toJSON();
    });
  }

  static postGithubUserWidget(username, github_username) {
    return axios.post('http://localhost:8080/widgets', {
      "user": username,
      "service": "github",
      "name": "github-user",
      "params": [github_username]
    }).then(function(response) {
      return response.data;
    }).catch(function(error) {
      return error.toJSON();
    });
  }

  static postGithubReposWidget(username, github_username) {
    return axios.post('http://localhost:8080/widgets', {
      "user": username,
      "service": "github",
      "name": "github-repos",
      "params": [github_username]
    }).then(function(response) {
      return response.data;
    }).catch(function(error) {
      return error.toJSON();
    });
  }
}

export default WidgetClient;
