namespace SaveUp.Api.Dashboard;

public record ChildCreateRequest(string Name, DateOnly? birthDate);
public record Child(Guid Id, string Name, DateOnly? birthDate);


public record JobCreateRequest(string Name, string Description);
public record Job(Guid Id, string Name, string Description);

public record ChildJobAssignmentRequest(Guid ChildId, Guid JobId);
public record ChildJobAssignment(Guid Id, Guid ChildId, Guid JobId);


public record UserLoginRequest(Guid Sub, string Name, string Preferred_username, string Given_name, string Family_name, string Email);

public record UserLogin(Guid Sub, string Name, string PreferredUsername, string GivenName, string FamilyName, string Email, DateTimeOffset LastLogin);

public record CreateDashboardRequest(string FamilyName);
public record Dashboard(Guid Id, string FamilyName);

public record ChildAllowanceAssignmentRequest(decimal WeeklyAllowance);
public record ChildAllowanceAssignment(Guid ChildId, decimal WeeklyAllowance);

public record DashboardRequested();