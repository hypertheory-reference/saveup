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
        group.MapGet("/",  (IDocumentSession session, IdentityStreamIdProvider id, IHttpContextAccessor context) =>
        {
            
            return session.Json.WriteById<DashboardDetailsProjection>(id.GetStreamId(), context.HttpContext!);
            //var response = await session.LoadAsync<DashboardDetailsProjection>(id.GetStreamId());
    
            //return Results.Ok(response);

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



