import { Vector3, Dimension } from "@minecraft/server";
import { MinecraftBlockTypes } from "./mojang-block";
import { say } from "./Debug";
export const destroy = (blockLocation: Vector3, dimension: Dimension) => {
  dimension.runCommandAsync(
    `setblock ${blockLocation.x} ${blockLocation.y} ${blockLocation.z} ${MinecraftBlockTypes.Air} destroy`
  );
};
