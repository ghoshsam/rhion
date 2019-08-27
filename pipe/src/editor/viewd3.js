//var d3= require("d3");
AIP.ViewD3 = (function () {

    var sales = [
        { product: 'Hoodie', x: 7, y: 10 },
        { product: 'Jacket', x: 60, y: 10 },
        { product: 'Snuggie', x: 10, y: 60 },
    ];

    var svgContainer = d3.select("body")
        .append("svg")
        .attr("width", 200)
        .attr("height", 200);


    var rects = svgContainer.selectAll("rect")
        .data(sales)
        .enter()
        .append("rect")
        .attr("height", 50)
        .attr("width", 50)
        .attr("x", function (d) { return d.x })
        .attr("y", function (d) { return d.y })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );

    function dragstarted(d) {
        d3.select(this).raise().classed("active", true);
    }

    function dragged(d) {
        d3.select(this).attr("x", d.x = d3.event.x).attr("y", d.y = d3.event.y);
    }

    function dragended(d) {
        d3.select(this).classed("active", false);
    }


    

})();