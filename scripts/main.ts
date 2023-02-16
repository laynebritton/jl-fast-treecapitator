import { world, system, BlockBreakEvent } from "@minecraft/server";

let tickIndex = 0;

function mainTick() {
  try {
    tickIndex++;

    if (tickIndex === 100) {
      world.getDimension("overworld").runCommandAsync("say Hello world!");
      world.events.blockBreak.subscribe((blockBreakEvent: BlockBreakEvent) => {
        world
          .getDimension("overworld")
          .runCommandAsync(
            "say " +
              blockBreakEvent.player.name +
              " , " +
              blockBreakEvent.block.typeId
          );
      });
    }
  } catch (e) {
    console.warn("Script error: " + e);
  }

  system.run(mainTick);
}

system.run(mainTick);
