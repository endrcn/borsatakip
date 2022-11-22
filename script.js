const stockTableBody = document.querySelector("#stocks");
const stockTable = document.querySelector("#stock_table");
const twGraphContainer = document.querySelector("#tw_graph_container");
const twGraph = document.querySelector("#tw_graph");
const btnBack = document.querySelector("#back");
const stockTitle = document.querySelector("#stock_title");

btnBack.addEventListener("click", (event) => {
    twGraphContainer.style.display = "none";
    stockTable.style.display = "block";
});

async function fetchData() {
    const res = await fetch("https://canlidoviz.com/borsa");
    const html = await res.text();
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html');

    let stockCells = doc.querySelectorAll(".table-detail tbody tr");
    let stocks = [];

    for (let i = 0; i < stockCells.length; i++) {
        let name = stockCells[i].cells[0].innerText.split("\n")[2].trim();
        let updateTime = stockCells[i].cells[0].innerText.split("\n")[3].trim();
        let value = parseFloat(stockCells[i].cells[2].children[0].innerText.replace(",", ".").trim());
        let rate = parseFloat(stockCells[i].cells[2].children[1].innerText.match(/\(% (.*?)\)/)[1].replace(",", ".").trim());
        let earning = parseFloat(stockCells[i].cells[2].children[1].innerText.match(/([0-9,]+)\s*\(% .*?\)/)[1].replace(",", ".").trim())

        if (rate <= 10 && updateTime != "23:59:50") {
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
        stockTableBody.innerHTML += `<tr>
        <td><a href="#" id="stockCode_${stocks[i].name}">${stocks[i].name}</a></td>
        <td>₺${stocks[i].value}</td>
        <td>%${stocks[i].rate}</td>
        <td>₺${stocks[i].earning}</td>
    </tr>`
    }

    for (let i = 0; i < 15; i++) {
        document.getElementById("stockCode_" + stocks[i].name).addEventListener('click', (event) => {
            openGraph(event.target.innerText);
        });
    }


}

function openGraph(code) {
    twGraphContainer.style.display = "block";
    stockTable.style.display = "none";
    stockTitle.innerText = code;
    let ender = new TradingView.widget(
        {
            "width": "100%",
            "height": 300,
            "symbol": "BIST:" + code,
            "interval": "D",
            "timezone": "Europe/Istanbul",
            "theme": "light",
            "style": "2",
            "locale": "tr",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "hide_top_toolbar": true,
            "hide_legend": true,
            "save_image": false,
            "container_id": "tw_graph"
        }
    );
    console.log(ender);
}

fetchData();