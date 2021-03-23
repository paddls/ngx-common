import 'reflect-metadata';

export { OnAttributeChange } from './lib/on-attribute-change/on-attribute-change.decorator';
export { takeUntilDestroy } from './lib/take-until-destroy/take-until-destroy.operator';
export { OnDestroyListener } from './lib/take-until-destroy/on-destroy-listener.decorator';
export { Log } from './lib/log/log.decorator';
// error-handler
export { handleError } from './lib/error-handler/operator/handle-error.operator';
export { ErrorHandler } from './lib/error-handler/model/error-handler.model';
export { NotImplementedError } from './lib/error-handler/model/not-implemented.error';
export { RuntimeError } from './lib/error-handler/model/runtime.error';
export { NgxErrorHandlerModule, ERROR_HANDLER_TOKEN } from './lib/error-handler/error-handler.module';
// local-storage
export { NgxLocalStorageModule } from './lib/local-storage/local-storage.module';
export { NgxLocalStorageService } from './lib/local-storage/local-storage.service';
// config
export { NgxConfigModule } from './lib/config/config.module';
export { CONFIG_URL_TOKEN } from './lib/config/config.token';
export { NgxConfigService } from './lib/config/config.service';
