using Marten;

namespace SaveUp.Api.Dashboard.Handlers;

public class LoginHandler
{
    public LoginHandler()
    {
        
    }

    public async IAsyncEnumerable<object> Handle(UserLoginRequest request, IdentityStreamIdProvider id, IDocumentSession session)
    {
       // the IdentityStreamIdProvider 
        
        var login = new UserLogin(request.Sub, request.Name, request.Preferred_username, request.Given_name, request.Family_name, request.Email, DateTimeOffset.UtcNow);
        session.Events.Append(id.GetStreamId(), login);
        await session.SaveChangesAsync();

        //var savedLogin = await session.LoadAsync<UserLogin>(request.Sub);
        //if(savedLogin is null)
        //{
        //    session.Store<UserLogin>(login);
        //    await session.SaveChangesAsync();
        //    yield return new DashboardCreated(login.Sub);
        //}
        
        
        yield return login;
    }
}
