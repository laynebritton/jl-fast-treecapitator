import {
  world,
  PlayerBreakBlockAfterEvent,
  ChatSendAfterEvent,
} from "@minecraft/server";
import { VeinBreakEvent } from "./VeinBreakEvent";
import { say } from "./Debug";
import { UserCLIEvent } from "./UserCLI";

world.afterEvents.playerBreakBlock.subscribe(
  (blockBreakEvent: PlayerBreakBlockAfterEvent) => {
    VeinBreakEvent(blockBreakEvent);
  }
);

world.afterEvents.chatSend.subscribe(
  (chatSendAfterEvent: ChatSendAfterEvent) => {
    UserCLIEvent(chatSendAfterEvent);
  }
);
