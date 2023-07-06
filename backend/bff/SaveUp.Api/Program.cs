using Marten;
using Marten.AspNetCore;
using Wolverine;
using SaveUp.Api;
using SaveUp.Api.Dashboard;
using Marten.Events.Projections;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using SaveUp.Api.Dashboard.Projections;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;

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
    var serializer = new Marten.Services.JsonNetSerializer();
    serializer.EnumStorage = Weasel.Core.EnumStorage.AsString;
    serializer.Casing = Casing.CamelCase;
    
    opts.Serializer(serializer);
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