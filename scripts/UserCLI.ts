import { ChatSendAfterEvent } from "@minecraft/server";
import { say } from "./Debug";
import { VEIN_BLOCKS_LIST } from "./VeinBlocks";
import { VEIN_BLOCKS_MAP } from "./VeinBlocksMap";
import { SYSTEM_CHAT_PREFIX, systemOutput } from "./Utilities";

export const USER_CLI_PREFIX = ">jltreecap";

export const UserCLIEvent = (chatSendAfterEvent: ChatSendAfterEvent) => {
  const message = chatSendAfterEvent.message;
  if (
    !message ||
    message.length < USER_CLI_PREFIX.length ||
    message.substring(0, USER_CLI_PREFIX.length) !== USER_CLI_PREFIX
  ) {
    return;
  }
  const args = message.split(" ");

  if (args.length < 2 || args.length > 3) {
    systemOutput(
      `Invalid input. See ${USER_CLI_PREFIX} help for usage details`
    );
    return;
  }

  const sender = chatSendAfterEvent.sender;
  if (!sender.isOp()) {
    systemOutput(
      `Invalid permissions to make this change. Please contact your server operator`
    );
    return;
  }

  const command = args[1];
  switch (command) {
    case "help": {
      systemOutput(`Add block: ${USER_CLI_PREFIX} add block:id`);
      systemOutput(`Remove block: ${USER_CLI_PREFIX} remove block:id`);
      break;
    }
    case "add": {
      const newBlockId = args[2];
      VEIN_BLOCKS_MAP.set(newBlockId, new Set<String>());
      VEIN_BLOCKS_MAP.get(newBlockId)?.add(newBlockId);
      systemOutput(`Block ID: ${newBlockId} added to vein minable blocks`);
      break;
    }
    case "remove": {
      const toRemoveBlockId = args[2];
      VEIN_BLOCKS_MAP.delete(toRemoveBlockId);
      systemOutput(
        `Block ID: ${toRemoveBlockId} removed from vein minable blocks`
      );
      break;
    }
    default: {
      systemOutput(`Invalid input`);
      break;
    }
  }
};
