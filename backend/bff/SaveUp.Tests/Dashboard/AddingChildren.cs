using Alba;
using Alba.Security;
using SaveUp.Api.Dashboard;
using SaveUp.Api.Dashboard.Projections;
using SaveUp.Tests.Dashboard.Fixtures;
using System.Security.Claims;

namespace SaveUp.Tests.Dashboard;

public class AddingChildren : IClassFixture<DBFixture>
{
    private readonly IAlbaHost _host;
    public AddingChildren(DBFixture fixture)
    {
        _host = fixture.AlbaHost;
    }


    [Fact]
    public async Task Onboarding()
    {

        var dashboardResponse = await _host.Scenario(_ =>
        {
            _.Get.Url("/dashboard");
            _.StatusCodeShouldBeOk();
        });

        var db = dashboardResponse.ReadAsJson<DashboardDetails>();
        Assert.NotNull(db);
        Assert.Equal("Your Family Dashboard", db.FamilyName);
    }

    [Fact]
    public async Task AddingSomeKidsThroughApi()
    {
        var henry = new ChildCreateRequest("Henry", new DateOnly(2011, 3, 30));
        var violet = new ChildCreateRequest("Violet", new DateOnly(2008, 8, 11));
        var kids = new List<ChildCreateRequest> {
            
           henry, violet
        };

        foreach (var kid in kids)
        {
            await _host.Scenario(_ =>
            {

                _.Post.Json(kid).ToUrl("/dashboard/children");
                _.StatusCodeShouldBeOk();
            });
        }

        var response = await _host.Scenario(_ =>
        {
            _.Get.Url("/dashboard");
            _.StatusCodeShouldBeOk();
        });

        var db = response.ReadAsJson<DashboardDetails>();

        Assert.Equal(2, db.Children.Count);
    }
}
