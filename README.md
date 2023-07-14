# Jesse and Layne's Fast Treecapitator

Jesse and Layne's Fast Treecapitator is a Minecraft Bedrock mod recreates and enhances the functionality of the original tree capitator and vein meiner mods from the Java version
of Minecraft with high-speed and efficient computer resource usage

How to use:
1. Sneak
2. Mine a tree log or ore

🌳 Cut down entire trees with a single swing
![tree-cutdown-gif-small](https://github.com/laynebritton/jl-fast-treecapitator/assets/21363865/ad5bfb36-c16f-40e8-853f-b1d7cdb4e88d)

⛏️ It works for mining veins of ore too!
![coal-mining](https://github.com/laynebritton/jl-fast-treecapitator/assets/21363865/bdf6db8b-16a7-4b73-9b65-734bffd94e73)

⚡️ Optimal Performance: By utilizing our search mining algorithm optimized for Minecraft, we've crafted a mod that mines lightning fast while keeping resource usage to a minimum. Resulting in a smooth gaming experience across all platforms, consoles, and servers.

🔮 Microsoft Scripting API Integration: Our mod utilizes the latest Minecraft Scripting API using TypeScript. 

## To Develop Locally

Install node module `npm i`
Ensure you have gulp installed `npm i gulp-cli --global`

Run this powershell command in the root folder.
`Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`

Run gulp watch to have the pack auto-rebuild
`gulp watch`

Create a local minecraft world. Enable experimental beta api.
Add `JL Fast Treecapitator` behavior pack to the world.

Use `/reload` command in minecraft to reload changes while debugging

## To Deploy new version
Run `gulp build`

Zip up behavior pack folder under `build/` dir
Rename `.zip` file to `.mcpack`
