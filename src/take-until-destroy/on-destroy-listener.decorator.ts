import {Subject} from 'rxjs';

export const DESTROY_LISTENER_METADATA_KEY: string = 'ngx-common:take-until-destroy';

function onDestroyComplete(instance: any): void {
    const onDestroy$: Subject<void> = getOnDestroy(instance);
    if (onDestroy$) {
        getOnDestroy(instance).next();
        getOnDestroy(instance).complete();
        Reflect.deleteMetadata(DESTROY_LISTENER_METADATA_KEY, instance);
    }
}

function onDestroyListener(ngOnDestroy: () => void): () => void {
    return function(): void {
        if (ngOnDestroy) {
            ngOnDestroy.call(this);
        }
        onDestroyComplete(this);
    };
}

export function getOnDestroy(instance: any): Subject<void> {
    if (!Reflect.hasOwnMetadata(DESTROY_LISTENER_METADATA_KEY, instance)) {
        Reflect.defineMetadata(DESTROY_LISTENER_METADATA_KEY, new Subject<void>(), instance);
    }
    return Reflect.getOwnMetadata(DESTROY_LISTENER_METADATA_KEY, instance);
}

export function OnDestroyListener(): ClassDecorator {
    return function(target: any): any {
        if (!Reflect.hasOwnMetadata(DESTROY_LISTENER_METADATA_KEY, target)) {
            Reflect.defineMetadata(DESTROY_LISTENER_METADATA_KEY, true, target);
        }

        const ngOnDestroy: any = target.prototype.ngOnDestroy;

        target.prototype.ngOnDestroy = onDestroyListener(ngOnDestroy);

        return target;
    };
}
