import { world } from "@minecraft/server";
import { systemOutput } from "../Utilities";

const allowSetKey = "allowSet";

export class AllowSet {
  set: Set<string>;
  constructor(set?: Set<string>) {
    if (set) {
      this.set = set;
      return;
    }

    this.set = new Set<string>();
  }
}

export const getAllowSet = (): AllowSet => {
  const allowSetUnknown = world.getDynamicProperty(allowSetKey);
  if (!allowSetUnknown) {
    return new AllowSet();
  }
  const allowSetString = allowSetUnknown as string;
  const allowSetArray = allowSetString.split(",");
  const allowSet = new Set<string>(allowSetArray);
  return new AllowSet(allowSet);
};

export const setAllowSet = (allowSet: AllowSet) => {
  const allowSetArr = Array.from(allowSet.set);
  const allowSetString = allowSetArr.toString();
  world.setDynamicProperty(allowSetKey, allowSetString);
  systemOutput(allowSetString);
};
