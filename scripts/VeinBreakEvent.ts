import {
  PlayerBreakBlockAfterEvent,
  Vector3,
  Dimension,
  ItemStack,
} from "@minecraft/server";
import { destroy, systemOutput } from "./Utilities";
import { VEIN_BLOCKS_MAP } from "./VeinBlocksMap";
import { say } from "./Debug";
import { getJLTreeCapConfig } from "./DynamicProperties/JLTreeCapConfig.ts";
import { getAllowSet } from "./DynamicProperties/AllowSet";

const MAX_DEPTH = 99;

export const VeinBreakEvent = (blockBreakEvent: PlayerBreakBlockAfterEvent) => {
  if (!getJLTreeCapConfig().enabled) {
    return;
  }
  const brokenBlock = blockBreakEvent.brokenBlockPermutation.type.id;

  const allowSet = getAllowSet();
  if (
    (!VEIN_BLOCKS_MAP.has(brokenBlock) && !allowSet.set.has(brokenBlock)) ||
    !blockBreakEvent.player.isSneaking
  ) {
    return;
  }

  const dimension = blockBreakEvent.dimension;
  let itemStack = _getMostFrequentItemInBrokenBlock(dimension, blockBreakEvent);

  let Search: DfsAlgorithm = DfsIterative;

  Search(blockBreakEvent.block.location, brokenBlock, dimension, itemStack);
};

/*
  Wraps the recursive dfs so that implementation details remain within the algorithm.
*/
function DfsRecursive(
  blockLocation: Vector3,
  blockTypeId: string,
  dimension: Dimension,
  itemStack: ItemStack | undefined
): void {
  DFS(blockLocation, blockTypeId, 1, new Set<string>(), dimension, itemStack);
}

/*
Check adjacent 26 blocks for matching blockTypeId. If the same and unvisited, then dfs(new location, blockTypeId)
*/
function DFS(
  blockLocation: Vector3,
  blockTypeId: string,
  depth: number,
  visited: Set<string>,
  dimension: Dimension,
  itemStack: ItemStack | undefined
): void {
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

        const nextBlock = dimension.getBlock(newBlockLocation)?.type.id ?? "";
        if (
          VEIN_BLOCKS_MAP.get(blockTypeId)?.has(nextBlock) ||
          nextBlock === blockTypeId
        ) {
          DFS(
            newBlockLocation,
            blockTypeId,
            depth + 1,
            visited,
            dimension,
            itemStack
          );
        }
      }
    }
  }
  // Do not destroy root since it is mined by player. Prevent duplicate drops
  if (depth > 1) {
    destroy(blockLocation, dimension, itemStack);
  }
}

function DfsIterative(
  blockLocation: Vector3,
  blockTypeId: string,
  dimension: Dimension,
  itemStack: ItemStack | undefined
): void {
  const stack = [{ location: blockLocation, depth: 0 }];
  const visited = new Set<Vector3>();
  visited.add(blockLocation);

  while (stack.length) {
    const { location, depth } = stack.pop()!;

    if (depth > MAX_DEPTH) {
      return;
    }

    for (let z = -1; z <= 1; z++) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const newBlockLocation: Vector3 = {
            x: location.x + x,
            y: location.y + y,
            z: location.z + z,
          };

          if (visited.has(newBlockLocation)) {
            continue;
          }

          visited.add(newBlockLocation);

          const nextBlock = dimension.getBlock(newBlockLocation)?.type.id ?? "";
          if (
            VEIN_BLOCKS_MAP.get(blockTypeId)?.has(nextBlock) ||
            nextBlock === blockTypeId
          ) {
            stack.push({ location: newBlockLocation, depth: depth + 1 });
            destroy(newBlockLocation, dimension, itemStack);
          }
        }
      }
    }
  }
}

interface DfsAlgorithm {
  (
    blockLocation: Vector3,
    blockTypeId: string,
    dimension: Dimension,
    itemStack: ItemStack | undefined
  ): void;
}

const convertBlockLocationToString = (blockLocation: Vector3) => {
  return blockLocation.x + "," + blockLocation.y + "," + blockLocation.z;
};

const _getMostFrequentItemInBrokenBlock = (
  dimension: Dimension,
  blockBreakEvent: PlayerBreakBlockAfterEvent
) => {
  const entitiesAtFirstBrokenBlock = dimension.getEntitiesAtBlockLocation(
    blockBreakEvent.block.location
  );

  const itemFrequency = new Map<String, number>();
  let bestId = "";
  let bestFreq = 0;

  if (entitiesAtFirstBrokenBlock) {
    entitiesAtFirstBrokenBlock.forEach((entity) => {
      const itemStack = entity.getComponent("item")?.itemStack;
      if (itemStack) {
        const id = itemStack.type.id;
        const freq = (itemFrequency.get(id) || 0) + 1;
        itemFrequency.set(id, freq);

        if (freq > bestFreq) {
          bestFreq = freq;
          bestId = id;
        }
      }
    });
  }

  let itemStack;
  if (bestId) {
    itemStack = new ItemStack(bestId, bestFreq);
  } else {
    itemStack = undefined;
  }
  return itemStack;
};
