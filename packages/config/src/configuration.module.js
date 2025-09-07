'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ConfigurationModule = void 0;
const common_1 = require('@nestjs/common');
const config_1 = require('@nestjs/config');
const app_config_1 = __importDefault(require('./app.config'));
let ConfigurationModule = class ConfigurationModule {};
exports.ConfigurationModule = ConfigurationModule;
exports.ConfigurationModule = ConfigurationModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        config_1.ConfigModule.forRoot({
          isGlobal: true,
          load: [app_config_1.default],
          envFilePath: ['.env'],
        }),
      ],
    }),
  ],
  ConfigurationModule,
);
