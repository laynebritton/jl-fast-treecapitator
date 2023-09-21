import { world, PlayerBreakBlockAfterEvent } from "@minecraft/server";
import { VeinBreakEvent } from "./VeinBreakEvent";

world.afterEvents.playerBreakBlock.subscribe(
  (blockBreakEvent: PlayerBreakBlockAfterEvent) => {
    VeinBreakEvent(blockBreakEvent);
  }
);
