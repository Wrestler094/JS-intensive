export function countNewTime(time) {
    let newTime = time.slice();
    let resString = "";

    for (let i = 0; i < 3; i++) {
        newTime[i] = parseInt(newTime[i]);
    }

    if (newTime[2] === 59) {
        newTime[2] = 0;

        if (newTime[1] === 59) {
            newTime[1] = 0;
            newTime[0] += 1;
        } else {
            newTime[1] += 1;
        }
    } else {
        newTime[2] += 1;
    }

    for (let i = 0; i < 3; i++) {
        if (newTime[i] < 10) {
            resString += ("0" + newTime[i]);
        } else {
            resString += newTime[i];
        }

        if (i !== 2) {
            resString += ":";
        }
    }

    return resString;
}