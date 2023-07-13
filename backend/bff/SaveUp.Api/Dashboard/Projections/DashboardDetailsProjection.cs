using Marten.Events;
using Marten.Events.Aggregation;
using Marten.Events.Projections;
using Newtonsoft.Json;
using System.Net;

namespace SaveUp.Api.Dashboard.Projections;

public record DashboardDetails
{
    public Guid Id { get; init; }
    public string FamilyName { get; init; } = string.Empty;
    public int Version { get; init; }
    public UserLogin? User { get; init; }
    public List<ChildProjectionModel> Children { get; init; } = new();
    public List<JobProjectionModel> Jobs { get; init; } = new();
    public List<ChildJobAssignmentProjectionModel> ChildJobs { get; init; } = new();


}
public class DashboardDetailsProjection : SingleStreamProjection<DashboardDetails>
{
    public DashboardDetails Create(Dashboard created) => new DashboardDetails()
    {
        Id = created.Id,
        Version = 0,
        FamilyName = created.FamilyName
    };

    public DashboardDetails Apply(Child @event, DashboardDetails current)
    {
        var newChild = new ChildProjectionModel(@event.Id, @event.Name, null, null);

        return current with { Children = current.Children.Append(newChild).ToList() };
    }


}

public record ChildProjectionModel(Guid Id, string Name, DateOnly? BirthDate, decimal? WeeklyAllowance);

public record JobProjectionModel();
public record ChildJobAssignmentProjectionModel();