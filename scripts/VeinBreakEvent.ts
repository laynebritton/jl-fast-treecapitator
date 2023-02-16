import { world, BlockBreakEvent } from "@minecraft/server";
import { say } from "./Debug";
import { VEIN_BLOCKS } from "./VeinBlocks";

export const VeinBreakEvent = (blockBreakEvent: BlockBreakEvent) => {
  const brokenBlock = blockBreakEvent.brokenBlockPermutation.type.id;
  say(VEIN_BLOCKS.has(brokenBlock) + "");

  if (!VEIN_BLOCKS.has(brokenBlock)) {
    // return;
  }

  if (!blockBreakEvent.player.isSneaking) {
    // return;
  }

  say("sneaking");
  say(blockBreakEvent.player.name + " , " + brokenBlock);

  const location = blockBreakEvent.block.location;
  say("x: " + location.x + ", y:" + location.y + ", z:" + location.z);
  const overworld = world.getDimension("overworld");
  location.y += 1;
  say(overworld.getBlock(location).type.id);
};
