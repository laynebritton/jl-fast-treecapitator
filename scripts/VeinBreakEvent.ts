import {
  BlockBreakEvent,
  BlockLocation,
  Dimension,
  MinecraftBlockTypes,
} from "@minecraft/server";
import { VEIN_BLOCKS } from "./VeinBlocks";

const MAX_DEPTH = 150;

export const VeinBreakEvent = (blockBreakEvent: BlockBreakEvent) => {
  const brokenBlock = blockBreakEvent.brokenBlockPermutation.type.id;

  if (!VEIN_BLOCKS.has(brokenBlock) || !blockBreakEvent.player.isSneaking) {
    return;
  }

  DFS(
    blockBreakEvent.block.location,
    brokenBlock,
    1,
    new Set<string>(),
    blockBreakEvent.dimension
  );
};

/*
Check adjacent 26 blocks for matching blockTypeId. If the same and unvisited, then dfs(new location, blockTypeId)
*/
const DFS = (
  blockLocation: BlockLocation,
  blockTypeId: string,
  depth: number,
  visited: Set<string>,
  dimension: Dimension
) => {
  const coord = convertBlockLocationToString(blockLocation);
  if (depth > MAX_DEPTH || visited.has(coord)) {
    return;
  }
  visited.add(coord);

  for (let z = -1; z <= 1; z++) {
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        const newBlockLocation = new BlockLocation(
          blockLocation.x + x,
          blockLocation.y + y,
          blockLocation.z + z
        );

        if (dimension.getBlock(newBlockLocation).type.id === blockTypeId) {
          DFS(newBlockLocation, blockTypeId, depth + 1, visited, dimension);
        }
      }
    }
  }
  dimension.runCommandAsync(
    `setblock ${blockLocation.x} ${blockLocation.y} ${blockLocation.z} ${MinecraftBlockTypes.air.id} 0 destroy`
  );
};

const convertBlockLocationToString = (blockLocation: BlockLocation) => {
  return blockLocation.x + "," + blockLocation.y + "," + blockLocation.z;
};
