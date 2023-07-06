using Marten.Events;
using Marten.Events.Aggregation;
using Marten.Events.Projections;
using Newtonsoft.Json;
using System.Net;

namespace SaveUp.Api.Dashboard.Projections;

public record DashboardDetails
{
    public Guid Id { get; init; }
    public int Version { get; init; }
    public UserLogin? User { get; init; }
    public List<Child> Children { get; init; } = new();
    public List<Job> Jobs { get; init; } = new();
    public List<ChildJobAssignment> ChildJobs { get; init; } = new();


}
public class DashboardDetailsProjection : SingleStreamProjection<DashboardDetails>
{
    public  DashboardDetails Create(DashboardCreated created) => new DashboardDetails()
    {
        Id = created.Id,
        Version = 0
    };

    public DashboardDetails Apply(Child @event, DashboardDetails current) => current with { Children = current.Children.Append(@event).ToList() };
    public DashboardDetails Apply(Job @event, DashboardDetails current) => current with { Jobs = current.Jobs.Append(@event).ToList() };
    public DashboardDetails Apply(UserLogin @event, DashboardDetails current) => current with { User = @event };

    public DashboardDetails Apply(ChildJobAssignment @event, DashboardDetails current) => current with { ChildJobs = current.ChildJobs.Append(@event).ToList() };
}