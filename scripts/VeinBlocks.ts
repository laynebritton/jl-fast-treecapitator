import { BlockType, MinecraftBlockTypes } from "@minecraft/server";

const VEIN_BLOCKS_LIST = [
  // Logs
  MinecraftBlockTypes.log.id,
  MinecraftBlockTypes.log2.id,
  MinecraftBlockTypes.mangroveLog.id,

  // Ore
  MinecraftBlockTypes.coalOre.id,
  MinecraftBlockTypes.deepslateCoalOre.id,
  MinecraftBlockTypes.ironOre.id,
  MinecraftBlockTypes.deepslateIronOre.id,
  MinecraftBlockTypes.redstoneOre.id,
  MinecraftBlockTypes.deepslateRedstoneOre.id,
  MinecraftBlockTypes.lapisOre.id,
  MinecraftBlockTypes.deepslateLapisOre.id,
  MinecraftBlockTypes.diamondOre.id,
  MinecraftBlockTypes.deepslateDiamondOre.id,
  MinecraftBlockTypes.copperOre.id,
  MinecraftBlockTypes.deepslateCopperOre.id,
  MinecraftBlockTypes.quartzOre.id,
  MinecraftBlockTypes.goldOre.id,
  MinecraftBlockTypes.deepslateGoldOre.id,
  MinecraftBlockTypes.netherGoldOre.id,
  MinecraftBlockTypes.emeraldOre.id,
  MinecraftBlockTypes.deepslateEmeraldOre.id,
];

const VEIN_BLOCKS = new Set<String>();
VEIN_BLOCKS_LIST.forEach((block) => {
  VEIN_BLOCKS.add(block);
});

export { VEIN_BLOCKS };
