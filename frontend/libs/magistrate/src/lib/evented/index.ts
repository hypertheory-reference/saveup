import { Observable, map } from 'rxjs';
import { Action, ActionCreator } from '@ngrx/store';
interface EffectConfig {
  /**
   * Determines if the action emitted by the effect is dispatched to the store.
   * If false, effect does not need to return type `Observable<Action>`.
   */
  dispatch?: boolean;
  /**
   * Determines whether the functional effect will be created.
   * If true, the effect can be created outside the effects class.
   */
  functional?: boolean;
  /**
   * Determines if the effect will be resubscribed to if an error occurs in the main actions stream.
   */
  useEffectsErrorHandler?: boolean;
}
type DispatchType<T> = T extends { dispatch: infer U } ? U : true;
type ObservableType<T, OriginalType> = T extends false ? OriginalType : Action;
type ConditionallyDisallowActionCreator<DT, Result> = DT extends false
  ? unknown // If DT (DispatchType is false, then we don't enforce any return types)
  : Result extends EffectResult<infer OT>
  ? OT extends ActionCreator
    ? 'ActionCreator cannot be dispatched. Did you forget to call the action creator function?'
    : unknown
  : unknown;
const DEFAULT_EFFECT_CONFIG: Readonly<Required<EffectConfig>> = {
  dispatch: true,
  functional: false,
  useEffectsErrorHandler: true,
};
const CREATE_EFFECT_METADATA_KEY = '__@ngrx/effects_create__';

type EffectResult<OT> = Observable<OT> | ((...args: any[]) => Observable<OT>);
interface CreateEffectMetadata {
  [CREATE_EFFECT_METADATA_KEY]: EffectConfig;
}
export interface FunctionalCreateEffectMetadata extends CreateEffectMetadata {
  [CREATE_EFFECT_METADATA_KEY]: EffectConfig & { functional: true };
}



// export type FunctionalEffect
// <
//   Source extends () => Observable<unknown> = () => Observable<unknown>
// > = Source & FunctionalCreateEffectMetadata;

export function createEffectBuilder<
  Source extends () => Observable<Action> 
>(source: Source) {
  
  const meta:CommandMeta = {
    _meta: {
      isApiCommand: true
    }
  }
  // const newSource = source().pipe(
  //   map((original) => ({...original, ...meta  }) as Action)
  // )
  return source().pipe(
    map((original) => ({...original, ...meta  }) as Action)
  ) 
}

type CommandMeta = {
  _meta: {
    isApiCommand: true;
  };
};