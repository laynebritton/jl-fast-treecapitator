import {
  Vector3,
  Dimension,
  world,
  BlockVolume,
  ItemStack,
} from "@minecraft/server";

export const SYSTEM_CHAT_PREFIX = "<jltree>";

export const destroy = (
  blockLocation: Vector3,
  dimension: Dimension,
  itemStack: ItemStack | undefined
) => {
  dimension.fillBlocks(
    new BlockVolume(blockLocation, blockLocation),
    "minecraft:air"
  );

  if (itemStack) {
    dimension.spawnItem(itemStack, blockLocation);
  }
};

export const systemOutput = (message: String) => {
  world
    .getDimension("overworld")
    .runCommandAsync(`say §2${SYSTEM_CHAT_PREFIX} §f${message}`);
};
