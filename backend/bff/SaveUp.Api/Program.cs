using Marten;
using Marten.AspNetCore;
using Wolverine;
using SaveUp.Api;
using SaveUp.Api.Dashboard;
using Marten.Events.Projections;
using SaveUp.Api.Dashboard.Projections;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseWolverine();
var connectionString = builder.Configuration.GetConnectionString("events") ?? throw new Exception("Need Connection String for Events");


builder.Services.AddMarten(opts =>
{
    opts.Connection(connectionString);
    opts.Projections.Snapshot<DashboardDetailsProjection>(SnapshotLifecycle.Inline);
    opts.DatabaseSchemaName = "saveup";

}).UseLightweightSessions();

builder.Services.AddScoped<IdentityStreamIdProvider>();

builder.Services.AddCors(c =>
{
    c.AddDefaultPolicy(p =>
    {
        p.AllowAnyMethod();
        p.AllowAnyOrigin();
        p.AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors();

app.MapGroup("dashboard").AddDashboardGroup();
app.Run();