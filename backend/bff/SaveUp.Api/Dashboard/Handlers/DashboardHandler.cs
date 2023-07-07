using Marten;

namespace SaveUp.Api.Dashboard.Handlers;

public class DashboardHandler

{
    

    public async Task<Dashboard> Handle(CreateDashboardRequest request, IdentityStreamIdProvider idProvider, IDocumentSession session)
    {


        var dashboard = new Dashboard(idProvider.GetStreamId(), request.FamilyName);
        session.Events.Append(idProvider.GetStreamId(), dashboard);
        await session.SaveChangesAsync();
        return dashboard;
    }
}