import { PlayerBreakBlockAfterEvent } from "@minecraft/server";
import { say } from "../Debug";
import { SYSTEM_CHAT_PREFIX, systemOutput } from "../Utilities";
import { GET_ID_BLOCK_BREAK_ENABLED } from "../UserConfig";

export const GetBlockIdBreakEvent = (
  blockBreakEvent: PlayerBreakBlockAfterEvent
) => {
  if (!GET_ID_BLOCK_BREAK_ENABLED()) {
    return;
  }
  const brokenBlock = blockBreakEvent.brokenBlockPermutation.type.id;
  systemOutput(` id: ${brokenBlock}`);
};
