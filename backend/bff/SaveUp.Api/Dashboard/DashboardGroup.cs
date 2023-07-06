using Marten;
using SaveUp.Api.Dashboard.Projections;
using Wolverine;
using Wolverine.Http;

namespace SaveUp.Api.Dashboard;

public static class DashboardGroup
{
    public static RouteGroupBuilder AddDashboardGroup(this RouteGroupBuilder group)
    {
        group.MapGet("/", async (IDocumentSession session, IdentityStreamIdProvider id) =>
        {
            var details = await session.Events.AggregateStreamAsync<DashboardDetailsProjection>(id.GetStreamId());
            var response = new DashboardModel
            {
                Children = details?.Children ?? new(),
                Jobs = details?.Jobs ?? new(),
                ChildJobs = details?.ChildJobs ?? new()
            };
            return Results.Ok(response);
        });
        group.MapPostToWolverine<UserLoginRequest, UserLogin>("/login");
        group.MapPostToWolverine<ChildCreateRequest, Child>("/children");
        group.MapPostToWolverine<JobCreateRequest, Job>("/jobs");
        group.MapPostToWolverine<ChildJobAssignmentRequest, ChildJobAssignment>("/child-jobs");
        group.MapPostToWolverine<DashboardCreatedRequest, DashboardCreated>("/create");
        group.RequireAuthorization();
        return group;
    }
}



