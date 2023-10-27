import { world } from "@minecraft/server";

const configKey = "config";

export class JLTreeCapConfig {
  enabled: boolean = true;
  blockBreakIdGetEnabled: boolean = false;

  constructor(config?: JLTreeCapConfig) {
    this.enabled = config?.enabled || true;
    this.blockBreakIdGetEnabled = config?.blockBreakIdGetEnabled || false;
  }
}

export const getJLTreeCapConfig = (): JLTreeCapConfig => {
  const configUnknown = world.getDynamicProperty(configKey);
  if (!configUnknown) {
    return new JLTreeCapConfig();
  }
  const configString = configUnknown as string;
  const config = JSON.parse(configString) as JLTreeCapConfig;
  return config;
};

export const setJLTreeCapConfig = (config: JLTreeCapConfig) => {
  const configStr = JSON.stringify(config);
  world.setDynamicProperty(configKey, configStr);
};
