import { of } from "rxjs";
import { createEffectBuilder } from '.';
describe('Action Creator Stuff', () => {
   
    it('exploring props', (done) => {
        // I want to turn a subset of testActions into commands.

      

       
        const effect = createEffectBuilder(() => of({ type: 'TEST_ACTION', payload: { id: 1, name: 'test' }}));
        //expect(effect["__@ngrx/effects_create__"]).toEqual({});

        effect.subscribe((result) => {
            expect(result).toEqual({ type: 'TEST_ACTION', payload: { id: 1, name: 'test' }, _meta: { isApiCommand: true }});
            done();
        });
        // testScheduler.run(({cold, hot, expectObservable}) => {
        //    let actions$ = hot('-a', { type: 'TEST_ACTION', payload: { id: 1, name: 'test' }});
        //    const fct = effect as Observable<unknown>;
        //    expectObservable(fct).toBe('-a', { a: { type: 'TEST_ACTION', payload: { id: 1, name: 'test' }}});
        // })
    });
});

