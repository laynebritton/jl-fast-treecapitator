import { world, system, BlockBreakEvent } from "@minecraft/server";

let tickIndex = 0;

function mainTick() {
  try {
    tickIndex++;

    if (tickIndex === 100) {
      world.getDimension("overworld").runCommandAsync("say Hello world!");
      world.events.blockBreak.subscribe((blockBreakEvent: BlockBreakEvent) => {
        if (blockBreakEvent.player.isSneaking) {
          world.getDimension("overworld").runCommandAsync("say sneaking");
        }
        world
          .getDimension("overworld")
          .runCommandAsync(
            "say " +
              blockBreakEvent.player.name +
              " , " +
              blockBreakEvent.brokenBlockPermutation.type.id
          );
      });
    }
  } catch (e) {
    console.warn("Script error: " + e);
  }

  system.run(mainTick);
}

system.run(mainTick);
