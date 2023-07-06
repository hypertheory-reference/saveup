using Marten.Events;
using Newtonsoft.Json;
using System.Net;

namespace SaveUp.Api.Dashboard.Projections;

public record DashboardDetailsProjection
{
    public Guid Id { get; set; }
    public int Version { get; set; }
    public DateTimeOffset DateCreated { get; set; }
    
    public List<Child> Children { get; set; } = new();
    public List<Job> Jobs { get; set; } = new();

    public List<ChildJobAssignment> ChildJobs { get; set; } = new();


    public DashboardDetailsProjection() { }
    public DashboardDetailsProjection(IEvent<DashboardCreated> @event)
    {
        DateCreated = @event.Timestamp;
    }

    public void Apply(Child child)
    {
        Children.Add(child);
    }
    public void Apply(Job job)
    {
        Jobs.Add(job);
    }

    public void Apply(ChildJobAssignment assignment)
    {
        ChildJobs.Add(assignment);
    }
}