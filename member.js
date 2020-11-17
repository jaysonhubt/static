(function() {
    window.onload = function() {
        // Button Scroll
        var btnScrolls = document.querySelectorAll(".footer-scroll");
        btnScrolls.forEach(function(btnScroll) {
            btnScroll.addEventListener("click", function(e) {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                e.preventDefault();
            });
        });
    };
})();

function scriptCopy(copytext) {
    let _self = this;
    let tmp = document.createElement("div");
    let pre = document.createElement("pre");
    tmp.appendChild(pre).textContent = copytext;
    document.body.appendChild(tmp);
    document.getSelection().selectAllChildren(tmp);
    let result = document.execCommand("copy");
    document.body.removeChild(tmp);

    return result;
}

async function getCurrentPosition() {
    let status = "success";
    let { state } = await navigator.permissions.query({ name: "geolocation" });
    return new Promise(r => {
        if (state === "prompt") {
            navigator.geolocation.getCurrentPosition(
                function(x) {
                    let { latitude, longitude } = x.coords || {};
                    const position = { latitude, longitude };
                    return r({ status, position });
                },
                function(x) {
                    status = "denied";
                    return r({ status });
                }
            );
        } else if (state === "granted") {
            navigator.geolocation.getCurrentPosition(function(x) {
                let { latitude, longitude } = x.coords || {};
                const position = { latitude, longitude };
                return r({ status, position });
            });
        } else if (state === "denied") {
            status = "denied";
            return r({ status });
        }
    });
}
