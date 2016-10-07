export abstract class BaseApi {
        /** Adds the given data to whatever data the chart has currently loaded. The chart will automatically be updated
        to display this new data if it falls within the currently visible bounds. */
        public addData(data: BaseDataObjectBase, 
            /** the ID of the data source that will be updated. The default value is `default`. */
            sourceId?: string): void;
        /** 
        @deprecated use settings.parentChart instead. */
        public addSubchartContainer(container: HTMLElement): void;
        public back(): this;
        public clearHistory(): this;
        /** Applies one of the built-in themes to the chart. This is an alternative to calling 
        `updateSettings({ theme: ZoomCharts.$this.themes.dark })`. */
        public customize(
            /** The name of the theme to be applied, must be one of the values defined in the `$this.themes` static property. */
            name: string): this;
        /** Launches a file download that contains an image or the data of the current state of the chart. 
        
        Note that in some browsers calling this method will send the data to a proxy. When handling sensitive data you should install the proxy 
        on your own server, see `advanced.exportProxyURL` setting. */
        public export(
            /** The format in which the data will be exported. */
            type: "png" | "jpg" | "pdf" | "csv" | "xlsx", 
            /** Specifies the dimensions for the image formats. */
            dimensions?: BaseExportDimensions, 
            /** Specifies if the resulting image should have transparent background. This setting is only valid for `png` image format. Default is `false`.
            
            Note that if `area.style.fillColor` is set, this will have no effect. */
            transparent?: boolean): void;
        /** Saves the current chart state as a data-URI. 
        
        If image type is specified, the URI can be used as the image source in `<img src="">`. 
        
        Note that some output settings might require sending the data to a proxy. When handling sensitive data you should install the proxy 
        on your own server, see `advanced.exportProxyURL` setting. */
        public exportAsString(
            /** The format in which the data will be exported. */
            type: "png" | "jpg" | "pdf" | "csv" | "xlsx", 
            /** The callback that will be invoked once the result is generated. */
            callback: (
                /** The data-uri that contains the generated image or data file. */
                dataUri: string, 
                /** The mime type of the generated file. */
                mimeType: string, 
                /** The extension of the generated file. */
                extension: string) => void, 
            /** Specifies the dimensions for the image formats. */
            dimensions?: BaseExportDimensions, 
            /** Specifies if the resulting image should have transparent background. This setting is only valid for `png` image format. Default is `false`.
            
            Note that if `area.style.fillColor` is set, this will have no effect. */
            transparent?: boolean): void;
        /** Returns the dimensions for the image exported with `exportImageAsString`.
        @deprecated use `exportImageGetDimensions` instead */
        public exportGetDimensions(dimensions: BaseExportDimensions): {
                width: number;
                height: number;
                scale: number;
                chartWidth: number;
                chartHeight: number;
            };
        /** Saves the current chart state as an image. 
        
        Note that this method does not support custom DPI setting, for that `exportAsString` method has to be used.
        @deprecated use `exportAsString` instead. */
        public exportImageAsString(type: string, dimensions: BaseExportDimensions, transparent: boolean): string;
        /** Returns the dimensions for the image exported with `exportImageAsString`. */
        public exportImageGetDimensions(dimensions: BaseExportDimensions): {
                width: number;
                height: number;
                scale: number;
                chartWidth: number;
                chartHeight: number;
            };
        public fullscreen(isFullscreen: boolean): boolean;
        public home(): boolean;
        /** Removes an event listener that was added by a call to `on` or by specifying it in settings.
        Note that the listener must be the exact same reference, which means that anonymous functions should not be used in call to `on`. */
        public off(
            /** the type of the event. Please see the documentation for `on` about valid values. */
            name: string, listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): boolean;
        /** Adds event listener. */
        public on(
            /** The type of the event for which the listener will be added. See method overloads for valid values. */
            name: string, 
            /** The callback function. It receives two arguments - the mouse event data and a separate object containing chart specific information. */
            listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): void;
        /** Adds an event listener for when the current view has changed (usually after panning and navigation). */
        public on(name: "chartUpdate", listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): void;
        /** Adds an event listener for the mouse click (or touch tap) event. */
        public on(name: "click", listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): void;
        /** Adds an event listener for the mouse double click (or touch double tap) event. */
        public on(name: "doubleClick", listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): void;
        /** Adds an event listener for the mouse click (or touch tap) event. */
        public on(name: "error", listener: (
                /** An empty mouse event. */
                event: BaseMouseEvent, args: BaseChartErrorEventArguments) => void): void;
        /** Adds an event listener for when the currently hovered item has changed. */
        public on(name: "hoverChange", listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): void;
        /** Adds an event listener for when chart placement on screen changes. Note that this is called on every animation frame. */
        public on(name: "positionChange", listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): void;
        /** Adds an event listener for the mouse right click (or touch longpress) event. */
        public on(name: "rightClick", listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): void;
        /** Adds an event listener for when the currently selected item or items have changed. */
        public on(name: "selectionChange", listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): void;
        /** Adds an event listener for when the settings are updated through the API. */
        public on(name: "settingsChange", listener: (event: BaseMouseEvent, args: BaseChartSettingsChangeEventArguments) => void): void;
        /** Adds an event listener for the mouse triple click (or touch triple tap) event. */
        public on(name: "tripleClick", listener: (event: BaseMouseEvent, args: BaseChartEventArguments) => void): void;
        /** Does immediate repaint. Use to sync updates between multiple charts. */
        public paintNow(force?: boolean): this;
        public profiler(): BaseProfiler;
        /** Clears data cache and loads new data. The current view is preserved. */
        public reloadData(sourceId?: string): void;
        /** Removes chart from DOM. This method is automatically called when you create a new chart within the same container element.
        
        This method should always be called when the chart HTML element is removed as otherwise there might be additional resources such
        as event handlers remaining that will prevent the browser from properly releasing memory. */
        public remove(): void;
        /** Replaces the data already in the data cache with the given values. */
        public replaceData(data: BaseDataObjectBase, 
            /** the ID of the data source that will be updated. The default value is `default`. */
            sourceId?: string): void;
        /** Updates the chart settings but instead of merging some settings that are arrays or dictionaries (such as `data`)
        these collections are replaced completely. For example, this allows removal of series or value axis within TimeChart. */
        public replaceSettings(changes: BaseSettings): this;
        public restoreState(state: string, animate?: boolean): void;
        /** Decrements the suspend counter that was set using `suspendPaint()` method.
        
        This method also automatically schedules an async repaint. */
        public resumePaint(): void;
        /** Saves the current chart state as an image.
        @deprecated use `exportAsString` instead */
        public saveAsImage(type: string, dimensions: BaseExportDimensions, transparent: boolean): string;
        public saveState(): string;
        /** Suspends the animation of the chart until `resumePaint()` is called.
        
        This should be used when the chart element is hidden from the user to conserve browser resources.
        
        Note that if `suspendPaint()` is called multiple time then `resumePaint()` has to be called the same number of times. */
        public suspendPaint(): void;
        /** Gets the name of the chart the JavaScript object references. For example 'PieChart' or 'TimeChart'. This field is read-only. */
        public typeName: string;
        /** Re-evaluate data filters on next paint. */
        public updateFilters(): void;
        /** Updates the chart settings. Only the settings that have to be changed should be passed. Note that some arrays
        and dictionaries (such as `data`) are merged by the ID values - if instead they should be replaced, use
        [`replaceSettings()`](#doc_replaceSettings) method. */
        public updateSettings(changes: BaseSettings): this;
        /** Call when the container size has been changed to update the chart. */
        public updateSize(): this;
        /** Re-evaluate style for all objects on next paint. */
        public updateStyle(): void;
    }