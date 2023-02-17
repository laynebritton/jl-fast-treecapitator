import { world, BlockBreakEvent, Block } from "@minecraft/server";
import { say } from "./Debug";
import { VEIN_BLOCKS } from "./VeinBlocks";

export const VeinBreakEvent = (blockBreakEvent: BlockBreakEvent) => {
  const brokenBlock = blockBreakEvent.brokenBlockPermutation.type.id;
  say(VEIN_BLOCKS.has(brokenBlock) + "");

  if (!blockBreakEvent.player.isSneaking || !VEIN_BLOCKS.has(brokenBlock)) {
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

function _SearchForVein() {
  throw new Error("Function not implemented.");
}

function _BreakVein() {
  throw new Error("Function not implemented.");
}

function _BreakLeaves() {
  throw new Error("Function not implemented.");
}
