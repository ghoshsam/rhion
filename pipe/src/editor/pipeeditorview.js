AIP = {};
var console = {};
console.log = function(logMessage) {
  let msg = "<p>" + logMessage + "</p>";
  $("#console").append(msg);
};
window.console = console;

AIP.PipeEditorView = (function() {
  let palette = {};
  let editor = {};
  let $$ = go.GraphObject.make;
  function create(DivEditor) {
    var editor = go.GraphObject.make(go.Diagram, DivEditor, {
      grid: $$(
        go.Panel,
        "Grid",
        $$(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0 }),
        $$(go.Shape, "LineH", {
          stroke: "gray",
          strokeWidth: 0.5,
          interval: 10
        }),
        $$(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0 }),
        $$(go.Shape, "LineV", {
          stroke: "gray",
          strokeWidth: 0.5,
          interval: 10
        })
      ),
      initialContentAlignment: go.Spot.Left,
      isReadOnly: false,
      allowDrop: true,
      "draggingTool.dragsLink": true,
      "draggingTool.isGridSnapEnabled": true,
      LinkDrawn: linkDrawnEvent,
      LinkRelinked: linkrelinkedEvent,
      scrollsPageOnFocus: false,
      "undoManager.isEnabled": true
    });
    return editor;
  }

  palette = $$(go.Palette, "pipe_palette_1", {
    scrollsPageOnFocus: false
    //nodeTemplateMap: editor.nodeTemplateMap
  });

  palette.nodeTemplate = $$(
    go.Node,
    "Spot",
    {
      // fromSpot: go.Spot.RightSide,  // coming out from right side
      // toSpot: go.Spot.LeftSide
      // mouseDrop:mouseNodeDrop
    },
    $$(
      go.Shape,
      "Rectangle",
      {
        fill: "white",
        desiredSize: new go.Size(90, 30)
      },
      new go.Binding("fill", "color")
    ),
    $$(go.TextBlock, { margin: 5 }, new go.Binding("text", "name"))
    /*   ,
    $$(go.Shape, "Rectangle", PortStyle(false), {
      portId: "in",
      alignment: go.Spot.Right
    }),
    $$(go.Shape, "Rectangle", PortStyle(true), {
      portId: "out",
      alignment: go.Spot.Left
    }) */
  );

  function addNodeToPalette(node) {
    palette.model.addNodeData(node);
  }
  function linkDrawnEvent(e) {
    let part = e.subject;
    if (part instanceof go.Link) {
      node = editorPipe.model.findNodeDataForKey(part.data.from);
      console.log(JSON.stringify(part.data));
      console.log(JSON.stringify(node));
      if (node.joints.indexOf(part.data.to) === -1) {
        node.joints.push(part.data.to);
        editorPipe.model.setDataProperty(node, "joints", node.joints);
      }
      console.log(JSON.stringify(node));
    }
  }

  function linkrelinkedEvent(e) {
    let part = e.subject;
    console.log("relinked");
    console.log(part.data);
  }

  function addNode(editor, node) {
    editor.model.addNodeData(node);
    node.joints.forEach(function(join) {
      editor.model.addLinkData({ from: node.key, to: join });
    });
  }

  var editorPipe = create("pipe_view_1");
  /*editorPipe.removeDiagramListener("",function(e){
      console.log("Test");
      });*/

  function mouseNodeDrop(e, node) {
    console.log("dropKey" + node);
  }
  function onSelectionChanged(node) {
    var rectBody = node.findObject("RectBody");
    if (rectBody !== null) {
      if (node.isSelected) {
        rectBody.stroke = "red";
        //  rectBody.fill = "lightblue";
      } else {
        rectBody.stroke = "gray";
        // rectBody.fill = "white";
      }
    }
  }

  editorPipe.nodeTemplate = $$(
    go.Node,
    "Spot",
    {
      // fromSpot: go.Spot.RightSide,  // coming out from right side
      // toSpot: go.Spot.LeftSide,
      selectionAdorned: false,
      selectionChanged: onSelectionChanged
    },

    new go.Binding("location", "", toLocation).makeTwoWay(fromLocation), // convert string into a Point value
    {
      selectionAdorned: false,
      shadowOffset: new go.Point(0, 0),
      shadowBlur: 15,
      shadowColor: "blue"
    },
    $$(
      go.Shape,
      "Rectangle",
      {
        name: "RectBody",
        fill: "white",
        stroke: "gray",
        desiredSize: new go.Size(90, 30),
        strokeWidth: 2
      },
      new go.Binding("fill", "color")
    ),
    $$(go.TextBlock, { margin: 5 }, new go.Binding("text", "name")),
    $$(go.Shape, "Rectangle", PortStyle(false), {
      portId: "in",
      alignment: go.Spot.Right
    }),
    $$(go.Shape, "Rectangle", PortStyle(true), {
      portId: "out",
      alignment: go.Spot.Left
    })
  );

  function toLocation(data, node) {
    return new go.Point(data.x, data.y);
  }

  function fromLocation(loc, data, model) {
    model.setDataProperty(data, "x", loc.x);
    model.setDataProperty(data, "y", loc.y);
  }

  editorPipe.linkTemplate = $$(
    go.Link,
    {
      routing: go.Link.AvoidsNodes,
      curve: go.Link.JumpOver,
      corner: 5,
      toShortLength: 4,
      relinkableFrom: true,
      relinkableTo: true,
      reshapable: true,
      resegmentable: true
    },
    //  new go.Binding("toNode","toNode"),
    $$(go.Shape, { strokeWidth: 2, stroke: "gray" }),
    $$(go.Shape, { toArrow: "Standard" })
  );

  var mynode = [
    {
      key: "A",
      name: "A",
      x: 10,
      y: 50,
      data: "a1",
      type: "node1",
      joints: ["B"]
    },
    {
      key: "B",
      name: "B",
      x: 250,
      y: 100,
      data: "B1",
      type: "node1",
      joints: ["C", "D"]
    },
    {
      key: "C",
      name: "C",
      x: 150,
      y: 400,
      data: "C1",
      type: "node2",
      joints: []
    },
    {
      key: "D",
      name: "D",
      x: 150,
      y: 200,
      data: "D!",
      type: "node2",
      joints: []
    }
  ];
  mynode.forEach(function(n) {
    addNodeToPalette(n);
    addNode(editorPipe, n);
  });

  editorPipe.addModelChangedListener(function(e) {
    if (e.isTransactionFinished) {
      var json = e.model.toJson();
      //console.clear();
      console.log(JSON.stringify(e.model.nodeDataArray));
    }
  });
  editorPipe.addDiagramListener("ObjectDoubleClicked", function(e) {
    var part = e.subject.part;
    if (!(part instanceof go.Link)) console.log("Clicked on " + part.data.key);
  });

  editorPipe.addDiagramListener("BackgroundSingleClicked", function(e) {
    console.log("BackgroundSingleClicked ");
  });

  //Port Style
  function PortStyle(input) {
    return {
      desiredSize: new go.Size(10, 12),
      fill: "gray",
      fromSpot: go.Spot.Right,
      fromLinkable: !input,
      toSpot: go.Spot.Left,
      toLinkable: input,
      toMaxLinks: 1,
      cursor: "pointer"
    };
  }
})();
