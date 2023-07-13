using Marten;
using Marten.AspNetCore;
using Microsoft.AspNetCore.Mvc;
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
        group.MapPost("/children/{id}/allowance", async ([FromRoute] Guid id, [FromBody] ChildAllowanceAssignmentRequest request, IDocumentSession session, IdentityStreamIdProvider identity ) =>
        {
            // TODO: AuthnN on the ID
            var allowance = new ChildAllowanceAssignment(id, request.WeeklyAllowance);
            session.Events.Append(identity.GetStreamId(), allowance);
            await session.SaveChangesAsync();
            return Results.Ok();
        });
        group.MapPost("/children/{id}/birthday", () =>
        {
            return Results.Ok();

        });
        group.MapPost("/children/{id}/birthdate", ([FromBody] Object request) =>
        {
            return Results.Ok(request);

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



