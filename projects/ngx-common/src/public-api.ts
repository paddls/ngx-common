import 'reflect-metadata';

export { OnAttributeChange } from './lib/decorators/on-attribute-change/on-attribute-change.decorator';
export { takeUntilDestroy } from './lib/operators/take-until-destroy/take-until-destroy.operator';
export { OnDestroyListener } from './lib/operators/take-until-destroy/on-destroy-listener.decorator';
export { Log } from './lib/decorators/log/log.decorator';

// error-handler
export { handleError } from './lib/modules/error-handler/operator/handle-error.operator';
export { ErrorHandler } from './lib/modules/error-handler/model/error-handler.model';
export { NotImplementedError } from './lib/modules/error-handler/model/not-implemented.error';
export { RuntimeError } from './lib/modules/error-handler/model/runtime.error';
export { NgxErrorHandlerModule, ERROR_HANDLER_TOKEN, provideErrorHandler } from './lib/modules/error-handler/error-handler.module';

// local-storage
export { NgxLocalStorageModule } from './lib/modules/local-storage/local-storage.module';
export { NgxLocalStorageService } from './lib/modules/local-storage/local-storage.service';

// config
export { NgxConfigModule } from './lib/modules/config/config.module';
export { CONFIG_URL_TOKEN } from './lib/modules/config/config.token';
export { NgxConfigService } from './lib/modules/config/config.service';

// route
export { NgxRouteModule } from './lib/modules/route/route.module';
export { RouteParam } from './lib/modules/route/decorators/route-param/route-param.decorator';
