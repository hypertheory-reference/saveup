namespace SaveUp.Api.Dashboard;

public record ChildCreateRequest(string Name, DateOnly? birthDate);
public record Child(Guid Id, string Name, DateOnly? birthDate);
public record DashboardCreatedRequest();
public record DashboardCreated(Guid Id);

public record JobCreateRequest(string Name, string Description);
public record Job(Guid Id, string Name, string Description);

public record ChildJobAssignmentRequest(Guid ChildId, Guid JobId);
public record ChildJobAssignment(Guid Id, Guid ChildId, Guid JobId);