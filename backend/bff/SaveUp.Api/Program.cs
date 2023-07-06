using Marten;
using Marten.AspNetCore;
using Wolverine;
using SaveUp.Api;
using SaveUp.Api.Dashboard;
using Marten.Events.Projections;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using SaveUp.Api.Dashboard.Projections;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    var authority = "http://localhost:8080/";
    o.Authority = authority;
    o.Audience = "frontend";
    o.MetadataAddress = authority + "/realms/saveup/.well-known/openid-configuration";
    o.RequireHttpsMetadata = !builder.Environment.IsDevelopment();
});
builder.Services.AddAuthorization();
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
        p.WithOrigins("http://localhost:4200");
        p.AllowAnyHeader();
        p.AllowCredentials();
    });
});

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors();
app.MapGet("/tacos", () => "You are in!").RequireAuthorization();
app.MapGroup("dashboard").AddDashboardGroup();
app.Run();