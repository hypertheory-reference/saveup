namespace SaveUp.Api;

public class IdentityStreamIdProvider
{
    private readonly IHttpContextAccessor _contextAccessor;

    public IdentityStreamIdProvider(IHttpContextAccessor contextAccessor)
    {
        _contextAccessor = contextAccessor;
    }


    public Guid GetStreamId()
    {
        var sid = _contextAccessor?.HttpContext?.User.Claims.First(c => c.Type == "sid").Value ?? throw new Exception("No sid claim found");
     return Guid.Parse(sid);

    }
}