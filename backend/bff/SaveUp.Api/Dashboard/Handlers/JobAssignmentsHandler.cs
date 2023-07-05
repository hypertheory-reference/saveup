using Marten;

namespace SaveUp.Api.Dashboard.Handlers;

public class JobAssignmentsHandler
{
    public JobAssignmentsHandler()
    {
            
    }

    public async Task<ChildJobAssignment> Handle(ChildJobAssignmentRequest request, IdentityStreamIdProvider id, IDocumentSession session)
    {
        var assignment = new ChildJobAssignment(Guid.NewGuid(), request.ChildId, request.JobId);
        session.Events.Append(id.GetStreamId(), assignment);
        await session.SaveChangesAsync();
        return assignment;
    }
}
