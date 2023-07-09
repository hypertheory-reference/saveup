using Marten;

namespace SaveUp.Api.Dashboard.Handlers;

public class ChildHandler
{
    private readonly ILogger<ChildHandler> _logger;

    public ChildHandler(ILogger<ChildHandler> logger)
    {
        _logger = logger;
    }

    public async Task<Child> Handle(ChildCreateRequest request, IdentityStreamIdProvider idProvider, IDocumentSession session)
    {

        _logger.LogInformation(idProvider.GetStreamId().ToString());
        var child = new Child(Guid.NewGuid(), request.Name, request.BirthDate);
        session.Events.Append(idProvider.GetStreamId(), child);
        await session.SaveChangesAsync();
        return child;
    }
}
