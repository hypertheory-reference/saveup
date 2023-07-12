Right now I have components dispatching events. I think this is the right way to go
for SOC. There could be multiple commands that result from an event (like analytics, etc).

Events could also trigger things like *local changes* to temporary state (application state), like changing a route (and using Router Store, those events could trigger other events).

However certain events do trigger API/WS calls.

Right now I have to translate them to commands, and then for each of those commands have a resultant document that gets created after the API call.

Maybe a new function like `emptyProps` or `props<T>`?
    - stuff is too nested in the ngrx code. 

