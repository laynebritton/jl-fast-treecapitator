import {
  COAL_FAMILY,
  COPPER_FAMILY,
  DIAMOND_FAMILY,
  EMERALD_FAMILIY,
  GOLD_FAMILY,
  IRON_FAMILY,
  LAPIS_FAMILY,
  REDSTONE_FAMILY,
} from "./VeinBlockFamilies";
import { VEIN_BLOCKS_LIST } from "./VeinBlocks";

const associateBlockFamilies = (
  family: String[],
  map: Map<String, Set<String>>
) => {
  family.forEach((node) => {
    family.forEach((adjacent) => {
      if (node == adjacent) {
        return;
      }
      map.get(node)?.add(adjacent);
    });
  });
};

// A map of allowed blocks to Vein mine, and a set of allowed destroyable blocks when vein mined
const VEIN_BLOCKS_MAP = new Map<String, Set<String>>();

// Default each map entry to include itself
VEIN_BLOCKS_LIST.forEach((block) => {
  VEIN_BLOCKS_MAP.set(block, new Set<String>());
  VEIN_BLOCKS_MAP.get(block)?.add(block);
});

// Populate maps of assocaited blocks.
associateBlockFamilies(REDSTONE_FAMILY, VEIN_BLOCKS_MAP);
associateBlockFamilies(COAL_FAMILY, VEIN_BLOCKS_MAP);
associateBlockFamilies(IRON_FAMILY, VEIN_BLOCKS_MAP);
associateBlockFamilies(LAPIS_FAMILY, VEIN_BLOCKS_MAP);
associateBlockFamilies(DIAMOND_FAMILY, VEIN_BLOCKS_MAP);
associateBlockFamilies(COPPER_FAMILY, VEIN_BLOCKS_MAP);
associateBlockFamilies(GOLD_FAMILY, VEIN_BLOCKS_MAP);
associateBlockFamilies(EMERALD_FAMILIY, VEIN_BLOCKS_MAP);

export { VEIN_BLOCKS_MAP };
