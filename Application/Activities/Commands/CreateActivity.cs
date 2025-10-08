using System;
using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<String>>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor)
        : IRequestHandler<Command, Result<String>>
    {
        public async Task<Result<String>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();
            var activity = mapper.Map<Activity>(request.ActivityDto);

            if (activity == null) return Result<String>.Failure("Failed to create activity", 400);

            context.Activities.Add(activity);

            var attendee = new ActivityAttendee
            {
                ActivityId = activity.Id,
                UserId = user.Id,
                IsHost = true,
            };

            activity.Attendees.Add(attendee);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<String>.Failure("Failed to create activity", 400);

            return Result<String>.Success(activity.Id);
        }
    }
}
