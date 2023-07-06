using Marten;

namespace SaveUp.Api.Dashboard.Handlers;

public class LoginHandler
{
    public LoginHandler()
    {
        
    }

    public async Task<UserLogin> Handle(UserLoginRequest request, IdentityStreamIdProvider id, IDocumentSession session)
    {
        var login = new UserLogin(request.Sub, request.Name, request.Preferred_username, request.Given_name, request.Family_name, request.Email, DateTimeOffset.UtcNow);
        session.Events.Append(id.GetStreamId(), login);
        await session.SaveChangesAsync();
        return login;
    }
}
