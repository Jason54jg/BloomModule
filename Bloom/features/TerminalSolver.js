import { colorOrder, isEnchanted } from "../utils/Utils"
import Config from "../Config"
import { getSlotCenter } from "../../BloomCore/utils/Utils"
import Dungeon from "../../BloomCore/dungeons/Dungeon"

const colorReplacements = {
    "light gray": "silver",
    "wool": "white",
    "bone": "white",
    "ink": "black",
    "lapis": "blue",
    "cocoa": "brown",
    "dandelion": "yellow",
    "rose": "red",
    "cactus": "green"
}
const terminals = {
    "REDGREEN": "Correct all the panes!",
    "COLORS": "Select all the ",
    "STARTSWITH": "What starts with: '",
    // "MAZE": "Navigate the maze!", // rest in peace
    "NUMBERS": "Click in order!",
    "RUBIX": "Change all to same color!",
    "MELODY": "Click the button on time!" // <-- you were a mistake
}

const getInvItemsTo = (endIndex) => Array.from(Array(endIndex).keys()).filter(a => Player.getContainer().getStackInSlot(a))
const filterPanesWithMeta = (array, meta) => array.filter(a => Player.getContainer().getStackInSlot(a).getRegistryName() == "minecraft:stained_glass_pane" && Player.getContainer().getStackInSlot(a).getMetadata() == meta) 
const filterPanesWithoutMeta = (array, meta) => array.filter(a => Player.getContainer().getStackInSlot(a).getRegistryName() == "minecraft:stained_glass_pane" && Player.getContainer().getStackInSlot(a).getMetadata() !== meta) 
const getStackFromIndex = (index) => Player.getContainer().getStackInSlot(index)
const sortStackSize = (array) => array.sort((a, b) => getStackFromIndex(a).getStackSize() - getStackFromIndex(b).getStackSize())
const fixColor = (itemName) => {
    Object.keys(colorReplacements).map(a => itemName = itemName.toLowerCase().replace(new RegExp(`^${a}`), colorReplacements[a]))
    return itemName
}

class TerminalSolver {
    constructor() {

        this.reset()

        register("tick", () => {
            if (!Config.terminalSolvers && !Config.zeroPingTerminals) return this.reset()
            let inv = Player.getContainer()
            let invName = inv.getName()

            this.terminal = Object.keys(terminals).find(a => invName.startsWith(terminals[a])) ?? null

            if (!this.terminal) return this.reset()

            if (this.correctSlots.length) return
            if (this.terminal == "MELODY") return
            if (this.terminal == "NUMBERS" && !Config.numbersSolver) return
            if (this.terminal == "COLORS" && !Config.colorsSolver) return
            if (this.terminal == "STARTSWITH" && !Config.startsWithSolver) return
            if (this.terminal == "RUBIX" && !Config.rubixSolver) return
            if (this.terminal == "REDGREEN" && !Config.redGreenSolver) return

            this.solve()
        })

        const highlightSlot = (slot, rgba) => {
            let [x, y] = getSlotCenter(slot)
            Renderer.translate(0, 0, 260);
            Renderer.drawRect(rgba ? Renderer.color(rgba[0], rgba[1], rgba[2], rgba[3]) : Renderer.color(0, 255, 0, 255), x - 8, y - 8, 16, 16);
        }

        const drawTextOnSlot = (slot, text) => {
            let [x, y] = getSlotCenter(slot)
            Renderer.translate(0, 0, 260);
            Renderer.drawString(text, x - 3, y - 3)
        }

        register("guiRender", () => {
            if (!this.correctSlots.length || !this.terminal || !Config.terminalSolvers) return
            if (this.terminal == "NUMBERS" && Config.numbersSolver) this.correctSlots.slice(0, 3).map((a, b, c) => highlightSlot(a, [0, 255 - (c.indexOf(a)*75), 255 - (c.indexOf(a)*75), 255]))
            if (["STARTSWITH", "COLORS"].includes(this.terminal)) this.correctSlots.map(a => highlightSlot(a))
            // if (invName == "Navigate the maze!" && Config.mazeHelper && Config.zeroPingTerminals) highlightSlot(this.correctSlots[0], [255, 150, 150, 255])
            if (this.terminal == "RUBIX" && Config.rubixSolver) new Set(this.correctSlots).map(a => {
                let toClick = this.correctSlots.filter(b => b == a).length
                if (!Config.colorsRightClick) drawTextOnSlot(a, `&f&l${toClick}`)
                else drawTextOnSlot(a, `${toClick <= 2 ? "&f&l" + toClick : "&0&l" + (colorOrder.length-toClick)}`)
            })
        })
        
        register("itemTooltip", (lore, item, event) => {
            if (this.terminal && Config.hideTerminalTooltips) cancel(event)
        })
    }
    reset() {
        this.correctSlots = []
        this.terminal = null
    }
    solve() {
        let inv = Player.getContainer()
        let invName = inv.getName()
        // ChatLib.chat("SOLVING")
        if (this.terminal == "REDGREEN") {
            this.correctSlots = filterPanesWithMeta(getInvItemsTo(45), 14)
        }
        else if (this.terminal == "COLORS") {
            let color = invName.match(/Select all the (.+) items!/)[1].toLowerCase()
            this.correctSlots = getInvItemsTo(45).filter(a => fixColor(inv.getStackInSlot(a).getName().removeFormatting().toLowerCase()).startsWith(color)).filter(a => !isEnchanted(a))
        }
        else if (this.terminal == "STARTSWITH") {
            let letter = invName.match(/What starts with: '(\w+)'?/)[1].toLowerCase()
            this.correctSlots = getInvItemsTo(45).filter(a => inv.getStackInSlot(a).getName().removeFormatting().toLowerCase().startsWith(letter)).filter(a => !isEnchanted(a))
        }
        // else if (invName == "Navigate the maze!") {
        //     let greenPane = filterPanesWithMeta(getInvItemsTo(54), 5)
        //     let whitePanes = filterPanesWithMeta(getInvItemsTo(54), 0)
        //     let redPane = filterPanesWithMeta(getInvItemsTo(54), 14)
        //     const areAdjacent = (slot1, slot2) => [slot1%9==0 ? -1 : slot1-1, slot1%9==8 ? -1 : slot1+1, slot1+9, slot1-9].filter(a => a >= 0).some(a => a == slot2)
        //     this.correctSlots = []
        //     let unvisited = whitePanes
        //     let previous = greenPane
        //     while (!areAdjacent(previous, redPane)) {
        //         let nextStep = unvisited.filter(a => areAdjacent(a, previous) && !this.correctSlots.includes(a))[0]
        //         previous = nextStep
        //         if (previous == null) break
        //         this.correctSlots.push(nextStep)
        //     }
        // }
        else if (this.terminal == "NUMBERS") {
            this.correctSlots = sortStackSize(filterPanesWithMeta(getInvItemsTo(35), 14))
        }
        else if (this.terminal == "RUBIX") {
            // I hope to god this never breaks.
            this.correctSlots = colorOrder.map((v, i) => filterPanesWithoutMeta(getInvItemsTo(45), 15).map(a => Array(Math.abs(colorOrder.length-1 - (colorOrder.indexOf(inv.getStackInSlot(a).getMetadata())+i)%colorOrder.length)).fill(a)).reduce((a, b) => a.concat(b), [])).sort((a, b) => a.length - b.length)[0]
        }
    }
}
export default new TerminalSolver()
