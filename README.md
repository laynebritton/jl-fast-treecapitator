# Jesse and Layne's Fast Treecapitator

Jesse and Layne's Fast Treecapitator is a Minecraft Bedrock mod that interfaces with Microsoft's scripting API.
This mod aims to mimic the functionality of the original tree capitator and vein meiner mods in the Java version
of Minecraft while being as efficient as possible. 

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
