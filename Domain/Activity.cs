using System;

namespace Domain;

public class Activity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Title { get; set; }
    public DateTime Date { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public Boolean IsCancelled { get; set; }

    // location
    public required String City { get; set; }
    public required String Venue { get; set; }
    public Double Latitude { get; set; }
    public Double Longitude { get; set; }
    
}
