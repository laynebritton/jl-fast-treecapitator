import { BlockBreakAfterEvent, Vector3, Dimension } from "@minecraft/server";
import { destroy } from "./Utilities";
import { VEIN_BLOCKS_MAP } from "./VeinBlocksMap";

const MAX_DEPTH = 150;

export const VeinBreakEvent = (blockBreakEvent: BlockBreakAfterEvent) => {
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
  blockLocation: Vector3,
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
        const newBlockLocation: Vector3 = {
          x: blockLocation.x + x,
          y: blockLocation.y + y,
          z: blockLocation.z + z,
        };

        if (visited.has(convertBlockLocationToString(newBlockLocation))) {
          continue;
        }

        if (
          VEIN_BLOCKS_MAP.get(blockTypeId)?.has(
            dimension.getBlock(newBlockLocation)?.type.id ?? ""
          )
        ) {
          DFS(newBlockLocation, blockTypeId, depth + 1, visited, dimension);
        }
      }
    }
  }
  destroy(blockLocation, dimension);
};

const convertBlockLocationToString = (blockLocation: Vector3) => {
  return blockLocation.x + "," + blockLocation.y + "," + blockLocation.z;
};
