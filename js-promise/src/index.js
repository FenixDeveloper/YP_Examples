import "./index.scss";
import { timer } from "./components/utils";
import {
    testSyncCode,
    testASyncCode,
    testPromise,
    cases
} from "./components/tests";
import { initClipboard } from "./components/clipboard";
import {
    setupGlobalValidation,
    setupValidationBySchema
} from "./components/validation";

initClipboard({
    editor: 'clipboard',
    copy: 'copy',
    paste: 'paste'
});

/*setupValidationBySchema({
    'user-register': {
        'name': { type: 'text', min: 2, max: 20 },
        'age': { type: 'number', min: 18, max: 55 },
        'bio': { type: 'text', min: 0, max: 200 },
        'agree': { type: 'boolean', value: true }
    }
});*/

setupGlobalValidation();

window.tests = {
    timer,
    cases,
    testSyncCode,
    testASyncCode,
    testPromise
};