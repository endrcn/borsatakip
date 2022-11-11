const stockTable = document.querySelector("#stocks");

async function fetchData() {
    const res = await fetch("https://canlidoviz.com/borsa");
    const html = await res.text();
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html');

    let stockCells = doc.querySelectorAll(".table-detail tbody tr");
    let stocks = [];

    for (let i = 0; i < stockCells.length; i++) {
        let name = stockCells[i].cells[0].innerText.split("\n")[2].trim();
        let value = parseFloat(stockCells[i].cells[2].children[0].innerText.replace(",", ".").trim());
        let rate = parseFloat(stockCells[i].cells[2].children[1].innerText.match(/\(% (.*?)\)/)[1].replace(",", ".").trim());
        let earning = parseFloat(stockCells[i].cells[2].children[1].innerText.match(/([0-9,]+)\s*\(% .*?\)/)[1].replace(",", ".").trim())

        if (rate <= 10) {
            stocks.push({
                name,
                value,
                rate,
                earning
            });
        }
    }

    stocks.sort((a, b) => b.rate - a.rate);

    for (let i = 0; i < 15; i++) {
        stockTable.innerHTML += `<tr>
        <td>${stocks[i].name}</td>
        <td>₺${stocks[i].value}</td>
        <td>%${stocks[i].rate}</td>
        <td>₺${stocks[i].earning}</td>
    </tr>`
    }

}

fetchData();