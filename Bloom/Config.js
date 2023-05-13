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
        this.setCategoryDescription("General", 
            "&6&l&nBloom\n\n" +
            "&7/bl setkey <api key> &8- Set your API key.\n" +
            "\n" +
            "&7/ds <player> &8- Dungeon Stats.\n" +
            "&7/mem <player> &8- Guild Stats.\n" +
            "&7/check <player> &8- Check if scammer.\n" +
            "&7//skills <player> &8- Show a player's skills.\n" +
            "&7//slayer <player> &8- Show a player's slayer stats.\n" +
            "&7/mykey &8- Show stats about your API key.\n" +
            "\n" +
            "&7//rp [...exclude] &8- Reparty (Add names to not reparty those players).\n" +
            "&7/ping &8- Show your ping.\n" +
            "&7/ptr &8- Transfer party to random player.\n" +
            "&7/lsb &8- Warp to lobby then back to Skyblock.\n" +
            "&7/ld &8- Warp to lobby, Skyblock then Dungeon Hub.\n" +
            "&7/colors &8-Show all of the formatting codes.\n" +
            "&7/dc <player1> <player2> &8-Show the cata XP difference between two players.\n" +
            "&7/pb <floor number> &8-Show the S+ PB's of the whole party on a floor.\n" +
            "&7/nh <player> &8-Show a player's username history.\n" +
            "\n\n" +
            "&6UnclaimedBloom6 is very cool and cool"
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

    // ---------------------------------------------------------------
    // General

    @SwitchProperty({
        name: "Update Checker",
        description: "Checks for updates when logging on.",
        category: "General",
        subcategory: "Updates"
    })
    updateChecker = true

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
        description: "Logs info about every run including players, deaths, how many secrets they found, run time and score.\n" +
        "Use &b/plogs [p:player] [f:floor] [t:1d, 10h, 7d etc] &7to show info about past runs with specific players, floors, and/or within the last x amount of time.\n" +
        "&aExample: &b/plogs p:UnclaimedBloom6 f:f5 t:7d &awould show all runs logged with UnclaimedBloom6 on Floor 5 within the last 7 days.\n\n" +
        "More functionality coming in future updates.\n\n" +
        "&cRequires API key to be set (/bl setkey <key>). Runs can not be logged if the API key is not set or the API key is invalid." +
        "&cMORT MESSAGES MUST BE ENABLED",
        category: "Dungeons",
        subcategory: "Player Logs"
    })
    playerLogging = false;
    
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

    // ---------------------------------------------------------------
    // Solvers

    @SwitchProperty({
        name: "&a&lZero Ping Terminals",
        description: "Removes the delay caused by ping when clicking on terminals, making it feel like you have zero ping.\n\n" +
        "&8- Originally created by Alon1396 in the AlonAddons module\n\n" +
        "&cWARNING: Currently, the chances of getting banned for this is virtually 0, however if Hypixel's anticheat updates to try and prevent exploiting terminals then this could cause false bans. Use at own risk.",
        category: "Solvers",
        subcategory: "Terminals"
    })
    zeroPingTerminals = false;

    @SwitchProperty({
        name: "&6Terminal Solvers",
        description: "Toggle all terminal solvers.",
        category: "Solvers",
        subcategory: "Terminals"
    })
    terminalSolvers = false;

    // ----- Spam -----

    @SwitchProperty({
        name: "Colors Solver",
        description: "Toggle the terminal solver for the colors terminal (Select all the ____  items).",
        category: "Solvers",
        subcategory: "Terminals"
    })
    colorsSolver = false;

    @SwitchProperty({
        name: "Zero Ping Colors",
        description: "Toggle zero ping being used for the colors terminal.",
        category: "Solvers",
        subcategory: "Terminals"
    })
    colorsZeroPing = false;

    // --

    @SwitchProperty({
        name: "Starts With Solver",
        description: "Toggle the terminal solver for the 'starts with' terminal.",
        category: "Solvers",
        subcategory: "Terminals"
    })
    startsWithSolver = false;

    @SwitchProperty({
        name: "Zero Ping Starts With",
        description: "Toggle zero ping being used for the 'starts with' terminal.",
        category: "Solvers",
        subcategory: "Terminals"
    })
    startsWithZeroPing = false;

    // --

    @SwitchProperty({
        name: "Numbers Solver",
        description: "Toggle the terminal solver for the numbers terminal.",
        category: "Solvers",
        subcategory: "Terminals"
    })
    numbersSolver = false;

    @SwitchProperty({
        name: "Zero Ping Numbers",
        description: "Toggle zero ping being used for the numbers terminal.",
        category: "Solvers",
        subcategory: "Terminals"
    })
    numbersZeroPing = false;

    // --

    @SwitchProperty({
        name: "Red Green Solver",
        description: "Toggle the terminal solver for the numbers terminal (Correct all the panes).",
        category: "Solvers",
        subcategory: "Terminals"
    })
    redGreenSolver = false;

    @SwitchProperty({
        name: "Zero Ping Red Green",
        description: "Toggle zero ping being used for the red green terminal.",
        category: "Solvers",
        subcategory: "Terminals"
    })
    redGreenZeroPing = false;

    // --

    @SwitchProperty({
        name: "Rubix Solver",
        description: "Toggle the terminal solver for the numbers terminal (Correct all the panes).",
        category: "Solvers",
        subcategory: "Terminals"
    })
    rubixSolver = false;

    @SwitchProperty({
        name: "Zero Ping Rubix",
        description: "Toggle zero ping being used for the rubix terminal (Make all the same color).",
        category: "Solvers",
        subcategory: "Terminals"
    })
    rubixZeroPing = false;

    // @SwitchProperty({
    //     name: "Maze Helper",
    //     description: "Shows the next maze pane that should be clicked when using Zero Ping Terminals.",
    //     category: "Solvers",
    //     subcategory: "Terminals"
    // })
    // mazeHelper = true;

    @SwitchProperty({
        name: "&cHide Terminal Tooltips",
        description: "Hides the tooltips when hovering over items in terminals.",
        category: "Solvers",
        subcategory: "Terminals"
    })
    hideTerminalTooltips = true;

    @SwitchProperty({
        name: "&cShow Right Click",
        description: "Shows how many right clicks are needed instead of left clicks on the new colors terminal.\n&eNOTE: Zero ping will still middle click since right clicking was buggy. I'd only recommend using this if you aren't using zero ping.",
        category: "Solvers",
        subcategory: "Terminals"
    })
    colorsRightClick = false

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