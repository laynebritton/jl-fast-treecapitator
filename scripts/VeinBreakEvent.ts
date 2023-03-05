import { BlockBreakEvent, BlockLocation, Dimension } from "@minecraft/server";
import { destroy } from "./Utilities";
import { VEIN_BLOCKS_MAP } from "./VeinBlocksMap";

const MAX_DEPTH = 150;

export const VeinBreakEvent = (blockBreakEvent: BlockBreakEvent) => {
  const brokenBlock = blockBreakEvent.brokenBlockPermutation.type.id;

  if (!VEIN_BLOCKS_MAP.has(brokenBlock) || !blockBreakEvent.player.isSneaking) {
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
  visited.add(coord);
  if (depth > MAX_DEPTH) {
    return;
  }

  for (let z = -1; z <= 1; z++) {
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        const newBlockLocation = new BlockLocation(
          blockLocation.x + x,
          blockLocation.y + y,
          blockLocation.z + z
        );
        if (visited.has(convertBlockLocationToString(newBlockLocation))) {
          continue;
        }

        if (
          VEIN_BLOCKS_MAP.get(blockTypeId)?.has(
            dimension.getBlock(newBlockLocation).type.id
          )
        ) {
          DFS(newBlockLocation, blockTypeId, depth + 1, visited, dimension);
        }
      }
    }
  }
  destroy(blockLocation, dimension);
};

const convertBlockLocationToString = (blockLocation: BlockLocation) => {
  return blockLocation.x + "," + blockLocation.y + "," + blockLocation.z;
};
