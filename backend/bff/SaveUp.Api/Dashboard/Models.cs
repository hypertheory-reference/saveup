namespace SaveUp.Api.Dashboard;

public record DashboardModel
{
    public List<Child> Children { get; set; } = new();
    public List<Job> Jobs { get; set; } = new();
    public List<ChildJobAssignment> ChildJobs { get; set; } = new();
}
