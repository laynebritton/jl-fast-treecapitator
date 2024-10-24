import { PlayerBreakBlockAfterEvent } from "@minecraft/server";
import { say } from "../Debug";
import { SYSTEM_CHAT_PREFIX, systemOutput } from "../Utilities";
import { getJLTreeCapConfig } from "../DynamicProperties/JLTreeCapConfig";

export const GetBlockIdBreakEvent = (
  blockBreakEvent: PlayerBreakBlockAfterEvent
) => {
  if (!getJLTreeCapConfig().blockBreakIdGetEnabled) {
    return;
  }
  const brokenBlock = blockBreakEvent.brokenBlockPermutation.type.id;
  systemOutput(` id: ${brokenBlock}`);
};
