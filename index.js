const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", "1200");
svg.setAttribute("height", "250");
document.getElementById("graph-container").appendChild(svg);

const width = 800
const height = 400
const blockSize = 20
const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const blocksGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
blocksGroup.setAttribute("transform", `translate(${margin.left}, ${margin.top})`);
svg.appendChild(blocksGroup);

const createBlock = (x, y, color) => {
    const block = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    block.setAttribute("x", x);
    block.setAttribute("y", y);
    block.setAttribute("width", blockSize);
    block.setAttribute("height", blockSize);
    block.setAttribute("fill", color);
    return block;
};

fetch("https://dpg.gg/test/calendar.json")
    .then(response => response.json())
    .then(data => {
        const dataArray = Object.entries(data).map(([date, contributors]) => ({ date, contributors }));
        console.log(dataArray);

        // Определяем функцию для определения цвета блока на основе количества контрибуций
        const getColor = contributions => {
            if (contributions === 0) return "white";
            else if (contributions <= 9) return "#EDEDED";
            else if (contributions >= 10 && contributions <= 19) return "#7FA8C9";
            else if (contributions >= 20 && contributions <= 29) return "#527BA0";
            else if (contributions >= 30) return "#254E77";
        };

        dataArray.forEach((item) => {
            const { date, contributors } = item;
            const columnIndex = Math.floor((Date.now() - new Date(date)) / (24 * 60 * 60 * 19000));
            const rowIndex = new Date(date).getDay();
            const x = columnIndex * (innerWidth / 51);
            const y = rowIndex * (innerHeight / 30);
            const color = getColor(contributors);
            const block = createBlock(x, y, color);
            block.setAttribute("transform", `translate(${x}, ${y})`);
            blocksGroup.appendChild(block);
            block.addEventListener("mouseover", () =>{
                alert(` ${contributors} contributions ${date}`)
            })
            block.setAttribute("title", ` ${contributors} contributions ${date}`)
        });
    });
