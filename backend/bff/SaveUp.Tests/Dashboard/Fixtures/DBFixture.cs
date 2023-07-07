using Alba;
using Alba.Security;
using Marten;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Testcontainers.PostgreSql;
using Wolverine;

namespace SaveUp.Tests.Dashboard.Fixtures;

public class DBFixture : IAsyncLifetime
{
    private readonly string PG_IMAGE = "postgres:15.2-bullseye";
    public IAlbaHost AlbaHost = null!;
    private readonly PostgreSqlContainer _pgContainer;

    public DBFixture()
    {
        _pgContainer = new PostgreSqlBuilder()
            .WithDatabase("saveup")
            .WithUsername("postgres")
            .WithPassword("password")
            .WithImage(PG_IMAGE)
            .Build();
    }


    public async Task InitializeAsync()
    {
        var jwtSecurityStub = new JwtSecurityStub()
            .With(ClaimTypes.NameIdentifier, Guid.Parse("cac801c8-5359-4d4e-8d9d-a45cfb27c10a").ToString());
        await _pgContainer.StartAsync();
        System.Environment.SetEnvironmentVariable("ConnectionStrings__events", _pgContainer.GetConnectionString());
        AlbaHost = await Alba.AlbaHost.For<Program>(jwtSecurityStub);
    }
    public async Task DisposeAsync()
    {
        Environment.SetEnvironmentVariable("ConnectionStrings__events", null);
        await AlbaHost.StopAsync();
        if (_pgContainer is not null)
        {
            await _pgContainer.DisposeAsync().AsTask();
        }
    }

  
}
