function sendRequest(url) {

    let xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)
    xhr.send(post);
    

    xhr.onload = function () {
        if (this.status === 200) {
            const parser = new DOMParser()
            const doc = parser.parseFromString(this.responseText, 'text/html');
            let stocks = doc.querySelectorAll(".table-detail tbody tr");

            for (let i = 0; i < stocks.length; i++) {
                console.log("TITLE:", stocks[i].cells[0].innerText);
                console.log("VALUE:", stocks[i].cells[2].innerText);
            }

        }
    }
}