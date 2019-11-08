class DashboardAPIClient
{
  static fetch(route) {
    alert("hmmmm");
    return fetch("http://localhost:8080" + route).then(function(response) {
      alert("Success");
      alert(response);
      return response;
    });
  }
}

export default DashboardAPIClient;
