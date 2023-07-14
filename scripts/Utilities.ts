import { Vector3, Dimension, MinecraftBlockTypes } from "@minecraft/server";
import { say } from "./Debug";
export const destroy = (blockLocation: Vector3, dimension: Dimension) => {
  dimension.runCommandAsync(
    `setblock ${blockLocation.x} ${blockLocation.y} ${blockLocation.z} ${MinecraftBlockTypes.air.id} destroy`
  );
};
