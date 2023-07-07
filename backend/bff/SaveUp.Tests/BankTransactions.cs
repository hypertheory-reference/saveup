using Marten;
using Marten.Events.Projections;
using SaveUp.Api;

namespace SaveUp.Tests;

public class BankTransactions
{
    //[Fact]
    //public async Task DoStuff()
    //{
    //    var store = DocumentStore.For(o =>
    //    {
    //        o.Connection("Host=127.0.0.1;UserName=postgres;Password=Password12!;Port=5438");
    //        o.Projections.Snapshot<BankAccountDetails>(SnapshotLifecycle.Inline);
    //    });

    //    var accountId = Guid.NewGuid();

    //    await using (var session = store.LightweightSession())
    //    {
    //        var opened = new SavingsAccountCreated(accountId);

    //        var deposit = new Deposited(100);
    //        var deposit2 = new Deposited(50);
    //        var withdraw = new Withdrawn(80);

    //        session.Events.StartStream<BankAccountDetails>(accountId, opened, deposit, deposit2, withdraw);

    //        await session.SaveChangesAsync();
    //        var details = await session.Events.AggregateStreamAsync<BankAccountDetails>(accountId);
    //        Assert.NotNull(details);
    //        Assert.Equal(70M, details.Balance);

    //        var detailsEarlier = await session.Events.AggregateStreamAsync<BankAccountDetails>(accountId, 3);
    //        Assert.NotNull(detailsEarlier);
    //        Assert.Equal(150M, detailsEarlier.Balance);
    //    }
        
        
    //}
}