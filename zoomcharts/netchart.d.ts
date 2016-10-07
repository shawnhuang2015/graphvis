export interface NetChartBarSettingsLocalizationToolbar extends BaseSettingsLocalizationToolbar {
        fitButton?: string;
        fitTitle?: string;
        freezeButton?: string;
        freezeTitle?: string;
        rearrangeButton?: string;
        rearrangeTitle?: string;
        unfreezeTitle?: string;
    }
    export interface NetChartBarSettingsToolbar extends BaseSettingsToolbar {
        /** Whether to show the zoom slider control. */
        zoomControl?: boolean;
    }
    /** Describes the base properties shared between all events raised by the different charts. */
    export interface NetChartChartClickEventArguments extends NetChartChartEventArguments {
        clickItem: BaseLabel;
        clickLink: ItemsChartLink;
        clickNode: ItemsChartNode;
    }
    /** Describes the base properties shared between all events raised by the different charts. */
    export interface NetChartChartEventArguments extends ItemsChartChartEventArguments {
        links: Array<ItemsChartLink>;
        nodes: Array<ItemsChartNode>;
    }
    export interface NetChartDataObject extends BaseDataErrorResponse {
        links: Array<NetChartDataObjectLink>;
        nodes: Array<NetChartDataObjectNode>;
    }
    export interface NetChartDataObjectLink extends ItemsChartDataObjectLink {
    }
    export interface NetChartDataObjectNode extends ItemsChartDataObjectNode {
        value?: number;
        x?: number;
        y?: number;
    }
    export interface NetChartSettings extends ItemsChartSettings {
        /** Chart area related settings. */
        area?: NetChartSettingsArea;
        /** Settings used to load data into chart. Customise preferred data source feeding methods.
        You can use one of these options: url, data function, preloaded data. */
        data?: Array<NetChartSettingsData>;
        /** The events used to handle user interaction with UI elements. */
        events?: BaseSettingsEvents<NetChartChartEventArguments, NetChartChartClickEventArguments>;
        /** Configurable conditions to filter the raw data values for subset of drawing nodes and links. */
        filters?: {
            /** Determine if link can be displayed. Invoked whenever a link is about to be shown or its data has changed.
            Only links that have been allowed by nodeFilter for both end nodes will be passed here. */
            linkFilter?: (
                /** link data object */
                linkData: NetChartDataObjectLink, 
                /** data object representing node where the link begins */
                fromNodeData: NetChartDataObjectNode, 
                /** data object representing node where the link ends */
                toNodeData: NetChartDataObjectNode) => boolean;
            /** Function called whenever there is more than one link between two nodes. Only links that were allowed by nodeFilter, linkFilter and nodeLinksProcessor
            will be passed here. The function can return either some of the original links, or create completely new links.
            In the latter case, link IDs MUST be unique (links passed in are guaranteed to have unique IDs). */
            multilinkProcessor?: (
                /** array of link data objects */
                arrayOfLinkData: Array<NetChartDataObjectLink>, 
                /** data object representing node where the links begins */
                fromData: NetChartDataObjectNode, 
                /** data object representing node where the links ends */
                toData: NetChartDataObjectNode) => NetChartDataObjectLink | Array<NetChartDataObjectLink>;
            /** Determine if node can be displayed. Invoked whenever a node or one of its links is about to be shown, or if data for the node (or its links) has changed. */
            nodeFilter?: (
                /** Node data object */
                nodeData: NetChartDataObjectNode, 
                /** Unfiltered array of link data objects (linkFilter/nodeLinksProcessor/multilinkProcessor have not been applied) */
                arrayOfLinkData: Array<NetChartDataObjectLink>) => boolean;
            /** From links that were allowed by nodeFilter and linkFilter, select the ones that will be displayed. This is basically a bulk version of linkFilter.
            It is also allowed to return a completely new set of links, however link IDs MUST be unique in this case
            (links passed in are guaranteed to have unique IDs). */
            nodeLinksProcessor?: (
                /** Node data object */
                nodeData: NetChartDataObjectNode, 
                /** Array of link data objects. All links are connected to the node. Only links that were allowed by nodeFilter/linkFilter will be passed here.
                MultilinkProcessor has not been applied yet. */
                links: Array<NetChartDataObjectLink>) => Array<NetChartDataObjectLink>;
        };
        /** Customise chart resize handles or animation duration settings. */
        interaction?: NetChartSettingsInteraction;
        /** Adjustable settings to get desired net chart layout style and animation while and before interacting. */
        layout?: NetChartSettingsLayout;
        /** The chart legend representing classes attached to nodes or links.
        The legend will display the visual styles specified in `style.nodeClasses` and `style.linkClasses` - by default these are not defined
        so the legend will be empty. */
        legend?: NetChartSettingsLegend;
        /** Localizeable strings including export type options and useful default buttons used for chart interaction.
        Buttons like to navigate back, set the chart on full screen and others. */
        localization?: NetChartSettingsLocalization;
        /** Settings for NetChart navigation (expanding/collapsing/focusing/unfocusing/showing/hiding). The main setting is "mode" which determines the overall
        algorithm for navigation. Other parameters can tweak this algorithm, but not all parameters apply to all algorithms. */
        navigation?: NetChartSettingsNavigation;
        /** Chart style settings. */
        style?: ItemsChartSettingsNodesLayerStyle;
        /** Theme to apply. You can either use this to share configuration objects between multiple charts or use one of the predefined
        themes. */
        theme?: NetChartSettings;
        /** Adjustable settings to manage default and custom toolbar items, as well as toolbar overall appearance. */
        toolbar?: NetChartBarSettingsToolbar;
    }
    export interface NetChartSettingsArea extends BaseSettingsArea {
        /** The center of the chart. Fraction of chart width. 0 = left side, 1 = right side.
        @deprecated this property is no longer used */
        centerX?: number;
        /** The center of the chart. Fraction of chart height, 0 = top, 1 = botom.
        @deprecated this property is no longer used */
        centerY?: number;
        /** Inner bottom padding, nodes will avoid this area.
        If the value is <= 1 then the value represents the fraction from the chart width.
        Otherwise it represents the padding value in pixels.
        @deprecated this property is no longer used */
        paddingBottom?: number;
        /** Inner left padding, nodes will avoid this area.
        If the value is <= 1 then the value represents the fraction from the chart width.
        Otherwise it represents the padding value in pixels.
        @deprecated this property is no longer used */
        paddingLeft?: number;
        /** Inner right padding, nodes will avoid this area.
        If the value is <= 1 then the value represents the fraction from the chart width.
        Otherwise it represents the padding value in pixels.
        @deprecated this property is no longer used */
        paddingRight?: number;
        /** Inner top padding, nodes will avoid this area.
        If the value is <= 1 then the value represents the fraction from the chart width.
        Otherwise it represents the padding value in pixels.
        @deprecated this property is no longer used */
        paddingTop?: number;
    }
    export interface NetChartSettingsData extends ItemsChartSettingsData {
        /** Load more chart data. */
        dataFunction?: (
            /** node IDs */
            nodes: Array<string>, 
            /** callback function to execute when data arrived correctly */
            success: (data: NetChartDataObject) => void, 
            /** callback function to execute when error occure while loading data */
            fail: (result: BaseDataErrorResponse) => void) => void;
        /** Provides the ability to embed chart data directly into the chart configuration.
        
        This data can be complete or act as the initial data where the rest will be requested dynamically using
        `url` or `dataFunction`. */
        preloaded?: NetChartDataObject;
    }
    export interface NetChartSettingsInteraction extends ItemsChartSettingsInteraction {
        /** The ability to rotate the chart with the pinch gesture, using 2 fingers */
        rotation?: {
            /** Enables/disables chart rotation via the multitouch gesture events */
            fingers?: boolean;
        };
        /** Select node to expand it or getting path. */
        selection?: NetChartSettingsInteractionSelection;
        /** Zoom in or out by swiping up or down with mouse scroll pad or by using the Zoom-out feature at the top left. */
        zooming?: NetChartSettingsInteractionZooming;
    }
    export interface NetChartSettingsInteractionSelection extends ItemsChartSettingsInteractionSelection {
    }
    export interface NetChartSettingsInteractionZooming extends ItemsChartSettingsInteractionZooming {
        /** Zoom value limits for automatic zooming (for example, "Fit to screen"). Contains array of [min, max] values.
        
        If the minimum (the first value) is specified as `null`, the chart will not enforce it, instead it will be adjusted as needed
        if the network grows very large. Note that specifying `null` as the minimum also overrides the minimum for the `zoomExtent`
        value. */
        autoZoomExtent?: [number, number];
        /** The acceleration of scene movement, when trying to contain all nodes within the view,
        when autozoom is enabled. Increasing the value decreases latency, and makes the animation
        more responsive. Decreasing the value makes the animation more fluid */
        autoZoomPositionEllasticity?: number;
        /** Controls the percentage of how much of the chart width/height the nodes can move around without
        triggering automatic zoom adjustment. A value of 0.9 means that the target is to leave 10% padding
        on all sides of the chart. However once the target  is reached, if the nodes move within these 10%
        on either side, the zoom adjustment is not performed. */
        autoZoomSize?: number;
        /** Auto zoom mode on chart initialization. */
        initialAutoZoom?: "overview" | "true" | "false";
        /** Zoom value limits while for manual zooming. Contains array of [min, max] values.
        
        Note that if the minimum for `autoZoomExtent` is `null` (the default) then it can override the minimum in this value if the auto zoom level is smaller. */
        zoomExtent?: [number, number];
    }
    export interface NetChartSettingsLayout {
        /** Advanced chart settings. Be advised that they are subject to change, backwards compatibility is not guaranteed. */
        advanced?: {
            adaptiveFreezeTreshold?: number;
        };
        /** Whether to fit network in aspect ratio of chart viewport. Useful for small networks that always fit in chart and are not intended to be zoomed in / out. */
        aspectRatio?: boolean;
        /** Whether to perform global layout on network changes. Use it for better node placement at the cost of chart slowdown on network changes. */
        globalLayoutOnChanges?: boolean;
        /** Maximum time to wait for incremental layout to be completed. Note that bigger value will get nicer placement on network updates at the cost of longer delay. */
        incrementalLayoutMaxTime?: number;
        /** Maximum time to wait for initial layout to be completed. Note that bigger value will get nicer placement of big networks at the cost of long initial delay. */
        initialLayoutMaxTime?: number;
        /** Dynamic layout can be stopped faster if no more movement is detected. */
        layoutFreezeMinTimeout?: number;
        /** Dynamic layout is stopped after user is inactive for this time. */
        layoutFreezeTimeout?: number;
        /** Layout mode. */
        mode?: "dynamic" | "radial" | "hierarchy" | "static";
        /** Desired distance between nodes. */
        nodeSpacing?: number;
        /** For hierarhy layout, clockwise rotation of the tree(s), measured in degrees.
        0 = top-down tree; 90 = right-left tree; 180 = bottom-up tree, etc. Also affects placement of multiple trees the same way. */
        rotation?: number;
        /** Desired vertical distance between node rows in the hierarchy layout. */
        rowSpacing?: number;
        /** For radial layout, whether to lay out the first level in two rings, if necessary */
        twoRingRadialLayout?: boolean;
    }
    export interface NetChartSettingsLegend extends BaseSettingsLegend {
        /** Legend enclosing panel settings. */
        panel?: BaseSettingsLegendPanel;
    }
    export interface NetChartSettingsLocalization extends BaseSettingsLocalization {
        /** Node/link menu by using localizeable strings. */
        menu?: {
            collapse?: string;
            /** The text for the button that unlock the node position. */
            dynamic?: string;
            expand?: string;
            fixed?: string;
            focus?: string;
            hide?: string;
            unfocus?: string;
        };
        /** Strings used in toolbars. */
        toolbar?: NetChartBarSettingsLocalizationToolbar;
    }
    /** Settings for NetChart navigation (expanding/collapsing/focusing/unfocusing/showing/hiding). The main setting is `mode` which determines the overall
    algorithm for navigation. Other parameters can tweak this algorithm, but not all parameters apply to all algorithms. */
    export interface NetChartSettingsNavigation {
        /** Determines what happens if the user has reached maximum number of focus nodes (`numberOfFocusNodes`) and focuses another node.
        If this setting is `true`, then the least recently focused node will be unfocused. If this setting is `false`, then the user
        will not be able to focus the node. _Used by modes: all modes_ */
        autoUnfocus?: boolean;
        /** Whether to auto-zoom to a node when it is focused. _Used by modes: all modes_ */
        autoZoomOnFocus?: boolean;
        /** If focusing a node would display several levels of nodes (due to `focusNodeExpansionRadius` or `focusNodeTailExpansionRadius`), each level is shown after
        the specified delay (milliseconds). Set to 0 to disable. _Used by modes: `focusnodes`_ */
        expandDelay?: number;
        /** Whether to expand node on click. _Used by modes: all modes_ */
        expandOnClick?: boolean;
        /** If set to true, nodes and links with [relevance](full-reference/ItemsChartNode.html#doc_relevance) < 1 will be drawn with a smaller radius and a faded out
        color (both multiplied by [relevance](full-reference/ItemsChartNode.html#doc_relevance)). _Used by modes: `focusnodes`_ */
        focusAutoFadeout?: boolean;
        /** Number of "levels" to automatically expand around the most recently focused node. If set to 1, all nodes directly linked to the focused node will be shown.
        If set to 2, all nodes directly connected to these nodes will be shown as well. Etc. Also used for calculating
        [node relevance](full-reference/ItemsChartNode.html#doc_relevance). _Used by modes: `focusnodes`_ */
        focusNodeExpansionRadius?: number;
        /** Similar to `focusNodeExpansionRadius`, but for the least recently focused node. This allows to create an effect, where the most recently focused node has
        many expanded nodes around it, while the least recently node has only a few (or vice versa). Intermediate focused nodes will have their expansion radius
        linearly interpolated between `focusNodeExpansionRadius` and `focusNodeTailExpansionRadius`. Also used to calculate
        [node relevance](full-reference/ItemsChartNode.html#doc_relevance). _Used by modes: `focusnodes`_ */
        focusNodeTailExpansionRadius?: number;
        /** Initially visible/focused nodes. Array of node identifiers. The precise effect depends on the navigation mode.
        * For `manual` this specifies the initially visible nodes and must contain at least 1 node.
        * For `showall` this specifies which nodes to show first, and other nodes are then requested recursively from these until all nodes are visible.
        * If this setting is left empty or `null`, the chart will directly request ALL nodes (this is more efficient if your data source supports it).
        * For `focusnodes` this specifies the initially focused nodes. The count of node IDs in this array must be between `minNumberOfFocusNodes` and
           `numberOfFocusNodes`
        
        _Used by modes: all modes_ */
        initialNodes?: Array<string>;
        /** Minimum number of focused nodes. Prevents user from unfocusing nodes if there are `minNumberOfFocusNodes` or less nodes focused.
        If the `focusnodes` navigation is used, this setting has a minimum value of 1. _Used by modes: all modes_ */
        minNumberOfFocusNodes?: number;
        /** Navigation mode - the algorithm that determines the expanding/collapsing logic. */
        mode?: "manual" | "showall" | "focusnodes";
        /** Maximum number of focused nodes. The `autoUnfocus` setting determines what happens when more nodes are focused.  _Used by modes: all modes_ */
        numberOfFocusNodes?: number;
    }

export class NetChart extends Configuration.BaseApi {
        public constructor(settings: Configuration.NetChartSettings);
        /** Adds the given data to whatever data the chart has currently loaded. The chart will automatically be updated
        to display this new data if it falls within the currently visible bounds. */
        public addData(data: Configuration.NetChartDataObject, 
            /** the ID of the data source that will be updated. The default value is `default`. */
            sourceId?: string): void;
        /** Focuses a node. Whether or not the node will get actually focused depends no the navigation mode. */
        public addFocusNode(
            /** Node ID or object */
            id: string | Configuration.ItemsChartNode, 
            /** Explicitly assigned relevance (used only by Focusnodes navigation mode).
            For more information, see the [Focusnodes algorithm](net-chart/advanced-topics/focusnodes-algorithm-details.html) */
            relevance?: number): void;
        /** Removes focus from all nodes. The exact effect depends on the navigation mode. */
        public clearFocus(): void;
        /** Collapses a node. The exact effect depends on the navigation mode. */
        public collapseNode(
            /** Node ID or object */
            id: string | Configuration.ItemsChartNode): void;
        /** Expands a visible node. */
        public expandNode(
            /** Node ID or object */
            id: string | Configuration.ItemsChartNode): void;
        public exportData(visibleOnly?: boolean, exportCoordinates?: boolean): Configuration.NetChartDataObject;
        /** Gets a visible link by its ID */
        public getLink(
            /** Link ID */
            id: string): Configuration.ItemsChartLink;
        /** Gets a visible node by its ID */
        public getNode(
            /** Node ID */
            id: string): Configuration.ItemsChartNode;
        public getNodeDimensions(node: Configuration.ItemsChartNode): {
                x: number;
                y: number;
                radius: number;
                hwidth: number;
            };
        public hideMenu(): this;
        /** Hides a visible node. Whether or not the node will get actually hidden depends on the navigation mode. */
        public hideNode(
            /** Node ID or object */
            id: string | Configuration.ItemsChartNode): void;
        public links(): Array<Configuration.ItemsChartLink>;
        /** Fixates a node in place. */
        public lockNode(
            /** Node ID or object */
            id: string | Configuration.ItemsChartNode, x: number, 
            /** Y position, in scene coordinates */
            y: number): void;
        public nodes(): Array<Configuration.ItemsChartNode>;
        /** Adds event listener. */
        public on(
            /** The type of the event for which the listener will be added. See method overloads for valid values. */
            name: string, 
            /** The callback function. It receives two arguments - the mouse event data and a separate object containing chart specific information. */
            listener: (event: Configuration.BaseMouseEvent, args: Configuration.BaseChartEventArguments) => void): void;
        public on(name: "chartUpdate", listener: (event: Configuration.BaseMouseEvent, args: Configuration.NetChartChartEventArguments) => void): void;
        public on(name: "click", listener: (event: Configuration.BaseMouseEvent, args: Configuration.NetChartChartClickEventArguments) => void): void;
        public on(name: "doubleClick", listener: (event: Configuration.BaseMouseEvent, args: Configuration.NetChartChartClickEventArguments) => void): void;
        public on(name: "error", listener: (
                /** An empty mouse event. */
                event: Configuration.BaseMouseEvent, args: Configuration.BaseChartErrorEventArguments) => void): void;
        public on(name: "hoverChange", listener: (event: Configuration.BaseMouseEvent, args: Configuration.NetChartChartEventArguments) => void): void;
        public on(name: "positionChange", listener: (event: Configuration.BaseMouseEvent, args: Configuration.NetChartChartEventArguments) => void): void;
        public on(name: "rightClick", listener: (event: Configuration.BaseMouseEvent, args: Configuration.NetChartChartClickEventArguments) => void): void;
        public on(name: "selectionChange", listener: (event: Configuration.BaseMouseEvent, args: Configuration.NetChartChartEventArguments) => void): void;
        public on(name: "settingsChange", listener: (event: Configuration.BaseMouseEvent, args: Configuration.BaseChartSettingsChangeEventArguments) => void): void;
        public on(name: "tripleClick", listener: (event: Configuration.BaseMouseEvent, args: Configuration.NetChartChartClickEventArguments) => void): void;
        /** Removes the given nodes and links from the chart. Note that only the ID values have to be given, all other properties are ignored. */
        public removeData(data: Configuration.NetChartDataObject, sourceId?: string): void;
        /** Removes focus from a node. Whether or not the node will get actually unfocused depends on the navigation mode. */
        public removeFocusNode(
            /** Node ID or object */
            id: string | Configuration.ItemsChartNode): void;
        /** Replaces the data already in the data cache with the given values. */
        public replaceData(data: Configuration.NetChartDataObject, 
            /** the ID of the data source that will be updated. The default value is `default`. */
            sourceId?: string): void;
        /** Updates the chart settings but instead of merging some settings that are arrays or dictionaries (such as `data`)
        these collections are replaced completely. For example, this allows removal of series or value axis within TimeChart. */
        public replaceSettings(changes: Configuration.NetChartSettings): this;
        public resetLayout(): void;
        /** Animates the viewport to zoom into and contain the nodes specified in the given array */
        public scrollIntoView(
            /** Nodes to zoom to */
            nodes: Array<string> | Array<Configuration.ItemsChartNode>, 
            /** Optionally, additional margins (in scene coordinates) to leave free on the sides. Order: top, right, bottom, left */
            margins?: [number, number, number, number]): void;
        /** Set/Get selected objects. */
        public selection(
            /** array of objects identifiers to select. Do not pass this parameter if you don't want to change current selection. */
            selected: Array<string | Configuration.ItemsChartNode | Configuration.ItemsChartLink>): Array<Configuration.ItemsChartNode | Configuration.ItemsChartLink>;
        /** Shows a node by its ID. The data for the node gets requested in the standard manner.
        Whether or not the node will get actually shown depends on the navigation mode. */
        public showNode(
            /** Node ID */
            id: string): void;
        /** Lists the predefined themes for the chart. These can be used within the settings objects or via the `customize()` method:
        
        ```javascript 
        var chart = new ZoomCharts.$this({ theme: ZoomCharts.$this.themes.dark });
        chart.updateSettings({ theme: ZoomChart.$this.themes.dark });
        chart.customize("dark");
        ``` */
        public static themes: {
            dark?: Configuration.NetChartSettings;
            flat?: Configuration.NetChartSettings;
        };
        /** Unfixates a node and allows it to be repositioned by the layout algorithms. */
        public unlockNode(
            /** Node ID or object */
            id: string | Configuration.ItemsChartNode): void;
        /** Updates the chart settings. Only the settings that have to be changed should be passed. Note that some arrays
        and dictionaries (such as `data`) are merged by the ID values - if instead they should be replaced, use
        [`replaceSettings()`](#doc_replaceSettings) method. */
        public updateSettings(changes: Configuration.NetChartSettings): this;
        /** Updates (recalculates) the style for the whole chart or specific objects matching the given IDs. */
        public updateStyle(
            /** A list of IDs for the nodes and links which need their style recalculated */
            objects?: Array<string>): void;
        /** Gets or sets the current zoom level of the chart. A zoom level of `1` means that all nodes are rendered
        with the radius that is set in their configuration. A zoom level of `2` means that all nodes are twice
        the size and `0.5` means that all nodes are two times smaller than their specified radiuses.
        
        The zoom level is limited by [`interaction.zooming.zoomExtent` setting][zoomextent].
        
        [zoomextent]: https://zoomcharts.com/developers/en/net-chart/api-reference/settings/interaction/zooming/zoomExtent.html */
        public zoom(
            /** if specified and greater than zero, the zoom level will be updated to this value. */
            zoomValue?: number, 
            /** specifies if the zoom change should be animated. The default is `true`. */
            animate?: boolean): number;
        public zoomIn(objects: Array<string>, animate?: boolean): void;
    }