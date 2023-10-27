import { Vector3, Dimension, world } from "@minecraft/server";
import { MinecraftBlockTypes } from "./mojang-block";
import { say } from "./Debug";

export const SYSTEM_CHAT_PREFIX = "<jltree>";

export const destroy = (blockLocation: Vector3, dimension: Dimension) => {
  dimension.runCommandAsync(
    `setblock ${blockLocation.x} ${blockLocation.y} ${blockLocation.z} ${MinecraftBlockTypes.Air} destroy`
  );
};

export const systemOutput = (message: String) => {
  world
    .getDimension("overworld")
    .runCommandAsync(`say §2${SYSTEM_CHAT_PREFIX} §f${message}`);
};
