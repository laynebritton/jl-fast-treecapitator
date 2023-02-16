import { world, BlockBreakEvent } from "@minecraft/server";
import { say } from "./Debug";
import { VEIN_BLOCKS } from "./VeinBlocks";

export const VeinBreakEvent = (blockBreakEvent: BlockBreakEvent) => {
  say(VEIN_BLOCKS.has(blockBreakEvent.brokenBlockPermutation.type.id) + "");

  if (!VEIN_BLOCKS.has(blockBreakEvent.brokenBlockPermutation.type.id)) {
    // return;
  }

  if (!blockBreakEvent.player.isSneaking) {
    // return;
  }

  say("sneaking");
  say(
    blockBreakEvent.player.name +
      " , " +
      blockBreakEvent.brokenBlockPermutation.type.id
  );
};
