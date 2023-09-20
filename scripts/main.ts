import { world, PlayerBreakBlockAfterEvent } from "@minecraft/server";
import {} from "@minecraft/vanilla-data";
import { VeinBreakEvent } from "./VeinBreakEvent";

world.afterEvents.playerBreakBlock.subscribe(
  (blockBreakEvent: PlayerBreakBlockAfterEvent) => {
    VeinBreakEvent(blockBreakEvent);
  }
);
