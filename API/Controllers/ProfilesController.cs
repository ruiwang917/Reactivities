using System;
using Application.Profiles.Commands;
using Application.Profiles.DTOs;
using Application.Profiles.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProfilesController : BaseApiController
{
    // Endpoint to add a photo to a user's profile
    [HttpPost("add-photo")]
    public async Task<ActionResult<Task>> AddPhoto([FromForm] IFormFile file)
    {
        return HandleResult(await Mediator.Send(new AddPhoto.Command { File = file }));
    }

    // Endpoint to get all photos for a user's profile
    [HttpGet("{userId}/photos")]
    public async Task<ActionResult> GetProfilePhotos(string userId)
    {
        return HandleResult(await Mediator.Send(new GetProfilePhotos.Query { UserId = userId }));
    }

    // Endpoint to delete a photo from a user's profile
    [HttpDelete("{photoId}/photos")]
    public async Task<ActionResult> DeletePhoto(string photoId)
    {
        return HandleResult(await Mediator.Send(new DeletePhoto.Command { PhotoId = photoId }));
    }


    // Endpoint to set a photo as the main profile photo
    [HttpPut("{photoId}/setMain")]
    public async Task<ActionResult> SetMainPhoto(string photoId)
    {
        return HandleResult(await Mediator.Send(new SetMainPhoto.Command { PhotoId = photoId }));
    }

    // Endpoint to get a user's profile by userId
    [HttpGet("{userId}")]
    public async Task<ActionResult<UserProfile>> GetProfile(string userId)
    {
        return HandleResult(await Mediator.Send(new GetProfile.Query { UserId = userId }));
    }

    // Endpoint to edit a user's profile (username and bio)
    [HttpPut]
    public async Task<ActionResult> EditProfile(EditProfile.Command command)
    {
        return HandleResult(await Mediator.Send(command));
    }

    // Endpoint to add/remove following
    [HttpPost("{userId}/follow")]
    public async Task<ActionResult> FollowToggle(string userId)
    {
        return HandleResult(await Mediator.Send(new FollowToggle.Command { TargetUserId = userId }));
    }

    // Endpoint to get following/follower list
    [HttpGet("{userId}/follow-list")]
    public async Task<ActionResult> GetFollowings(string userId, string predicate)
    {
        return HandleResult(await Mediator.Send(new GetFollowings.Query { UserId = userId, Predicate = predicate }));
    }

    // Endpoint to get activities for user profile
    [HttpGet("{userId}/activities")]
    public async Task<ActionResult> GetUserActivities(string userId, string filter)
    {
        return HandleResult(await Mediator.Send(new GetUserActivities.Query { UserId = userId, Filter = filter }));
    }
}
