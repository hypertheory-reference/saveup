using System.Security.Cryptography.X509Certificates;
using Marten.Events;
using Marten.Events.Aggregation;

namespace SaveUp.Api;

public record SavingsAccountCreated(Guid Id);

public record Deposited(decimal Amount);

public record Withdrawn(decimal Amount);



public record BankAccountDetails
{
    public Guid Id { get; set; }
    public int Version { get; set; }

    public BankAccountDetails() {}
    public BankAccountDetails(IEvent<SavingsAccountCreated> @event)
    {
        Day = @event.Timestamp.Date;
        Balance = 0m;
    }

    public DateTime Day { get; set; }

    public decimal Balance { get; set; }

    public void Apply(Deposited deposited)
    {
        Balance += deposited.Amount;
    }

    public void Apply(Withdrawn withdrawn)
    {
        Balance -= withdrawn.Amount;
    }
}