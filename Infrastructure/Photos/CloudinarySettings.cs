using System;

namespace Infrastructure.Photos;

public class CloudinarySettings
{
    public required string CloudName { get; set; } = null!;
    public required string ApiKey { get; set; } = null!;
    public required string ApiSecret { get; set; } = null!;
}
