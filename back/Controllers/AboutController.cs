using Microsoft.Extensions.Logging;
using DEV_dashboard_2019.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System;
using Microsoft.AspNetCore.Http;

namespace DEV_dashboard_2019.Controllers
{
    [ApiController]
    [EnableCors("AllowMyOrigin")]
    public class AboutController : ControllerBase
    {
        private readonly ILogger<AboutController> _logger;

        public AboutController(ILogger<AboutController> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet("About.json")]
        public About Get()
        {
            AboutClient client = new AboutClient()
            {
                Host = Request.HttpContext.Connection.RemoteIpAddress.ToString(),
            };
            AboutServer server = new AboutServer()
            {
                Current_Time = (DateTime.Now - new DateTime(1970, 1, 1, 0, 0, 0, 0).ToLocalTime()).TotalSeconds.ToString(),
                    Services = new AboutService[]
                    {
                        new AboutService()
                        {
                            Name = "github",
                            Widgets = new AboutWidget[]
                            {
                                new AboutWidget()
                                {
                                    Name = "github-user",
                                    Description = "Retrieve Github user's account information",
                                    Params = new AboutParams[]
                                    {
                                        new AboutParams()
                                        {
                                            Name = "username",
                                            Type = "string"
                                        }
                                    }
                                },
                                new AboutWidget()
                                {
                                    Name = "github-repos",
                                    Description = "Retrieve Github user's repositories information",
                                    Params = new AboutParams[]
                                    {
                                        new AboutParams()
                                        {
                                            Name = "username",
                                            Type = "string"
                                        }
                                    }
                                },
                            }
                        },
                        new AboutService()
                        {
                            Name = "weather",
                            Widgets = new AboutWidget[]
                            {
                                new AboutWidget()
                                {
                                    Name = "weather",
                                    Description = "Retrieve weather for a specific place",
                                    Params = new AboutParams[]
                                    {
                                        new AboutParams()
                                        {
                                            Name = "city_name",
                                            Type = "string"
                                        },
                                        new AboutParams()
                                        {
                                            Name = "country_code",
                                            Type = "string"
                                        }
                                    }
                                },
                            }
                        },
                        new AboutService()
                        {
                            Name = "microsoft",
                            Widgets = new AboutWidget[]
                            {
                                new AboutWidget()
                                {
                                    Name = "microsoft-mails",
                                    Description = "retrieve {mailCount} last user's mails",
                                    Params = new AboutParams[]
                                    {
                                        new AboutParams()
                                        {
                                            Name = "mailCount",
                                            Type = "string"
                                        }
                                    }
                                }
                            }
                        }
                    }
            };
            About about = new About()
            {
                Client = client,
                Server = server,
            };
            return about;
        }
    }
}