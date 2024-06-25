import {
  world,
  PlayerBreakBlockAfterEvent,
  ChatSendAfterEvent,
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

world.afterEvents.chatSend.subscribe(
  (chatSendAfterEvent: ChatSendAfterEvent) => {
    UserCLIEvent(chatSendAfterEvent);
  }
);
