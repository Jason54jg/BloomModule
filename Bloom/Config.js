import { padText } from "../BloomCore/utils/Utils";
import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
    @SliderProperty,
    @NumberProperty,
} from '../Vigilance/index';

@Vigilant("Bloom", "Bloom", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Dungeons", "Solvers", "Gui", "Party Finder"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class Config {
    constructor() {
        this.initialize(this)

        const lines = [
            "",
            "&b/bl setkey <api key> &r- Set your API key.",
            "",
            "&b/ds <player> &r- Dungeon Stats.",
            "&b/mem <player> &r- Guild Stats.",
            "&b//skills <player> &r- Show a player's skills.",
            "&b//slayer <player> &r- Show a player's slayer stats.",
            "&b/mykey &r- Show stats about your API key.",
            "",
            "&b//rp [...exclude] &r- Reparty (Add names to exclude players).",
            "&b//ping &r- Show your ping.",
            "&b/ptr &r- Transfer party to random player.",
            "&b/lsb &r- Warp to lobby then back to Skyblock.",
            "&b/ld &r- Warp to lobby, Skyblock then Dungeon Hub.",
            "&b/colors &r- Show all of the formatting codes.",
            "&b/dc <player1> <player2> &r- Show the cata XP difference between two players.",
            "&b/pb <floor_number> &r- Show the S+ PB's of the whole party on a floor.",
            ""
        ]
        const maxLength = Math.max(...lines.map(a => Renderer.getStringWidth(a)))

        this.setCategoryDescription("General", 
            `
            &6&l&nBloom

            ${lines.map(a => a !== "" ? padText(a + "&0", ".", maxLength) : a).join("\n")}

            &6UnclaimedBloom6 is very cool and cool
            `
        )

    }

    speedMoveGui = new Gui()
    stackTrackerGui = new Gui()
    partyOverlayMoveGui = new Gui()
    runSplitsMoveGui = new Gui()
    cooldownMoveGui = new Gui()
    runOverviewMoveGui = new Gui()
    toggleSprintMove = new Gui()
    chMapMoveGui = new Gui()
    rngMeterMoveGui = new Gui()
    cellsAlignMoveGui = new Gui()

    // ---------------------------------------------------------------
    // General

    @SwitchProperty({
        name: "Hide Lightning",
        description: "Stops lightning from being rendered.",
        category: "General",
        subcategory: "Lightning"
    })
    hideLightning = false

    @SwitchProperty({
        name: "Rejoin Reparty",
        description: "Automatically accept the party invitation after the leader has recently disbanded the party (Last 10 seconds, only accepts the same person who disbanded).",
        category: "General",
        subcategory: "Reparty"
    })
    autoRejoinReparty = false;

    @SliderProperty({
        name: "Delay",
        description: "Delay before accepting the party invite.",
        category: "General",
        subcategory: "Reparty",
        min: 0,
        max: 1000
    })
    autoRejoinRepartyDelay = 500;

    // Chat Replacer
    @SwitchProperty({
        name: "Chat Editor",
        description: "Replace some words in chat like 'ez' bypass, '=/' into not equals etc",
        category: "General",
        subcategory: "Chat Replacer"
    })
    chatEditor = false;

    // Reparty
    @SwitchProperty({
        name: "Auto Reparty",
        description: "Automatically reparty after the dungeon boss has been defeated if you are the party leader.\n&eNOTE: If another mod hides boss messages this will not work.",
        category: "General",
        subcategory: "Reparty"
    })
    autoReparty = false;

    // Useless Messages
    @SwitchProperty({
        name: "Block Useless Messages",
        description: "Blocks useless or spammy messages from being received in chat.",
        category: "General",
        subcategory: "Messages"
    })
    blockUselessMessages = false;

    // Bridge Chat
    @SwitchProperty({
        name: "Bridge Chat",
        description: "Bridge chat for VROOM (Purged from FC because not fat enough sadface).\n\n&2Guild > &6UnclaimedBloom6 &2[Bridge]&f: mom joke\n&2Guild > &dStats&f: UnClaiMbelOoom6 big cool 4576",
        category: "General",
        subcategory: "Messages"
    })
    bridgeChat = false;

    // Auto Transfer
    @SwitchProperty({
        name: "Auto Transfer",
        description: "Automatically transfers the party to someone else",
        category: "General",
        subcategory: "Party"
    })
    autoTransfer = false;

    @SwitchProperty({
        name: "Gyro Radius",
        description: "Renders a circle where the gyro will suck in mods.",
        category: "General",
        subcategory: "Gyro"
    })
    gyroCircle = false;

    @SwitchProperty({
        name: "Toggle Sprint",
        description: "Automatically Sprint",
        category: "General",
        subcategory: "Toggle Sprint"
    })
    toggleSprint = false;

    @SwitchProperty({
        name: "Toggle Sprint Overlay",
        description: "Renders text on your screen when toggle sprint is enabled.",
        category: "General",
        subcategory: "Toggle Sprint"
    })
    toggleSprintOverlay = false;

    @ButtonProperty({
        name: "Move Toggle Sprint",
        description: "Move",
        category: "General",
        subcategory: "Toggle Sprint"
    })
    MoveToggleSprint() {
         this.toggleSprintMove.open()
    };

    @TextProperty({
        name: "Sprinting Enabled Text",
        category: "The text to be showed when toggle sprint is enabled",
        category: "General",
        subcategory: "Toggle Sprint",
        placeholder: "Sprinting Enabled"
    })
    toggleSprintText = "";

    @SwitchProperty({
        name: "No Death Animation",
        description: "Removes the death animation when an entity is killed.",
        category: "General",
        subcategory: "Death Animation"
    })
    noDeathAnimation = false;

    @SwitchProperty({
        name: "Hide Gray Numbers",
        description: "Hides the gray damage numbers.",
        category: "General",
        subcategory: "Damage Numbers"
    })
    hideGrayDamageNumbers = false;

    @SwitchProperty({
        name: "Hide 0 Health Nametags",
        description: "Hides armor stands which have 0 health. Eg '[Lv100] Noob 0/100k ❤' would get hidden.",
        category: "General",
        subcategory: "0 Health Nametags"
    })
    hide0HealthNametags = false;

    @SwitchProperty({
        name: "Etherwarp Overlay",
        description: `When holding an AOTE or AOTV, will highlight the block you can etherwarp to.`,
        category: "General",
        subcategory: "Etherwarp"
    })
    etherwarpOverlay = false;
    
    @SwitchProperty({
        name: "Only Show When Sneaking",
        description: "Will only show the etherwarp overlay when you are sneaking.",
        category: "General",
        subcategory: "Etherwarp"
    })
    etherwarpOverlayOnlySneak = true;
    
    @SwitchProperty({
        name: "Sync With Server",
        description: `Makes the etherwarp prediction always be accurate, but will look less smooth.`,
        category: "General",
        subcategory: "Etherwarp"
    })
    etherwarpSyncWithServer = false;

    @SelectorProperty({
        name: "Highlight Type",
        description: "How to highlight the block for the etherwarp overlay.",
        category: "General",
        subcategory: "Etherwarp",
        options: [
            "Edges",
            "Edges (Phase)",
            "Filled",
            "Filled (Phase)"
        ]
    })
    etherwarpHighlightType = 0;

    @ColorProperty({
        name: "Overlay Color",
        description: "The color of the overlay when a valid etherwarp spot is found.",
        category: "General",
        subcategory: "Etherwarp"
    })
    etherwarpOverlayColor = new Color(0, 1, 0, 1);

    @SwitchProperty({
        name: "Hide Crosshair in Third Person",
        description: "Hides your crosshair when in third person view.",
        category: "General",
        subcategory: "Third Person"
    })
    hideThirdPersonCrosshair = false;

    @SwitchProperty({
        name: "Item Price Lore",
        description: "Shows the lowest BIN or bazaar buy and sell prices in every item's lore.",
        category: "General",
        subcategory: "Price Info"
    })
    itemPriceLore = false;

    @SwitchProperty({
        name: "Item Value Lore",
        description: "Shows the item's value in the bottom of the item's lore. This is different from the price info as it takes into account upgrades (Recombs, scrolls, enchants, stars etc).",
        category: "General",
        subcategory: "Price Info"
    })
    itemValueLore = false;




    // ------------------------------------------
    // Dungeons

    // Run Overview
    @SwitchProperty({
        name: "Custom End Info",
        description: "Shows nicer looking stats in chat after the run has ended including secrets.",
        category: "Dungeons",
        subcategory: "Dungeon End Stats"
    })
    customEndInfo = false;

    @SwitchProperty({
        name: "Run Overview",
        description: "Shows the run overview for the current run on the screen.",
        category: "Dungeons",
        subcategory: "Run Overview"
    })
    runOverview = false;

    @ButtonProperty({
        name: "Move",
        description: "Move the run overview overlay",
        category: "Dungeons",
        subcategory: "Run Overview",
        placeholder: "Move"
    })
    MoveOverviewGui() {
        this.runOverviewMoveGui.open()
    };

    @SwitchProperty({
        name: "Run Splits",
        description: "Shows the Run Splits for the current run on the screen.",
        category: "Dungeons",
        subcategory: "Run Splits"
    })
    runSplits = false;

    @ButtonProperty({
        name: "Move",
        description: "Move the run splits overlay",
        category: "Dungeons",
        subcategory: "Run Splits",
        placeholder: "Move"
    })
    MoveRunSplitsGui() {
        this.runSplitsMoveGui.open()
    };

    @SwitchProperty({
        name: "Dungeon Warp Cooldown",
        description: "Show how much longer until you can warp into a new Dungeon.",
        category: "Dungeons",
        subcategory: "Cooldown"
    })
    dungeonCooldown = false;

    @ButtonProperty({
        name: "Move",
        description: "Move the warp cooldown text",
        category: "Dungeons",
        subcategory: "Cooldown",
        placeholder: "Move"
    })
    MoveSplitsGui() {
        this.cooldownMoveGui.open()
    };

    @SwitchProperty({
        name: "Crystal Timer",
        description: "Says how long it took for you to get the crystal after entering the floor 7 boss.",
        category: "Dungeons",
        subcategory: "Crystal"
    })
    crystalTimer = false;

    @SwitchProperty({
        name: "Spirit Leap Names",
        description: "Show player's usernames underneath their heads in the spirit leap and ghost teleport gui (Like SBE's but shows the full name).",
        category: "Dungeons",
        subcategory: "Spirit Leap"
    })
    spiritLeapNames = false;

    @SwitchProperty({
        name: "Blaze Timer",
        description: "Shows how long it took you to complete blaze puzzle.\nNormal time begins when the first blaze is killed, true time (hover over message) begins when the blazes have spawned.",
        category: "Dungeons",
        subcategory: "Blaze"
    })
    blazeTimer = false;
    
    @SwitchProperty({
        name: "Player Logging",
        description: `
        &aLogs information about your dungeon runs:
         - The Floor
         - Run Time
         - Run Score
         - When the run was completed
         - Who you played with
         - Secrets found by everyone in the party
         - Deaths (During clear and in boss)

        &aThis information can be viewed later using the /plogs command.
        &aThe /plogs command can take in a range of arguments to narrow
        &athe runs which are shown:

        /plogs on it's own will show every run you ever logged along
        with which floors those runs were on, which players you played
        with the most and some information about how each class
        performed.

        However using filters, you can filter only S+ runs, only runs with
        certain people, runs within the past week, months etc.
        For example: &b/plogs &cp:UnclaimedBloom6,Hosted &et:30d &as:>300 &bf:f7 &r
        would show runs logged with &cUnclaimedBloom6 and Hosted &ron &bF7
        the past &e30 days &rwith a &ascore of 300 or more&r.

        &a&nArguments List:
         * &bp:player1,player2, ... &r- Filter based on players in the party,
            separated by a comma and no space.

         * &bt:<time> &r- Filter based on how long ago the run was. Eg &6t:30d
            &rfor &e30 days&r, &6t:1d8h &rfor &e1 day, 8 hours &retc.

         * &bps:<party_size> &r- Filter based on the party size. Eg &6ps:2
            &rfor duo runs, &6ps:>1 &rfor parties with more than 1 player etc.

         * &bs:<score> &r- Filter based off score. Eg &6s:>300 &rwould show
            runs with a score of 300 or more, &6s:<300 &rwould show runs with
            less than 300 score. &6s:317 &rwould show runs with
            exactly 317 score.

         * &bf:<floor> &r- Filter runs based off floor. Eg &6f:f5 &rwould show only
            F5 runs, &6f:f7 &ronly F7 etc.

        &cNOTE: Mort Messaged must be enabled in Skytils/SBA etc
        &cfor this feature to log runs. This module has it's own
        &cfeature for that, so use that instead if you still
        &cwant mort messages hidden.

        &c&nAn API key must also be set.&r &cTo set it, run &b/api new
        &cor &b/bcore setkey <API_KEY>&c.
        `,
        category: "Dungeons",
        subcategory: "Player Logs"
    })
    playerLogging = false;

    @SwitchProperty({
        name: "Disable Mort Messages",
        description: "Disables mort message. Enabling this will not conflict with this or any other CT modules, unlike Skytils or SBA.",
        category: "Dungeons",
        subcategory: "Mort"
    })
    disableMortMessages = false;
    
    @SwitchProperty({
        name: "&dRNG Meter",
        description: "Tracks your current RNG meter progress and displays it on the screen during a Dungeon.",
        category: "Dungeons",
        subcategory: "RNG Meter"
    })
    rngMeter = false;

    @SwitchProperty({
        name: "&dPost-Run Only",
        description: "Only render the RNG Meter after the dungeon run has ended.",
        category: "Dungeons",
        subcategory: "RNG Meter"
    })
    rngMeterPostRun = true;

    @SwitchProperty({
        name: "&dBackground",
        description: "Render a transparent black background behind the gui to make it stand out.",
        category: "Dungeons",
        subcategory: "RNG Meter"
    })
    rngMeterBackground = true;
    
    @SwitchProperty({
        name: "&dWarn when close",
        description: "Warns you when the RNG meter is almost filled.",
        category: "Dungeons",
        subcategory: "RNG Meter"
    })
    rngMeterWarnClose = true;

    @SliderProperty({
        name: "&dRemaining Score Alert",
        description: "How much score remaining until the module alerts you that your rngmeter is close to being filled.",
        category: "Dungeons",
        subcategory: "RNG Meter",
        min: 0,
        max: 2000
    })
    rngMeterRemainingAlert = 1200;

    @ButtonProperty({
        name: "&dMove RNG Meter Gui",
        description: "Move the RNG meter gui.",
        category: "Dungeons",
        subcategory: "RNG Meter"
    })
    MoveRNGMeterGui() {
        this.rngMeterMoveGui.open()
    }

    @SwitchProperty({
        name: "Terminal Splits",
        description: "Prints in chat how long each section of the terminal phase took.",
        category: "Dungeons",
        subcategory: "Terminals"
    })
    terminalSplits = false;

    @SwitchProperty({
        name: "Terminal Tracker",
        description: "Keeps track of how many terminals, devices and levers each player did.",
        category: "Dungeons",
        subcategory: "Terminals"
    })
    terminalTracker = false;

    @SwitchProperty({
        name: "Terminal Timer",
        description: `
        Tells you how long it took you to complete a terminal. Will also track PBs for each terminal.
        &cNOTE: This will depend greatly on ping. It times from when the gui is opened, to when the terminal completed message appears in chat (Term closed).
        `,
        category: "Dungeons",
        subcategory: "Terminals"
    })
    terminalTimer = false;

    // ---------------------------------------------------------------
    // Solvers


    // @SwitchProperty({
    //     name: "&6Terminal Solvers",
    //     description: "Toggle all terminal solvers.",
    //     category: "Solvers",
    //     subcategory: "Terminals"
    // })
    // terminalSolvers = false;

    // @SwitchProperty({
    //     name: "Colors Solver",
    //     description: "Toggle the terminal solver for the colors terminal (Select all the ____  items).",
    //     category: "Solvers",
    //     subcategory: "Terminals"
    // })
    // colorsSolver = false;

    // @SwitchProperty({
    //     name: "Starts With Solver",
    //     description: "Toggle the terminal solver for the 'starts with' terminal.",
    //     category: "Solvers",
    //     subcategory: "Terminals"
    // })
    // startsWithSolver = false;

    // @SwitchProperty({
    //     name: "Numbers Solver",
    //     description: "Toggle the terminal solver for the numbers terminal.",
    //     category: "Solvers",
    //     subcategory: "Terminals"
    // })
    // numbersSolver = false;

    // @SwitchProperty({
    //     name: "Red Green Solver",
    //     description: "Toggle the terminal solver for the numbers terminal (Correct all the panes).",
    //     category: "Solvers",
    //     subcategory: "Terminals"
    // })
    // redGreenSolver = false;

    // @SwitchProperty({
    //     name: "Rubix Solver",
    //     description: "Toggle the terminal solver for the numbers terminal (Correct all the panes).",
    //     category: "Solvers",
    //     subcategory: "Terminals"
    // })
    // rubixSolver = false;

    // @SwitchProperty({
    //     name: "&cHide Terminal Tooltips",
    //     description: "Hides the tooltips when hovering over items in terminals.",
    //     category: "Solvers",
    //     subcategory: "Terminals"
    // })
    // hideTerminalTooltips = false;

    // @SwitchProperty({
    //     name: "Hide Wrong Items",
    //     description: "Hides incorrect items in the Colors and Startswith terminals.",
    //     category: "Solvers",
    //     subcategory: "Terminals"
    // })
    // hideWrongItems = false;

    @SwitchProperty({
        name: "Mastery",
        description: "Show the amount of time left before the wool blocks disappear in the Dojo Mastery minigame. Text color changes from red -> yellow -> green depending on the wool color (Green wool = red text).",
        category: "Solvers",
        subcategory: "Dojo"
    })
    dojoMastery = false

    @SwitchProperty({
        name: "Livid Solver",
        description: "Draws a box around the correct Livid in Floor 5.",
        category: "Solvers",
        subcategory: "Livid"
    })
    lividSolver = false

    @SwitchProperty({
        name: "Hide Wrong Livids",
        description: "Stops incorrect livids from rendering in the floor 5 boss fight. Requires livid solver to be enabled.",
        category: "Solvers",
        subcategory: "Livid"
    })
    hideWrongLivids = false

    @SwitchProperty({
        name: "Blaze Solver",
        description: "Blaze Solver!",
        category: "Solvers",
        subcategory: "Blaze Solver"
    })
    blazeSolver = false;

    @SwitchProperty({
        name: "Trivia Solver",
        description: "Quiz puzzle",
        category: "Solvers",
        subcategory: "Trivia"
    })
    triviaSolver = false;

    @SwitchProperty({
        name: "Teleport Maze Solver",
        description: "tp maze solver!",
        category: "Solvers",
        subcategory: "Teleport Maze"
    })
    tpMazeSolver = false;

    // Simon Says

    @SwitchProperty({
        name: "Simon Says Solver",
        description: "Simon says for terminals!",
        category: "Solvers",
        subcategory: "Simon Says"
    })
    simonSolver = false;

    @SelectorProperty({
        name: "Simon Says Style",
        description: "How the simon says solver renders the solution.",
        category: "Solvers",
        subcategory: "Simon Says",
        options: [
            "Flat",
            "Box"
        ]
    })
    simonSolverStyle = 1;

    @SwitchProperty({
        name: "Cancel Incorrect Clicks",
        description: "Cancels wrong clicks! wow !!",
        category: "Solvers",
        subcategory: "Simon Says"
    })
    simonCancelClicks = true;

    @SwitchProperty({
        name: "Three Weirdos Solver",
        description: "Highlights the correct chest in the Three Weirdos dungeon room.",
        category: "Solvers",
        subcategory: "Three Weirdos"
    })
    weirdosSolver = false;


    // ---------------------------------------------------------------
    // Gui

    @SwitchProperty({
        name: "Speed Display",
        description: "Display your current speed on your screen. Goes above 500 unlike SBA's.",
        category: "Gui",
        subcategory: "Speed Display"
    })
    speedDisplay = false;
    
    @ButtonProperty({
        name: "Move",
        description: "Move the speed display",
        category: "Gui",
        subcategory: "Speed Display",
        placeholder: "Move"
    })
    MoveSpeedDisplay() {
        this.speedMoveGui.open()
    };

    @SwitchProperty({
        name: "Stack Tracker",
        description: "Renders the number of stacks you currently have on armor pieces like Crimson, Terror etc.",
        category: "Gui",
        subcategory: "Stack Tracker"
    })
    stackTracker = false;
    
    @ButtonProperty({
        name: "Move",
        description: "Move Stack Tracker",
        category: "Gui",
        subcategory: "Stack Tracker",
        placeholder: "Move"
    })
    MoveStackTracker() {
        this.stackTrackerGui.open()
    };

    @SwitchProperty({
        name: "Party List Overlay",
        description: "Show the party list on-screen",
        category: "Gui",
        subcategory: "Party"
    })
    partyOverlay = false;

    @ButtonProperty({
        name: "Move",
        description: "Move the party overlay",
        category: "Gui",
        subcategory: "Party",
        placeholder: "Move"
    })
    MovePartyOverlay() {
        this.partyOverlayMoveGui.open()
    };
    
    @SwitchProperty({
        name: "Cake Numbers",
        description: "Show which year a new year cake is without having to hover over it.",
        category: "Gui",
        subcategory: "New Year Cakes"
    })
    cakeNumbers = false;

    @SwitchProperty({
        name: "Crystal Hollows Map",
        description: "Shows where all of the main areas of the Crystal Hollows are as well as your own head.",
        category: "Gui",
        subcategory: "Crystal Hollows"
    })
    chMap = false;
    
    @ButtonProperty({
        name: "Move CH Map",
        description: "Move the crystal hollows map and change its size.",
        category: "Gui",
        subcategory: "Crystal Hollows",
        placeholder: "Move"
    })
    MoveCHMap() {
        this.chMapMoveGui.open()
    };


    @SwitchProperty({
        name: "Cells Align Timer",
        description: `
        Displays a timer on your screen showing the remaining time before you can use cells align again.
        If you are a mage, the mage cooldown reduction will be accounted for.
        `,
        category: "Gui",
        subcategory: "Cells Align"
    })
    cellsAlignTimer = false;
    
    @ButtonProperty({
        name: "Move Align",
        description: "Move and scale the cells align display.",
        category: "Gui",
        subcategory: "Cells Align",
        placeholder: "Move"
    })
    MoveCellsAlign() {
        this.cellsAlignMoveGui.open()
    };

    @SwitchProperty({
        name: "Container Value",
        description: `Shows the total value of every item in certain containers (Like backpacks, ender chest, wardrobe and chests), as well as each item's value.`,
        category: "Gui",
        subcategory: "Container Value"
    })
    containerValue = false;

    // ---------------------------------------------------------------
    // Auto Kicker

    @SwitchProperty({
        name: "Better Party Finder Message",
        description: "Changes the party finder player joined messages to take up only one line and adds buttons to kick, ignore and /pv the player.",
        category: "Party Finder",
        subcategory: "Buttons"
    })
    betterPFMessage = false;

    @SwitchProperty({
        name: "Auto Kick",
        description: "Automatically kicks players who join if they don't meet certain requirements",
        category: "Party Finder",
        subcategory: "Auto Kicker"
    })
    autoKicker = false;

    @SwitchProperty({
        name: "Kick Everyone",
        description: "Automatically kicks anyone who joins the party.",
        category: "Party Finder",
        subcategory: "Auto Kicker"
    })
    autoKickEveryone = false;

    @TextProperty({
        name: "Minimum Secrets",
        description: "Minimum amount of secrets for a player not to be kicked from the party",
        category: "Party Finder",
        subcategory: "Auto Kicker",
        placeholder: "Secrets"
    })
    akSecretMin = "3000";

    @SwitchProperty({
        name: "Recent Kick",
        description: "Automatically kick players who have been kicked recently",
        category: "Party Finder",
        subcategory: "Auto Kicker"
    })
    akRecentKick = false;

    @SwitchProperty({
        name: "Kick Classes",
        description: "Automatically kick players who join with specified classes.",
        category: "Party Finder",
        subcategory: "Auto Kicker"
    })
    akKickClasses = false;

    @TextProperty({
        name: "Classes To Kick",
        description: "Automatically kick players who join with these classes ('Class, Class, Class...')",
        category: "Party Finder",
        subcategory: "Auto Kicker"
    })
    akClasses = "Tank, Healer"

    @SwitchProperty({
        name: "Auto /ds",
        description: "Automatically runs /ds on every player who joins via party finder.",
        category: "Party Finder",
        subcategory: "Stats"
    })
    autoDS = false;

    @SwitchProperty({
        name: "Auto /ds Party",
        description: "Automatically runs /ds on every player currently in the party when you join it.",
        category: "Party Finder",
        subcategory: "Stats"
    })
    autoDSParty = false;
}
export default new Config()