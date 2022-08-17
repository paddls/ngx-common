/**
 * Subscribe until the component emit destroy
 * @param instance the component instance
 */
import { takeUntil } from 'rxjs/operators';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { DESTROY_LISTENER_METADATA_KEY, getOnDestroy } from './on-destroy-listener.decorator';

export function takeUntilDestroy<T>(instance: any): MonoTypeOperatorFunction<T> {
    const constructor: any = instance.__proto__.constructor;
    if (!hasDestroylistener(constructor)) {
        console.error(`You should annotate ${ constructor.name } class with @OnDestroyListener`);

        throw new Error(`You should annotate ${ constructor.name } class with @OnDestroyListener`);
    }
    const onDestroy$: Observable<void> = getOnDestroy(instance);

    return takeUntil(onDestroy$);
}

function hasDestroylistener(constructor: any): boolean {
    return Reflect.hasOwnMetadata(DESTROY_LISTENER_METADATA_KEY, constructor) || (!!constructor?.__proto__ && hasDestroylistener(constructor.__proto__));
}
