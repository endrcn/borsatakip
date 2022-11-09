async function fetchData() {
    const resp = await fetch("https://canlidoviz.com/borsa");

    
    console.log("DOC");
    const parser = new DOMParser()
    const doc = parser.parseFromString(resp, 'text/html');
    let stocks = doc.querySelectorAll(".table-detail tbody tr");
    console.log(doc);
    for (let i = 0; i < stocks.length; i++) {
        console.log("TITLE:", stocks[i].cells[0].innerText.replace(/\s/g," ").replace(/\s{2,}/g," ").trim());
        console.log("VALUE:", stocks[i].cells[2].innerText.replace(/\s/g," ").replace(/\s{2,}/g," ").trim());
    }

    document.getElementById("stock").innerHTML = "EREGL";
    document.getElementById("rate").innerHTML = "10%";
    document.getElementById("amount").innerHTML = "3,14";
}


let btn = document.getElementById("btn");

btn.addEventListener('click', (event) => {
    console.log("BTN CLICKED");
    fetchData();
})