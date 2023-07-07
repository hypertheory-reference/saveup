using Marten;
using Marten.AspNetCore;
using SaveUp.Api.Dashboard.Projections;
using Wolverine;
using Wolverine.Http;

namespace SaveUp.Api.Dashboard;

public static class DashboardGroup
{

    public static RouteGroupBuilder AddDashboardGroup(this RouteGroupBuilder group)
    {
        group.MapGet("/", async (IDocumentSession session, IdentityStreamIdProvider id, IHttpContextAccessor context) =>
        {

            var streamId = id.GetStreamId();

            var response = await session.Events.AggregateStreamAsync<DashboardDetails>(streamId);
    
            if(response is null)
            {
                var dashboardCreate = new Dashboard(streamId, "Your Family Dashboard");
                session.Events.Append(streamId, dashboardCreate);
                await session.SaveChangesAsync();
                var newDashboard = await session.Events.AggregateStreamAsync<DashboardDetails>(streamId);
                return Results.Ok(newDashboard);
            } else
            {
                return Results.Ok(response);
            }

        });
        group.MapPostToWolverine<CreateDashboardRequest, Dashboard>("/");
        group.MapPostToWolverine<UserLoginRequest, UserLogin>("/login");
        group.MapPostToWolverine<ChildCreateRequest, Child>("/children");
        group.MapPostToWolverine<JobCreateRequest, Job>("/jobs");
        group.MapPostToWolverine<ChildJobAssignmentRequest, ChildJobAssignment>("/child-jobs");

        group.RequireAuthorization();
        return group;
    }
}



