import { ChatSendAfterEvent } from "@minecraft/server";
import { systemOutput } from "./Utilities";
import {
  getJLTreeCapConfig,
  setJLTreeCapConfig,
} from "./DynamicProperties/JLTreeCapConfig";
import { getAllowSet, setAllowSet } from "./DynamicProperties/AllowSet";

export const USER_CLI_PREFIX = ">jltree";

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
      systemOutput(`${USER_CLI_PREFIX} add block:id - §7Add block`);
      systemOutput(`${USER_CLI_PREFIX} remove block:id - §7Remove block`);
      systemOutput(`${USER_CLI_PREFIX} toggle - §7Turn jltreecap on/off`);
      systemOutput(`${USER_CLI_PREFIX} list - §7List added blocks: `);
      systemOutput(
        `${USER_CLI_PREFIX} reset - §7Reset default jltreecap settings`
      );
      systemOutput(
        `${USER_CLI_PREFIX} toggleGetId - §7Toggle get block id mode on/off`
      );
      break;
    }
    case "add": {
      const newBlockId = args[2];
      if (newBlockId.includes(",")) {
        systemOutput(` "," commas not allowed in block ids`);
        break;
      }

      const allowSet = getAllowSet();
      if (allowSet.set.has(newBlockId)) {
        systemOutput(`Block ID: ${newBlockId} already in allowed blocks`);
        break;
      }

      allowSet.set.add(newBlockId);
      setAllowSet(allowSet);
      systemOutput(`Block ID: ${newBlockId} added to vein minable blocks`);
      break;
    }
    case "remove": {
      const toRemoveBlockId = args[2];
      if (toRemoveBlockId.includes(",")) {
        systemOutput(` "," commas not allowed in block ids`);
        break;
      }

      const allowSet = getAllowSet();
      if (!allowSet.set.has(toRemoveBlockId)) {
        systemOutput(`Block ID: ${toRemoveBlockId} not in allowed blocks`);
        break;
      }

      allowSet.set.delete(toRemoveBlockId);
      setAllowSet(allowSet);
      systemOutput(
        `Block ID: ${toRemoveBlockId} removed from vein minable blocks`
      );
      break;
    }
    case "toggle": {
      const config = getJLTreeCapConfig();
      config.enabled = !config.enabled;
      setJLTreeCapConfig(config);
      systemOutput(`Enabled : ${config.enabled}`);
      break;
    }
    case "toggleGetId": {
      const config = getJLTreeCapConfig();
      config.blockBreakIdGetEnabled = !config.blockBreakIdGetEnabled;
      setJLTreeCapConfig(config);
      systemOutput(
        `Block Break Id-Get mode enabled : ${config.blockBreakIdGetEnabled}`
      );
      break;
    }
    case "list": {
      const allowSet = getAllowSet();
      const allowSetArr = Array.from(allowSet.set);
      const allowSetString = allowSetArr.toString();
      systemOutput(`Custom allowed blocks: ${allowSetString}`);
      break;
    }
    case "reset": {
      const config = getJLTreeCapConfig();
      config.enabled = true;
      config.blockBreakIdGetEnabled = false;
      setJLTreeCapConfig(config);
      const allowSet = getAllowSet();
      allowSet.set = new Set<string>();
      setAllowSet(allowSet);
      systemOutput(`Default settings restored`);
      break;
    }
    default: {
      systemOutput(`Invalid input`);
      break;
    }
  }
};
