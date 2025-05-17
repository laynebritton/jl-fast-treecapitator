import { world } from "@minecraft/server";

export const say = (message: String) => {
  world.getDimension("overworld").runCommand(`say ${message}`);
};
