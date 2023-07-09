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
    public List<Job> Jobs { get; init; } = new();
    public List<ChildJobAssignment> ChildJobs { get; init; } = new();


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
        var newChild = new ChildProjectionModel(@event.Id, @event.Name, @event.BirthDate, 0);

        return current with { Children = current.Children.Append(newChild).ToList() };
    }

    public DashboardDetails Apply(ChildAllowanceAssignment @event, DashboardDetails current)
    {
        // find the kid with that id, and update their allowance
        var child = current.Children.FirstOrDefault(x => x.Id == @event.ChildId);
        if (child is null)
        {
            throw new Exception("Child not found");
        }
        var newChild = child with { WeeklyAllowance = @event.WeeklyAllowance };
        return current with { Children = current.Children.Where(x => x.Id != @event.ChildId).Append(newChild).ToList() };
    }
    public DashboardDetails Apply(Job @event, DashboardDetails current) => current with { Jobs = current.Jobs.Append(@event).ToList() };
    public DashboardDetails Apply(UserLogin @event, DashboardDetails current) => current with { User = @event, FamilyName = @event.FamilyName + " Family" };

    public DashboardDetails Apply(ChildJobAssignment @event, DashboardDetails current) => current with { ChildJobs = current.ChildJobs.Append(@event).ToList() };
}

public record ChildProjectionModel(Guid Id, string Name, DateOnly? BirthDate, decimal WeeklyAllowance) : Child(Id, Name, BirthDate);