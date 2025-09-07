'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const common_1 = require('@nestjs/common');
function generateErrors(errors) {
  return errors.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [currentValue.property]:
        (currentValue.children?.length ?? 0) > 0
          ? generateErrors(currentValue.children ?? [])
          : Object.values(currentValue.constraints ?? {}).join(', '),
    }),
    {},
  );
}
const validationOptions = {
  transform: true,
  whitelist: true,
  errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors) => {
    return new common_1.UnprocessableEntityException({
      status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
      errors: generateErrors(errors),
    });
  },
};
exports.default = validationOptions;
