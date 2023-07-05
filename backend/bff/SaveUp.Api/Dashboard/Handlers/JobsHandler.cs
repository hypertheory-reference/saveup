using Marten;

namespace SaveUp.Api.Dashboard.Handlers;

public class JobsHandler
{
    public JobsHandler()
    {
        
    }

    public async Task<Job> Handle(JobCreateRequest request, IdentityStreamIdProvider id, IDocumentSession session)
    {
        var job = new Job(Guid.NewGuid(), request.Name, request.Description);
        session.Events.Append(id.GetStreamId(), job);
        await session.SaveChangesAsync();
        return job;
    }
}