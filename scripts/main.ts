import { world, BlockBreakEvent } from "@minecraft/server";
import { VeinBreakEvent } from "./VeinBreakEvent";

world.events.blockBreak.subscribe((blockBreakEvent: BlockBreakEvent) => {
  VeinBreakEvent(blockBreakEvent);
});
