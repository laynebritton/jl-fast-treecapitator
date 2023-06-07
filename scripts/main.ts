import { world, BlockBreakAfterEvent } from "@minecraft/server";
import { VeinBreakEvent } from "./VeinBreakEvent";

world.afterEvents.blockBreak.subscribe(
  (blockBreakEvent: BlockBreakAfterEvent) => {
    VeinBreakEvent(blockBreakEvent);
  }
);
