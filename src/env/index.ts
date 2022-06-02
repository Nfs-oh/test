import dev from './dev';
import stage from './stage';
import stage2 from './stage2';
import prod from './prod';

enum ENV_VALUE {
  DEV = 'dev',
  PROD = 'prod',
  STAGE = 'stage',
  STAGE2 = 'stage2'
}

const { NODE_ENV } = process.env;

let env: Record<string, string> = {};

switch (NODE_ENV) {
  case ENV_VALUE.DEV:
    env = dev;
    break;
  case ENV_VALUE.STAGE:
    env = stage;
    break;
  case ENV_VALUE.STAGE2:
    env = stage2;
    break;
  case ENV_VALUE.PROD:
    env = prod;
    break;
  default:
    env = dev;
}

export default env;
