var panelGlobal = this;
var praxescript = (function () {
      var Path = $.fileName ;
      var realPath = Path.slice(0,-18);
      
      var praxescript = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette", undefined, undefined, { su1PanelCoordinates: true, maximizeButton: true, minimizeButton: true, resizeable: true });

      var addCube = praxescript.add("button", undefined, undefined, {name: "addCube"}); 
            addCube.text = "add 3d cube"; 

      var addNull = praxescript.add("button", undefined, undefined, {name: "addNull"}); 
            addNull.helpTip = "add null to each layer"; 
            addNull.text = "add null"; 
            addNull.alignment = ["center","top"]; 

      var addRandom = praxescript.add("button", undefined, undefined, {name: "addRandom"}); 
            addRandom.helpTip = "add random position to layers"; 
            addRandom.text = "add random pos"; 
            addRandom.alignment = ["center","top"]; 

      var addCamera = praxescript.add("button", undefined, undefined, {name: "addCamera"}); 
            addCamera.helpTip = "add camera with 3d control"; 
            addCamera.text = "add camera"; 
            addCamera.alignment = ["center","top"]; 

      var addWiggle = praxescript.add("button", undefined, undefined, {name: "addWiggle"}); 
            addWiggle.text = "add shake wiggle"; 
            addWiggle.alignment = ["center","top"]; 

      var files = getFiles();
      var dropdown1 = praxescript.add("dropdownlist", undefined, undefined, { name: "dropdown1", items: files.displayNames });
            dropdown1.selection = 0;
            dropdown1.alignment = ["center", "top"];
      
      var refresh = praxescript.add("button", undefined, undefined, { name: "refresh" });
            refresh.text = "check files";
            refresh.alignment = ["center", "top"];

      var composite = praxescript.add("button", undefined, undefined, { name: "composite" });
            composite.text = "composite scene";
            composite.alignment = ["center", "top"];
        // MAIN
  // ====
      var main = praxescript.add("group", undefined, undefined, {name: "main"}); 
            main.alignChildren = ["left","fill"]; 
      var main_nav = main.add ("listbox", undefined, ['lens effect','glass effect']); 
      var main_innerwrap = main.add("group") 
            main_innerwrap.alignment = ["fill","fill"]; 
            main_innerwrap.orientation = ["stack"]; 
            main.alignment = ["center","top"]; 

  // LENS
  // ====
      var lens = main_innerwrap.add("group", undefined, {name: "lens"}); 
            lens.text = "lens effect"; 
            lens.orientation = "column"; 
            lens.alignChildren = ["fill","top"]; 
            lens.spacing = 10; 
            lens.margins = 0; 

      var applylensone = lens.add("button", undefined, undefined, {name: "applylensone"}); 
            applylensone.text = "lens1"; 
            applylensone.alignment = ["center","top"]; 

      var applylensTwo = lens.add("button", undefined, undefined, {name: "applylensTwo"}); 
            applylensTwo.text = "lens2"; 
            applylensTwo.alignment = ["center","top"]; 

      var applylensThree = lens.add("button", undefined, undefined, {name: "applylensThree"}); 
            applylensThree.text = "lens2"; 
            applylensThree.alignment = ["center","top"]; 
      

      

  // GLASS
  // =====
      var glass = main_innerwrap.add("group", undefined, {name: "glass"}); 
            glass.text = "glass effect"; 
            glass.orientation = "column"; 
            glass.alignChildren = ["left","top"]; 
            glass.spacing = 10; 
            glass.margins = 0; 

  // MAIN
  // ====
      main_tabs = [lens,glass]; 

      for (var i = 0; i < main_tabs.length; i++) { 
      main_tabs[i].alignment = ["fill","fill"]; 
      main_tabs[i].visible = false; 
      } 

      main_nav.onChange = showTab_main; 

      function showTab_main() { 
            if ( main_nav.selection !== null ) { 
            for (var i = main_tabs.length-1; i >= 0; i--) { 
                  main_tabs[i].visible = false; 
            } 
                  main_tabs[main_nav.selection.index].visible = true; 
            } 
      } 

      main_nav.selection = 0; 
      showTab_main() 

      var glassOne = glass.add("button", undefined, undefined, {name: "glassOne"}); 
            glassOne.text = "glass1"; 
            glassOne.alignment = ["center","top"]; 

      var glassTwo = glass.add("button", undefined, undefined, {name: "glassTwo"}); 
            glassTwo.text = "glass2"; 
            glassTwo.alignment = ["center","top"]; 

      var glassThree = glass.add("button", undefined, undefined, {name: "glassThree"}); 
            glassThree.text = "glass3"; 
            glassThree.alignment = ["center","top"];       



            praxescript.addCube.onClick = function createCube(type) {
                  app.beginUndoGroup("3d cube")
                  var currentComp = app.project.activeItem;
                  var compSize = [currentComp.width, currentComp.height];
                  var spSize = Math.round(compSize[1] / 3);
                  var spPos = compSize / 2;
                  var newNull = currentComp.layers.addNull();
                  newNull.threeDLayer = true;
                  newNull.source.name = "Cube Null 1";
                  cubeSide(type, "side1_1", [spSize, spSize], getColor("random"), spPos + [0, 0, spSize / 2], [0, 180, 0]);
                  cubeSide(type, "side2_1", [spSize, spSize], getColor("random"), spPos - [0, 0, spSize / 2], [0, 0, 0]);
                  cubeSide(type, "side3_1", [spSize, spSize], getColor("random"), spPos + [0, spSize / 2, 0], [90, 0, 0]);
                  cubeSide(type, "side4_1", [spSize, spSize], getColor("random"), spPos - [0, spSize / 2, 0], [-90, 0, 0]);
                  cubeSide(type, "side5_1", [spSize, spSize], getColor("random"), spPos + [spSize / 2, 0, 0], [0, -90, 0]);
                  cubeSide(type, "side6_1", [spSize, spSize], getColor("random"), spPos - [spSize / 2, 0, 0], [0, 90, 0]);
                  newNull.moveToBeginning();
                  return cubeSide;
                  return getColor;
                  app.endUndoGroup();
            }

            function cubeSide(type, spName, spSize, spColor, spPos, spOrt) {
                  var currentComp = app.project.activeItem;
                  var newLayer = currentComp.layers.addSolid([0.5, 0.5, 0.5], spName, spSize[0], spSize[1], 1);
                  var fillEff = newLayer.Effects.addProperty("ADBE Fill");
                  fillEff(3).setValue(spColor);

                  newLayer.name = spName;
                  newLayer.threeDLayer = true;
                  newLayer.position.setValue(spPos);
                  newLayer.orientation.setValue(spOrt);

                  newLayer.parent = currentComp.layer("Cube Null 1");

                  return newLayer;
            }

            function getColor(clr) {
                  var spColor;
                  if (clr == "notTrueBlack") {
                        spColor = [0 + 0.1, 0 + 0.1, 0 + 0.1];
                  } else if (clr == "random") {
                        spColor = [generateRandomNumber(), generateRandomNumber(), generateRandomNumber(), 0];
                  }
                  return spColor;
            } 
            
      /////////////////////////////////////////////////////////////////////////////////////////           
            praxescript.addNull.onClick = function nulladding() {
                  var nullSuffix = "-Null";
                  var addLayerNameBeforeSuffix = 1; // 1 for yes, 0 for no

                  var proj = app.project;
                  var undoStr = "Add Parented Null to Selected Layers";

                  if (proj) {
                        var myComp = app.project.activeItem;
                        if (myComp != null && (myComp instanceof CompItem)) {
                        app.beginUndoGroup(undoStr);

                        var myLayers = myComp.selectedLayers;
                        var saveIn = 0;
                        var saveOut = 0;
                        for (i = 0; i <= myLayers.length - 1; i++) {

                              currentLayer = myLayers[i];
                              saveIn = (currentLayer.stretch < 0) ? currentLayer.outPoint : currentLayer.inPoint;
                              saveOut = (currentLayer.stretch < 0) ? currentLayer.inPoint : currentLayer.outPoint;
                              saveIndex = currentLayer.index;
                              saveName = (addLayerNameBeforeSuffix) ? currentLayer.name + nullSuffix : nullSuffix;

                              var myName = (parseFloat(app.version) < 8.0) ? saveName.substring(0, 31) : saveName;
                              var newNull = myComp.layers.addNull(myComp.duration);
                              if (currentLayer.threeDLayer) newNull.threeDLayer = true;
                              var tempParent = null;
                              if (currentLayer.parent != null) {
                                    tempParent = currentLayer.parent;
                                    var tempLayer = currentLayer.duplicate();
                                    tempLayer.parent = null;
                                    newNull.transform.position.setValue(tempLayer.transform.position.value);
                                    //newNull.transform.scale.setValue(tempLayer.transform.scale.value);
                                    if (tempLayer.threeDLayer) {

                                          newNull.transform.xRotation.setValue(tempLayer.transform.xRotation.value);
                                          newNull.transform.yRotation.setValue(tempLayer.transform.yRotation.value);
                                          newNull.transform.zRotation.setValue(tempLayer.transform.zRotation.value);
                                    } else {
                                          newNull.transform.rotation.setValue(tempLayer.transform.rotation.value);
                                    }
                                    tempLayer.remove();
                              } else {
                                    newNull.transform.position.setValue(currentLayer.transform.position.value);
                                    //newNull.transform.scale.setValue(currentLayer.transform.scale.value);
                                    if (currentLayer.threeDLayer) {
                                          newNull.transform.orientation.setValue(currentLayer.transform.orientation.value);
                                          newNull.transform.xRotation.setValue(currentLayer.transform.xRotation.value);
                                          newNull.transform.yRotation.setValue(currentLayer.transform.yRotation.value);
                                          newNull.transform.zRotation.setValue(currentLayer.transform.zRotation.value);
                                    } else {
                                          newNull.rotation.setValue(currentLayer.transform.rotation.value);
                                    }
                                    }
                              if (tempParent != null) newNull.parent = tempParent;
                                    newNull.moveBefore(myLayers[i]);
                                    newNull.inPoint = saveIn
                                    newNull.outPoint = saveOut;
                                    currentLayer.parent = newNull;
                                    newNull.name = myName;
                              }

                        
                  } else {
                        alert("Please select an active comp to use this script");
                        }
                  } else {
                        alert("Please open a project first to use this script.");
                  }
            }
      //////////////////////////////////////////////////////////////////////////////////////////////            
            praxescript.addRandom.onClick = function randompos() {
                  app.beginUndoGroup("random position");
                  var myComp = app.project.activeItem;
                  var x = 0;
                  for (var i = 1; i <= myComp.numLayers; i++) {
                        x = 100 * generateRandomNumber() - 50;
                        var currentPos = myComp.layer(i).property("Position").value;
                        myComp.layer(i).property("Position").setValue([currentPos[0] +(3*x), currentPos[1] + (3*x)]); 
                  }
                  app.endUndoGroup();
            }
      ////////////////////////////////////////////////////////////////////////////////////////////////            
            praxescript.addCamera.onClick = function addingcamera() {
                  app.beginUndoGroup("Camera With Controller");
                  var comp = app.project.activeItem;
                  var layers = comp.layers;
                  var centerPoint = [960, 540];
                  var centerPoint = [comp.width / 2, comp.height / 2];
                  var cameraLayer = layers.addCamera("Camera 1", centerPoint);
                  var cameraControllerLayer = layers.addNull();
                  cameraLayer.parent = cameraControllerLayer;
                  var position = [0, 0, -2666.6667]
                  cameraLayer.transform.position.setValue(position);
                  cameraControllerLayer.name = "Camera Controller";
                  cameraControllerLayer.threeDLayer = true;
                  cameraControllerLayer.source.name = "Camera Controller";
                  app.endUndoGroup();
            }
      ////////////////////////////////////////////////////////////////////////////////////////////////  
            praxescript.addWiggle.onClick = function() {
            
            app.beginUndoGroup('Wiggle Controller'); {
	                  wiggleCtrl("loop");
            }
            app.endUndoGroup();
            
      function wiggleCtrl(type) {
	var currentComp = app.project.activeItem;
	var layersArray = currentComp.selectedLayers;
      var animName = "Wiggle";
      var ctrlName = animName + " Controller";

      if (type == "noloop") {
		var valueArray = [0.5, 10, 0];
		var nameArray = ["Freq", "Amp", "Random"];
	} else if (type == "loop") {
		var valueArray = [2, 0.5, 10, 0];
		var nameArray = ["Loop Time", "Freq", "Amp", "Random"];
	}

      var propArr = [];

	for (var layerIter = 0; layerIter < layersArray.length; layerIter++) {
		var currentLayer = layersArray[layerIter];
		var arrayProperty = currentLayer.selectedProperties;
        // Add an expression to a position if no properties are selected
      if (arrayProperty.length == 0) arrayProperty.push(currentLayer.position);

		for (var propIter = 0; propIter < arrayProperty.length; propIter++) {
            var curProp = arrayProperty[propIter];
            
            if (curProp.parentProperty.matchName == "ADBE Effect Parade") continue;
            
            var propName = curProp.name;
            var propLen = curProp.value.length;
            var propIterName = 1;
            var newEffName = animName + " " + propName + propIterName;
            
            for (var effIter = 1; effIter <= currentLayer.Effects.numProperties; effIter++) {
                  var curEff = currentLayer.Effects(effIter);
                  for (var i = 0; i < nameArray.length; i++){    
                        if (curEff.name == newEffName + " " + nameArray[i]) {
                              propIterName++;
                              newEffName = animName + " " + propName + propIterName;
                              break;
                        }
                  }
            }

            propArr.push([newEffName, propLen, propIter]);

            var textSlider = "// Wiggle Animation" + "\n";

            textSlider += 
                "seed = effect(\"" + newEffName + " Random\")(1);" + "\n" + 
                "seedRandom(seed, true);" + "\n" + 
                "freq = effect(\"" + newEffName + " Freq\")(1);" + "\n" + 
                "amp = effect(\"" + newEffName + " Amp\")(1);" + "\n";
		
            if (type == "noloop") {
                textSlider +=
                    "w = wiggle(freq, amp)";
            } else if (type == "loop") {
                textSlider +=
                    "loopTime = effect(\"" + newEffName + " Loop Time\")(1);" + "\n" +
                    "t = time % loopTime;" + "\n" +
                    "wiggle1 = wiggle(freq, amp, 1, 0.5, t);" + "\n" +
                    "wiggle2 = wiggle(freq, amp, 1, 0.5, t - loopTime);" + "\n" +
                    "w = linear(t, 0, loopTime, wiggle1, wiggle2);";
            } 

            curProp.expression = textSlider;
		}

        for (var propIter = 0; propIter < propArr.length; propIter++) {
            newEffName = propArr[propIter][0];
            propLen = propArr[propIter][1];
            propArrIter = propArr[propIter][2];

            for (var i = 0, len = nameArray.length; i < len; i++) {

                var sliderName = newEffName + " " + nameArray[i];
                if (nameArray[i] == "Random") {
                    var sliderValue = (currentLayer.index + propArrIter) / 10;
                    var sliderExpr =
                        "seed = effect(\"" + newEffName + " Random\")(1);" + "\n" + 
                        "seedRandom(seed, true)" + "\n" + 
                        "value + random(0, 100) + thisComp.layer(\"Wiggle Controller\").effect(\"" + nameArray[i] + "\")(1)";

                } else {
                    var sliderValue = valueArray[i];
                    var sliderValue = 0;
                    var sliderExpr = 'value + thisComp.layer("' + ctrlName + '").effect("' + nameArray[i] + "\")(1);";
                }

                addSlider(currentLayer, sliderName, sliderValue, sliderExpr)
            }
        }
	}

    addCtrlLayer(type, ctrlName, valueArray);
    
    function addCtrlLayer(type, name, valueArray)
    {
        if (currentComp.layer(name) == null) {
            var ctrlLayer = currentComp.layers.addShape();
            ctrlLayer.name = name;
            ctrlLayer.enabled = false;
            ctrlLayer.label = 1;
        } else {
            ctrlLayer = currentComp.layer(name);
        }
    
        if (type == "loop") {
            addSlider(ctrlLayer, "Loop Time", 2, "")
        }

        for (var i = 0, len = nameArray.length; i < len; i++) {
            
            addSlider(ctrlLayer, nameArray[i], valueArray[i], "")
    
            if (type == "loop") {
                addSlider(ctrlLayer, nameArray[i], valueArray[i], "")
            }
        };
    }
    
    function addSlider(layer, name, val, expr)
    {
        if ( ! layer.Effects.property(name)) {
          var sl = layer.Effects.addProperty("ADBE Slider Control"); 
          sl.property(1).setValue(val);
          sl.property(1).expression = expr;
          sl.name = name;
        }
    }
      }
      } 

      ////////////////////////////////////////////////////////////////////////////////////////                       
            praxescript.dropdown1.size = [100, 20];
            praxescript.refresh.onClick = function () {
                  files = getFiles()
                  populateDropDown(praxescript.dropdown1, files);
            }
      //////////////////////////////////////////////////////////////////////////////////////////
            function populateDropDown(droplol, array) {
                  droplol.removeAll();
                  for (var i = 0; i < array.displayNames.length; i++) {
                        droplol.add("item", array.displayNames[i]);
                  }
                  droplol.selection = 0;
            }
            function getFiles() {
                  var presetPath = $.fileName;
                  var realpresetPath = presetPath.slice(0, -18);
                  var PathBG = realpresetPath + "/assetsscript/backgrounds";
                  
                  var files = Folder(PathBG).getFiles()
                  var fileObj = {
                        paths: [],
                        displayNames: []
                  }
                  for (var i = 0; i < files.length; i++) {
                        var file = files[i]
                        fileObj.paths.push(file)
                        fileObj.displayNames.push(file.displayName)
                  }
                  return fileObj
            }
      ////////////////////////////////////////////////////////////////////////////////////////
            praxescript.composite.onClick = function () {
                  app.beginUndoGroup("composite");
                        var presetPath = $.fileName ;
                        var realpresetPath = presetPath.slice(0,-18);
                        var mycomposition = app.project.activeItem;
                        var myLayer = mycomposition.selectedLayers[0];
                        var duplication = myLayer.duplicate();
                        var indexlayer = duplication.index;
                        var namelayer = myLayer.name;
                        var pathPreset3 = realpresetPath + "/assetsscript/compdropshadow.ffx";
                        myLayer.applyPreset(File(pathPreset3));
                        duplication.moveBefore(myLayer);
                        duplication.blendingMode = BlendingMode.SCREEN ;
                        duplication.name = namelayer + "_belevl";
                        ///////////////////////////////////////
                        var pathPreset2 = realpresetPath + "/assetsscript/bgBlur.ffx";
                        var background = praxescript.dropdown1;
                        var myfile = files.paths[background.selection.index];
                        var mybackground = app.project.importFile(new ImportOptions(File(myfile)));
                        var photoLayer = app.project.activeItem.layers.add(mybackground);
                        photoLayer.moveToEnd();
                        photoLayer.applyPreset(File(pathPreset2));
                        photoLayer.selected = false ;
                        /////////////////////////////////////////////////////
                        var finalpresetPath = realpresetPath + "/assetsscript/belevel.ffx";
                        duplication.selected = true ;
                        duplication.applyPreset( File(finalpresetPath) );
                        //////////////////////////////////////////////////
                        var comp = app.project.activeItem;
                        var selectedLayer = comp.selectedLayers[0];
                        var newSolid = comp.layers.addSolid([1,1,1], "flare blue", comp.width, comp.height, 1, comp.duration);
                        var presetPathaha = realpresetPath + "/assetsscript/flare_blue.ffx";
                        newSolid.adjustmentLayer = true;
                        newSolid.moveToBeginning();
                        newSolid.applyPreset(File(presetPathaha)); 
                        /////////////////////////////////////////////////////
                        var comp = app.project.activeItem;
                        var selectedLayer = comp.selectedLayers[0];
                        var newSolid = comp.layers.addSolid([1,1,1], "flare orange", comp.width, comp.height, 1, comp.duration);
                        var presetPathll = realpresetPath + "/assetsscript/flare_orange.ffx";
                        newSolid.adjustmentLayer = true;
                        newSolid.moveToBeginning();
                        newSolid.applyPreset(File(presetPathll)); 
                        //////////////////////////////////////////////////
                        var comp = app.project.activeItem;
                        var selectedLayer = comp.selectedLayers[0];
                        var newSolid = comp.layers.addSolid([1,1,1], "looks", comp.width, comp.height, 1, comp.duration);
                        var presetPath4 = realpresetPath + "/assetsscript/looks.ffx";
                        newSolid.adjustmentLayer = true;
                        newSolid.moveToBeginning();
                        newSolid.applyPreset(File(presetPath4));
                        /////////////////////////////////////////////
                        var comp = app.project.activeItem;
                        var selectedLayer = comp.selectedLayers[0];
                        var chromatic = comp.layers.addSolid([1,1,1], "chromatic", comp.width, comp.height, 1, comp.duration);
                        var presetPath6 = realpresetPath + "/assetsscript/chromaticabberation.ffx";
                        chromatic.adjustmentLayer = true;
                        chromatic.moveToBeginning();
                        chromatic.applyPreset(File(presetPath6));
                        ///////////////////////////////////////////////
                        var lensPath = realpresetPath + "/assetsscript/LL_059.mov";
                        var mylens = app.project.importFile(new ImportOptions(File(lensPath)));
                        var overlayer = app.project.activeItem.layers.add(mylens);
                        var presetPathz = realpresetPath + "/assetsscript/don't touch folder/(Footage)/Footage/spectr/opacity.ffx";
                        overlayer.applyPreset(File(presetPathz));
                        overlayer.moveToBeginning();
                        overlayer.selected = false ;
                        overlayer.blendingMode = BlendingMode.SCREEN ;
                        /////////////////////////////////////////////
                        var comp = app.project.activeItem;
                        var selectedLayer = comp.selectedLayers[0];
                        var blackbars = comp.layers.addSolid([0,0,0], "black_bars", comp.width , comp.height, 1, comp.duration);
                        var presetPath5 = realpresetPath + "/assetsscript/blackBars.ffx";
                        blackbars.applyPreset(File(presetPath5));
                        blackbars.moveToBeginning();
                        ////////////////////////////////////////
                        var Comp = app.project.activeItem;
                        var controlerhh = Comp.layers.addNull(Comp.duration)
                        controlerhh.name = "controler";
                        var presetPathf = realpresetPath + "/assetsscript/don't touch folder/(Footage)/Footage/spectr/controler.ffx";
                        controlerhh.moveToBeginning();
                        controlerhh.applyPreset(File(presetPathf)); 
                        controlerhh.enabled = false;
                        controlerhh.label = 2;
                  app.endUndoGroup();
            };
      /////////////////////////////////////////////////////////////////////////////////////////            
            applylensone.onClick = function() {
                  app.beginUndoGroup("lens");
                  var Path = $.fileName ;
                  var realPath = Path.slice(0,-18);
                  var mycomposition = app.project.activeItem;
                  var myLayer = mycomposition.selectedLayers[0];
                  var pfPath = realPath + "/assetsscript/don't%20touch%20folder/lens1.aep";
                  var myPf = app.project.importFile(new ImportOptions(File(pfPath)));
                  app.beginUndoGroup("lens1");
                  for(var i= 1; i<= app.project.numItems; i++){
                  if(app.project.item(i).name == "lens1"){
                  var mycomp = app.project.item(i);
                  var mycomp = app.project.activeItem.layers.add(mycomp);
                  mycomp.collapseTransformation = true;
                  mycomp.moveToBeginning();
                  break;
                  }};
                  app.endUndoGroup();
            };

            applylensTwo.onClick = function() {
                  app.beginUndoGroup("lens");
                  var Path = $.fileName ;
                  var realPath = Path.slice(0,-18);
                  var mycomposition = app.project.activeItem;
                  var myLayer = mycomposition.selectedLayers[0];
                  var pfPath = realPath + "/assetsscript/don't%20touch%20folder/lens2.aep";
                  var myPf = app.project.importFile(new ImportOptions(File(pfPath)));
                  app.beginUndoGroup("lens2");
                  for(var i= 1; i<= app.project.numItems; i++){
                  if(app.project.item(i).name == "lens2"){
                  var mycomp = app.project.item(i);
                  var mycomp = app.project.activeItem.layers.add(mycomp);
                  mycomp.collapseTransformation = true;
                  mycomp.moveToBeginning();
                  break;
                  }};
                  app.endUndoGroup();
            };

            applylensThree.onClick = function() {
                  app.beginUndoGroup("lens");
                  var Path = $.fileName ;
                  var realPath = Path.slice(0,-18);
                  var mycomposition = app.project.activeItem;
                  var myLayer = mycomposition.selectedLayers[0];
                  var pfPath = realPath + "/assetsscript/don't%20touch%20folder/lens3.aep";
                  var myPf = app.project.importFile(new ImportOptions(File(pfPath)));
                  app.beginUndoGroup("lens3");
                  for(var i= 1; i<= app.project.numItems; i++){
                  if(app.project.item(i).name == "lens3"){
                  var mycomp = app.project.item(i);
                  var mycomp = app.project.activeItem.layers.add(mycomp);
                  mycomp.collapseTransformation = true;
                  mycomp.moveToBeginning();
                  break;
                  }};
                  app.endUndoGroup();
            };
      ///////////////////////////////////////////////////////////////////////////////////////////////////////
            glassOne.onClick = function(){
                  
                  var Path = $.fileName ;
                  var mycomposition = app.project.activeItem;
                  var myLayer = mycomposition.selectedLayers[0];
                  var pfPath = realPath + "/assetsscript/don't%20touch%20folder/glass1.aep";
                  var myPf = app.project.importFile(new ImportOptions(File(pfPath)));
                  app.beginUndoGroup("glass1");
                  for(var i= 1; i<= app.project.numItems; i++){
                  if(app.project.item(i).name == "glass1"){
                  var mycomp = app.project.item(i);
                  var mycomp = app.project.activeItem.layers.add(mycomp);
                  mycomp.collapseTransformation = true;
                  mycomp.moveToBeginning();
                  break;
                  }}
                  app.endUndoGroup();
            };

            glassTwo.onClick = function(){
                  app.beginUndoGroup("glass2");
                  var Path = $.fileName ;
                  var realPath = Path.slice(0,-18);
                  var mycomposition = app.project.activeItem;
                  var myLayer = mycomposition.selectedLayers[0];
                  var pfPath = realPath + "/assetsscript/don't%20touch%20folder/glass2.aep";
                  var myPf = app.project.importFile(new ImportOptions(File(pfPath)));
                  app.beginUndoGroup("glass2");
                  for(var i= 1; i<= app.project.numItems; i++){
                  if(app.project.item(i).name == "glass2"){
                  var mycomp = app.project.item(i);
                  var mycomp = app.project.activeItem.layers.add(mycomp);
                  mycomp.collapseTransformation = true;
                  mycomp.moveToBeginning();
                  break;
                  }}
                  app.endUndoGroup();
            };

            glassThree.onClick = function(){
                  
                  app.beginUndoGroup("glass3");
                        var Path = $.fileName ;
                        var realPath = Path.slice(0,-18);
                        var mycomposition = app.project.activeItem;
                        var myLayer = mycomposition.selectedLayers[0];
                        var pfPath = realPath + "/assetsscript/don't%20touch%20folder/glass3.aep";
                        var myPf = app.project.importFile(new ImportOptions(File(pfPath)));
                        for(var i= 1; i<= app.project.numItems; i++){
                        if(app.project.item(i).name == "glass3"){
                        var mycomp = app.project.item(i);
                        var mycomp = app.project.activeItem.layers.add(mycomp);
                        mycomp.collapseTransformation = true;
                        mycomp.moveToBeginning();
                        break;
                        }}
                  app.endUndoGroup();
            };
            
            
            

            
      //////////////////////////////////////////////////////////////////////////////////////////
      //======================================================================================== 
      praxescript.layout.layout(true);
      praxescript.layout.resize();
      praxescript.onResizing = praxescript.onResize = function () { this.layout.resize(); }

      if (praxescript instanceof Window) praxescript.show();

      return praxescript;

}());







