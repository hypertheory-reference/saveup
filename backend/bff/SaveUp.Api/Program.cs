using Marten;
using Wolverine;
using SaveUp.Api;
using SaveUp.Api.Dashboard;
using Marten.Events.Projections;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using SaveUp.Api.Dashboard.Projections;
using Microsoft.IdentityModel.Tokens;
using Weasel.Core;
using Microsoft.Extensions.Options;

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
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateAudience = false,
        NameClaimType = "preferred_username"
    };
});

builder.Services.AddAuthorization();
builder.Services.AddHttpContextAccessor();

builder.Host.UseWolverine();

var connectionString = builder.Configuration.GetConnectionString("events") ?? throw new Exception("Need Connection String for Events");


builder.Services.AddMarten(opts =>
{
    opts.UseDefaultSerialization(EnumStorage.AsString, Casing.CamelCase);

    opts.Connection(connectionString);
    opts.Projections.Add<DashboardDetailsProjection>(ProjectionLifecycle.Inline);
    // opts.Projections.Snapshot<DashboardDetailsProjection>(SnapshotLifecycle.Inline);
    opts.DatabaseSchemaName = "saveup";

    if (builder.Environment.IsDevelopment())
    {
        opts.AutoCreateSchemaObjects = AutoCreate.All;
    }

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
app.MapGroup("dashboard").AddDashboardGroup();
app.Run();

public partial class Program { }