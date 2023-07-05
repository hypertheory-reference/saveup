using Marten;

namespace SaveUp.Api.Dashboard.Handlers;

public class DashboardHandler

{
    private readonly ILogger<ChildHandler> _logger;

    public DashboardHandler(ILogger<ChildHandler> logger)
    {
        _logger = logger;
    }

    public async Task<DashboardCreated> Handle(DashboardCreatedRequest request, IdentityStreamIdProvider idProvider, IDocumentSession session)
    {


        var child = new DashboardCreated(idProvider.GetStreamId());
        session.Events.Append(idProvider.GetStreamId(), child);
        await session.SaveChangesAsync();
        return child;
    }
}