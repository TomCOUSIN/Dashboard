import axios from 'axios';

class WidgetClient
{
  static fetchWeather(city_name, country_code) {
    return axios
      .get(`http://localhost:8080/widgets/weather?cityname=${city_name}&countrycode=${country_code}`)
      .then(function (response) {
        return response;
      }).catch(function (error) {
        console.log(error);
      });
  }

  static fetchGithubUser(github_username) {
    return axios
      .get(`http://localhost:8080/widgets/github-user?user=${github_username}`)
      .then(function (response) {
        return response;
      }).catch(function (error) {
        console.log(error);
      });
  }

  static fetchGithubRepos(github_username) {
    return axios
      .get(`http://localhost:8080/widgets/github-repos?user=${github_username}`)
      .then(function (response) {
        return response;
      }).catch(function (error) {
        console.log(error);
      });
  }

  static fetchMicrosoftMail(username) {
    return axios
      .get(`http://localhost:8080/widgets/microsoft-mails?user=${username}`)
      .then(function (response) {
        return response;
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

  static postMicrosoftMailWidget(username, mailCount) {
    return axios.post('http://localhost:8080/widgets', {
      "user": username,
      "service": "microsoft",
      "name": "microsoft-mails",
      "params": [mailCount]
    }).then(function(response) {
      return response.data;
    }).catch(function(error) {
      return error.toJSON();
    });
  }

  static deleteWidget(widget) {
    return axios.delete(`http://localhost:8080/widgets/${widget.id}`)
      .then(function(response) {
      return response.data;
    }).catch(function(error) {
      return error.toJSON();
    });
  }

  static deleteAllWidgetByService(username, service) {
    return axios.delete(`http://localhost:8080/widgets?username=${username}&servicename=${service}`)
      .then(function(response) {
      return response.data;
    }).catch(function(error) {
      return error.toJSON();
    });
  }
}

export default WidgetClient;
