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

// world.afterEvents.worldInitialize.subscribe((event) => {
//   const jlTreeCapConfig = new DynamicPropertiesDefinition();
//   jlTreeCapConfig.defineString("config", 10000, "{}");
//   event.propertyRegistry.registerWorldDynamicProperties(jlTreeCapConfig);
// });

world.afterEvents.chatSend.subscribe(
  (chatSendAfterEvent: ChatSendAfterEvent) => {
    UserCLIEvent(chatSendAfterEvent);
  }
);
