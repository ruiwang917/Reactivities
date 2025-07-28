using System;

namespace Application.Activities.DTOs;

public class BaseActivityDto
{
    public string Title { get; set; } = "";

    public DateTime Date { get; set; }

    public string Description { get; set; } = "";

    public string Category { get; set; } = "";

    // location
    public String City { get; set; } = "";

    public String Venue { get; set; } = "";

    public Double Latitude { get; set; }

    public Double Longitude { get; set; }
}
