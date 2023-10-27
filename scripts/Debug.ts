import { world } from "@minecraft/server";

export const say = (message: String) => {
  world.getDimension("overworld").runCommandAsync(`say ${message}`);
};
