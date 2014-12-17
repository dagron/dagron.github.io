	function getHeight(width,height,widthNew){
		return (widthNew*height)/width;
	}
	function toPoints(path) {
      var points;
      points = Snap.parsePathString(path);
      return points.map(function(x) {
        return _.tail(x);
      }).filter(function(x) {
        return x.length > 0;
      }).map(function(p, i) {
        return {
          id: i,
          x: p[0],
          y: p[1]
        };
      });
    }
    function middlePoint(path){
    	var x,y,xs,ys,points;
    	points = toPoints(path);
    	xs = points.map(function(p){return p.x}); 
    	ys = points.map(function(p){return p.y});
    	return {
    		x : xs.reduce(function(acc,x){return acc+x},0)/xs.length,
    		y : ys.reduce(function(acc,y){return acc+y},0)/ys.length,
    	}
    }

	var data = [
		{
			path: 'M503,119 L499,196 L514,242 L521,247 L564,270 L568,217 L540,118Z',
			id: 1,
			tooltipClass: ['red'],
			title: 'Последние квартиры wer wer er dasd asd ',
			address: 'венская 4'
		},
		{
			path: 'M457,307 L459,246 L488,227 L641,315 L634,379 L607,399Z',
			id: 2,
			tooltipClass: ['green'],
			title: 'квартиры',
			address: 'венская 4'
		},
		{
			path: 'M188,143 L180,82 L209,64 L413,187 L411,248 L385,266Z',
			id:3,
			tooltipClass: ['grey'],
			title: 'Последние квартиры',
			address: 'венская 4'
		}
	];
  	

	$('.plan img').load(function(){
		var template = $('#template-tooltip').html();
		background = $('.plan img');
		$('.plan img').hide();
		$('.plan').append('<svg id="canvas"></svg>');
		$('.plan').width(background.width());
		$('.plan').height(background.height());
		var canvas = Snap('#canvas');
		height= getHeight(background.width(), background.height(), 860);
		canvas.attr({ viewBox: "0 0 860 "+ height});
		canvas.image(background.attr('src'), 0, 0, 860, height);
		function drawPath(obj){
			return canvas.path(obj.path).attr({
				id: 'pathId'+obj.id,
				fill: '#F00',
				fillOpacity: 0,
  				strokeOpacity: 0
			});
		}
		data.forEach(function(i){
			var mPt = middlePoint(i.path);
  			var compiled_html = _.template(template)({
    			tooltipClass: i.tooltipClass, address: i.address, title: i.title
  			});
  			drawPath(i);
  			var helpPt = canvas.circle(mPt.x, mPt.y, 10).attr({
  				fillOpacity: 0,
  				strokeOpacity: 0
  			});
  			var el = window.el = $(helpPt.node);
			el.tipsy({ 
		        gravity: 's', 
		        html: true,
		        trigger: 'manual',
		        opacity: 1,
		        title: function() {
					return _.template(template)({
						address: i.address,
						title: i.title,
						tooltipClass: i.tooltipClass
					}); 
		        }
		    });
		    el.tipsy('show');
  		});
  		
		
	});
