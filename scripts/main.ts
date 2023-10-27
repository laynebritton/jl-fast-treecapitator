import {
  world,
  PlayerBreakBlockAfterEvent,
  ChatSendAfterEvent,
  DynamicPropertiesDefinition,
} from "@minecraft/server";
import { VeinBreakEvent } from "./VeinBreakEvent";
import { say } from "./Debug";
import { UserCLIEvent } from "./UserCLI";
import { GetBlockIdBreakEvent } from "./BlockBreakEvents/GetIdBreakEvent";

world.afterEvents.playerBreakBlock.subscribe(
  (blockBreakEvent: PlayerBreakBlockAfterEvent) => {
    VeinBreakEvent(blockBreakEvent);
  }
);

world.afterEvents.playerBreakBlock.subscribe(
  (blockBreakEvent: PlayerBreakBlockAfterEvent) => {
    GetBlockIdBreakEvent(blockBreakEvent);
  }
);

world.afterEvents.worldInitialize.subscribe((event) => {
  // First time set up if no prior config exists
  const config = world.getDynamicProperty("config");
  const allowSet = world.getDynamicProperty("allowSet");
  const removeSet = world.getDynamicProperty("removeSet");

  if (!config) {
    world.setDynamicProperty("config", JSON.stringify({}));
  }

  if (!allowSet) {
    world.setDynamicProperty("allowSet", JSON.stringify({}));
  }

  if (!removeSet) {
    world.setDynamicProperty("removeSet", JSON.stringify({}));
  }
});

world.afterEvents.chatSend.subscribe(
  (chatSendAfterEvent: ChatSendAfterEvent) => {
    UserCLIEvent(chatSendAfterEvent);
  }
);
