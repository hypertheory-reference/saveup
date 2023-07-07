using System.Security.Claims;

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

        // TODO: A bit brittle - keycloak uses a guid for the sub  claim, but this is not guaranteed
     var sid = _contextAccessor?.HttpContext?.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value ?? throw new Exception("No sid claim found");
     return Guid.Parse(sid);

    }
}