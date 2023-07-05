namespace SaveUp.Api;

public class IdentityStreamIdProvider
{
    /* TODO: This is fake for now. My idea is that after I do the onboarding part, this will lookup the user's stream id from the database based on their sub */
    public Guid GetStreamId() => Guid.Parse("f6537a6f-6073-4882-acd2-9eb77d650412");
}