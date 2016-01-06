/* 
* @Author: apple
* @Date:   2015-12-18 10:36:43
* @Last Modified by:   apple
* @Last Modified time: 2016-01-06 16:36:27
*/

;$(function () {
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
	var colorMap = {
		'rgba(0,0,0,0.54)':[
			'headline3','headline2','headline','header',
			'subheader','menu-black','body2-black','body-black',
			'caption-black'],
		'rgba(0,0,0,0.33)':['body1-black'],
		'rgba(0,0,0,0.26)':['disable'],
		'rgba(255,255,255,0.87)':['menu-white','body2-white','body-white'],
		'rgba(255,255,255,0.66)':['caption-white'],
		'rgba(255,255,255,0.54)':['body1-white'],
		'#0689dd':['link'],
		'#617a8b':['system']
	};
	// 差错映射
	var patchMap = {
		'13':'12',
		'11':'12',
		'#86939a':'#617a8b',
		'rgba(255,255,255,0.78)':'rgba(255,255,255,0.66)',
		'#ffffff':'rgba(255,255,255,0.66)'
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
	// font-color map
	var colorMap_2 = {
		'rgba(0,0,0,0.54)':       ['gray-primary'],
		'rgba(0,0,0,0.33)':       ['gray-secondary'],
		'rgba(0,0,0,0.26)':       ['gray-disable'],
		'rgba(255,255,255,0.87)': ['white-primary'],
		'rgba(255,255,255,0.66)': ['white-secondary'],
		'rgba(255,255,255,0.54)': ['white-disable'],
		'#0689dd':                ['link-primary'],
		'#617a8b':                ['system-primary']
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