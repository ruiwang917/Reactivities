using Application.Profiles.DTOs;

namespace Application.Activities.DTOs;

public class ActivityDto
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public DateTime Date { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public Boolean IsCancelled { get; set; }

    public required string HostDisplayName { get; set; }

    public required string HostId { get; set; }

    // location 
    public required String City { get; set; }
    public required String Venue { get; set; }
    public Double Latitude { get; set; }
    public Double Longitude { get; set; }


    // navigation
    public ICollection<UserProfile> Attendees { get; set; } = [];
}
