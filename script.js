var app = angular.module('app', ['ngRoute']);

const {remote} = require('electron');

app.service('image', function() {
	var imagePath = "";
	var imagePath_2 = "";
	var imagePath_3 = "";
	var dimesions = [];
	this.setImagePath = function(path) {
		imagePath = path;
	};
	this.setImagePath_2 = function(path_2) {
		imagePath_2 = path_2;
	};
	this.setImagePath_3 = function(path_3) {
		imagePath_3 = path_3;
	};

	this.getImagePath = function() {
		return imagePath;
	};
	this.getImagePath_2 = function() {
		return imagePath_2;
	};
	this.getImagePath_3 = function() {
		return imagePath_3;
	};

	this.setImageDimensions = function(imgDimesions) {
		dimesions = imgDimesions;
	};
	this.getImageDimensions = function() {
		return dimesions;
	};
});

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: `${__dirname}/components/home/home.html`,
		controller: 'homeCtrl'
	}).when('/edit', {
		templateUrl: `${__dirname}/components/editImage/editImage.html`,
		controller: 'editCtrl'
	}).when('/test', {
		templateUrl: `${__dirname}/components/testImage/testImage.html`,
		controller: 'testCtrl'
	}).otherwise({
		template: '404 bro'
	});
});

app.controller('headCtrl', function($scope) {
	var win = remote.getCurrentWindow();

	$scope.close = function() {
		win.close();
	};
	$scope.maximize = function() {
		win.isMaximized() ? win.unmaximize() : win.maximize();
	};
	$scope.minimize = function() {
		win.minimize();
	}
});

app.controller('testCtrl', function($scope, $location, image) {

})

app.controller('homeCtrl', function($scope, $location, image) {

	$scope.pickFile = function() {
		var {dialog} = remote;
		dialog.showOpenDialog({
			properties: ['openFile'],
			filters: [{
				name: 'Images',
				extensions: ['jpg', 'jpeg', 'png']
			}]
		}, function(file) {
			if(!!file) {
				var path = file[0];
				image.setImagePath(path);
				var sizeof = require('image-size');

				var dimesions = sizeof(path); // dimesions.width and dimesions.height

				image.setImageDimensions(dimesions);
				$location.path('/edit');
				$scope.$apply();
			}
		});
	};

	$scope.testImage = function () {
		$location.path('/test');
		//$scope.$apply();
	}

	$scope.pickFile_2 = function() {
		var {dialog} = remote;
		dialog.showOpenDialog({
			properties: ['openFile'],
			filters: [{
				name: 'Images',
				extensions: ['jpg', 'jpeg', 'png']
			}]
		}, function(file) {
			if(!!file) {
				var path_2 = file[0];
				image.setImagePath_2(path_2);
				var sizeof = require('image-size');

				var dimesions = sizeof(path_2); 

				image.setImageDimensions(dimesions);
				$location.path('/edit');
				$scope.$apply();
			}
		});
	};

	$scope.pickFile_3 = function() {
		var {dialog} = remote;
		dialog.showOpenDialog({
			properties: ['openFile'],
			filters: [{
				name: 'Images',
				extensions: ['jpg', 'jpeg', 'png']
			}]
		}, function(file) {
			if(!!file) {
				var path_3 = file[0];
				image.setImagePath_3(path_3);
				var sizeof = require('image-size');

				var dimesions = sizeof(path_3); 

				image.setImageDimensions(dimesions);
				$location.path('/edit');
				$scope.$apply();
			}
		});
	};
});

app.controller('editCtrl', function($scope, image, $location) {

	$scope.imagePath = image.getImagePath();
	$scope.imagePath_2 = image.getImagePath_2();
	$scope.imagePath_3 = image.getImagePath_3();

	$scope.controlsActive = false;
	$scope.controlsActive_2 = false;
	$scope.controlsActive_3 = false;

/*
	var imageReference = document.getElementById('mainImage');
	var imageReference_2 = document.getElementById('mainImage');
	//var imageReference_2 = document.getElementById('myId_2');
	var imageReference_3 = document.getElementById('mainImage');
*/
	var imageReference = document.getElementById('myId');
	var imageReference_2 = document.getElementById('myId_2');
	var imageReference_3 = document.getElementById('myId_3');

	var generatedStyles = "";

/*
	$scope.effects = {
		'Brightness': {val: 100, min: 0, max:200, delim: '%'}, 
		'Contrast': {val: 100, min: 0, max:200, delim: '%'}, 
		'Invert': {val: 0, min: 0, max:100, delim: '%'}, 
		'Hue-Rotate': {val: 0, min: 0, max:360, delim: 'deg'}, 
		'Sepia': {val: 0, min: 0, max:100, delim: '%'}, 
		'Grayscale': {val: 0, min: 0, max:100, delim: '%'}, 
		'Saturate': {val: 100, min: 0, max:200, delim: '%'}, 
		'Blur': {val: 0, min: 0, max:5, delim: 'px'}
	};
	$scope.effects_2 = {
		'Brightness': {val_2: 100, min_2: 0, max_2:200, delim_2: '%'}, 
		'Contrast': {val_2: 100, min_2: 0, max_2:200, delim_2: '%'}, 
		'Invert': {val_2: 0, min_2: 0, max_2:100, delim_2: '%'}, 
		'Hue-Rotate': {val_2: 0, min_2: 0, max_2:360, delim_2: 'deg'}, 
		'Sepia': {val_2: 0, min_2: 0, max_2:100, delim_2: '%'}, 
		'Grayscale': {val_2: 0, min_2: 0, max_2:100, delim_2: '%'}, 
		'Saturate': {val_2: 100, min_2: 0, max_2:200, delim_2: '%'}, 
		'Blur': {val_2: 0, min_2: 0, max_2:5, delim_2: 'px'}
	};
	$scope.effects_3 = {
		'Brightness': {val_3: 100, min_3: 0, max_3:200, delim_3: '%'}, 
		'Contrast': {val: 100, min: 0, max:200, delim: '%'}, 
		'Invert': {val: 0, min: 0, max:100, delim: '%'}, 
		'Hue-Rotate': {val: 0, min: 0, max:360, delim: 'deg'}, 
		'Sepia': {val: 0, min: 0, max:100, delim: '%'}, 
		'Grayscale': {val: 0, min: 0, max:100, delim: '%'}, 
		'Saturate': {val: 100, min: 0, max:200, delim: '%'}, 
		'Blur': {val: 0, min: 0, max:5, delim: 'px'}
	};
	*/
	
	$scope.imageEffect = function(effectName) {
		$scope.controlsActive = true;
		$scope.activeEffect = effectName;
		//console.log(effectName);
	};
	/*
	$scope.imageEffect_2 = function(effectName_2) {
		$scope.controlsActive_2 = true;
		$scope.activeEffect_2 = effectName_2;
	};
	$scope.imageEffect_3 = function(effectName_3) {
		$scope.controlsActive_3 = true;
		$scope.activeEffect_3 = effectName_3;
	};*/

/*
	$scope.setEffect = function() {
		generatedStyles = "";
		for(let i in $scope.effects) { // i = Brightness and $scope.effects[i].val
			generatedStyles += `${i}(${$scope.effects[i].val+$scope.effects[i].delim}) `;
		}
		imageReference.style.filter = generatedStyles;
		//console.log(generatedStyles);
	}
	$scope.setEffect_2 = function() {
		generatedStyles_2 = "";
		for(let i in $scope.effects_2) { 
			generatedStyles_2 += `${i}(${$scope.effects_2[i].val_2+$scope.effects_2[i].delim}) `;
		}
		imageReference_2.style.filter = generatedStyles_2;
	}
	$scope.setEffect_3 = function() {
		generatedStyles_3 = "";
		for(let i in $scope.effects_3) { 
			generatedStyles_3 += `${i}(${$scope.effects_3[i].val_3+$scope.effects_3[i].delim}) `;
		}
		imageReference_3.style.filter = generatedStyles_3;
	}*/

	$scope.hideThis = function() {
		$scope.controlsActive = false;
	};
	$scope.hideThis_2 = function() {
		$scope.controlsActive_2 = false;
	}
	$scope.hideThis_3 = function() {
		$scope.controlsActive_3 = false;
	}





















/*

	NEED REFACTORING, and use prettier for control style code (airbrnb  like)

*/

/*
	Как работает каждый блок с эффектом. Сначала мы через ангуляр выгружаем изображение c Id MainImage в homeCtrl, нажимая на openImage
	Это надо будет убрать, потому что это не играет не какой роли, каждый раз вначале мы проверяем если этот элемент если да то удаляем.
	Существует myImg myId
	Далее каждый раз вначале выполнения каждого эффекта мы проверяем что нам поступает в качетсвет изображения, если это элемент canvas то 
	мы его заменяем на img элемент и далее выпонляем стандартные операции по превращению img в canvas (выгрузкой пикселей на холст делая магию)
	Прочие блоки с условиями тут только для того чтобы удалять елементы, которые мы добавляем к DOM дереву через appenChild

	Небходимо вызывать функции и проверки из вне полифильно
*/
	$scope.thresh = function () {

if (  document.querySelectorAll('canvas#myId')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId"));
    var imgCol = document.getElementById('imageColumn');
    imgCol.appendChild(image)
    image.id = "myImg";

    document.querySelectorAll('canvas#myId')[0].remove()
}

		//console.log(image);
		//console.log($scope.imagePath);
		//console.log(document.getElementById('mainImage').src);
		//console.log(document.getElementById('mainImage'));

		/*
		var control = document.getElementById('myId');
		var control_canvas = document.getElementById('myImg');
		var control_angularLoad = document.getElementById('mainImage'); 
		if ( control !== null) {
			control.remove();
		};
		if ( control_angularLoad !== null) {
			control_angularLoad.remove();
		};
		if (control_canvas !== null ) {
			control_canvas.remove();
		}
		*/
	var control_canvas = document.querySelectorAll('canvas#myId').length; // control off canvass members

	var imgCol = document.getElementById('imageColumn');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { // Тут органичение
                		imgCol.appendChild(canvas);
                	}
                	//canvas.className  = "myClass";
					canvas.id = "myId";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	
/*
	var img; 
	if ( document.querySelectorAll('#myId').length < 1  ) {
		img = document.getElementById('myImg'); // Logick for changing canvas & image
	} else {
		img = document.getElementById('myId'); // id!
	};

    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('threshold', c, 140); // Совмщеать
        runTests();

        };


	if ( document.querySelectorAll('#myId').length < 1  ) {
		img.src = document.getElementById('myImg').src;
		document.getElementById('myImg').remove();
	} else {
		//img.src = document.getElementById('myId').src;
		img.src = document.getElementById('myId').src;
	};
		console.log('rabotaet');

        //var imageCanvas_2 = document.getElementById('myImg');
        //imageCanvas_2.style.display = 'none';
  */
	var img; 
	if ( document.querySelectorAll('#myId').length < 1  ) {
		img = document.getElementById('myImg'); // Logick for changing canvas & image
	} else {
		img = document.getElementById('myId'); // id!
	};

    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('threshold', c, 140); // Совмщеать
        runTests();

        };


	if ( document.querySelectorAll('#myId').length < 1  ) {
		img.src = document.getElementById('myImg').src;
		document.getElementById('myImg').remove();
	} else {
		//img.src = document.getElementById('myId').src;
		img.src = document.getElementById('myId').src;
	};
		console.log('rabotaet');

        //var imageCanvas_2 = document.getElementById('myImg');
        //imageCanvas_2.style.display = 'none';
	}

	$scope.thresh_2 = function () {

	if (  document.querySelectorAll('canvas#myId_2')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_2"));
    var imgCol = document.getElementById('imageColumn_2');
    imgCol.appendChild(image)
    image.id = "myImg_2";

    document.querySelectorAll('canvas#myId_2')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_2').length;

	var imgCol = document.getElementById('imageColumn_2');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { // Тут органичение
                		imgCol.appendChild(canvas);
                	}
                	//canvas.className  = "myClass";
					canvas.id = "myId_2";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId_2').length < 1  ) {
		img = document.getElementById('myImg_2'); 
	} else {
		img = document.getElementById('myId_2'); 
	};

    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('threshold', c, 140); // Совмщеать
        runTests();

        };


	if ( document.querySelectorAll('#myId_2').length < 1  ) {
		img.src = document.getElementById('myImg_2').src;
		document.getElementById('myImg_2').remove();
	} else {
		//img.src = document.getElementById('myId').src;
		img.src = document.getElementById('myId_2').src;
	};
		console.log('rabotaet_2');

	}

	$scope.thresh_3 = function () {

	if (  document.querySelectorAll('canvas#myId_3')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_3"));
    var imgCol = document.getElementById('imageColumn_3');
    imgCol.appendChild(image)
    image.id = "myImg_3";

    document.querySelectorAll('canvas#myId_3')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_3').length;

	var imgCol = document.getElementById('imageColumn_3');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { // Тут органичение
                		imgCol.appendChild(canvas);
                	}
                	//canvas.className  = "myClass";
					canvas.id = "myId_3";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img = document.getElementById('myImg_3'); 
	} else {
		img = document.getElementById('myId_3'); 
	};

    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('threshold', c, 140); // Совмщеать
        runTests();

        };


	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img.src = document.getElementById('myImg_3').src;
		document.getElementById('myImg_3').remove();
	} else {
		//img.src = document.getElementById('myId').src;
		img.src = document.getElementById('myId_3').src;
	};
		console.log('rabotaet_3');	

	}

	// BRIGHTNESS

	$scope.brightness = function () {

	if (  document.querySelectorAll('canvas#myId')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId"));
    var imgCol = document.getElementById('imageColumn');
    imgCol.appendChild(image)
    image.id = "myImg";

    document.querySelectorAll('canvas#myId')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId').length; 

	var imgCol = document.getElementById('imageColumn');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId').length < 1  ) {
		img = document.getElementById('myImg'); // Logick for changing canvas & image
	} else {
		img = document.getElementById('myId'); // id!
	};

    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('brightness', c, 15); 
        runTests();

        };


	if ( document.querySelectorAll('#myId').length < 1  ) {
		img.src = document.getElementById('myImg').src;
		document.getElementById('myImg').remove();
	} else {
		img.src = document.getElementById('myId').src;
	};
		console.log('rabotaet_bri');

	}

	$scope.brightness_2 = function () {

		if (  document.querySelectorAll('canvas#myId_2')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_2"));
    var imgCol = document.getElementById('imageColumn_2');
    imgCol.appendChild(image)
    image.id = "myImg_2";

    document.querySelectorAll('canvas#myId_2')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_2').length; 

	var imgCol = document.getElementById('imageColumn_2');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId_2";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId_2').length < 1  ) {
		img = document.getElementById('myImg_2'); // Logick for changing canvas & image
	} else {
		img = document.getElementById('myId_2'); // id!
	};

    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('brightness', c, 15); 
        runTests();

        };


	if ( document.querySelectorAll('#myId_2').length < 1  ) {
		img.src = document.getElementById('myImg_2').src;
		document.getElementById('myImg_2').remove();
	} else {
		img.src = document.getElementById('myId_2').src;
	};
		console.log('rabotaet_bri_2');

	}

	$scope.brightness_3 = function () {

	if (  document.querySelectorAll('canvas#myId_3')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_3"));
    var imgCol = document.getElementById('imageColumn_3');
    imgCol.appendChild(image)
    image.id = "myImg_3";

    document.querySelectorAll('canvas#myId_3')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_3').length; 

	var imgCol = document.getElementById('imageColumn_3');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId_3";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img = document.getElementById('myImg_3'); 
	} else {
		img = document.getElementById('myId_3'); 
	};

    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('brightness', c, 15); 
        runTests();

        };

	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img.src = document.getElementById('myImg_3').src;
		document.getElementById('myImg_3').remove();
	} else {
		img.src = document.getElementById('myId_3').src;
	};
		console.log('rabotaet_bri_3');

	}

	// SOBEL

	$scope.sobel = function () {

if (  document.querySelectorAll('canvas#myId')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId"));
    var imgCol = document.getElementById('imageColumn');
    imgCol.appendChild(image)
    image.id = "myImg";

    document.querySelectorAll('canvas#myId')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId').length; 

	var imgCol = document.getElementById('imageColumn');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId').length < 1  ) {
		img = document.getElementById('myImg'); 
	} else {
		img = document.getElementById('myId'); 
	};

    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('sobel', c); 
        runTests();

        };

	if ( document.querySelectorAll('#myId').length < 1  ) {
		img.src = document.getElementById('myImg').src;
		document.getElementById('myImg').remove();
	} else {
		img.src = document.getElementById('myId').src;
	};
		console.log('rabotaet_sob');

	}

	$scope.sobel_2 = function () {

	if (  document.querySelectorAll('canvas#myId_2')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_2"));
    var imgCol = document.getElementById('imageColumn_2');
    imgCol.appendChild(image)
    image.id = "myImg_2";

    document.querySelectorAll('canvas#myId_2')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_2').length; 

	var imgCol = document.getElementById('imageColumn_2');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId_2";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId_2').length < 1  ) {
		img = document.getElementById('myImg_2'); 
	} else {
		img = document.getElementById('myId_2'); 
	};

    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('sobel', c); 
        runTests();

        };

	if ( document.querySelectorAll('#myId_2').length < 1  ) {
		img.src = document.getElementById('myImg_2').src;
		document.getElementById('myImg_2').remove();
	} else {
		img.src = document.getElementById('myId_2').src;
	};
		console.log('rabotaet_sob_2');

	}

	$scope.sobel_3 = function () {

		if (  document.querySelectorAll('canvas#myId_3')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_3"));
    var imgCol = document.getElementById('imageColumn_3');
    imgCol.appendChild(image)
    image.id = "myImg_3";

    document.querySelectorAll('canvas#myId_3')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_3').length; 

	var imgCol = document.getElementById('imageColumn_3');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId_3";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img = document.getElementById('myImg_3'); 
	} else {
		img = document.getElementById('myId_3'); 
	};

    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('sobel', c, 15); 
        runTests();

        };

	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img.src = document.getElementById('myImg_3').src;
		document.getElementById('myImg_3').remove();
	} else {
		img.src = document.getElementById('myId_3').src;
	};
		console.log('rabotaet_sob_3');

	}

		// LAPLACE

	$scope.laplace = function () {

	if (  document.querySelectorAll('canvas#myId')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId"));
    var imgCol = document.getElementById('imageColumn');
    imgCol.appendChild(image)
    image.id = "myImg";

    document.querySelectorAll('canvas#myId')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId').length; 

	var imgCol = document.getElementById('imageColumn');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId').length < 1  ) {
		img = document.getElementById('myImg'); 
	} else {
		img = document.getElementById('myId'); 
	};

    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('laplace', c); 
        runTests();

        };

	if ( document.querySelectorAll('#myId').length < 1  ) {
		img.src = document.getElementById('myImg').src;
		document.getElementById('myImg').remove();
	} else {
		img.src = document.getElementById('myId').src;
	};
		console.log('rabotaet_lap');

	}

	$scope.laplace_2 = function () {

	if (  document.querySelectorAll('canvas#myId_2')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_2"));
    var imgCol = document.getElementById('imageColumn_2');
    imgCol.appendChild(image)
    image.id = "myImg_2";

    document.querySelectorAll('canvas#myId_2')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_2').length; 

	var imgCol = document.getElementById('imageColumn_2');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId_2";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId_2').length < 1  ) {
		img = document.getElementById('myImg_2'); 
	} else {
		img = document.getElementById('myId_2'); 
	};

    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('laplace', c); 
        runTests();

        };

	if ( document.querySelectorAll('#myId_2').length < 1  ) {
		img.src = document.getElementById('myImg_2').src;
		document.getElementById('myImg_2').remove();
	} else {
		img.src = document.getElementById('myId_2').src;
	};
		console.log('rabotaet_lap_2');

	}

	$scope.laplace_3 = function () {

		if (  document.querySelectorAll('canvas#myId_3')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_3"));
    var imgCol = document.getElementById('imageColumn_3');
    imgCol.appendChild(image)
    image.id = "myImg_3";

    document.querySelectorAll('canvas#myId_3')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_3').length; 

	var imgCol = document.getElementById('imageColumn_3');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId_3";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img = document.getElementById('myImg_3'); 
	} else {
		img = document.getElementById('myId_3'); 
	};

    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('laplace', c, 15); 
        runTests();

        };

	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img.src = document.getElementById('myImg_3').src;
		document.getElementById('myImg_3').remove();
	} else {
		img.src = document.getElementById('myId_3').src;
	};
		console.log('rabotaet_lap_3');

	}

	// GRAYSCALE

	$scope.grayscale = function () {

	if (  document.querySelectorAll('canvas#myId')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId"));
    var imgCol = document.getElementById('imageColumn');
    imgCol.appendChild(image)
    image.id = "myImg";

    document.querySelectorAll('canvas#myId')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId').length; 

	var imgCol = document.getElementById('imageColumn');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId').length < 1  ) {
		img = document.getElementById('myImg'); 
	} else {
		img = document.getElementById('myId'); 
	};

    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('grayscale', c); 
        runTests();

        };

	if ( document.querySelectorAll('#myId').length < 1  ) {
		img.src = document.getElementById('myImg').src;
		document.getElementById('myImg').remove();
	} else {
		img.src = document.getElementById('myId').src;
	};
		console.log('rabotaet_gray');

	}

	$scope.grayscale_2 = function () {

	if (  document.querySelectorAll('canvas#myId_2')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_2"));
    var imgCol = document.getElementById('imageColumn_2');
    imgCol.appendChild(image)
    image.id = "myImg_2";

    document.querySelectorAll('canvas#myId_2')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_2').length; 

	var imgCol = document.getElementById('imageColumn_2');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId_2";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId_2').length < 1  ) {
		img = document.getElementById('myImg_2'); 
	} else {
		img = document.getElementById('myId_2'); 
	};

    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('grayscale', c); 
        runTests();

        };

	if ( document.querySelectorAll('#myId_2').length < 1  ) {
		img.src = document.getElementById('myImg_2').src;
		document.getElementById('myImg_2').remove();
	} else {
		img.src = document.getElementById('myId_2').src;
	};
		console.log('rabotaet_gray_2');

	}

	$scope.grayscale_3 = function () {

		if (  document.querySelectorAll('canvas#myId_3')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_3"));
    var imgCol = document.getElementById('imageColumn_3');
    imgCol.appendChild(image)
    image.id = "myImg_3";

    document.querySelectorAll('canvas#myId_3')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_3').length; 

	var imgCol = document.getElementById('imageColumn_3');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId_3";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img = document.getElementById('myImg_3'); 
	} else {
		img = document.getElementById('myId_3'); 
	};

    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('grayscale', c); 
        runTests();

        };

	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img.src = document.getElementById('myImg_3').src;
		document.getElementById('myImg_3').remove();
	} else {
		img.src = document.getElementById('myId_3').src;
	};
		console.log('rabotaet_gray_3');

	}

	// SUM

	$scope.sum = function () {

if (  document.querySelectorAll('canvas#myId_3')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_3"));
    var imgCol = document.getElementById('imageColumn_3');
    imgCol.appendChild(image)
    image.id = "myImg_3";

    document.querySelectorAll('canvas#myId_3')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_3').length; 

	var imgCol = document.getElementById('imageColumn_3');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId_3";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img = document.getElementById('myImg_3'); 
	} else {
		img = document.getElementById('myId_3'); 
	};


	if ( document.getElementById('myId') == null ) {
		var img = document.getElementById('myImg');
	} else {
		var img = document.getElementById('myId');
	};
	if ( document.getElementById('myId_2') == null ) {
		var img_2 = document.getElementById('myImg_2');
	} else {
		var img = document.getElementById('myId_2');
	}
    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);

        var b = Filters.getPixels(img_2);
        //var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('darkenBlend', c, b); 
        runTests();

        };

	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img.src = document.getElementById('myImg').src;
		document.getElementById('myImg_3').remove();
	} else {
		img.src = document.getElementById('myId').src;
	};
		console.log('rabotaet_gray_3');

	}

	$scope.sum_2 = function () {

		if (  document.querySelectorAll('canvas#myId_3')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_3"));
    var imgCol = document.getElementById('imageColumn_3');
    imgCol.appendChild(image)
    image.id = "myImg_3";

    document.querySelectorAll('canvas#myId_3')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_3').length; 

	var imgCol = document.getElementById('imageColumn_3');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId_3";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img = document.getElementById('myImg_3'); 
	} else {
		img = document.getElementById('myId_3'); 
	};


	if ( document.getElementById('myId') == null ) {
		var img = document.getElementById('myImg');
	} else {
		var img = document.getElementById('myId');
	};
	if ( document.getElementById('myId_2') == null ) {
		var img_2 = document.getElementById('myImg_2');
	} else {
		var img = document.getElementById('myId_2');
	}
    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);

        var b = Filters.getPixels(img_2);
        //var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('darkenBlend', c, b); 
        runTests();

        };

	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img.src = document.getElementById('myImg').src;
		document.getElementById('myImg_3').remove();
	} else {
		img.src = document.getElementById('myId').src;
	};
		console.log('rabotaet_gray_3');

	}

	$scope.sum_3 = function () {

		if (  document.querySelectorAll('canvas#myId_3')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_3"));
    var imgCol = document.getElementById('imageColumn_3');
    imgCol.appendChild(image)
    image.id = "myImg_3";

    document.querySelectorAll('canvas#myId_3')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_3').length; 

	var imgCol = document.getElementById('imageColumn_3');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId_3";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img = document.getElementById('myImg_3'); 
	} else {
		img = document.getElementById('myId_3'); 
	};


	if ( document.getElementById('myId') == null ) {
		var img = document.getElementById('myImg');
	} else {
		var img = document.getElementById('myId');
	};
	if ( document.getElementById('myId_2') == null ) {
		var img_2 = document.getElementById('myImg_2');
	} else {
		var img = document.getElementById('myId_2');
	}
    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);

        var b = Filters.getPixels(img_2);
        //var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('darkenBlend', c, b); 
        runTests();

        };

	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img.src = document.getElementById('myImg').src;
		document.getElementById('myImg_3').remove();
	} else {
		img.src = document.getElementById('myId').src;
	};
		console.log('rabotaet_gray_3');

	}











	$scope.test = function () {



	}


	// DIFFERENCE

	$scope.diff = function () {

		if (  document.querySelectorAll('canvas#myId_3')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_3"));
    var imgCol = document.getElementById('imageColumn_3');
    imgCol.appendChild(image)
    image.id = "myImg_3";

    document.querySelectorAll('canvas#myId_3')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_3').length; 

	var imgCol = document.getElementById('imageColumn_3');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId_3";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img = document.getElementById('myImg_3'); 
	} else {
		img = document.getElementById('myId_3'); 
	};


	if ( document.getElementById('myId') == null ) {
		var img = document.getElementById('myImg');
	} else {
		var img = document.getElementById('myId');
	};
	if ( document.getElementById('myId_2') == null ) {
		var img_2 = document.getElementById('myImg_2');
	} else {
		var img = document.getElementById('myId_2');
	}
    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);

        var b = Filters.getPixels(img_2);
        //var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('differenceBlend', c, b); 
        runTests();

        };

	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img.src = document.getElementById('myImg').src;
		document.getElementById('myImg_3').remove();
	} else {
		img.src = document.getElementById('myId').src;
	};
		console.log('rabotaet_gray_3');

	}

	$scope.diff_2 = function () {

		if (  document.querySelectorAll('canvas#myId_3')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_3"));
    var imgCol = document.getElementById('imageColumn_3');
    imgCol.appendChild(image)
    image.id = "myImg_3";

    document.querySelectorAll('canvas#myId_3')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_3').length; 

	var imgCol = document.getElementById('imageColumn_3');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId_3";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img = document.getElementById('myImg_3'); 
	} else {
		img = document.getElementById('myId_3'); 
	};


	if ( document.getElementById('myId') == null ) {
		var img = document.getElementById('myImg');
	} else {
		var img = document.getElementById('myId');
	};
	if ( document.getElementById('myId_2') == null ) {
		var img_2 = document.getElementById('myImg_2');
	} else {
		var img = document.getElementById('myId_2');
	}
    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);

        var b = Filters.getPixels(img_2);
        //var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('differenceBlend', c, b); 
        runTests();

        };

	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img.src = document.getElementById('myImg').src;
		document.getElementById('myImg_3').remove();
	} else {
		img.src = document.getElementById('myId').src;
	};
		console.log('rabotaet_gray_3');

	}

	$scope.diff_3 = function () {

		if (  document.querySelectorAll('canvas#myId_3')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_3"));
    var imgCol = document.getElementById('imageColumn_3');
    imgCol.appendChild(image)
    image.id = "myImg_3";

    document.querySelectorAll('canvas#myId_3')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_3').length; 

	var imgCol = document.getElementById('imageColumn_3');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId_3";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img = document.getElementById('myImg_3'); 
	} else {
		img = document.getElementById('myId_3'); 
	};


	if ( document.getElementById('myId') == null ) {
		var img = document.getElementById('myImg');
	} else {
		var img = document.getElementById('myId');
	};
	if ( document.getElementById('myId_2') == null ) {
		var img_2 = document.getElementById('myImg_2');
	} else {
		var img = document.getElementById('myId_2');
	}
    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);

        var b = Filters.getPixels(img_2);
        //var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('differenceBlend', c, b); 
        runTests();

        };

	if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img.src = document.getElementById('myImg').src;
		document.getElementById('myImg_3').remove();
	} else {
		img.src = document.getElementById('myId').src;
	};
		console.log('rabotaet_gray_3');

	}

	// MOVE

	$scope.move = function () {

	if (  document.querySelectorAll('canvas#myId')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId"));
    var imgCol = document.getElementById('imageColumn');
    imgCol.appendChild(image)
    image.id = "myImg";

    document.querySelectorAll('canvas#myId')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId').length; 

	var imgCol = document.getElementById('imageColumn');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if ( control_canvas < 1 ) {
                	imgCol.appendChild(canvas);
					canvas.id = "myId";
                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img = document.getElementById('myImg');
    img.onload = function() {
      	var c = Filters.movePixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('movePixels', img);
        runTests();

        };

    if ( document.querySelectorAll('#myId').length < 1  ) {
		img.src = document.getElementById('myImg').src;
		document.getElementById('myImg').remove();
	} else {
		img.src = document.getElementById('myId').src;
	};
		console.log('rabotaet_move');


	}

	$scope.move_2 = function () {

	if (  document.querySelectorAll('canvas#myId_2')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_2"));
    var imgCol = document.getElementById('imageColumn_2');
    imgCol.appendChild(image)
    image.id = "myImg_2";

    document.querySelectorAll('canvas#myId_2')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_2').length; 

	var imgCol = document.getElementById('imageColumn_2');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if ( control_canvas < 1 ) {
                	imgCol.appendChild(canvas);
					canvas.id = "myId_2";
                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img = document.getElementById('myImg_2');
    img.onload = function() {
      	var c = Filters.movePixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('movePixels', img);
        runTests();

        };

    if ( document.querySelectorAll('#myId_2').length < 1  ) {
		img.src = document.getElementById('myImg_2').src;
		document.getElementById('myImg_2').remove();
	} else {
		img.src = document.getElementById('myId_2').src;
	};
		console.log('rabotaet_move_3');

	}

	$scope.move_3 = function () {

			if (  document.querySelectorAll('canvas#myId_3')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_3"));
    var imgCol = document.getElementById('imageColumn_3');
    imgCol.appendChild(image)
    image.id = "myImg_3";

    document.querySelectorAll('canvas#myId_3')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_3').length; 

	var imgCol = document.getElementById('imageColumn_3');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if ( control_canvas < 1 ) {
                	imgCol.appendChild(canvas);
					canvas.id = "myId_3";
                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img = document.getElementById('myImg_3');
    img.onload = function() {
      	var c = Filters.movePixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('movePixels', img);
        runTests();

        };

    if ( document.querySelectorAll('#myId_3').length < 1  ) {
		img.src = document.getElementById('myImg_3').src;
		document.getElementById('myImg_3').remove();
	} else {
		img.src = document.getElementById('myId_3').src;
	};
		console.log('rabotaet_move_3');

	}

/*

	COPY

*/

$scope.copy_1to2 = function () {

	if (  document.querySelectorAll('canvas#myId_2')[0] !== undefined ) {
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId_2"));
    var imgCol = document.getElementById('imageColumn_2');
    imgCol.appendChild(image)
    image.id = "myImg_2";

    document.querySelectorAll('canvas#myId_2')[0].remove()
}

	var control_canvas = document.querySelectorAll('canvas#myId_2').length; 

	var imgCol = document.getElementById('imageColumn_2');
    var tests = [];
    var test = function(name, var_args) {
    	var args = [];
    	for (var i=1; i<arguments.length; i++)
        	args.push(arguments[i]);
        tests.push({name:name, args:args});
      };

    var runTests = function() {
        if (tests.length == 0) {
        } else {
          var test = tests.shift();
          setTimeout(function() {
            setTimeout(function() {
              var canvas = null;
              try {
                var res = Filters[test.name].apply(Filters, test.args);
                if (res.width && res.height && res.data && res.width*res.height*4 == res.data.length) {
                  var count = 1;
                    var r1 = Filters[test.name].apply(Filters, test.args);
                    if (r1.width != res.width) {
                      throw(test.name + ': inconsistent widths');
                    count++;
                  }
                  canvas = Filters.toCanvas(res);
                }
                if (canvas != null) {     

                	if ( control_canvas < 1) { 
                		imgCol.appendChild(canvas);
                	}
					canvas.id = "myId_2";

                }
              } catch(e) {
                console.log(e);
              }
              runTests();
            }, 0);
          }, 0);
        }
      };	

	var img; 
	if ( document.querySelectorAll('#myId_2').length < 1  ) {
		img = document.getElementById('myImg_2'); 
	} else {
		img = document.getElementById('myId_2'); 
	};

    img.onload = function() {
      	var c = Filters.getPixels(img);
        var a = Filters.getCanvas(430,430);
        var b = Filters.verticalFlip(Filters.horizontalFlip(c));
        var d = Filters.filterImage(Filters.grayscale, img);
        var identityLUT = {
        	r: Filters.identityLUT(),
        	g: Filters.identityLUT(),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };
        var invertLUT = {
          	r: Filters.invertLUT(),
        	g: Filters.invertLUT(),
        	b: Filters.invertLUT(),
        	a: Filters.identityLUT()
        };
        var lut = {
        	r: Filters.identityLUT(),
          	g: Filters.createLUTFromCurve([[0,0], [10,0], [128,58], [200,222], [225,255]]),
          	b: Filters.identityLUT(),
          	a: Filters.identityLUT()
        };

        test('getPixels', img); 
        runTests();

        };

	if ( document.querySelectorAll('#myId_2').length < 1  ) {
		img.src = document.getElementById('myImg').src;
		document.getElementById('myImg_2').remove();
	} else {
		img.src = document.getElementById('myId_2').src;
	};
		console.log('rabotaet_lap_2');

	}























/* 
	LOAD IMAGE
*/

	$scope.onloadImage = function() {

		var control_angularLoad = document.getElementById('mainImage'); 
		var control_canvas = document.getElementById('myImg');
		var control = document.getElementById('myId');
			if ( control_angularLoad !== null) {
				control_angularLoad.remove();
			};
			if ( control_canvas !== null) {
				control_canvas.remove();
			};
			if ( control !== null) {
				control.remove();
			};

		function img() {
  			var new_img = document.getElementById('imageColumn');
  			var img = document.createElement('img');
  			img.setAttribute('src', 'i/1_v.jpg');
  			img.id = "myImg";
  			new_img.appendChild(img);
		}

		img();
	};
	$scope.onloadImage_2 = function() {

		var control_angularLoad = document.getElementById('mainImage_2'); 
		var control_canvas = document.getElementById('myImg_2');
		var control = document.getElementById('myId_2');
			if ( control_angularLoad !== null) {
				control_angularLoad.remove();
			};
			if ( control_canvas !== null) {
				control_canvas.remove();
			};
			if ( control !== null) {
				control.remove();
			};

		function img() {
  			var new_img = document.getElementById('imageColumn_2');
  			var img = document.createElement('img');
  			img.setAttribute('src', 'i/1_c.jpg');
  			img.id = "myImg_2";
  			new_img.appendChild(img);
		}

		img();
	};
	$scope.onloadImage_3 = function() {

		var control_angularLoad = document.getElementById('mainImage_3'); 
		var control_canvas = document.getElementById('myImg_3');
		var control = document.getElementById('myId_3');
			if ( control_angularLoad !== null) {
				control_angularLoad.remove();
			};
			if ( control_canvas !== null) {
				control_canvas.remove();
			};
			if ( control !== null) {
				control.remove();
			};

		function img() {
  			var new_img = document.getElementById('imageColumn_3');
  			var img = document.createElement('img');
  			img.setAttribute('src', 'i/1_d.jpg');
  			img.id = "myImg_3";
  			new_img.appendChild(img);
		}

		img();
	};

	$scope.change = function() {
		$location.path('/');
	}
	$scope.change_2 = function() {
		$location.path_2('/');
	}
	$scope.change_3 = function() {
		$location.path_3('/');
	}

/*	$scope.saveTest = function() {
 
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}

	var image = getImage(document.getElementById("myId"));
    var imgCol = document.getElementById('imageColumn');
    imgCol.appendChild(image)
    image.id = "myImg";

    document.querySelectorAll('canvas#myId')[0].remove()
	}
*/

	/*
	$scope.save = function() {
		// the magic goes
		const {BrowserWindow} = remote;
		var dimesions = image.getImageDimensions();
		let src = image.getImagePath();

		let styles = imageReference.style.filter;

		let win = new BrowserWindow({
			frame: false,
			show: false,
			width: dimesions.width,
			height: dimesions.height,
			webPreferences: {
				webSecurity: false
			}
		});

		win.loadURL(`data:text/html,
			<style>*{margin:0;padding:0;}</style><img src="${src}" style="filter: ${styles}">
			
			<script>
				var screenshot = require('electron-screenshot');
				screenshot({
					filename: 'userFile.png',
					delay: 1000
				});
			</script>
		
			`);

	};
	*/

	// SAVE IMAGE

	$scope.saveCanvasAsImageFile = function() {

	function testDrawing(){
    	var canvas = document.getElementById("myId");
    	var context = canvas.getContext("2d");
    
    context.save();
    context.beginPath();
    //context.moveTo(10, 10);
    //context.lineTo(290, 290);
    context.stroke();
    context.restore();
	}
 
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}
 
	function saveImage(image) {
    	var link = document.createElement("a");
 
    	link.setAttribute("href", image.src);
    	link.setAttribute("download", "canvasImage");
    	link.click();
	}
 
	testDrawing();

	var image = getImage(document.getElementById("myId"));
    saveImage(image);

	}

	$scope.saveCanvasAsImageFile_2 = function() {

	function testDrawing(){
    	var canvas = document.getElementById("myId_2");
    	var context = canvas.getContext("2d");
    
    context.save();
    context.beginPath();
    context.stroke();
    context.restore();
	}
 
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}
 
	function saveImage(image) {
    	var link = document.createElement("a");
 
    	link.setAttribute("href", image.src);
    	link.setAttribute("download", "canvasImage");
    	link.click();
	}
 
	testDrawing();

	var image = getImage(document.getElementById("myId_2"));
    saveImage(image);

	}

	$scope.saveCanvasAsImageFile_3 = function() {

	function testDrawing(){
    	var canvas = document.getElementById("myId_3");
    	var context = canvas.getContext("2d");
    
    context.save();
    context.beginPath();

    context.stroke();
    context.restore();
	}
 
	function getImage(canvas){
    	var imageData = canvas.toDataURL();
    	var image = new Image();
    	image.src = imageData;
    	return image;
	}
 
	function saveImage(image) {
    	var link = document.createElement("a");
 
    	link.setAttribute("href", image.src);
    	link.setAttribute("download", "canvasImage");
    	link.click();
	}
 
	testDrawing();

	var image = getImage(document.getElementById("myId_3"));
    saveImage(image);

	}

});

/*
	SIMPLE IMAGE LIBRARY (CANVAS)
*/

Filters = {};

if (typeof Float32Array == 'undefined') {
  Filters.getFloat32Array =
  Filters.getUint8Array = function(len) {
    if (len.length) {
      return len.slice(0);
    }
    return new Array(len);
  };
} else {
  Filters.getFloat32Array = function(len) {
    return new Float32Array(len);
  };
  Filters.getUint8Array = function(len) {
    return new Uint8Array(len);
  };
}

if (typeof document != 'undefined') {
  Filters.tmpCanvas = document.createElement('canvas');
  Filters.tmpCtx = Filters.tmpCanvas.getContext('2d');
  
  Filters.getPixels = function(img) {
    var c,ctx;
    if (img.getContext) {
      c = img;
      try { ctx = c.getContext('2d'); } catch(e) {}
    }
    if (!ctx) {
      c = this.getCanvas(img.width, img.height);
      ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
    }
    return ctx.getImageData(0,0,c.width,c.height);
  };

  Filters.movePixels = function(img) {
    var c,ctx;
    if (img.getContext) {
      c = img;
      try { ctx = c.getContext('2d'); } catch(e) {}
    }
    if (!ctx) {
      c = this.getCanvas(img.width, img.height);
      ctx = c.getContext('2d');
      ctx.drawImage(img, 10, 10);
    }
    return ctx.getImageData(0,0,c.width,c.height);
  };

  Filters.createImageData = function(w, h) {
    return this.tmpCtx.createImageData(w, h);
  };
  
  Filters.getCanvas = function(w,h) {
    var c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
  };

  Filters.filterImage = function(filter, image, var_args) {
    var args = [this.getPixels(image)];
    for (var i=2; i<arguments.length; i++) {
      args.push(arguments[i]);
    }
    return filter.apply(this, args);
  };

  Filters.toCanvas = function(pixels) {
    var canvas = this.getCanvas(pixels.width, pixels.height);
    canvas.getContext('2d').putImageData(pixels, 0, 0);
    return canvas;
  };

  Filters.toImageData = function(pixels) {
    return this.identity(pixels);
  };

} else {

  onmessage = function(e) {
    var ds = e.data;
    if (!ds.length) {
      ds = [ds];
    }
    postMessage(Filters.runPipeline(ds));
  };

  Filters.createImageData = function(w, h) {
    return {width: w, height: h, data: this.getFloat32Array(w*h*4)};
  };

}

Filters.runPipeline = function(ds) {
  var res = null;
  res = this[ds[0].name].apply(this, ds[0].args);
  for (var i=1; i<ds.length; i++) {
    var d = ds[i];
    var args = d.args.slice(0);
    args.unshift(res);
    res = this[d.name].apply(this, args);
  }
  return res;
};

Filters.createImageDataFloat32 = function(w, h) {
  return {width: w, height: h, data: this.getFloat32Array(w*h*4)};
};

Filters.identity = function(pixels, args) {
  var output = Filters.createImageData(pixels.width, pixels.height);
  var dst = output.data;
  var d = pixels.data;
  for (var i=0; i<d.length; i++) {
    dst[i] = d[i];
  }
  return output;
};

Filters.horizontalFlip = function(pixels) {
  var output = Filters.createImageData(pixels.width, pixels.height);
  var w = pixels.width;
  var h = pixels.height;
  var dst = output.data;
  var d = pixels.data;
  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var off = (y*w+x)*4;
      var dstOff = (y*w+(w-x-1))*4;
      dst[dstOff] = d[off];
      dst[dstOff+1] = d[off+1];
      dst[dstOff+2] = d[off+2];
      dst[dstOff+3] = d[off+3];
    }
  }
  return output;
};

Filters.verticalFlip = function(pixels) {
  var output = Filters.createImageData(pixels.width, pixels.height);
  var w = pixels.width;
  var h = pixels.height;
  var dst = output.data;
  var d = pixels.data;
  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var off = (y*w+x)*4;
      var dstOff = ((h-y-1)*w+x)*4;
      dst[dstOff] = d[off];
      dst[dstOff+1] = d[off+1];
      dst[dstOff+2] = d[off+2];
      dst[dstOff+3] = d[off+3];
    }
  }
  return output;
};

Filters.luminance = function(pixels, args) {
  var output = Filters.createImageData(pixels.width, pixels.height);
  var dst = output.data;
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    // CIE luminance for the RGB
    var v = 0.2126*r + 0.7152*g + 0.0722*b;
    dst[i] = dst[i+1] = dst[i+2] = v;
    dst[i+3] = d[i+3];
  }
  return output;
};

Filters.grayscale = function(pixels, args) {
  var output = Filters.createImageData(pixels.width, pixels.height);
  var dst = output.data;
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    var v = 0.3*r + 0.59*g + 0.11*b;
    dst[i] = dst[i+1] = dst[i+2] = v;
    dst[i+3] = d[i+3];
  }
  return output;
};

Filters.grayscaleAvg = function(pixels, args) {
  var output = Filters.createImageData(pixels.width, pixels.height);
  var dst = output.data;
  var d = pixels.data;
  var f = 1/3;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    var v = (r+g+b) * f;
    dst[i] = dst[i+1] = dst[i+2] = v;
    dst[i+3] = d[i+3];
  }
  return output;
};

Filters.threshold = function(pixels, threshold, high, low) {
  var output = Filters.createImageData(pixels.width, pixels.height);
  if (high == null) high = 255;
  if (low == null) low = 0;
  var d = pixels.data;
  var dst = output.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    var v = (0.3*r + 0.59*g + 0.11*b >= threshold) ? high : low;
    dst[i] = dst[i+1] = dst[i+2] = v;
    dst[i+3] = d[i+3];
  }
  return output;
};

Filters.invert = function(pixels) {
  var output = Filters.createImageData(pixels.width, pixels.height);
  var d = pixels.data;
  var dst = output.data;
  for (var i=0; i<d.length; i+=4) {
    dst[i] = 255-d[i];
    dst[i+1] = 255-d[i+1];
    dst[i+2] = 255-d[i+2];
    dst[i+3] = d[i+3];
  }
  return output;
};

Filters.brightnessContrast = function(pixels, brightness, contrast) {
  var lut = this.brightnessContrastLUT(brightness, contrast);
  return this.applyLUT(pixels, {r:lut, g:lut, b:lut, a:this.identityLUT()});
};

Filters.brightness = function(pixels, adjustment) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    d[i] += adjustment;
    d[i+1] += adjustment;
    d[i+2] += adjustment;
  }
  return pixels;
};

Filters.applyLUT = function(pixels, lut) {
  var output = Filters.createImageData(pixels.width, pixels.height);
  var d = pixels.data;
  var dst = output.data;
  var r = lut.r;
  var g = lut.g;
  var b = lut.b;
  var a = lut.a;
  for (var i=0; i<d.length; i+=4) {
    dst[i] = r[d[i]];
    dst[i+1] = g[d[i+1]];
    dst[i+2] = b[d[i+2]];
    dst[i+3] = a[d[i+3]];
  }
  return output;
};

Filters.createLUTFromCurve = function(points) {
  var lut = this.getUint8Array(256);
  var p = [0, 0];
  for (var i=0,j=0; i<lut.length; i++) {
    while (j < points.length && points[j][0] < i) {
      p = points[j];
      j++;
    }
    lut[i] = p[1];
  }
  return lut;
};

Filters.identityLUT = function() {
  var lut = this.getUint8Array(256);
  for (var i=0; i<lut.length; i++) {
    lut[i] = i;
  }
  return lut;
};

Filters.invertLUT = function() {
  var lut = this.getUint8Array(256);
  for (var i=0; i<lut.length; i++) {
    lut[i] = 255-i;
  }
  return lut;
};

Filters.brightnessContrastLUT = function(brightness, contrast) {
  var lut = this.getUint8Array(256);
  var contrastAdjust = -128*contrast + 128;
  var brightnessAdjust = 255 * brightness;
  var adjust = contrastAdjust + brightnessAdjust;
  for (var i=0; i<lut.length; i++) {
    var c = i*contrast + adjust;
    lut[i] = c < 0 ? 0 : (c > 255 ? 255 : c);
  }
  return lut;
};

Filters.convolve = function(pixels, weights, opaque) {
  var side = Math.round(Math.sqrt(weights.length));
  var halfSide = Math.floor(side/2);

  var src = pixels.data;
  var sw = pixels.width;
  var sh = pixels.height;

  var w = sw;
  var h = sh;
  var output = Filters.createImageData(w, h);
  var dst = output.data;

  var alphaFac = opaque ? 1 : 0;

  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var dstOff = (y*w+x)*4;
      var r=0, g=0, b=0, a=0;
      for (var cy=0; cy<side; cy++) {
        for (var cx=0; cx<side; cx++) {
          var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
          var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
          var srcOff = (scy*sw+scx)*4;
          var wt = weights[cy*side+cx];
          r += src[srcOff] * wt;
          g += src[srcOff+1] * wt;
          b += src[srcOff+2] * wt;
          a += src[srcOff+3] * wt;
        }
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a + alphaFac*(255-a);
    }
  }
  return output;
};

Filters.verticalConvolve = function(pixels, weightsVector, opaque) {
  var side = weightsVector.length;
  var halfSide = Math.floor(side/2);

  var src = pixels.data;
  var sw = pixels.width;
  var sh = pixels.height;

  var w = sw;
  var h = sh;
  var output = Filters.createImageData(w, h);
  var dst = output.data;

  var alphaFac = opaque ? 1 : 0;

  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var dstOff = (y*w+x)*4;
      var r=0, g=0, b=0, a=0;
      for (var cy=0; cy<side; cy++) {
        var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
        var scx = sx;
        var srcOff = (scy*sw+scx)*4;
        var wt = weightsVector[cy];
        r += src[srcOff] * wt;
        g += src[srcOff+1] * wt;
        b += src[srcOff+2] * wt;
        a += src[srcOff+3] * wt;
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a + alphaFac*(255-a);
    }
  }
  return output;
};

Filters.horizontalConvolve = function(pixels, weightsVector, opaque) {
  var side = weightsVector.length;
  var halfSide = Math.floor(side/2);

  var src = pixels.data;
  var sw = pixels.width;
  var sh = pixels.height;

  var w = sw;
  var h = sh;
  var output = Filters.createImageData(w, h);
  var dst = output.data;

  var alphaFac = opaque ? 1 : 0;

  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var dstOff = (y*w+x)*4;
      var r=0, g=0, b=0, a=0;
      for (var cx=0; cx<side; cx++) {
        var scy = sy;
        var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
        var srcOff = (scy*sw+scx)*4;
        var wt = weightsVector[cx];
        r += src[srcOff] * wt;
        g += src[srcOff+1] * wt;
        b += src[srcOff+2] * wt;
        a += src[srcOff+3] * wt;
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a + alphaFac*(255-a);
    }
  }
  return output;
};

Filters.separableConvolve = function(pixels, horizWeights, vertWeights, opaque) {
  return this.horizontalConvolve(
    this.verticalConvolveFloat32(pixels, vertWeights, opaque),
    horizWeights, opaque
  );
};

Filters.convolveFloat32 = function(pixels, weights, opaque) {
  var side = Math.round(Math.sqrt(weights.length));
  var halfSide = Math.floor(side/2);

  var src = pixels.data;
  var sw = pixels.width;
  var sh = pixels.height;

  var w = sw;
  var h = sh;
  var output = Filters.createImageDataFloat32(w, h);
  var dst = output.data;

  var alphaFac = opaque ? 1 : 0;

  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var dstOff = (y*w+x)*4;
      var r=0, g=0, b=0, a=0;
      for (var cy=0; cy<side; cy++) {
        for (var cx=0; cx<side; cx++) {
          var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
          var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
          var srcOff = (scy*sw+scx)*4;
          var wt = weights[cy*side+cx];
          r += src[srcOff] * wt;
          g += src[srcOff+1] * wt;
          b += src[srcOff+2] * wt;
          a += src[srcOff+3] * wt;
        }
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a + alphaFac*(255-a);
    }
  }
  return output;
};


Filters.verticalConvolveFloat32 = function(pixels, weightsVector, opaque) {
  var side = weightsVector.length;
  var halfSide = Math.floor(side/2);

  var src = pixels.data;
  var sw = pixels.width;
  var sh = pixels.height;

  var w = sw;
  var h = sh;
  var output = Filters.createImageDataFloat32(w, h);
  var dst = output.data;

  var alphaFac = opaque ? 1 : 0;

  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var dstOff = (y*w+x)*4;
      var r=0, g=0, b=0, a=0;
      for (var cy=0; cy<side; cy++) {
        var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
        var scx = sx;
        var srcOff = (scy*sw+scx)*4;
        var wt = weightsVector[cy];
        r += src[srcOff] * wt;
        g += src[srcOff+1] * wt;
        b += src[srcOff+2] * wt;
        a += src[srcOff+3] * wt;
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a + alphaFac*(255-a);
    }
  }
  return output;
};

Filters.horizontalConvolveFloat32 = function(pixels, weightsVector, opaque) {
  var side = weightsVector.length;
  var halfSide = Math.floor(side/2);

  var src = pixels.data;
  var sw = pixels.width;
  var sh = pixels.height;

  var w = sw;
  var h = sh;
  var output = Filters.createImageDataFloat32(w, h);
  var dst = output.data;

  var alphaFac = opaque ? 1 : 0;

  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var dstOff = (y*w+x)*4;
      var r=0, g=0, b=0, a=0;
      for (var cx=0; cx<side; cx++) {
        var scy = sy;
        var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
        var srcOff = (scy*sw+scx)*4;
        var wt = weightsVector[cx];
        r += src[srcOff] * wt;
        g += src[srcOff+1] * wt;
        b += src[srcOff+2] * wt;
        a += src[srcOff+3] * wt;
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a + alphaFac*(255-a);
    }
  }
  return output;
};

Filters.separableConvolveFloat32 = function(pixels, horizWeights, vertWeights, opaque) {
  return this.horizontalConvolveFloat32(
    this.verticalConvolveFloat32(pixels, vertWeights, opaque),
    horizWeights, opaque
  );
};

Filters.gaussianBlur = function(pixels, diameter) {
  diameter = Math.abs(diameter);
  if (diameter <= 1) return Filters.identity(pixels);
  var radius = diameter / 2;
  var len = Math.ceil(diameter) + (1 - (Math.ceil(diameter) % 2))
  var weights = this.getFloat32Array(len);
  var rho = (radius+0.5) / 3;
  var rhoSq = rho*rho;
  var gaussianFactor = 1 / Math.sqrt(2*Math.PI*rhoSq);
  var rhoFactor = -1 / (2*rho*rho)
  var wsum = 0;
  var middle = Math.floor(len/2);
  for (var i=0; i<len; i++) {
    var x = i-middle;
    var gx = gaussianFactor * Math.exp(x*x*rhoFactor);
    weights[i] = gx;
    wsum += gx;
  }
  for (var i=0; i<weights.length; i++) {
    weights[i] /= wsum;
  }
  return Filters.separableConvolve(pixels, weights, weights, false);
};

Filters.laplaceKernel = Filters.getFloat32Array(
  [-1,-1,-1,
   -1, 8,-1,
   -1,-1,-1]);
Filters.laplace = function(pixels) {
  return Filters.convolve(pixels, this.laplaceKernel, true);
};

Filters.sobelSignVector = Filters.getFloat32Array([-1,0,1]);
Filters.sobelScaleVector = Filters.getFloat32Array([1,2,1]);

Filters.sobelVerticalGradient = function(px) {
  return this.separableConvolveFloat32(px, this.sobelSignVector, this.sobelScaleVector);
};

Filters.sobelHorizontalGradient = function(px) {
  return this.separableConvolveFloat32(px, this.sobelScaleVector, this.sobelSignVector);
};

Filters.sobelVectors = function(px) {
  var vertical = this.sobelVerticalGradient(px);
  var horizontal = this.sobelHorizontalGradient(px);
  var id = {width: vertical.width, height: vertical.height,
            data: this.getFloat32Array(vertical.width*vertical.height*8)};
  var vd = vertical.data;
  var hd = horizontal.data;
  var idd = id.data;
  for (var i=0,j=0; i<idd.length; i+=2,j++) {
    idd[i] = hd[j];
    idd[i+1] = vd[j];
  }
  return id;
};

Filters.sobel = function(px) {
  px = this.grayscale(px);
  var vertical = this.sobelVerticalGradient(px);
  var horizontal = this.sobelHorizontalGradient(px);
  var id = this.createImageData(vertical.width, vertical.height);
  for (var i=0; i<id.data.length; i+=4) {
    var v = Math.abs(vertical.data[i]);
    id.data[i] = v;
    var h = Math.abs(horizontal.data[i]);
    id.data[i+1] = h;
    id.data[i+2] = (v+h)/4;
    id.data[i+3] = 255;
  }
  return id;
};

Filters.bilinearSample = function (pixels, x, y, rgba) {
  var x1 = Math.floor(x);
  var x2 = Math.ceil(x);
  var y1 = Math.floor(y);
  var y2 = Math.ceil(y);
  var a = (x1+pixels.width*y1)*4;
  var b = (x2+pixels.width*y1)*4;
  var c = (x1+pixels.width*y2)*4;
  var d = (x2+pixels.width*y2)*4;
  var df = ((x-x1) + (y-y1));
  var cf = ((x2-x) + (y-y1));
  var bf = ((x-x1) + (y2-y));
  var af = ((x2-x) + (y2-y));
  var rsum = 1/(af+bf+cf+df);
  af *= rsum;
  bf *= rsum;
  cf *= rsum;
  df *= rsum;
  var data = pixels.data;
  rgba[0] = data[a]*af + data[b]*bf + data[c]*cf + data[d]*df;
  rgba[1] = data[a+1]*af + data[b+1]*bf + data[c+1]*cf + data[d+1]*df;
  rgba[2] = data[a+2]*af + data[b+2]*bf + data[c+2]*cf + data[d+2]*df;
  rgba[3] = data[a+3]*af + data[b+3]*bf + data[c+3]*cf + data[d+3]*df;
  return rgba;
};

Filters.distortSine = function(pixels, amount, yamount) {
  if (amount == null) amount = 0.5;
  if (yamount == null) yamount = amount;
  var output = this.createImageData(pixels.width, pixels.height);
  var dst = output.data;
  var d = pixels.data;
  var px = this.createImageData(1,1).data;
  for (var y=0; y<output.height; y++) {
    var sy = -Math.sin(y/(output.height-1) * Math.PI*2);
    var srcY = y + sy * yamount * output.height/4;
    srcY = Math.max(Math.min(srcY, output.height-1), 0);

    for (var x=0; x<output.width; x++) {
      var sx = -Math.sin(x/(output.width-1) * Math.PI*2);
      var srcX = x + sx * amount * output.width/4;
      srcX = Math.max(Math.min(srcX, output.width-1), 0);

      var rgba = this.bilinearSample(pixels, srcX, srcY, px);

      var off = (y*output.width+x)*4;
      dst[off] = rgba[0];
      dst[off+1] = rgba[1];
      dst[off+2] = rgba[2];
      dst[off+3] = rgba[3];
    }
  }
  return output;
};

Filters.darkenBlend = function(below, above) {
  var output = Filters.createImageData(below.width, below.height);
  var a = below.data;
  var b = above.data;
  var dst = output.data;
  var f = 1/255;
  for (var i=0; i<a.length; i+=4) {
    dst[i] = a[i] < b[i] ? a[i] : b[i];
    dst[i+1] = a[i+1] < b[i+1] ? a[i+1] : b[i+1];
    dst[i+2] = a[i+2] < b[i+2] ? a[i+2] : b[i+2];
    dst[i+3] = a[i+3]+((255-a[i+3])*b[i+3])*f;
  }
  return output;
};

Filters.lightenBlend = function(below, above) {
  var output = Filters.createImageData(below.width, below.height);
  var a = below.data;
  var b = above.data;
  var dst = output.data;
  var f = 1/255;
  for (var i=0; i<a.length; i+=4) {
    dst[i] = a[i] > b[i] ? a[i] : b[i];
    dst[i+1] = a[i+1] > b[i+1] ? a[i+1] : b[i+1];
    dst[i+2] = a[i+2] > b[i+2] ? a[i+2] : b[i+2];
    dst[i+3] = a[i+3]+((255-a[i+3])*b[i+3])*f;
  }
  return output;
};

Filters.multiplyBlend = function(below, above) {
  var output = Filters.createImageData(below.width, below.height);
  var a = below.data;
  var b = above.data;
  var dst = output.data;
  var f = 1/255;
  for (var i=0; i<a.length; i+=4) {
    dst[i] = (a[i]*b[i])*f;
    dst[i+1] = (a[i+1]*b[i+1])*f;
    dst[i+2] = (a[i+2]*b[i+2])*f;
    dst[i+3] = a[i+3]+((255-a[i+3])*b[i+3])*f;
  }
  return output;
};

Filters.screenBlend = function(below, above) {
  var output = Filters.createImageData(below.width, below.height);
  var a = below.data;
  var b = above.data;
  var dst = output.data;
  var f = 1/255;
  for (var i=0; i<a.length; i+=4) {
    dst[i] = a[i]+b[i]-a[i]*b[i]*f;
    dst[i+1] = a[i+1]+b[i+1]-a[i+1]*b[i+1]*f;
    dst[i+2] = a[i+2]+b[i+2]-a[i+2]*b[i+2]*f;
    dst[i+3] = a[i+3]+((255-a[i+3])*b[i+3])*f;
  }
  return output;
};

Filters.addBlend = function(below, above) {
  var output = Filters.createImageData(below.width, below.height);
  var a = below.data;
  var b = above.data;
  var dst = output.data;
  var f = 1/255;
  for (var i=0; i<a.length; i+=4) {
    dst[i] = (a[i]+b[i]);
    dst[i+1] = (a[i+1]+b[i+1]);
    dst[i+2] = (a[i+2]+b[i+2]);
    dst[i+3] = a[i+3]+((255-a[i+3])*b[i+3])*f;
  }
  return output;
};

Filters.subBlend = function(below, above) {
  var output = Filters.createImageData(below.width, below.height);
  var a = below.data;
  var b = above.data;
  var dst = output.data;
  var f = 1/255;
  for (var i=0; i<a.length; i+=4) {
    dst[i] = (a[i]+b[i]-255);
    dst[i+1] = (a[i+1]+b[i+1]-255);
    dst[i+2] = (a[i+2]+b[i+2]-255);
    dst[i+3] = a[i+3]+((255-a[i+3])*b[i+3])*f;
  }
  return output;
};

Filters.differenceBlend = function(below, above) {
  var output = Filters.createImageData(below.width, below.height);
  var a = below.data;
  var b = above.data;
  var dst = output.data;
  var f = 1/255;
  for (var i=0; i<a.length; i+=4) {
    dst[i] = Math.abs(a[i]-b[i]);
    dst[i+1] = Math.abs(a[i+1]-b[i+1]);
    dst[i+2] = Math.abs(a[i+2]-b[i+2]);
    dst[i+3] = a[i+3]+((255-a[i+3])*b[i+3])*f;
  }
  return output;
};

Filters.erode = function(pixels) {
  var src = pixels.data;
  var sw = pixels.width;
  var sh = pixels.height;

  var w = sw;
  var h = sh;
  var output = Filters.createImageData(w, h);
  var dst = output.data;

  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var dstOff = (y*w+x)*4;
      var srcOff = (sy*sw+sx)*4;
      var v = 0;
      if (src[srcOff] == 0) {
        if (src[(sy*sw+Math.max(0,sx-1))*4] == 0 && 
            src[(Math.max(0,sy-1)*sw+sx)*4] == 0) {
            v = 255;
        }
      } else {
          v = 255;
      }
      dst[dstOff] = v;
      dst[dstOff+1] = v;
      dst[dstOff+2] = v;
      dst[dstOff+3] = 255;
    }
  }
  return output;
};

/*
if (typeof require != 'undefined') {
  exports.Filters = Filters;
}
*/

