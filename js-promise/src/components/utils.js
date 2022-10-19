
export function timer(name, time, result = true, log = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (log) console.log(`Timer (${name}): ${result ? 'resolved' : 'rejected'}`);
            if (result) resolve(`Result ${name}`);
            else reject(`Error ${name}`);
        }, time);
    });
}

