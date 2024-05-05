var sparklines_tutorial;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@datagrok-libraries/tutorials/src/tutorial.js":
/*!********************************************************************!*\
  !*** ./node_modules/@datagrok-libraries/tutorials/src/tutorial.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tutorial: () => (/* binding */ Tutorial)
/* harmony export */ });
/* harmony import */ var datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! datagrok-api/grok */ "datagrok-api/grok");
/* harmony import */ var datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! datagrok-api/ui */ "datagrok-api/ui");
/* harmony import */ var datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var datagrok_api_dg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! datagrok-api/dg */ "datagrok-api/dg");
/* harmony import */ var datagrok_api_dg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(datagrok_api_dg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cash-dom */ "cash-dom");
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "rxjs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






/** A base class for tutorials */
class Tutorial extends datagrok_api_dg__WEBPACK_IMPORTED_MODULE_2__.Widget {
    constructor() {
        super(datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.div([], 'tutorials-track'));
        this.track = null;
        this.prerequisites = {};
        this.demoTable = 'demog.csv';
        // manualMode: boolean = false;
        this._t = null;
        this.imageUrl = '';
        this.nextLink = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.link('next', '', 'Go to the next tutorial', {
            classes: 'grok-tutorial-next',
            style: { display: 'none' },
        });
        this.mainHeader = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.div([], 'tutorials-main-header');
        this.header = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.h1('');
        this.headerDiv = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.divH([], 'tutorials-root-header');
        this.subheader = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.h3('');
        this.activity = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.div([], 'tutorials-root-description');
        this.status = false;
        this.closed = false;
        this.activeHints = [];
        this.progressDiv = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.divV([], 'tutorials-root-progress');
        this.progress = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.element('progress');
        this.progressSteps = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.divText('');
        this._onClose = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
        this.updateStatus();
        this.progress.max = 0;
        this.progress.value = 1;
        this.mainHeader.append(this.headerDiv, this.progressDiv);
        this.root.append(this.mainHeader);
        this.root.append(this.subheader);
        this.root.append(this.activity);
        this.root.append(this.nextLink);
    }
    get t() {
        return this._t;
    }
    set t(df) {
        this._t = df;
    }
    get url() {
        const removeSpaces = (s) => s.split(' ').join('');
        const root = window.location.origin;
        return `${root}/apps/tutorials/Tutorials/${removeSpaces(this.track.name)}/${removeSpaces(this.name)}`;
    }
    updateStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.dapi.userDataStorage.getValue(Tutorial.DATA_STORAGE_KEY, this.name);
            this.status = !!info;
        });
    }
    run() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            this._addHeader();
            const tutorials = (_a = this.track) === null || _a === void 0 ? void 0 : _a.tutorials;
            if (!tutorials) {
                console.error('The launched tutorial is not bound to any track.');
                return;
            }
            if (this.prerequisites.packages && Array.isArray(this.prerequisites.packages) &&
                this.prerequisites.packages.length > 0) {
                const missingPackages = [];
                for (const p of this.prerequisites.packages) {
                    const packages = yield datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.dapi.packages.list({ filter: `shortName = "${p}"` });
                    if (!packages.length || !(packages[0] instanceof datagrok_api_dg__WEBPACK_IMPORTED_MODULE_2__.Package))
                        missingPackages.push(p);
                }
                if (missingPackages.length) {
                    datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.shell.error(`Please install package${missingPackages.length === 1 ? '' : 's'} ${missingPackages.join(', ')} to start the tutorial`);
                    this.close();
                    return;
                }
            }
            const services = yield datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.dapi.admin.getServiceInfos();
            for (const [service, flag] of Object.entries(this.prerequisites)) {
                if (service in Tutorial.SERVICES && flag === true) {
                    const serviceAvailable = yield this.checkService(Tutorial.SERVICES[service], services);
                    if (!serviceAvailable)
                        return;
                }
            }
            const id = tutorials.indexOf(this);
            if (this.demoTable) {
                this._t = yield datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.data.getDemoTable(this.demoTable);
                datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.shell.addTableView(this._t);
            }
            this.closed = false;
            yield this._run();
            this.endSection();
            this.title('Congratulations!');
            this.describe('You have successfully completed this tutorial.');
            yield datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.dapi.userDataStorage.postValue(Tutorial.DATA_STORAGE_KEY, this.name, new Date().toUTCString());
            const statusMap = yield ((_b = this.track) === null || _b === void 0 ? void 0 : _b.updateStatus());
            function updateProgress(track) {
                const trackRoot = cash_dom__WEBPACK_IMPORTED_MODULE_3___default()(`.tutorials-track[data-name ='${track === null || track === void 0 ? void 0 : track.name}']`);
                trackRoot
                    .find(`.tutorials-card[data-name='${track.tutorials[id].name}']`)
                    .children('.tutorials-card-status').show();
                trackRoot
                    .find('progress')
                    .prop('value', (100 / track.tutorials.length * (track.completed)).toFixed());
                const progressNodes = cash_dom__WEBPACK_IMPORTED_MODULE_3___default()(`.tutorials-track[data-name ='${track === null || track === void 0 ? void 0 : track.name}'] > .tutorials-track-details`).children();
                progressNodes.first().text(trackRoot.find('progress').prop('value') + '% complete');
                progressNodes.last().text(String(track.completed + ' / ' + track.tutorials.length));
            }
            if (statusMap && Object.values(statusMap).every((v) => v)) {
                this.root.append(datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.div([
                    datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.divText(((_c = this.track) === null || _c === void 0 ? void 0 : _c.name) + 'is complete!'),
                    datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.bigButton('Complete', () => {
                        updateProgress(this.track);
                        this._closeAll();
                        this.clearRoot();
                        cash_dom__WEBPACK_IMPORTED_MODULE_3___default()('.tutorial').show();
                        cash_dom__WEBPACK_IMPORTED_MODULE_3___default()('#tutorial-child-node').html('');
                    }),
                ]));
            }
            else if (statusMap) {
                // Find the first uncompleted tutorial in the track. Give preference to the first tutorial
                // after the current one, if there are uncompleted tutorials both before and after it.
                let nextId = null;
                for (const [tutorialId, completed] of Object.entries(statusMap)) {
                    const numId = +tutorialId;
                    if (!completed) {
                        if (nextId === null)
                            nextId = numId;
                        else {
                            if (nextId < id && id < numId) {
                                nextId = numId;
                                break;
                            }
                        }
                    }
                }
                if (nextId === null) {
                    console.error('Corrupted status map.');
                    nextId = id + 1;
                }
                const tutorialNode = cash_dom__WEBPACK_IMPORTED_MODULE_3___default()('#tutorial-child-node');
                const nextTutorial = tutorials[nextId];
                this.root.append(datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.divV([
                    datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.divText(`Next "${nextTutorial.name}"`, { style: { margin: '5px 0' } }),
                    datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.divH([
                        datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.bigButton('Start', () => {
                            updateProgress(this.track);
                            this.clearRoot();
                            tutorialNode.html('');
                            tutorialNode.append(nextTutorial.root);
                            nextTutorial.run();
                        }),
                        datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.button('Cancel', () => {
                            updateProgress(this.track);
                            this._closeAll();
                            this.clearRoot();
                            cash_dom__WEBPACK_IMPORTED_MODULE_3___default()('.tutorial').show();
                            tutorialNode.html('');
                        }),
                    ], { style: { marginLeft: '-4px' } }),
                ]));
            }
        });
    }
    checkService(name, services) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!services)
                services = yield datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.dapi.admin.getServiceInfos();
            const service = services.find((si) => si.name === name);
            const serviceAvailable = service == null ? false : service.enabled && service.status === 'Running';
            if (!serviceAvailable) {
                datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.shell.error(`Service "${name}" not available. Please try running this tutorial later`);
                this.close();
            }
            return serviceAvailable;
        });
    }
    close() {
        this.clearRoot();
        this.closed = true;
        this.onClose.next();
        this._closeAll();
        cash_dom__WEBPACK_IMPORTED_MODULE_3___default()('.tutorial').show();
        cash_dom__WEBPACK_IMPORTED_MODULE_3___default()('#tutorial-child-node').html('');
    }
    _addHeader() {
        this.progressDiv.append(this.progress);
        this.progress.max = this.steps;
        this.progressSteps = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.divText(`Step: ${this.progress.value} of ${this.steps}`);
        this.progressDiv.append(this.progressSteps);
        // const manualMode = ui.button(ui.iconFA('forward'), () => {
        //   this.manualMode = !this.manualMode;
        //   $(manualMode.firstChild).toggleClass('fal fas');
        // }, 'Self-paced mode');
        // if (this.manualMode)
        //   $(manualMode.firstChild).toggleClass('fal fas');
        const closeTutorial = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.button(datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.iconFA('times-circle'), () => this.close());
        const linkIcon = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.button(datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.iconFA('link'), () => {
            navigator.clipboard.writeText(this.url);
            datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.shell.info('Link copied to clipboard');
        }, `Copy the tutorial link`);
        // manualMode.style.minWidth = '30px';
        closeTutorial.style.minWidth = '30px';
        this.header.textContent = this.name;
        this.headerDiv.append(datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.divH([this.header, linkIcon], { style: { alignItems: 'center' } }));
        // this.headerDiv.append(ui.div([manualMode, closeTutorial]));
        this.headerDiv.append(closeTutorial);
    }
    title(text, startSection = false) {
        const h3 = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.h3(text);
        if (this.currentSection) {
            if (startSection) {
                this.endSection();
                this.currentSection = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.div(datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.divH([h3], 'tutorials-section-header'));
                this.activity.append(this.currentSection);
            }
            else
                this.currentSection.append(h3);
        }
        else if (startSection) {
            this.currentSection = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.div(datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.divH([h3], 'tutorials-section-header'));
            this.activity.append(this.currentSection);
        }
        else
            this.activity.append(h3);
    }
    describe(text) {
        const div = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.div();
        div.innerHTML = text;
        if (this.currentSection)
            this.currentSection.append(div);
        else
            this.activity.append(div);
        div.scrollIntoView();
    }
    endSection() {
        if (!this.currentSection)
            return;
        this.currentSection.classList.add('tutorials-done-section');
        const chevron = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.iconFA('chevron-left');
        chevron.classList.add('tutorials-chevron');
        const s = this.currentSection;
        s.children[0].append(chevron);
        cash_dom__WEBPACK_IMPORTED_MODULE_3___default()(chevron).on('click', () => {
            cash_dom__WEBPACK_IMPORTED_MODULE_3___default()(chevron).toggleClass('tutorials-chevron-expanded');
            cash_dom__WEBPACK_IMPORTED_MODULE_3___default()(s).toggleClass('tutorials-done-section tutorials-done-section-expanded');
        });
        this.currentSection = undefined;
    }
    _placeHints(hint) {
        if (hint instanceof HTMLElement) {
            this.activeHints.push(hint);
            datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.hints.addHintIndicator(hint, false);
        }
        else if (Array.isArray(hint)) {
            this.activeHints.push(...hint);
            hint.forEach((h) => {
                if (h != null)
                    datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.hints.addHintIndicator(h, false);
            });
        }
    }
    _setHintVisibility(hints, visibility) {
        hints.forEach((hint) => {
            if (hint != null)
                hint.style.visibility = visibility ? 'visible' : 'hidden';
        });
    }
    _removeHints(hint) {
        if (hint instanceof HTMLElement)
            datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.hints.remove(hint);
        else if (Array.isArray(hint)) {
            hint.forEach((h) => {
                if (h != null)
                    datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.hints.remove(h);
            });
        }
    }
    action(instructions, completed, hint = null, description = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.closed)
                return;
            this.activeHints.length = 0;
            if (hint != null)
                this._placeHints(hint);
            const view = datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.shell.v;
            const hints = Array.from(document.getElementsByClassName('ui-hint-blob'));
            const sub = datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.events.onCurrentViewChanged.subscribe(() => {
                if (hint)
                    this._setHintVisibility(hints, datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.shell.v === view);
            });
            const instructionDiv = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.divText(instructions, 'grok-tutorial-entry-instruction');
            const descriptionDiv = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.divText('', { classes: 'grok-tutorial-step-description', style: {
                    margin: '0px 0px 0px 15px',
                } });
            const chevron = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.iconFA('chevron-left');
            chevron.classList.add('tutorials-chevron');
            const instructionIndicator = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.div([], 'grok-tutorial-entry-indicator');
            const entry = datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.divH([
                instructionIndicator,
                instructionDiv,
            ], 'grok-tutorial-entry');
            descriptionDiv.innerHTML = description;
            if (this.currentSection) {
                this.currentSection.append(entry);
                this.currentSection.append(descriptionDiv);
            }
            else {
                this.activity.append(entry);
                this.activity.append(descriptionDiv);
            }
            descriptionDiv.scrollIntoView();
            const currentStep = completed instanceof Promise ? completed : this.firstEvent(completed);
            yield currentStep;
            instructionDiv.classList.add('grok-tutorial-entry-success');
            instructionIndicator.classList.add('grok-tutorial-entry-indicator-success');
            if (hint != null)
                this._removeHints(hint);
            sub.unsubscribe();
            // if (this.manualMode && manual !== false) {
            //   const nextStepIcon = ui.iconFA('forward', undefined, 'Next step');
            //   nextStepIcon.className = 'grok-icon fas fa-forward tutorials-next-step';
            //   entry.append(nextStepIcon);
            //   await this.firstEvent(fromEvent(nextStepIcon, 'click'));
            //   nextStepIcon.remove();
            // }
            cash_dom__WEBPACK_IMPORTED_MODULE_3___default()(descriptionDiv).hide();
            if (description.length != 0)
                entry.append(chevron);
            cash_dom__WEBPACK_IMPORTED_MODULE_3___default()(chevron).on('click', () => {
                cash_dom__WEBPACK_IMPORTED_MODULE_3___default()(chevron).toggleClass('tutorials-chevron-expanded');
                cash_dom__WEBPACK_IMPORTED_MODULE_3___default()(descriptionDiv).toggle();
            });
            datagrok_api_ui__WEBPACK_IMPORTED_MODULE_1__.tooltip.bind(entry, description);
            this.progress.value++;
            this.progressSteps.innerHTML = '';
            this.progressSteps.append(`Step: ${this.progress.value} of ${this.steps}`);
        });
    }
    clearRoot() {
        this.progress.value = 1;
        cash_dom__WEBPACK_IMPORTED_MODULE_3___default()(this.root).children().each((idx, el) => el.classList.contains('tutorials-main-header') ?
            (cash_dom__WEBPACK_IMPORTED_MODULE_3___default()(this.headerDiv).empty(), cash_dom__WEBPACK_IMPORTED_MODULE_3___default()(this.progressDiv).empty()) : cash_dom__WEBPACK_IMPORTED_MODULE_3___default()(el).empty());
    }
    firstEvent(eventStream) {
        return new Promise((resolve, reject) => {
            const eventSub = eventStream.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.first)()).subscribe((_) => resolve());
            const closeSub = this.onClose.subscribe(() => {
                eventSub.unsubscribe();
                closeSub.unsubscribe();
                this._removeHints(this.activeHints);
                // eslint-disable-next-line
                reject();
            });
        }).catch((_) => console.log('Closing tutorial', this.name));
    }
    /** Closes all visual components that were added when working on tutorial, e.g., table views. */
    _closeAll() {
        var _a, _b;
        // TODO: Take into account dialogs and other views
        if ((_a = this.t) === null || _a === void 0 ? void 0 : _a.name) {
            (_b = datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.shell.tableView(this.t.name)) === null || _b === void 0 ? void 0 : _b.close();
            datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.shell.closeTable(this.t);
        }
    }
    get onClose() { return this._onClose; }
    getElement(element, selector, filter = null) {
        var _a;
        const nodes = cash_dom__WEBPACK_IMPORTED_MODULE_3___default()(element).find(selector);
        return (_a = (filter ? nodes.filter(filter) : nodes)[0]) !== null && _a !== void 0 ? _a : null;
    }
    get menuRoot() {
        return datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.shell.windows.simpleMode ? datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.shell.v.ribbonMenu.root : datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.shell.topMenu.root;
    }
    getMenuItem(name, horizontalMenu) {
        return this.getElement(this.menuRoot, `div.d4-menu-item.d4-menu-group${horizontalMenu ? '.d4-menu-item-horz' : ''}`, (idx, el) => Array.from(el.children).some((c) => c.textContent === name));
    }
    getSidebarHints(paneName, commandName) {
        var _a;
        const pane = datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.shell.sidebar.getPane(paneName);
        const command = (_a = this.getElement(pane.content, `div.d4-toggle-button[data-view=${commandName}]`)) !== null && _a !== void 0 ? _a : this.getElement(pane.content, 'div.d4-toggle-button', (idx, el) => el.textContent === commandName);
        return [pane.header, command];
    }
    /** Prompts the user to open a viewer of the specified type and returns it. */
    openPlot(name, check, description = '') {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Expand toolbox / accordion API coverage
            const getViewerIcon = (el) => {
                const selector = name == 'filters' ? 'i.fa-filter' : `i.svg-${name.replace(' ', '-')}`;
                return this.getElement(el, selector);
            };
            const view = datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.shell.v;
            let viewer;
            yield this.action(`Open ${name}`, datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.events.onViewerAdded.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.filter)((data) => {
                const found = check(data.args.viewer);
                if (found)
                    viewer = data.args.viewer;
                return found;
            })), view.type === 'TableView' ? getViewerIcon(view.toolboxPage.accordion.root) : null, description);
            return viewer;
        });
    }
    /** Prompts the user to put the specified value into a dialog input. */
    dlgInputAction(dlg, instructions, caption, value, description = '', historyHint = false, count = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            const inp = dlg.inputs.filter((input) => input.caption == caption)[count];
            if (inp == null)
                return;
            yield this.action(instructions, new rxjs__WEBPACK_IMPORTED_MODULE_4__.Observable((subscriber) => {
                if (inp.stringValue === value)
                    subscriber.next(inp.stringValue);
                inp.onChanged(() => {
                    if (inp.stringValue === value)
                        subscriber.next(inp.stringValue);
                });
            }), historyHint ? this.getElement(dlg.root, 'i.fa-history.d4-command-bar-icon') : inp.root, description);
        });
    }
    /** A helper method to access text inputs in a view. */
    textInpAction(root, instructions, caption, value, description = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const inputRoot = this.getElement(root, 'div.ui-input-root', (idx, inp) => { var _a; return ((_a = cash_dom__WEBPACK_IMPORTED_MODULE_3___default()(inp).find('label.ui-label.ui-input-label')[0]) === null || _a === void 0 ? void 0 : _a.textContent) === caption; });
            if (inputRoot == null)
                return;
            const input = this.getElement(inputRoot, 'input.ui-input-editor');
            const source = (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.fromEvent)(input, 'input').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((_) => input.value), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.filter)((val) => val === value));
            yield this.action(instructions, source, inputRoot, description);
        });
    }
    /** A helper method to access choice inputs in a view. */
    choiceInputAction(root, instructions, caption, value, description = '') {
        return __awaiter(this, void 0, void 0, function* () {
            let inputRoot = null;
            let select;
            cash_dom__WEBPACK_IMPORTED_MODULE_3___default()(root).find('.ui-input-root .ui-input-label span').each((idx, el) => {
                var _a;
                if (el.innerText === caption) {
                    inputRoot = (_a = el.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
                    if (inputRoot)
                        select = this.getElement(inputRoot, 'select');
                }
            });
            if (select == null)
                return;
            const source = (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.fromEvent)(select, 'change');
            yield this.action(instructions, select.value === value ?
                new Promise((resolve) => resolve()) :
                source.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((_) => select.value), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.filter)((v) => v === value)), inputRoot, description);
        });
    }
    ;
    prepareColumnInpAction(root, instructions, caption, columnName, description, inputSelector, valueSelector, intervalPeriod = 1000) {
        return __awaiter(this, void 0, void 0, function* () {
            const columnInput = this.getElement(root, inputSelector, (idx, inp) => { var _a; return ((_a = this.getElement(inp, 'label.ui-label.ui-input-label')) === null || _a === void 0 ? void 0 : _a.textContent) === caption; });
            if (columnInput == null)
                return;
            const source = (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.interval)(intervalPeriod).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((_) => { var _a; return (_a = this.getElement(columnInput, valueSelector)) === null || _a === void 0 ? void 0 : _a.textContent; }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.filter)((value) => value === columnName));
            return this.action(instructions, source, columnInput, description);
        });
    }
    /** Prompts the user to choose a particular column in a column input with the specified caption. */
    columnInpAction(root, instructions, caption, columnName, description = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prepareColumnInpAction(root, instructions, caption, columnName, description, 'div.ui-input-root.ui-input-column', 'div.d4-column-selector-column');
        });
    }
    ;
    /** Prompts the user to choose particular columns in a column input with the specified caption.
     * Column names should be given in the following format: `(3) AGE, HEIGHT, WEIGHT`. */
    columnsInpAction(root, instructions, caption, columnNames, description = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prepareColumnInpAction(root, instructions, caption, columnNames, description, 'div.ui-input-root.ui-input-columns', 'div.ui-input-editor > div.ui-input-column-names');
        });
    }
    ;
    buttonClickAction(root, instructions, caption, description = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const btn = this.getElement(root, 'button.ui-btn', (idx, btn) => btn.textContent === caption);
            if (btn == null)
                return;
            const source = (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.fromEvent)(btn, 'click');
            yield this.action(instructions, source, btn, description);
        });
    }
    ;
    /** Prompts the user to open a view of the specified type, waits for it to open and returns it. */
    openViewByType(instructions, type, hint = null, description = '') {
        return __awaiter(this, void 0, void 0, function* () {
            let view;
            // If the view was opened earlier, we find it and wait until it becomes current.
            for (const v of datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.shell.views) {
                if (v.type === type)
                    view = v;
            }
            yield this.action(instructions, view == null ?
                datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.events.onViewAdded.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.filter)((v) => {
                    if (v.type === type) {
                        view = v;
                        return true;
                    }
                    return false;
                })) : datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.shell.v.type === view.type ?
                new Promise((resolve, _) => resolve()) :
                datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.events.onCurrentViewChanged.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.filter)((_) => datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.shell.v.type === view.type)), hint, description);
            return view;
        });
    }
    /** Prompts the user to open a dialog with the specified title, waits for it to open and returns it. */
    openDialog(instructions, title, hint = null, description = '') {
        return __awaiter(this, void 0, void 0, function* () {
            let dialog;
            yield this.action(instructions, datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.events.onDialogShown.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.filter)((dlg) => {
                if (dlg.title === title) {
                    dialog = dlg;
                    return true;
                }
                return false;
            })), hint, description);
            return dialog;
        });
    }
    /** Prompts the user to open the "Add New Column" dialog, waits for it to open and returns it. */
    openAddNCDialog(instructions = 'Open the "Add New Column" dialog', description = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const addNCIcon = cash_dom__WEBPACK_IMPORTED_MODULE_3___default()('div.d4-ribbon-item').has('i.svg-add-new-column')[0];
            return yield this.openDialog(instructions, 'Add New Column', addNCIcon, description);
        });
    }
    /** Prompts the user to select a menu item in the context menu. */
    contextMenuAction(instructions, label, hint = null, description = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const commandClick = new Promise((resolve, reject) => {
                const sub = datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.events.onContextMenu.subscribe((data) => {
                    data.args.menu.onContextMenuItemClick.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.filter)((mi) => (new datagrok_api_dg__WEBPACK_IMPORTED_MODULE_2__.Menu(mi)).toString().toLowerCase() === label.toLowerCase()), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.first)()).subscribe((_) => {
                        sub.unsubscribe();
                        resolve();
                    });
                });
            });
            yield this.action(instructions, commandClick, hint, description);
        });
    }
}
Tutorial.DATA_STORAGE_KEY = 'tutorials';
Tutorial.SERVICES = {
    'jupyter': 'Jupyter',
    'grokCompute': 'GrokCompute',
    'grokConnect': 'Grok Connect',
    'h2o': 'H2O',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHV0b3JpYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0dXRvcmlhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssSUFBSSxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sS0FBSyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEMsT0FBTyxLQUFLLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLENBQUMsTUFBTSxVQUFVLENBQUM7QUFDekIsT0FBTyxFQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5RCxPQUFPLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUlsRCxpQ0FBaUM7QUFDakMsTUFBTSxPQUFnQixRQUFTLFNBQVEsRUFBRSxDQUFDLE1BQU07SUEwRDlDO1FBQ0UsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQXREdkMsVUFBSyxHQUFpQixJQUFJLENBQUM7UUFDM0Isa0JBQWEsR0FBMEIsRUFBRSxDQUFDO1FBQzFDLGNBQVMsR0FBVyxXQUFXLENBQUM7UUFFaEMsK0JBQStCO1FBQ3ZCLE9BQUUsR0FBd0IsSUFBSSxDQUFDO1FBZ0J2QyxhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLGFBQVEsR0FBc0IsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQzFDLEVBQUUsRUFDRix5QkFBeUIsRUFBRTtZQUN6QixPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLEtBQUssRUFBRSxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUM7U0FDekIsQ0FBQyxDQUFDO1FBQ0wsZUFBVSxHQUFtQixFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQ2pFLFdBQU0sR0FBdUIsRUFBRSxD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QyxJQUFJLEVBQUUsY0FBc0IsRUFBRTs7WUFDekUsTUFBTSxZQUFZLEdBQUcsSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQ3pELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQ3hDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsRUFDbEYsS0FBSyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTt3QkFDOUIsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUNsQixPQUFPLEVBQUUsQ0FBQztvQkFDWixDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ25FLENBQUM7S0FBQTs7QUFuakJNLHlCQUFnQixHQUFXLFdBQVcsQ0FBQztBQUN2QyxpQkFBUSxHQUFnQztJQUM3QyxTQUFTLEVBQUUsU0FBUztJQUNwQixhQUFhLEVBQUUsYUFBYTtJQUM1QixhQUFhLEVBQUUsY0FBYztJQUM3QixLQUFLLEVBQUUsS0FBSztDQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBncm9rIGZyb20gJ2RhdGFncm9rLWFwaS9ncm9rJztcbmltcG9ydCAqIGFzIHVpIGZyb20gJ2RhdGFncm9rLWFwaS91aSc7XG5pbXBvcnQgKiBhcyBERyBmcm9tICdkYXRhZ3Jvay1hcGkvZGcnO1xuaW1wb3J0ICQgZnJvbSAnY2FzaC1kb20nO1xuaW1wb3J0IHtmcm9tRXZlbnQsIGludGVydmFsLCBPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBmaXJzdCwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1RyYWNrfSBmcm9tICcuL3RyYWNrJztcblxuXG4vKiogQSBiYXNlIGNsYXNzIGZvciB0dXRvcmlhbHMgKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUdXRvcmlhbCBleHRlbmRzIERHLldpZGdldCB7XG4gIGFic3RyYWN0IGdldCBuYW1lKCk6IHN0cmluZztcbiAgYWJzdHJhY3QgZ2V0IGRlc2NyaXB0aW9uKCk6IHN0cmluZztcbiAgYWJzdHJhY3QgZ2V0IHN0ZXBzKCk6IG51bWJlcjtcblxuICB0cmFjazogVHJhY2sgfCBudWxsID0gbnVsbDtcbiAgcHJlcmVxdWlzaXRlczogVHV0b3JpYWxQcmVyZXF1aXNpdGVzID0ge307XG4gIGRlbW9UYWJsZTogc3RyaW5nID0gJ2RlbW9nLmNzdic7XG4gIGN1cnJlbnRTZWN0aW9uOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgLy8gbWFudWFsTW9kZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF90OiBERy5EYXRhRnJhbWUgfCBudWxsID0gbnVsbDtcblxuICBnZXQgdCgpOiBERy5EYXRhRnJhbWUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fdDtcbiAgfVxuXG4gIHNldCB0KGRmOiBERy5EYXRhRnJhbWUgfCBudWxsKSB7XG4gICAgdGhpcy5fdCA9IGRmO1xuICB9XG5cbiAgZ2V0IHVybCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHJlbW92ZVNwYWNlcyA9IChzOiBzdHJpbmcpID0+IHMuc3BsaXQoJyAnKS5qb2luKCcnKTtcbiAgICBjb25zdCByb290ID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbjtcbiAgICByZXR1cm4gYCR7cm9vdH0vYXBwcy90dXRvcmlhbHMvVHV0b3JpYWxzLyR7cmVtb3ZlU3BhY2VzKHRoaXMudHJhY2shLm5hbWUpfS8ke3JlbW92ZVNwYWNlcyh0aGlzLm5hbWUpfWA7XG4gIH1cblxuICBpbWFnZVVybDogc3RyaW5nID0gJyc7XG4gIG5leHRMaW5rOiBIVE1MQW5jaG9yRWxlbWVudCA9IHVpLmxpbmsoJ25leHQnLFxuICAgICcnLFxuICAgICdHbyB0byB0aGUgbmV4dCB0dXRvcmlhbCcsIHtcbiAgICAgIGNsYXNzZXM6ICdncm9rLXR1dG9yaWFsLW5leHQnLFxuICAgICAgc3R5bGU6IHtkaXNwbGF5OiAnbm9uZSd9LFxuICAgIH0pO1xuICBtYWluSGVhZGVyOiBIVE1MRGl2RWxlbWVudCA9IHVpLmRpdihbXSwgJ3R1dG9yaWFscy1tYWluLWhlYWRlcicpO1xuICBoZWFkZXI6IEhUTUxIZWFkaW5nRWxlbWVudCA9IHVpLmgxKCcnKTtcbiAgaGVhZGVyRGl2OiBIVE1MRGl2RWxlbWVudCA9IHVpLmRpdkgoW10sICd0dXRvcmlhbHMtcm9vdC1oZWFkZXInKTtcbiAgc3ViaGVhZGVyOiBIVE1MSGVhZGluZ0VsZW1lbnQgPSB1aS5oMygnJyk7XG4gIGFjdGl2aXR5OiBIVE1MRGl2RWxlbWVudCA9IHVpLmRpdihbXSwgJ3R1dG9yaWFscy1yb290LWRlc2NyaXB0aW9uJyk7XG4gIHN0YXR1czogYm9vbGVhbiA9IGZhbHNlO1xuICBjbG9zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgYWN0aXZlSGludHM6IEhUTUxFbGVtZW50W10gPSBbXTtcbiAgcHJvZ3Jlc3NEaXY6IEhUTUxEaXZFbGVtZW50ID0gdWkuZGl2VihbXSwgJ3R1dG9yaWFscy1yb290LXByb2dyZXNzJyk7XG4gIHByb2dyZXNzOiBIVE1MUHJvZ3Jlc3NFbGVtZW50ID0gdWkuZWxlbWVudCgncHJvZ3Jlc3MnKTtcbiAgcHJvZ3Jlc3NTdGVwczogSFRNTERpdkVsZW1lbnQgPSB1aS5kaXZUZXh0KCcnKTtcblxuICBzdGF0aWMgREFUQV9TVE9SQUdFX0tFWTogc3RyaW5nID0gJ3R1dG9yaWFscyc7XG4gIHN0YXRpYyBTRVJWSUNFUzoge1tzZXJ2aWNlOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICdqdXB5dGVyJzogJ0p1cHl0ZXInLFxuICAgICdncm9rQ29tcHV0ZSc6ICdHcm9rQ29tcHV0ZScsXG4gICAgJ2dyb2tDb25uZWN0JzogJ0dyb2sgQ29ubmVjdCcsXG4gICAgJ2gybyc6ICdIMk8nLFxuICB9O1xuXG4gIGFzeW5jIHVwZGF0ZVN0YXR1cygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBpbmZvID0gYXdhaXQgZ3Jvay5kYXBpLnVzZXJEYXRhU3RvcmFnZS5nZXRWYWx1ZShUdXRvcmlhbC5EQVRBX1NUT1JBR0VfS0VZLCB0aGlzLm5hbWUpO1xuICAgIHRoaXMuc3RhdHVzID0gISFpbmZvO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIodWkuZGl2KFtdLCAndHV0b3JpYWxzLXRyYWNrJykpO1xuICAgIHRoaXMudXBkYXRlU3RhdHVzKCk7XG4gICAgdGhpcy5wcm9ncmVzcy5tYXggPSAwO1xuICAgIHRoaXMucHJvZ3Jlc3MudmFsdWUgPSAxO1xuICAgIHRoaXMubWFpbkhlYWRlci5hcHBlbmQodGhpcy5oZWFkZXJEaXYsIHRoaXMucHJvZ3Jlc3NEaXYpO1xuICAgIHRoaXMucm9vdC5hcHBlbmQodGhpcy5tYWluSGVhZGVyKTtcbiAgICB0aGlzLnJvb3QuYXBwZW5kKHRoaXMuc3ViaGVhZGVyKTtcbiAgICB0aGlzLnJvb3QuYXBwZW5kKHRoaXMuYWN0aXZpdHkpO1xuICAgIHRoaXMucm9vdC5hcHBlbmQodGhpcy5uZXh0TGluayk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX3J1bigpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIGFzeW5jIHJ1bigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLl9hZGRIZWFkZXIoKTtcblxuICAgIGNvbnN0IHR1dG9yaWFscyA9IHRoaXMudHJhY2s/LnR1dG9yaWFscztcbiAgICBpZiAoIXR1dG9yaWFscykge1xuICAgICAgY29uc29sZS5lcnJvcignVGhlIGxhdW5jaGVkIHR1dG9yaWFsIGlzIG5vdCBib3VuZCB0byBhbnkgdHJhY2suJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJlcmVxdWlzaXRlcy5wYWNrYWdlcyAmJiBBcnJheS5pc0FycmF5KHRoaXMucHJlcmVxdWlzaXRlcy5wYWNrYWdlcykgJiZcbiAgICAgIHRoaXMucHJlcmVxdWlzaXRlcy5wYWNrYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBtaXNzaW5nUGFja2FnZXMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgcCBvZiB0aGlzLnByZXJlcXVpc2l0ZXMucGFja2FnZXMpIHtcbiAgICAgICAgY29uc3QgcGFja2FnZXMgPSBhd2FpdCBncm9rLmRhcGkucGFja2FnZXMubGlzdCh7ZmlsdGVyOiBgc2hvcnROYW1lID0gXCIke3B9XCJgfSk7XG4gICAgICAgIGlmICghcGFja2FnZXMubGVuZ3RoIHx8ICEocGFja2FnZXNbMF0gaW5zdGFuY2VvZiBERy5QYWNrYWdlKSlcbiAgICAgICAgICBtaXNzaW5nUGFja2FnZXMucHVzaChwKTtcbiAgICAgIH1cbiAgICAgIGlmIChtaXNzaW5nUGFja2FnZXMubGVuZ3RoKSB7XG4gICAgICAgIGdyb2suc2hlbGwuZXJyb3IoYFBsZWFzZSBpbnN0YWxsIHBhY2thZ2Uke21pc3NpbmdQYWNrYWdlcy5sZW5ndGggPT09IDEgPyAnJyA6ICdzJ30gJHtcbiAgICAgICAgICBtaXNzaW5nUGFja2FnZXMuam9pbignLCAnKX0gdG8gc3RhcnQgdGhlIHR1dG9yaWFsYCk7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNlcnZpY2VzID0gYXdhaXQgZ3Jvay5kYXBpLmFkbWluLmdldFNlcnZpY2VJbmZvcygpO1xuXG4gICAgZm9yIChjb25zdCBbc2VydmljZSwgZmxhZ10gb2YgT2JqZWN0LmVudHJpZXModGhpcy5wcmVyZXF1aXNpdGVzKSkge1xuICAgICAgaWYgKHNlcnZpY2UgaW4gVHV0b3JpYWwuU0VSVklDRVMgJiYgZmxhZyA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBzZXJ2aWNlQXZhaWxhYmxlID0gYXdhaXQgdGhpcy5jaGVja1NlcnZpY2UoVHV0b3JpYWwuU0VSVklDRVNbc2VydmljZV0sIHNlcnZpY2VzKTtcbiAgICAgICAgaWYgKCFzZXJ2aWNlQXZhaWxhYmxlKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpZCA9IHR1dG9yaWFscy5pbmRleE9mKHRoaXMpO1xuXG4gICAgaWYgKHRoaXMuZGVtb1RhYmxlKSB7XG4gICAgICB0aGlzLl90ID0gYXdhaXQgZ3Jvay5kYXRhLmdldERlbW9UYWJsZSh0aGlzLmRlbW9UYWJsZSk7XG4gICAgICBncm9rLnNoZWxsLmFkZFRhYmxlVmlldyh0aGlzLl90KTtcbiAgICB9XG4gICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICBhd2FpdCB0aGlzLl9ydW4oKTtcbiAgICB0aGlzLmVuZFNlY3Rpb24oKTtcblxuICAgIHRoaXMudGl0bGUoJ0NvbmdyYXR1bGF0aW9ucyEnKTtcbiAgICB0aGlzLmRlc2NyaWJlKCdZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgY29tcGxldGVkIHRoaXMgdHV0b3JpYWwuJyk7XG5cbiAgICBhd2FpdCBncm9rLmRhcGkudXNlckRhdGFTdG9yYWdlLnBvc3RWYWx1ZShUdXRvcmlhbC5EQVRBX1NUT1JBR0VfS0VZLCB0aGlzLm5hbWUsIG5ldyBEYXRlKCkudG9VVENTdHJpbmcoKSk7XG4gICAgY29uc3Qgc3RhdHVzTWFwID0gYXdhaXQgdGhpcy50cmFjaz8udXBkYXRlU3RhdHVzKCk7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQcm9ncmVzcyh0cmFjazphbnkpIHtcbiAgICAgIGNvbnN0IHRyYWNrUm9vdCA9ICQoYC50dXRvcmlhbHMtdHJhY2tbZGF0YS1uYW1lID0nJHt0cmFjaz8ubmFtZX0nXWApO1xuICAgICAgdHJhY2tSb290XG4gICAgICAgIC5maW5kKGAudHV0b3JpYWxzLWNhcmRbZGF0YS1uYW1lPScke3RyYWNrLnR1dG9yaWFsc1tpZF0ubmFtZX0nXWApXG4gICAgICAgIC5jaGlsZHJlbignLnR1dG9yaWFscy1jYXJkLXN0YXR1cycpLnNob3coKTtcbiAgICAgIHRyYWNrUm9vdFxuICAgICAgICAuZmluZCgncHJvZ3Jlc3MnKVxuICAgICAgICAucHJvcCgndmFsdWUnLCAoMTAwL3RyYWNrLnR1dG9yaWFscy5sZW5ndGgqKHRyYWNrLmNvbXBsZXRlZCkpLnRvRml4ZWQoKSk7XG4gICAgICBjb25zdCBwcm9ncmVzc05vZGVzID0gJChgLnR1dG9yaWFscy10cmFja1tkYXRhLW5hbWUgPScke3RyYWNrPy5uYW1lfSddID4gLnR1dG9yaWFscy10cmFjay1kZXRhaWxzYCkuY2hpbGRyZW4oKTtcbiAgICAgIHByb2dyZXNzTm9kZXMuZmlyc3QoKS50ZXh0KHRyYWNrUm9vdC5maW5kKCdwcm9ncmVzcycpLnByb3AoJ3ZhbHVlJykrJyUgY29tcGxldGUnKTtcbiAgICAgIHByb2dyZXNzTm9kZXMubGFzdCgpLnRleHQoU3RyaW5nKHRyYWNrLmNvbXBsZXRlZCsnIC8gJyt0cmFjay50dXRvcmlhbHMubGVuZ3RoKSk7XG4gICAgfVxuXG4gICAgaWYgKHN0YXR1c01hcCAmJiBPYmplY3QudmFsdWVzKHN0YXR1c01hcCkuZXZlcnkoKHYpID0+IHYpKSB7XG4gICAgICB0aGlzLnJvb3QuYXBwZW5kKHVpLmRpdihbXG4gICAgICAgIHVpLmRpdlRleHQodGhpcy50cmFjaz8ubmFtZSsnaXMgY29tcGxldGUhJyksXG4gICAgICAgIHVpLmJpZ0J1dHRvbignQ29tcGxldGUnLCAoKT0+e1xuICAgICAgICAgIHVwZGF0ZVByb2dyZXNzKHRoaXMudHJhY2spO1xuICAgICAgICAgIHRoaXMuX2Nsb3NlQWxsKCk7XG4gICAgICAgICAgdGhpcy5jbGVhclJvb3QoKTtcbiAgICAgICAgICAkKCcudHV0b3JpYWwnKS5zaG93KCk7XG4gICAgICAgICAgJCgnI3R1dG9yaWFsLWNoaWxkLW5vZGUnKS5odG1sKCcnKTtcbiAgICAgICAgfSksXG4gICAgICBdKSk7XG4gICAgfSBlbHNlIGlmIChzdGF0dXNNYXApIHtcbiAgICAgIC8vIEZpbmQgdGhlIGZpcnN0IHVuY29tcGxldGVkIHR1dG9yaWFsIGluIHRoZSB0cmFjay4gR2l2ZSBwcmVmZXJlbmNlIHRvIHRoZSBmaXJzdCB0dXRvcmlhbFxuICAgICAgLy8gYWZ0ZXIgdGhlIGN1cnJlbnQgb25lLCBpZiB0aGVyZSBhcmUgdW5jb21wbGV0ZWQgdHV0b3JpYWxzIGJvdGggYmVmb3JlIGFuZCBhZnRlciBpdC5cbiAgICAgIGxldCBuZXh0SWQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICAgICAgZm9yIChjb25zdCBbdHV0b3JpYWxJZCwgY29tcGxldGVkXSBvZiBPYmplY3QuZW50cmllcyhzdGF0dXNNYXApKSB7XG4gICAgICAgIGNvbnN0IG51bUlkID0gK3R1dG9yaWFsSWQ7XG4gICAgICAgIGlmICghY29tcGxldGVkKSB7XG4gICAgICAgICAgaWYgKG5leHRJZCA9PT0gbnVsbClcbiAgICAgICAgICAgIG5leHRJZCA9IG51bUlkO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKG5leHRJZCA8IGlkICYmIGlkIDwgbnVtSWQpIHtcbiAgICAgICAgICAgICAgbmV4dElkID0gbnVtSWQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG5leHRJZCA9PT0gbnVsbCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdDb3JydXB0ZWQgc3RhdHVzIG1hcC4nKTtcbiAgICAgICAgbmV4dElkID0gaWQgKyAxO1xuICAgICAgfVxuICAgICAgY29uc3QgdHV0b3JpYWxOb2RlID0gJCgnI3R1dG9yaWFsLWNoaWxkLW5vZGUnKTtcbiAgICAgIGNvbnN0IG5leHRUdXRvcmlhbCA9IHR1dG9yaWFsc1tuZXh0SWRdO1xuICAgICAgdGhpcy5yb290LmFwcGVuZCh1aS5kaXZWKFtcbiAgICAgICAgdWkuZGl2VGV4dChgTmV4dCBcIiR7bmV4dFR1dG9yaWFsLm5hbWV9XCJgLCB7c3R5bGU6IHttYXJnaW46ICc1cHggMCd9fSksXG4gICAgICAgIHVpLmRpdkgoW1xuICAgICAgICAgIHVpLmJpZ0J1dHRvbignU3RhcnQnLCAoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVQcm9ncmVzcyh0aGlzLnRyYWNrKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJSb290KCk7XG4gICAgICAgICAgICB0dXRvcmlhbE5vZGUuaHRtbCgnJyk7XG4gICAgICAgICAgICB0dXRvcmlhbE5vZGUuYXBwZW5kKG5leHRUdXRvcmlhbC5yb290KTtcbiAgICAgICAgICAgIG5leHRUdXRvcmlhbC5ydW4oKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB1aS5idXR0b24oJ0NhbmNlbCcsICgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZVByb2dyZXNzKHRoaXMudHJhY2spO1xuICAgICAgICAgICAgdGhpcy5fY2xvc2VBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJSb290KCk7XG4gICAgICAgICAgICAkKCcudHV0b3JpYWwnKS5zaG93KCk7XG4gICAgICAgICAgICB0dXRvcmlhbE5vZGUuaHRtbCgnJyk7XG4gICAgICAgICAgfSksXG4gICAgICAgIF0sIHtzdHlsZToge21hcmdpbkxlZnQ6ICctNHB4J319KSxcbiAgICAgIF0pKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjaGVja1NlcnZpY2UobmFtZTogc3RyaW5nLCBzZXJ2aWNlcz86IERHLlNlcnZpY2VJbmZvW10pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAoIXNlcnZpY2VzKVxuICAgICAgc2VydmljZXMgPSBhd2FpdCBncm9rLmRhcGkuYWRtaW4uZ2V0U2VydmljZUluZm9zKCk7XG4gICAgY29uc3Qgc2VydmljZSA9IHNlcnZpY2VzLmZpbmQoKHNpKSA9PiBzaS5uYW1lID09PSBuYW1lKTtcbiAgICBjb25zdCBzZXJ2aWNlQXZhaWxhYmxlID0gc2VydmljZSA9PSBudWxsID8gZmFsc2UgOiBzZXJ2aWNlLmVuYWJsZWQgJiYgc2VydmljZS5zdGF0dXMgPT09ICdSdW5uaW5nJztcbiAgICBpZiAoIXNlcnZpY2VBdmFpbGFibGUpIHtcbiAgICAgIGdyb2suc2hlbGwuZXJyb3IoYFNlcnZpY2UgXCIke25hbWV9XCIgbm90IGF2YWlsYWJsZS4gUGxlYXNlIHRyeSBydW5uaW5nIHRoaXMgdHV0b3JpYWwgbGF0ZXJgKTtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNlcnZpY2VBdmFpbGFibGU7XG4gIH1cblxuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFyUm9vdCgpO1xuICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICB0aGlzLm9uQ2xvc2UubmV4dCgpO1xuICAgIHRoaXMuX2Nsb3NlQWxsKCk7XG4gICAgJCgnLnR1dG9yaWFsJykuc2hvdygpO1xuICAgICQoJyN0dXRvcmlhbC1jaGlsZC1ub2RlJykuaHRtbCgnJyk7XG4gIH1cblxuICBfYWRkSGVhZGVyKCk6IHZvaWQge1xuICAgIHRoaXMucHJvZ3Jlc3NEaXYuYXBwZW5kKHRoaXMucHJvZ3Jlc3MpO1xuICAgIHRoaXMucHJvZ3Jlc3MubWF4ID0gdGhpcy5zdGVwcztcblxuICAgIHRoaXMucHJvZ3Jlc3NTdGVwcyA9IHVpLmRpdlRleHQoYFN0ZXA6ICR7dGhpcy5wcm9ncmVzcy52YWx1ZX0gb2YgJHt0aGlzLnN0ZXBzfWApO1xuICAgIHRoaXMucHJvZ3Jlc3NEaXYuYXBwZW5kKHRoaXMucHJvZ3Jlc3NTdGVwcyk7XG5cbiAgICAvLyBjb25zdCBtYW51YWxNb2RlID0gdWkuYnV0dG9uKHVpLmljb25GQSgnZm9yd2FyZCcpLCAoKSA9PiB7XG4gICAgLy8gICB0aGlzLm1hbnVhbE1vZGUgPSAhdGhpcy5tYW51YWxNb2RlO1xuICAgIC8vICAgJChtYW51YWxNb2RlLmZpcnN0Q2hpbGQpLnRvZ2dsZUNsYXNzKCdmYWwgZmFzJyk7XG4gICAgLy8gfSwgJ1NlbGYtcGFjZWQgbW9kZScpO1xuICAgIC8vIGlmICh0aGlzLm1hbnVhbE1vZGUpXG4gICAgLy8gICAkKG1hbnVhbE1vZGUuZmlyc3RDaGlsZCkudG9nZ2xlQ2xhc3MoJ2ZhbCBmYXMnKTtcbiAgICBjb25zdCBjbG9zZVR1dG9yaWFsID0gdWkuYnV0dG9uKHVpLmljb25GQSgndGltZXMtY2lyY2xlJyksICgpID0+IHRoaXMuY2xvc2UoKSk7XG5cbiAgICBjb25zdCBsaW5rSWNvbiA9IHVpLmJ1dHRvbih1aS5pY29uRkEoJ2xpbmsnKSwgKCkgPT4ge1xuICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGhpcy51cmwpO1xuICAgICAgZ3Jvay5zaGVsbC5pbmZvKCdMaW5rIGNvcGllZCB0byBjbGlwYm9hcmQnKTtcbiAgICB9LCBgQ29weSB0aGUgdHV0b3JpYWwgbGlua2ApO1xuXG4gICAgLy8gbWFudWFsTW9kZS5zdHlsZS5taW5XaWR0aCA9ICczMHB4JztcbiAgICBjbG9zZVR1dG9yaWFsLnN0eWxlLm1pbldpZHRoID0gJzMwcHgnO1xuICAgIHRoaXMuaGVhZGVyLnRleHRDb250ZW50ID0gdGhpcy5uYW1lO1xuICAgIHRoaXMuaGVhZGVyRGl2LmFwcGVuZCh1aS5kaXZIKFt0aGlzLmhlYWRlciwgbGlua0ljb25dLCB7c3R5bGU6IHthbGlnbkl0ZW1zOiAnY2VudGVyJ319KSk7XG4gICAgLy8gdGhpcy5oZWFkZXJEaXYuYXBwZW5kKHVpLmRpdihbbWFudWFsTW9kZSwgY2xvc2VUdXRvcmlhbF0pKTtcbiAgICB0aGlzLmhlYWRlckRpdi5hcHBlbmQoY2xvc2VUdXRvcmlhbCk7XG4gIH1cblxuICB0aXRsZSh0ZXh0OiBzdHJpbmcsIHN0YXJ0U2VjdGlvbjogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgY29uc3QgaDMgPSB1aS5oMyh0ZXh0KTtcbiAgICBpZiAodGhpcy5jdXJyZW50U2VjdGlvbikge1xuICAgICAgaWYgKHN0YXJ0U2VjdGlvbikge1xuICAgICAgICB0aGlzLmVuZFNlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U2VjdGlvbiA9IHVpLmRpdih1aS5kaXZIKFtoM10sICd0dXRvcmlhbHMtc2VjdGlvbi1oZWFkZXInKSk7XG4gICAgICAgIHRoaXMuYWN0aXZpdHkuYXBwZW5kKHRoaXMuY3VycmVudFNlY3Rpb24pO1xuICAgICAgfSBlbHNlXG4gICAgICAgIHRoaXMuY3VycmVudFNlY3Rpb24uYXBwZW5kKGgzKTtcbiAgICB9IGVsc2UgaWYgKHN0YXJ0U2VjdGlvbikge1xuICAgICAgdGhpcy5jdXJyZW50U2VjdGlvbiA9IHVpLmRpdih1aS5kaXZIKFtoM10sICd0dXRvcmlhbHMtc2VjdGlvbi1oZWFkZXInKSk7XG4gICAgICB0aGlzLmFjdGl2aXR5LmFwcGVuZCh0aGlzLmN1cnJlbnRTZWN0aW9uKTtcbiAgICB9IGVsc2VcbiAgICAgIHRoaXMuYWN0aXZpdHkuYXBwZW5kKGgzKTtcbiAgfVxuXG4gIGRlc2NyaWJlKHRleHQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGRpdiA9IHVpLmRpdigpO1xuICAgIGRpdi5pbm5lckhUTUwgPSB0ZXh0O1xuICAgIGlmICh0aGlzLmN1cnJlbnRTZWN0aW9uKVxuICAgICAgdGhpcy5jdXJyZW50U2VjdGlvbi5hcHBlbmQoZGl2KTtcbiAgICBlbHNlXG4gICAgICB0aGlzLmFjdGl2aXR5LmFwcGVuZChkaXYpO1xuICAgIGRpdi5zY3JvbGxJbnRvVmlldygpO1xuICB9XG5cbiAgZW5kU2VjdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuY3VycmVudFNlY3Rpb24pIHJldHVybjtcbiAgICB0aGlzLmN1cnJlbnRTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ3R1dG9yaWFscy1kb25lLXNlY3Rpb24nKTtcbiAgICBjb25zdCBjaGV2cm9uID0gdWkuaWNvbkZBKCdjaGV2cm9uLWxlZnQnKTtcbiAgICBjaGV2cm9uLmNsYXNzTGlzdC5hZGQoJ3R1dG9yaWFscy1jaGV2cm9uJyk7XG4gICAgY29uc3QgcyA9IHRoaXMuY3VycmVudFNlY3Rpb247XG4gICAgcy5jaGlsZHJlblswXS5hcHBlbmQoY2hldnJvbik7XG4gICAgJChjaGV2cm9uKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAkKGNoZXZyb24pLnRvZ2dsZUNsYXNzKCd0dXRvcmlhbHMtY2hldnJvbi1leHBhbmRlZCcpO1xuICAgICAgJChzKS50b2dnbGVDbGFzcygndHV0b3JpYWxzLWRvbmUtc2VjdGlvbiB0dXRvcmlhbHMtZG9uZS1zZWN0aW9uLWV4cGFuZGVkJyk7XG4gICAgfSk7XG4gICAgdGhpcy5jdXJyZW50U2VjdGlvbiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIF9wbGFjZUhpbnRzKGhpbnQ6IEhUTUxFbGVtZW50IHwgSFRNTEVsZW1lbnRbXSkge1xuICAgIGlmIChoaW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuYWN0aXZlSGludHMucHVzaChoaW50KTtcbiAgICAgIHVpLmhpbnRzLmFkZEhpbnRJbmRpY2F0b3IoaGludCwgZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShoaW50KSkge1xuICAgICAgdGhpcy5hY3RpdmVIaW50cy5wdXNoKC4uLmhpbnQpO1xuICAgICAgaGludC5mb3JFYWNoKChoKSA9PiB7XG4gICAgICAgIGlmIChoICE9IG51bGwpXG4gICAgICAgICAgdWkuaGludHMuYWRkSGludEluZGljYXRvcihoLCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBfc2V0SGludFZpc2liaWxpdHkoaGludHM6IEhUTUxFbGVtZW50W10sIHZpc2liaWxpdHk6IGJvb2xlYW4pIHtcbiAgICBoaW50cy5mb3JFYWNoKChoaW50KSA9PiB7XG4gICAgICBpZiAoaGludCAhPSBudWxsKVxuICAgICAgICBoaW50LnN0eWxlLnZpc2liaWxpdHkgPSB2aXNpYmlsaXR5ID8gJ3Zpc2libGUnIDogJ2hpZGRlbic7XG4gICAgfSk7XG4gIH1cblxuICBfcmVtb3ZlSGludHMoaGludDogSFRNTEVsZW1lbnQgfCBIVE1MRWxlbWVudFtdKSB7XG4gICAgaWYgKGhpbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudClcbiAgICAgIHVpLmhpbnRzLnJlbW92ZShoaW50KTtcbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGhpbnQpKSB7XG4gICAgICBoaW50LmZvckVhY2goKGgpID0+IHtcbiAgICAgICAgaWYgKGggIT0gbnVsbClcbiAgICAgICAgICB1aS5oaW50cy5yZW1vdmUoaCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBhY3Rpb24oaW5zdHJ1Y3Rpb25zOiBzdHJpbmcsIGNvbXBsZXRlZDogT2JzZXJ2YWJsZTxhbnk+IHwgUHJvbWlzZTx2b2lkPixcbiAgICBoaW50OiBIVE1MRWxlbWVudCB8IEhUTUxFbGVtZW50W10gfCBudWxsID0gbnVsbCwgZGVzY3JpcHRpb246IHN0cmluZyA9ICcnKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuY2xvc2VkKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdGhpcy5hY3RpdmVIaW50cy5sZW5ndGggPSAwO1xuICAgIGlmIChoaW50ICE9IG51bGwpXG4gICAgICB0aGlzLl9wbGFjZUhpbnRzKGhpbnQpO1xuXG4gICAgY29uc3QgdmlldyA9IGdyb2suc2hlbGwudjtcbiAgICBjb25zdCBoaW50cyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndWktaGludC1ibG9iJykpIGFzIEhUTUxFbGVtZW50W107XG4gICAgY29uc3Qgc3ViID0gZ3Jvay5ldmVudHMub25DdXJyZW50Vmlld0NoYW5nZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmIChoaW50KVxuICAgICAgICB0aGlzLl9zZXRIaW50VmlzaWJpbGl0eShoaW50cywgZ3Jvay5zaGVsbC52ID09PSB2aWV3KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGluc3RydWN0aW9uRGl2ID0gdWkuZGl2VGV4dChpbnN0cnVjdGlvbnMsICdncm9rLXR1dG9yaWFsLWVudHJ5LWluc3RydWN0aW9uJyk7XG4gICAgY29uc3QgZGVzY3JpcHRpb25EaXYgPSB1aS5kaXZUZXh0KCcnLCB7Y2xhc3NlczogJ2dyb2stdHV0b3JpYWwtc3RlcC1kZXNjcmlwdGlvbicsIHN0eWxlOiB7XG4gICAgICBtYXJnaW46ICcwcHggMHB4IDBweCAxNXB4JyxcbiAgICB9fSk7XG4gICAgY29uc3QgY2hldnJvbiA9IHVpLmljb25GQSgnY2hldnJvbi1sZWZ0Jyk7XG4gICAgY2hldnJvbi5jbGFzc0xpc3QuYWRkKCd0dXRvcmlhbHMtY2hldnJvbicpO1xuICAgIGNvbnN0IGluc3RydWN0aW9uSW5kaWNhdG9yID0gdWkuZGl2KFtdLCAnZ3Jvay10dXRvcmlhbC1lbnRyeS1pbmRpY2F0b3InKTtcbiAgICBjb25zdCBlbnRyeSA9IHVpLmRpdkgoW1xuICAgICAgaW5zdHJ1Y3Rpb25JbmRpY2F0b3IsXG4gICAgICBpbnN0cnVjdGlvbkRpdixcbiAgICBdLCAnZ3Jvay10dXRvcmlhbC1lbnRyeScpO1xuICAgIGRlc2NyaXB0aW9uRGl2LmlubmVySFRNTCA9IGRlc2NyaXB0aW9uO1xuXG4gICAgaWYgKHRoaXMuY3VycmVudFNlY3Rpb24pIHtcbiAgICAgIHRoaXMuY3VycmVudFNlY3Rpb24uYXBwZW5kKGVudHJ5KTtcbiAgICAgIHRoaXMuY3VycmVudFNlY3Rpb24uYXBwZW5kKGRlc2NyaXB0aW9uRGl2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3Rpdml0eS5hcHBlbmQoZW50cnkpO1xuICAgICAgdGhpcy5hY3Rpdml0eS5hcHBlbmQoZGVzY3JpcHRpb25EaXYpO1xuICAgIH1cbiAgICBkZXNjcmlwdGlvbkRpdi5zY3JvbGxJbnRvVmlldygpO1xuXG4gICAgY29uc3QgY3VycmVudFN0ZXAgPSBjb21wbGV0ZWQgaW5zdGFuY2VvZiBQcm9taXNlID8gY29tcGxldGVkIDogdGhpcy5maXJzdEV2ZW50KGNvbXBsZXRlZCk7XG4gICAgYXdhaXQgY3VycmVudFN0ZXA7XG5cbiAgICBpbnN0cnVjdGlvbkRpdi5jbGFzc0xpc3QuYWRkKCdncm9rLXR1dG9yaWFsLWVudHJ5LXN1Y2Nlc3MnKTtcbiAgICBpbnN0cnVjdGlvbkluZGljYXRvci5jbGFzc0xpc3QuYWRkKCdncm9rLXR1dG9yaWFsLWVudHJ5LWluZGljYXRvci1zdWNjZXNzJyk7XG5cbiAgICBpZiAoaGludCAhPSBudWxsKVxuICAgICAgdGhpcy5fcmVtb3ZlSGludHMoaGludCk7XG4gICAgc3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICAvLyBpZiAodGhpcy5tYW51YWxNb2RlICYmIG1hbnVhbCAhPT0gZmFsc2UpIHtcbiAgICAvLyAgIGNvbnN0IG5leHRTdGVwSWNvbiA9IHVpLmljb25GQSgnZm9yd2FyZCcsIHVuZGVmaW5lZCwgJ05leHQgc3RlcCcpO1xuICAgIC8vICAgbmV4dFN0ZXBJY29uLmNsYXNzTmFtZSA9ICdncm9rLWljb24gZmFzIGZhLWZvcndhcmQgdHV0b3JpYWxzLW5leHQtc3RlcCc7XG4gICAgLy8gICBlbnRyeS5hcHBlbmQobmV4dFN0ZXBJY29uKTtcbiAgICAvLyAgIGF3YWl0IHRoaXMuZmlyc3RFdmVudChmcm9tRXZlbnQobmV4dFN0ZXBJY29uLCAnY2xpY2snKSk7XG4gICAgLy8gICBuZXh0U3RlcEljb24ucmVtb3ZlKCk7XG4gICAgLy8gfVxuXG4gICAgJChkZXNjcmlwdGlvbkRpdikuaGlkZSgpO1xuICAgIGlmIChkZXNjcmlwdGlvbi5sZW5ndGggIT0gMClcbiAgICAgIGVudHJ5LmFwcGVuZChjaGV2cm9uKTtcblxuICAgICQoY2hldnJvbikub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgJChjaGV2cm9uKS50b2dnbGVDbGFzcygndHV0b3JpYWxzLWNoZXZyb24tZXhwYW5kZWQnKTtcbiAgICAgICQoZGVzY3JpcHRpb25EaXYpLnRvZ2dsZSgpO1xuICAgIH0pO1xuICAgIHVpLnRvb2x0aXAuYmluZChlbnRyeSwgZGVzY3JpcHRpb24pO1xuXG4gICAgdGhpcy5wcm9ncmVzcy52YWx1ZSsrO1xuICAgIHRoaXMucHJvZ3Jlc3NTdGVwcy5pbm5lckhUTUwgPSAnJztcbiAgICB0aGlzLnByb2dyZXNzU3RlcHMuYXBwZW5kKGBTdGVwOiAke3RoaXMucHJvZ3Jlc3MudmFsdWV9IG9mICR7dGhpcy5zdGVwc31gKTtcbiAgfVxuXG4gIGNsZWFyUm9vdCgpOiB2b2lkIHtcbiAgICB0aGlzLnByb2dyZXNzLnZhbHVlID0gMTtcbiAgICAkKHRoaXMucm9vdCkuY2hpbGRyZW4oKS5lYWNoKChpZHgsIGVsKSA9PiBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3R1dG9yaWFscy1tYWluLWhlYWRlcicpID9cbiAgICAgICgkKHRoaXMuaGVhZGVyRGl2KS5lbXB0eSgpLCAkKHRoaXMucHJvZ3Jlc3NEaXYpLmVtcHR5KCkpIDogJChlbCkuZW1wdHkoKSk7XG4gIH1cblxuICBmaXJzdEV2ZW50KGV2ZW50U3RyZWFtOiBPYnNlcnZhYmxlPGFueT4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgZXZlbnRTdWIgPSBldmVudFN0cmVhbS5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSgoXzogYW55KSA9PiByZXNvbHZlKCkpO1xuICAgICAgY29uc3QgY2xvc2VTdWIgPSB0aGlzLm9uQ2xvc2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgZXZlbnRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgY2xvc2VTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5fcmVtb3ZlSGludHModGhpcy5hY3RpdmVIaW50cyk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICByZWplY3QoKTtcbiAgICAgIH0pO1xuICAgIH0pLmNhdGNoKChfKSA9PiBjb25zb2xlLmxvZygnQ2xvc2luZyB0dXRvcmlhbCcsIHRoaXMubmFtZSkpO1xuICB9XG5cbiAgLyoqIENsb3NlcyBhbGwgdmlzdWFsIGNvbXBvbmVudHMgdGhhdCB3ZXJlIGFkZGVkIHdoZW4gd29ya2luZyBvbiB0dXRvcmlhbCwgZS5nLiwgdGFibGUgdmlld3MuICovXG4gIF9jbG9zZUFsbCgpOiB2b2lkIHtcbiAgICAvLyBUT0RPOiBUYWtlIGludG8gYWNjb3VudCBkaWFsb2dzIGFuZCBvdGhlciB2aWV3c1xuICAgIGlmICh0aGlzLnQ/Lm5hbWUpIHtcbiAgICAgIGdyb2suc2hlbGwudGFibGVWaWV3KHRoaXMudC5uYW1lKT8uY2xvc2UoKTtcbiAgICAgIGdyb2suc2hlbGwuY2xvc2VUYWJsZSh0aGlzLnQpO1xuICAgIH1cbiAgfVxuXG4gIF9vbkNsb3NlOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcbiAgZ2V0IG9uQ2xvc2UoKSB7cmV0dXJuIHRoaXMuX29uQ2xvc2U7fVxuXG4gIHByaXZhdGUgZ2V0RWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCwgc2VsZWN0b3I6IHN0cmluZyxcbiAgICBmaWx0ZXI6ICgoaWR4OiBudW1iZXIsIGVsOiBFbGVtZW50KSA9PiBib29sZWFuKSB8IG51bGwgPSBudWxsKTogRWxlTG9vc2UgfCBudWxsIHtcbiAgICBjb25zdCBub2RlcyA9ICQoZWxlbWVudCkuZmluZChzZWxlY3Rvcik7XG4gICAgcmV0dXJuIChmaWx0ZXIgPyBub2Rlcy5maWx0ZXIoZmlsdGVyKSA6IG5vZGVzKVswXSA/PyBudWxsO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBtZW51Um9vdCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIGdyb2suc2hlbGwud2luZG93cy5zaW1wbGVNb2RlID8gZ3Jvay5zaGVsbC52LnJpYmJvbk1lbnUucm9vdCA6IGdyb2suc2hlbGwudG9wTWVudS5yb290O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldE1lbnVJdGVtKG5hbWU6IHN0cmluZywgaG9yaXpvbnRhbE1lbnU/OiBib29sZWFuKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50KHRoaXMubWVudVJvb3QsIGBkaXYuZDQtbWVudS1pdGVtLmQ0LW1lbnUtZ3JvdXAke2hvcml6b250YWxNZW51ID8gJy5kNC1tZW51LWl0ZW0taG9yeicgOiAnJ31gLFxuICAgICAgKGlkeCwgZWwpID0+IEFycmF5LmZyb20oZWwuY2hpbGRyZW4pLnNvbWUoKGMpID0+IGMudGV4dENvbnRlbnQgPT09IG5hbWUpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTaWRlYmFySGludHMocGFuZU5hbWU6IHN0cmluZywgY29tbWFuZE5hbWU6IHN0cmluZyk6IEhUTUxFbGVtZW50W10ge1xuICAgIGNvbnN0IHBhbmUgPSBncm9rLnNoZWxsLnNpZGViYXIuZ2V0UGFuZShwYW5lTmFtZSk7XG4gICAgY29uc3QgY29tbWFuZCA9IHRoaXMuZ2V0RWxlbWVudChwYW5lLmNvbnRlbnQsIGBkaXYuZDQtdG9nZ2xlLWJ1dHRvbltkYXRhLXZpZXc9JHtjb21tYW5kTmFtZX1dYCkgPz9cbiAgICAgIHRoaXMuZ2V0RWxlbWVudChwYW5lLmNvbnRlbnQsICdkaXYuZDQtdG9nZ2xlLWJ1dHRvbicsIChpZHgsIGVsKSA9PiBlbC50ZXh0Q29udGVudCA9PT0gY29tbWFuZE5hbWUpITtcbiAgICByZXR1cm4gW3BhbmUuaGVhZGVyLCBjb21tYW5kXTtcbiAgfVxuXG4gIC8qKiBQcm9tcHRzIHRoZSB1c2VyIHRvIG9wZW4gYSB2aWV3ZXIgb2YgdGhlIHNwZWNpZmllZCB0eXBlIGFuZCByZXR1cm5zIGl0LiAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgb3BlblBsb3QobmFtZTogc3RyaW5nLCBjaGVjazogKHZpZXdlcjogREcuVmlld2VyKSA9PiBib29sZWFuLFxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSAnJyk6IFByb21pc2U8REcuVmlld2VyPiB7XG4gICAgLy8gVE9ETzogRXhwYW5kIHRvb2xib3ggLyBhY2NvcmRpb24gQVBJIGNvdmVyYWdlXG4gICAgY29uc3QgZ2V0Vmlld2VySWNvbiA9IChlbDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gbmFtZSA9PSAnZmlsdGVycycgPyAnaS5mYS1maWx0ZXInIDogYGkuc3ZnLSR7bmFtZS5yZXBsYWNlKCcgJywgJy0nKX1gO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudChlbCwgc2VsZWN0b3IpO1xuICAgIH07XG4gICAgY29uc3QgdmlldyA9IGdyb2suc2hlbGwudiBhcyBERy5WaWV3O1xuICAgIGxldCB2aWV3ZXI6IERHLlZpZXdlcjtcblxuICAgIGF3YWl0IHRoaXMuYWN0aW9uKGBPcGVuICR7bmFtZX1gLFxuICAgICAgZ3Jvay5ldmVudHMub25WaWV3ZXJBZGRlZC5waXBlKGZpbHRlcigoZGF0YTogREcuRXZlbnREYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvdW5kID0gY2hlY2soZGF0YS5hcmdzLnZpZXdlcik7XG4gICAgICAgIGlmIChmb3VuZClcbiAgICAgICAgICB2aWV3ZXIgPSBkYXRhLmFyZ3Mudmlld2VyO1xuXG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgIH0pKSxcbiAgICAgIHZpZXcudHlwZSA9PT0gJ1RhYmxlVmlldycgPyBnZXRWaWV3ZXJJY29uKCg8REcuVGFibGVWaWV3PnZpZXcpLnRvb2xib3hQYWdlLmFjY29yZGlvbi5yb290KSA6IG51bGwsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICApO1xuXG4gICAgcmV0dXJuIHZpZXdlciE7XG4gIH1cblxuICAvKiogUHJvbXB0cyB0aGUgdXNlciB0byBwdXQgdGhlIHNwZWNpZmllZCB2YWx1ZSBpbnRvIGEgZGlhbG9nIGlucHV0LiAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgZGxnSW5wdXRBY3Rpb24oZGxnOiBERy5EaWFsb2csIGluc3RydWN0aW9uczogc3RyaW5nLCBjYXB0aW9uOiBzdHJpbmcsXG4gICAgdmFsdWU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyA9ICcnLCBoaXN0b3J5SGludDogYm9vbGVhbiA9IGZhbHNlLCBjb3VudDogbnVtYmVyID0gMCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGlucCA9IGRsZy5pbnB1dHMuZmlsdGVyKChpbnB1dDogREcuSW5wdXRCYXNlKSA9PiBpbnB1dC5jYXB0aW9uID09IGNhcHRpb24pW2NvdW50XTtcbiAgICBpZiAoaW5wID09IG51bGwpIHJldHVybjtcbiAgICBhd2FpdCB0aGlzLmFjdGlvbihpbnN0cnVjdGlvbnMsXG4gICAgICBuZXcgT2JzZXJ2YWJsZSgoc3Vic2NyaWJlcjogYW55KSA9PiB7XG4gICAgICAgIGlmIChpbnAuc3RyaW5nVmFsdWUgPT09IHZhbHVlKSBzdWJzY3JpYmVyLm5leHQoaW5wLnN0cmluZ1ZhbHVlKTtcbiAgICAgICAgaW5wLm9uQ2hhbmdlZCgoKSA9PiB7XG4gICAgICAgICAgaWYgKGlucC5zdHJpbmdWYWx1ZSA9PT0gdmFsdWUpIHN1YnNjcmliZXIubmV4dChpbnAuc3RyaW5nVmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pLFxuICAgICAgaGlzdG9yeUhpbnQgPyB0aGlzLmdldEVsZW1lbnQoZGxnLnJvb3QsICdpLmZhLWhpc3RvcnkuZDQtY29tbWFuZC1iYXItaWNvbicpIDogaW5wLnJvb3QsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICApO1xuICB9XG5cbiAgLyoqIEEgaGVscGVyIG1ldGhvZCB0byBhY2Nlc3MgdGV4dCBpbnB1dHMgaW4gYSB2aWV3LiAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgdGV4dElucEFjdGlvbihyb290OiBIVE1MRWxlbWVudCwgaW5zdHJ1Y3Rpb25zOiBzdHJpbmcsXG4gICAgY2FwdGlvbjogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gJycpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBpbnB1dFJvb3QgPSB0aGlzLmdldEVsZW1lbnQocm9vdCwgJ2Rpdi51aS1pbnB1dC1yb290JywgKGlkeCwgaW5wKSA9PlxuICAgICAgJChpbnApLmZpbmQoJ2xhYmVsLnVpLWxhYmVsLnVpLWlucHV0LWxhYmVsJylbMF0/LnRleHRDb250ZW50ID09PSBjYXB0aW9uKTtcbiAgICBpZiAoaW5wdXRSb290ID09IG51bGwpIHJldHVybjtcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuZ2V0RWxlbWVudChpbnB1dFJvb3QsICdpbnB1dC51aS1pbnB1dC1lZGl0b3InKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNvbnN0IHNvdXJjZSA9IGZyb21FdmVudChpbnB1dCwgJ2lucHV0JykucGlwZShtYXAoKF8pID0+IGlucHV0LnZhbHVlKSwgZmlsdGVyKCh2YWwpID0+IHZhbCA9PT0gdmFsdWUpKTtcbiAgICBhd2FpdCB0aGlzLmFjdGlvbihpbnN0cnVjdGlvbnMsIHNvdXJjZSwgaW5wdXRSb290LCBkZXNjcmlwdGlvbik7XG4gIH1cblxuICAvKiogQSBoZWxwZXIgbWV0aG9kIHRvIGFjY2VzcyBjaG9pY2UgaW5wdXRzIGluIGEgdmlldy4gKi9cbiAgcHJvdGVjdGVkIGFzeW5jIGNob2ljZUlucHV0QWN0aW9uKHJvb3Q6IEhUTUxFbGVtZW50LCBpbnN0cnVjdGlvbnM6IHN0cmluZyxcbiAgICBjYXB0aW9uOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSAnJykge1xuICAgIGxldCBpbnB1dFJvb3QgPSBudWxsO1xuICAgIGxldCBzZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50O1xuICAgICQocm9vdCkuZmluZCgnLnVpLWlucHV0LXJvb3QgLnVpLWlucHV0LWxhYmVsIHNwYW4nKS5lYWNoKChpZHgsIGVsKSA9PiB7XG4gICAgICBpZiAoZWwuaW5uZXJUZXh0ID09PSBjYXB0aW9uKSB7XG4gICAgICAgIGlucHV0Um9vdCA9IGVsLnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGlmIChpbnB1dFJvb3QpXG4gICAgICAgICAgc2VsZWN0ID0gdGhpcy5nZXRFbGVtZW50KGlucHV0Um9vdCwgJ3NlbGVjdCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChzZWxlY3QhID09IG51bGwpIHJldHVybjtcbiAgICBjb25zdCBzb3VyY2UgPSBmcm9tRXZlbnQoc2VsZWN0LCAnY2hhbmdlJyk7XG4gICAgYXdhaXQgdGhpcy5hY3Rpb24oaW5zdHJ1Y3Rpb25zLCBzZWxlY3QudmFsdWUgPT09IHZhbHVlID9cbiAgICAgIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiByZXNvbHZlKCkpIDpcbiAgICAgIHNvdXJjZS5waXBlKG1hcCgoXykgPT4gc2VsZWN0LnZhbHVlKSwgZmlsdGVyKCh2OiBzdHJpbmcpID0+IHYgPT09IHZhbHVlKSksXG4gICAgaW5wdXRSb290LCBkZXNjcmlwdGlvbik7XG4gIH07XG5cbiAgcHJpdmF0ZSBhc3luYyBwcmVwYXJlQ29sdW1uSW5wQWN0aW9uKHJvb3Q6IEhUTUxFbGVtZW50LCBpbnN0cnVjdGlvbnM6IHN0cmluZywgY2FwdGlvbjogc3RyaW5nLCBjb2x1bW5OYW1lOiBzdHJpbmcsXG4gICAgZGVzY3JpcHRpb246IHN0cmluZywgaW5wdXRTZWxlY3Rvcjogc3RyaW5nLCB2YWx1ZVNlbGVjdG9yOiBzdHJpbmcsIGludGVydmFsUGVyaW9kOiBudW1iZXIgPSAxMDAwKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgY29sdW1uSW5wdXQgPSB0aGlzLmdldEVsZW1lbnQocm9vdCwgaW5wdXRTZWxlY3RvciwgKGlkeCwgaW5wKSA9PlxuICAgICAgdGhpcy5nZXRFbGVtZW50KGlucCBhcyBIVE1MRWxlbWVudCwgJ2xhYmVsLnVpLWxhYmVsLnVpLWlucHV0LWxhYmVsJyk/LnRleHRDb250ZW50ID09PSBjYXB0aW9uKTtcbiAgICBpZiAoY29sdW1uSW5wdXQgPT0gbnVsbCkgcmV0dXJuO1xuICAgIGNvbnN0IHNvdXJjZSA9IGludGVydmFsKGludGVydmFsUGVyaW9kKS5waXBlKFxuICAgICAgbWFwKChfKSA9PiB0aGlzLmdldEVsZW1lbnQoY29sdW1uSW5wdXQsIHZhbHVlU2VsZWN0b3IpPy50ZXh0Q29udGVudCksXG4gICAgICBmaWx0ZXIoKHZhbHVlKSA9PiB2YWx1ZSA9PT0gY29sdW1uTmFtZSkpO1xuICAgIHJldHVybiB0aGlzLmFjdGlvbihpbnN0cnVjdGlvbnMsIHNvdXJjZSwgY29sdW1uSW5wdXQsIGRlc2NyaXB0aW9uKTtcbiAgfVxuXG4gIC8qKiBQcm9tcHRzIHRoZSB1c2VyIHRvIGNob29zZSBhIHBhcnRpY3VsYXIgY29sdW1uIGluIGEgY29sdW1uIGlucHV0IHdpdGggdGhlIHNwZWNpZmllZCBjYXB0aW9uLiAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgY29sdW1uSW5wQWN0aW9uKHJvb3Q6IEhUTUxFbGVtZW50LCBpbnN0cnVjdGlvbnM6IHN0cmluZyxcbiAgICBjYXB0aW9uOiBzdHJpbmcsIGNvbHVtbk5hbWU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyA9ICcnKSB7XG4gICAgcmV0dXJuIHRoaXMucHJlcGFyZUNvbHVtbklucEFjdGlvbihyb290LCBpbnN0cnVjdGlvbnMsIGNhcHRpb24sIGNvbHVtbk5hbWUsIGRlc2NyaXB0aW9uLFxuICAgICAgJ2Rpdi51aS1pbnB1dC1yb290LnVpLWlucHV0LWNvbHVtbicsICdkaXYuZDQtY29sdW1uLXNlbGVjdG9yLWNvbHVtbicpO1xuICB9O1xuXG4gIC8qKiBQcm9tcHRzIHRoZSB1c2VyIHRvIGNob29zZSBwYXJ0aWN1bGFyIGNvbHVtbnMgaW4gYSBjb2x1bW4gaW5wdXQgd2l0aCB0aGUgc3BlY2lmaWVkIGNhcHRpb24uXG4gICAqIENvbHVtbiBuYW1lcyBzaG91bGQgYmUgZ2l2ZW4gaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6IGAoMykgQUdFLCBIRUlHSFQsIFdFSUdIVGAuICovXG4gIHByb3RlY3RlZCBhc3luYyBjb2x1bW5zSW5wQWN0aW9uKHJvb3Q6IEhUTUxFbGVtZW50LCBpbnN0cnVjdGlvbnM6IHN0cmluZyxcbiAgICBjYXB0aW9uOiBzdHJpbmcsIGNvbHVtbk5hbWVzOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSAnJykge1xuICAgIHJldHVybiB0aGlzLnByZXBhcmVDb2x1bW5JbnBBY3Rpb24ocm9vdCwgaW5zdHJ1Y3Rpb25zLCBjYXB0aW9uLCBjb2x1bW5OYW1lcywgZGVzY3JpcHRpb24sXG4gICAgICAnZGl2LnVpLWlucHV0LXJvb3QudWktaW5wdXQtY29sdW1ucycsICdkaXYudWktaW5wdXQtZWRpdG9yID4gZGl2LnVpLWlucHV0LWNvbHVtbi1uYW1lcycpO1xuICB9O1xuXG4gIHByb3RlY3RlZCBhc3luYyBidXR0b25DbGlja0FjdGlvbihyb290OiBIVE1MRWxlbWVudCwgaW5zdHJ1Y3Rpb25zOiBzdHJpbmcsXG4gICAgY2FwdGlvbjogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gJycpIHtcbiAgICBjb25zdCBidG4gPSB0aGlzLmdldEVsZW1lbnQocm9vdCwgJ2J1dHRvbi51aS1idG4nLCAoaWR4LCBidG4pID0+IGJ0bi50ZXh0Q29udGVudCA9PT0gY2FwdGlvbik7XG4gICAgaWYgKGJ0biA9PSBudWxsKSByZXR1cm47XG4gICAgY29uc3Qgc291cmNlID0gZnJvbUV2ZW50KGJ0biwgJ2NsaWNrJyk7XG4gICAgYXdhaXQgdGhpcy5hY3Rpb24oaW5zdHJ1Y3Rpb25zLCBzb3VyY2UsIGJ0biwgZGVzY3JpcHRpb24pO1xuICB9O1xuXG4gIC8qKiBQcm9tcHRzIHRoZSB1c2VyIHRvIG9wZW4gYSB2aWV3IG9mIHRoZSBzcGVjaWZpZWQgdHlwZSwgd2FpdHMgZm9yIGl0IHRvIG9wZW4gYW5kIHJldHVybnMgaXQuICovXG4gIHByb3RlY3RlZCBhc3luYyBvcGVuVmlld0J5VHlwZShpbnN0cnVjdGlvbnM6IHN0cmluZywgdHlwZTogc3RyaW5nLFxuICAgIGhpbnQ6IEhUTUxFbGVtZW50IHwgSFRNTEVsZW1lbnRbXSB8IG51bGwgPSBudWxsLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gJycpOiBQcm9taXNlPERHLlZpZXc+IHtcbiAgICBsZXQgdmlldzogREcuVmlldztcblxuICAgIC8vIElmIHRoZSB2aWV3IHdhcyBvcGVuZWQgZWFybGllciwgd2UgZmluZCBpdCBhbmQgd2FpdCB1bnRpbCBpdCBiZWNvbWVzIGN1cnJlbnQuXG4gICAgZm9yIChjb25zdCB2IG9mIGdyb2suc2hlbGwudmlld3MpIHtcbiAgICAgIGlmICh2LnR5cGUgPT09IHR5cGUpXG4gICAgICAgIHZpZXcgPSB2O1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMuYWN0aW9uKGluc3RydWN0aW9ucywgdmlldyEgPT0gbnVsbCA/XG4gICAgICBncm9rLmV2ZW50cy5vblZpZXdBZGRlZC5waXBlKGZpbHRlcigodikgPT4ge1xuICAgICAgICBpZiAodi50eXBlID09PSB0eXBlKSB7XG4gICAgICAgICAgdmlldyA9IHY7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSkpIDogZ3Jvay5zaGVsbC52LnR5cGUgPT09IHZpZXcudHlwZSA/XG4gICAgICAgIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCBfKSA9PiByZXNvbHZlKCkpIDpcbiAgICAgICAgZ3Jvay5ldmVudHMub25DdXJyZW50Vmlld0NoYW5nZWQucGlwZShmaWx0ZXIoKF8pID0+IGdyb2suc2hlbGwudi50eXBlID09PSB2aWV3LnR5cGUpKSxcbiAgICBoaW50LCBkZXNjcmlwdGlvbik7XG5cbiAgICByZXR1cm4gdmlldyE7XG4gIH1cblxuICAvKiogUHJvbXB0cyB0aGUgdXNlciB0byBvcGVuIGEgZGlhbG9nIHdpdGggdGhlIHNwZWNpZmllZCB0aXRsZSwgd2FpdHMgZm9yIGl0IHRvIG9wZW4gYW5kIHJldHVybnMgaXQuICovXG4gIHByb3RlY3RlZCBhc3luYyBvcGVuRGlhbG9nKGluc3RydWN0aW9uczogc3RyaW5nLCB0aXRsZTogc3RyaW5nLFxuICAgIGhpbnQ6IEhUTUxFbGVtZW50IHwgSFRNTEVsZW1lbnRbXSB8IG51bGwgPSBudWxsLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gJycpOiBQcm9taXNlPERHLkRpYWxvZz4ge1xuICAgIGxldCBkaWFsb2c6IERHLkRpYWxvZztcblxuICAgIGF3YWl0IHRoaXMuYWN0aW9uKGluc3RydWN0aW9ucywgZ3Jvay5ldmVudHMub25EaWFsb2dTaG93bi5waXBlKGZpbHRlcigoZGxnKSA9PiB7XG4gICAgICBpZiAoZGxnLnRpdGxlID09PSB0aXRsZSkge1xuICAgICAgICBkaWFsb2cgPSBkbGc7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pKSwgaGludCwgZGVzY3JpcHRpb24pO1xuXG4gICAgcmV0dXJuIGRpYWxvZyE7XG4gIH1cblxuICAvKiogUHJvbXB0cyB0aGUgdXNlciB0byBvcGVuIHRoZSBcIkFkZCBOZXcgQ29sdW1uXCIgZGlhbG9nLCB3YWl0cyBmb3IgaXQgdG8gb3BlbiBhbmQgcmV0dXJucyBpdC4gKi9cbiAgcHJvdGVjdGVkIGFzeW5jIG9wZW5BZGROQ0RpYWxvZyhpbnN0cnVjdGlvbnM6IHN0cmluZyA9ICdPcGVuIHRoZSBcIkFkZCBOZXcgQ29sdW1uXCIgZGlhbG9nJyxcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nID0gJycpOiBQcm9taXNlPERHLkRpYWxvZz4ge1xuICAgIGNvbnN0IGFkZE5DSWNvbiA9ICQoJ2Rpdi5kNC1yaWJib24taXRlbScpLmhhcygnaS5zdmctYWRkLW5ldy1jb2x1bW4nKVswXTtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5vcGVuRGlhbG9nKGluc3RydWN0aW9ucywgJ0FkZCBOZXcgQ29sdW1uJywgYWRkTkNJY29uLCBkZXNjcmlwdGlvbik7XG4gIH1cblxuICAvKiogUHJvbXB0cyB0aGUgdXNlciB0byBzZWxlY3QgYSBtZW51IGl0ZW0gaW4gdGhlIGNvbnRleHQgbWVudS4gKi9cbiAgcHJvdGVjdGVkIGFzeW5jIGNvbnRleHRNZW51QWN0aW9uKGluc3RydWN0aW9uczogc3RyaW5nLCBsYWJlbDogc3RyaW5nLFxuICAgIGhpbnQ6IEhUTUxFbGVtZW50IHwgSFRNTEVsZW1lbnRbXSB8IG51bGwgPSBudWxsLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gJycpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBjb21tYW5kQ2xpY2sgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBzdWIgPSBncm9rLmV2ZW50cy5vbkNvbnRleHRNZW51LnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICBkYXRhLmFyZ3MubWVudS5vbkNvbnRleHRNZW51SXRlbUNsaWNrLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKChtaSkgPT4gKG5ldyBERy5NZW51KG1pKSkudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpID09PSBsYWJlbC50b0xvd2VyQ2FzZSgpKSxcbiAgICAgICAgICBmaXJzdCgpKS5zdWJzY3JpYmUoKF86IGFueSkgPT4ge1xuICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGF3YWl0IHRoaXMuYWN0aW9uKGluc3RydWN0aW9ucywgY29tbWFuZENsaWNrLCBoaW50LCBkZXNjcmlwdGlvbik7XG4gIH1cbn1cblxudHlwZSBFbGVMb29zZSA9IEhUTUxFbGVtZW50ICYgRWxlbWVudCAmIE5vZGU7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHV0b3JpYWxQcmVyZXF1aXNpdGVzIHtcbiAgcGFja2FnZXM/OiBzdHJpbmdbXSxcbiAganVweXRlcj86IGJvb2xlYW4sXG4gIGdyb2tDb21wdXRlPzogYm9vbGVhbixcbiAgZ3Jva0Nvbm5lY3Q/OiBib29sZWFuLFxuICBoMm8/OiBib29sZWFuLFxufVxuIl19

/***/ }),

/***/ "./src/tutorials/sparklines.ts":
/*!*************************************!*\
  !*** ./src/tutorials/sparklines.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SparklinesTutorial: () => (/* binding */ SparklinesTutorial)
/* harmony export */ });
/* harmony import */ var datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! datagrok-api/grok */ "datagrok-api/grok");
/* harmony import */ var datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _datagrok_libraries_tutorials_src_tutorial__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @datagrok-libraries/tutorials/src/tutorial */ "./node_modules/@datagrok-libraries/tutorials/src/tutorial.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class SparklinesTutorial extends _datagrok_libraries_tutorials_src_tutorial__WEBPACK_IMPORTED_MODULE_2__.Tutorial {
    constructor() {
        super(...arguments);
        this.helpUrl = 'https://datagrok.ai/help/visualize/viewers/grid#summary-columns';
    }
    get name() {
        return 'Sparklines';
    }
    get description() {
        return 'Learn how to use charts to visualize numerical values within a row';
    }
    get steps() {
        return 3;
    }
    _run() {
        return __awaiter(this, void 0, void 0, function* () {
            this.describe('In this tutorial, we will learn how to add a column with sparklines in the grid.');
            this.header.textContent = this.name;
            const view = datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.shell.tableView(this.t.name);
            const grid = view.grid;
            // Step 1
            const sparklinesMenuElement = document.querySelector('[d4-name="Sparklines"]');
            const instructionsAdd = 'Add the Sparklines column to the table';
            const descriptionAdd = 'Right click any cell and select <b>Add</b> > <b>Summary Columns</b> > <b>Sparklines</b>';
            yield this.action(instructionsAdd, onClickPromise(sparklinesMenuElement), null, descriptionAdd);
            // Step 2
            const burgerMenuElement = document.querySelector('div[column_name=""] > i.grok-icon.grok-font-icon-menu');
            const inscructionsRename = 'Now, let\'s give the <b>sparklines</b> column a better name.';
            const descriptionRename = '&#8226; Hover over the column\'s header and click the <b>Hamburger</b> icon.\n' +
                '&#8226; Under <b>Actions</b>, select <b>Rename…</b>  A dialog opens.\n' +
                '&#8226; In the dialog, enter <b>“H/W”</b> and click <b>OK</b>.';
            yield this.action(inscructionsRename, this.t.onColumnNameChanged.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(() => this.t.currentCol.name === 'H/W')), burgerMenuElement, descriptionRename);
            // Step 3
            const okButton = document.querySelector('.d4-dialogue-footer .ui-btn-ok');
            const instructionsChangeCols = 'Now, let\'s change the columns selected for sparklines.';
            const descriptionChangeCols = '&#8226; On the column\'s header, click the <b>Hamburger</b> icon.\n' +
                '&#8226; Next to <b>Columns</b>, click the dropdown and deselect the <b>AGE</b> column.';
            yield this.action(instructionsChangeCols, onClickPromise(okButton), burgerMenuElement, descriptionChangeCols);
            // Function to create a Promise that resolves when the element is clicked
            function onClickPromise(element) {
                return new Promise((resolve) => {
                    element.addEventListener('click', () => {
                        resolve();
                    });
                });
            }
        });
    }
}


/***/ }),

/***/ "cash-dom":
/*!********************!*\
  !*** external "$" ***!
  \********************/
/***/ ((module) => {

module.exports = $;

/***/ }),

/***/ "datagrok-api/dg":
/*!*********************!*\
  !*** external "DG" ***!
  \*********************/
/***/ ((module) => {

module.exports = DG;

/***/ }),

/***/ "datagrok-api/grok":
/*!***********************!*\
  !*** external "grok" ***!
  \***********************/
/***/ ((module) => {

module.exports = grok;

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = rxjs;

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs.operators" ***!
  \*********************************/
/***/ ((module) => {

module.exports = rxjs.operators;

/***/ }),

/***/ "datagrok-api/ui":
/*!*********************!*\
  !*** external "ui" ***!
  \*********************/
/***/ ((module) => {

module.exports = ui;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/package.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _package: () => (/* binding */ _package),
/* harmony export */   info: () => (/* binding */ info),
/* harmony export */   registerTutorial: () => (/* binding */ registerTutorial)
/* harmony export */ });
/* harmony import */ var datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! datagrok-api/grok */ "datagrok-api/grok");
/* harmony import */ var datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var datagrok_api_dg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! datagrok-api/dg */ "datagrok-api/dg");
/* harmony import */ var datagrok_api_dg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(datagrok_api_dg__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tutorials_sparklines__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tutorials/sparklines */ "./src/tutorials/sparklines.ts");
/* Do not change these import lines to match external modules in webpack configuration */



const _package = new datagrok_api_dg__WEBPACK_IMPORTED_MODULE_1__.Package();
//name: info
function info() {
    datagrok_api_grok__WEBPACK_IMPORTED_MODULE_0__.shell.info(_package.webRoot);
}
//tags: tutorial
//meta.name: Sparklines Tutorial
//meta.track: Test Track
//description: This tutorial teaches users how to add a column with sparklines in the grid
//output: object
function registerTutorial() {
    return new _tutorials_sparklines__WEBPACK_IMPORTED_MODULE_2__.SparklinesTutorial();
}

})();

sparklines_tutorial = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=package.js.map