/* 
* @Author: apple
* @Date:   2015-12-18 10:36:43
* @Last Modified by:   qin yang
* @Last Modified time: 2016-03-15 11:02:24
*/

;$(function () {
	var colorMap_3 = {
		'gray-primary': 'rgba(0,0,0,0.66)',
		'gray-secondary': 'rgba(0,0,0,0.36)',
		'gray-disable': 'rgba(0,0,0,0.26)',
		'white-primary': 'rgba(255,255,255,0.86)',
		'white-secondary': 'rgba(255,255,255,0.66)',
		'white-disable': 'rgba(255,255,255,0.46)',
		'link-primary': '#0096f6',
		'system-primary': '#617a8b'
	};
	// font-color map
	var colorMap_2 = {};
	for (var key in colorMap_3) {
		colorMap_2[colorMap_3[key]] = [key];
	}
	// 根据字体大小映射的
	var fontSizeMap = {
		'38':['headline3'],
		'28':['headline2'],
		'24':['headline'],
		'18':['header'],
		'16':['subheader'],
		'14':['menu-black','menu-white','body2-black','body2-white'],
		'12':[
			'body1-black','body1-white','body-black','body-white',
			'caption-black','caption-white','disable','link','system']
	};
	// 颜色映射
	var colorMap = {};
	colorMap[colorMap_3['gray-primary']] = [
		'headline3','headline2','headline','header',
		'subheader','menu-black','body2-black','body-black',
		'caption-black'
	];
	colorMap[colorMap_3['gray-secondary']] = ['body1-black'];
	colorMap[colorMap_3['gray-disable']] = ['disable'];
	colorMap[colorMap_3['white-primary']] = ['menu-white','body2-white','body-white'];
	colorMap[colorMap_3['white-secondary']] = ['caption-white'];
	colorMap[colorMap_3['white-disable']] = ['body1-white'];
	colorMap[colorMap_3['link-primary']] = ['link'];
	colorMap[colorMap_3['system-primary']] = ['system'];
	// 差错映射
	var patchMap = {
		'13':'12',
		'11':'12',
		'#86939a':colorMap_3['system-primary'],
		'rgba(255,255,255,0.78)':colorMap_3['white-secondary'],
		'#ffffff':colorMap_3['white-secondary'],
		'rgba(0,0,0,0.34)': colorMap_3['gray-secondary']
	};
	// font-type map 
	var fontTypeMap = {
		'38':['headline3'],
		'28':['headline2'],
		'24':['headline'],
		'18':['title'],
		'16':['subheader'],
		'14':['menu', 'body2'],
		'12':['body1', 'caption']
	};
	

	$(document).click(function (event) {
		setTimeout(function () {
			var code = $('#panel textarea[name="code"]').val().replace(/\n/g, '');
			var styleList = code.split(';');
			var style = {};
			styleList.forEach(function (item) {
				var keyValue = item.split(':');
				if (keyValue.length == 2) {
					style[keyValue[0]] = keyValue[1];
				}
			});
			var fontsize = /^\d+/.exec(style['font-size'])[0];
			var color = style['color'].toLowerCase();
			fontsize = patchMap[fontsize] ? patchMap[fontsize] : fontsize;
			color = patchMap[color] ? patchMap[color] : color;
			var fontSizeMapList = fontSizeMap[fontsize];
			var colorMapList = colorMap[color];
			var fontTypeMapList = fontTypeMap[fontsize];
			var colorMap_2List = colorMap_2[color];
			console.log('fontsize', fontsize);
			console.log('color', color);
			console.log('fontSizeMapList', fontSizeMapList);
			console.log('colorMapList', colorMapList);
			var mixedList = [];// mixedList用来存固定的组合，groupList用来存自由组合
			if (!colorMapList && fontSizeMapList) {
				mixedList = [].concat(fontSizeMapList);
			} else if (colorMapList && !fontSizeMapList) {
				mixedList = [].concat(colorMapList);
			}
			if (colorMapList && fontSizeMapList && colorMapList.length && fontSizeMapList.length) {
				fontSizeMapList.forEach(function (item1) {
					if (colorMapList.indexOf(item1) >= 0) {
						mixedList.push(item1);
					}
				})
			}
			var mixedStr = '';
			for(var index in mixedList) {
				mixedList[index] = 'type-' + mixedList[index];
				mixedStr += mixedList[index] + '<br>';
			}
			var fontTypeStr = '';
			for (var index in fontTypeMapList) {
				fontTypeStr += fontTypeMapList[index] + '<br>';
			}
			var fontColorStr = '';
			for (var index in colorMap_2List) {
				fontColorStr += colorMap_2List[index] + '<br>';
			}
			var groupStr = '';
			if (fontTypeMapList.length && colorMap_2List.length) {
				fontTypeMapList.forEach(function (item1) {
					colorMap_2List.forEach(function (item2) {
						groupStr += item1 + '-' + item2 + '<br>'
					})
				})
			}

			$('#panel').append('<dl class="pa-block"><dt>组合字体类型</dt><dd>' + fontTypeStr + '</dd></dl>');
			$('#panel').append('<dl class="pa-block"><dt>组合颜色类型</dt><dd>' + fontColorStr + '</dd></dl>');
			$('#panel').append('<dl class="pa-block"><dt>组合结果</dt><dd>' + groupStr + '</dd></dl>');
			$('#panel').append('<dl class="pa-block"><dt>固定字体类型</dt><dd>' + mixedStr + '</dd></dl>');
			$('#panel').css('overflow', 'auto');
		}, 0);
	});
	$(document).on('click', '#panel', function (e) {
		e.stopPropagation();
	})
})