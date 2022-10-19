import {timer} from "./utils";

export const cases = {
    'good': [
        ['A', 300],
        ['B', 200],
        ['C', 100]
    ],
    'bad': [
        ['A', 300],
        ['B', 200, false],
        ['C', 100]
    ],
    'bad2': [
        ['A', 300],
        ['B', 200],
        ['C', 100, false]
    ]
};

function syncTest(arr, cb) {
    for (let item of arr) cb(item);
}

function asyncTest(arr, cb) {
    for (let item of arr) timer(item, item * 100, true, false).then(() => cb(item));
}

export function testSyncCode() {
    console.group('sync test');
    console.log('step 1');
    syncTest([2, 3, 4], n => console.log(`step ${n}`));
    console.log('step 5');
    console.groupEnd();
}

export function testASyncCode() {
    console.group('async test');
    console.log('step 1');
    asyncTest([2, 3, 4], n => console.log(`step ${n}`));
    console.log('step 5');
    console.groupEnd();
}

export function testPromise(method = 'all', tests) {
    Promise[method](tests.map((args) => timer(...args)))
        .then(result => console.log('then: ', result))
        .catch(err => console.log('catch: ', err))
        .finally(() => console.log('finally.'));
}