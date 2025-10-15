using System;

namespace Application.Profiles.DTOs;

public class PhotoUploadResult
{
    public required string PublicId { get; set; } = null!;
    public required string Url { get; set; } = null!;
}
