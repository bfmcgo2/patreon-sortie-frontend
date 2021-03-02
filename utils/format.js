export const twoDecimals = (number) => parseFloat(number).toFixed(2);

export const roundTime = (sec) => Math.ceil(sec);

export const fmtMSS = (sec) => {
	let m = Math.floor(sec % 3600 / 60);
    let s = Math.floor(sec % 3600 % 60);

    return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
}