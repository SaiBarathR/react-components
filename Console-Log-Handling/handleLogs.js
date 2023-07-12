export function saveLogs() {
    if (console.everything === undefined) {
        console.everything = [];

        console.defaultLog = console.log.bind(console);
        console.log = function () {
            console.everything.push({ "type": "log", "datetime": Date().toLocaleString(), "value": Array.from(arguments) });
            console.defaultLog.apply(console, arguments);
        }
        console.defaultError = console.error.bind(console);
        console.error = function () {
            console.everything.push({ "type": "error", "datetime": Date().toLocaleString(), "value": Array.from(arguments) });
            console.defaultError.apply(console, arguments);
        }
        console.defaultWarn = console.warn.bind(console);
        console.warn = function () {
            console.everything.push({ "type": "warn", "datetime": Date().toLocaleString(), "value": Array.from(arguments) });
            console.defaultWarn.apply(console, arguments);
        }
        console.defaultDebug = console.debug.bind(console);
        console.debug = function () {
            console.everything.push({ "type": "debug", "datetime": Date().toLocaleString(), "value": Array.from(arguments) });
            console.defaultDebug.apply(console, arguments);
        }
    }
}

function handleReload(event) {
    this.localStorage.setItem('logs', JSON.stringify(console.everything));
    this.sessionStorage.setItem('reload', true);
}

export const listenForReload = () => {
    if (sessionStorage.getItem('reload') === 'true') {
        sessionStorage.removeItem('reload');
        const logs = JSON.parse(localStorage.getItem('logs'));
        if (logs.length > 0) {
            console.everything = logs
        }
    }
}

export const exportData = () => {
    console.log("Logs converted to json for download");
    const logs = console.everything;
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(logs)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "SWlogs.json";
    link.click();
};

window.addEventListener("beforeunload", handleReload);

export function resetLogs() {
    console.everything.length = 0;
    localStorage.removeItem('logs')
}