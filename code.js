window.snake.scheme = function(settings = {}) {
  if(settings.scoreBar === undefined)
    settings.scoreBar = '#4A752C';
  if(settings.walls === undefined)
    settings.walls = '#578A34';
  if(settings.shadows === undefined)
    settings.shadows = '#94BD46';
  if(settings.lightSquares === undefined)
    settings.lightSquares = '#A2D149';
  if(settings.darkSquares === undefined)
    settings.darkSquares = '#AAD751';
  
  document.body.bgColor = settings.background || settings.scoreBar;
  document.body.getElementsByClassName('sEOCsb')[0].style.backgroundColor = settings.scoreBar;


  const regexes = [
    new RegExp(`[a-zA-Z0-9_]{0,6}=function\\(a\\){[^}]*globalCompositeOperation="destination-atop"[^}]*fillStyle="${settings.shadows}";[^}]*}`),
    new RegExp(`[a-zA-Z0-9_]{0,6}\.prototype\.[a-zA-Z0-9_]{0,6}=function\\(a\\){if\\(this\\.[a-zA-Z0-9_]{0,6}&&!this\\.[a-zA-Z0-9_]{0,6}\\){if\\([a-zA-Z0-9_]{0,6}\\(this,8\\)[^]*?${settings.lightSquares.replace(/#/g, '')}[^]*?\\(\\),a\\)\\)}}`),
    /[a-zA-Z0-9_]{0,6}\.prototype\.[a-zA-Z0-9_]{0,6}=function\(\){var a=this,b=[a-zA-Z0-9_]{0,6}\(\);[^]*?;return [a-zA-Z0-9_]{0,6}\.promise}/,
  ];

  const scriptElements = document.getElementsByTagName('script');
  const url = scriptElements[scriptElements.length - 1].src; // Source code belongs to the bottom script tag
  
  // xhr to get source code
  const req = new XMLHttpRequest();
  
  req.open("GET", url);
  req.onload = function() {
    processSnakeCode(this.responseText);
  }
  req.send();

  function processSnakeCode(snakeCode) {
    const darkModeCode = snakeCode.replace(/#578A34/g, settings.walls)        // walls
                                  .replace(/#94BD46/g, settings.shadows)      // shadows
                                  .replace(/#A2D149/g, settings.lightSquares) // light squares
                                  .replace(/#AAD751/g, settings.darkSquares); // dark squares
                                  
    regexes.forEach(r => (/*console.log(darkModeCode.match(r)),*/darkModeCode.match(r) != null ? eval(darkModeCode.match(r)[0]) : 0));
  }
};

window.snake.dark = function() {
  return window.snake.scheme({
    scoreBar: '#000000',
    walls: '#101010',
    shadows: '#111111',
    lightSquares: '#171717',
    darkSquares: '#1E1E1E',
  });
};

window.snake.dark_googleSearch = function() {
	return window.snake.scheme_googleSearch({
		background: '#000000',
    walls: '#101010',
    shadows: '#111111',
    lightSquares: '#171717',
    darkSquares: '#1E1E1E',
	})
}

window.snake.fishesHUD = function(settings = {}) {
  if(settings.background === undefined)
    settings.background = 'black';
	if(settings.showInputDisplay === undefined)
		settings.showInputDisplay = true;
	if(settings.arrows === undefined)
		settings.arrows = false;
	if(settings.darkModeGang === undefined)
		settings.darkModeGang = true;
	if(settings.burgerGang === undefined)
		settings.burgerGang = true;
	if(settings.showLilSebastianImages === undefined)
		settings.showLilSebastianImages = true;

  if(settings.showInputDisplay) {
    const buttonSize = 50;
    let buttons = {
      up:    { x: 20 + buttonSize,     y: 10,              pressed: false, character: settings.arrows ? '↑' : 'W', }, 
      left:  { x: 10,                  y: 20 + buttonSize, pressed: false, character: settings.arrows ? '←' : 'A', },
      down:  { x: 20 + buttonSize,     y: 20 + buttonSize, pressed: false, character: settings.arrows ? '↓' : 'S', },
      right: { x: 30 + 2 * buttonSize, y: 20 + buttonSize, pressed: false, character: settings.arrows ? '→' : 'D', },
    };
    document.body.addEventListener('keydown', evt => {
      if(evt.keyCode === 87)
        buttons.up.pressed = true;
      if(evt.keyCode === 65)
        buttons.left.pressed = true;
      if(evt.keyCode === 83)
        buttons.down.pressed = true;
      if(evt.keyCode === 68)
        buttons.right.pressed = true;
    });
    document.body.addEventListener('keyup', evt => {
      if(evt.keyCode === 87)
        buttons.up.pressed = false;
      if(evt.keyCode === 65)
        buttons.left.pressed = false;
      if(evt.keyCode === 83)
        buttons.down.pressed = false;
      if(evt.keyCode === 68)
        buttons.right.pressed = false;
    });

		const canv = document.createElement('canvas');
		canv.width = '200';
		canv.height = '150';
		canv.style.position = 'fixed';
		canv.style.left = '600px';
		canv.style.bottom = '0px';
		document.body.appendChild(canv);

		const ctx = canv.getContext('2d');

		setInterval(_ => {
			ctx.fillStyle = settings.background;
			ctx.fillRect(0, 0, canv.width, canv.height);
			
			for(let button of Object.values(buttons)) {
				ctx.fillStyle = button.pressed ? '#ffffff55' : '#99999955';
				ctx.strokeStyle = 'black';
				ctx.lineWidth = 4;
				
				ctx.fillRect(button.x, button.y, buttonSize, buttonSize);
				ctx.strokeRect(button.x, button.y, buttonSize, buttonSize);
				
				let c = button.character;
				ctx.fillStyle = 'black';
				let fontSize = 32;
				ctx.textAlign = 'center';
				ctx.font = `${fontSize}px consolas`;
				ctx.fillText(c, button.x + buttonSize / 2, button.y + buttonSize / 2 + fontSize / 3);
			}
		}, 1000 / 60);
	}

	if(settings.darkModeGang) {
		const darkImg = document.createElement('img');
		darkImg.src = 'https://i.postimg.cc/Pq4cFZnR/818477021390045215.png';
		darkImg.width = 100;
		darkImg.height = 100;
		darkImg.style.position = 'fixed';
		darkImg.style.right = '0px';
		darkImg.style.bottom = '0px';
		document.body.appendChild(darkImg);
	}

	if(settings.burgerGang) {
		const burgerImg = document.createElement('img');
		burgerImg.src = 'https://i.postimg.cc/G2kpNdj2/818584036782899231.png';
		burgerImg.width = 100;
		burgerImg.height = 100;
		burgerImg.style.position = 'fixed';
		burgerImg.style.right = `${settings.darkModeGang ? 100 : 0}px`;
		burgerImg.style.bottom = '0px';
		document.body.appendChild(burgerImg);
	}

	if(settings.showLilSebastianImages) {
		const horseImg = document.createElement('img');
		horseImg.src = 'https://assets-auto.rbl.ms/531b67415e6c7c2f26ab211bb24a2c87c04d4583019e79ec177f336de9b2aa4c';
		horseImg.width = 200;
		horseImg.height = horseImg.width
		horseImg.style.position = 'fixed';
		horseImg.style.right = '0px';
		horseImg.style.top = '0px';
		document.body.appendChild(horseImg);

		const horseImg1 = document.createElement('img');
		horseImg1.src = 'http://esq.h-cdn.co/assets/15/08/1024x512/landscape_1424204090-tumblr_m4g0ddotsx1qa1w9bo1_1280.jpg';
		horseImg1.width = 200;
		horseImg1.height = horseImg1.width / 2;
		horseImg1.style.position = 'fixed';
		horseImg1.style.right = `${horseImg.width}px`;
		horseImg1.style.top = '0px';
		document.body.appendChild(horseImg1);
	}
};


window.snake.burger = function() {

};



// -----------------------------------------------------------------


window.snake.scheme_googleSearch = function(settings = {}) {
  
  if(settings.background === undefined)
    settings.background = '#4A752C';
  if(settings.walls === undefined)
    settings.walls = '#578A34';
  if(settings.shadows === undefined)
    settings.shadows = '#94BD46';
  if(settings.lightSquares === undefined)
    settings.lightSquares = '#AAD751';
  if(settings.darkSquares === undefined)
    settings.darkSquares = '#A2D149';

  eval(`s_a0c=function(a){a.La.globalCompositeOperation="destination-atop";a.La.fillStyle="${settings.shadows}";a.La.fillRect(0,0,a.La.canvas.width,a.La.canvas.height);a.La.drawImage(a.Ba.canvas,0,a.oa/6);s_oD(a,2)&&(a.La.globalCompositeOperation="source-over")};`);
  eval(`s_qD.prototype.Lj=function(a){if(this.cZb&&!this.uB){if(s_oD(this,8)&&0<this.Jo.length){for(var b=.0035*(a-this.Cg)*(0===this.As?1:1===this.As?1.33:.66),c=0;c<this.Jo.length;c+=1){var d=this.Jo[c];d.Ed.y+=4*b;d.uc.x+=d.Ed.x*b;d.uc.y+=d.Ed.y*b;d.angle+=d.ddc*b;d.size=Math.max(0,d.size-.025*b);0>=d.size&&(this.Jo.splice(c,1),c--)}}c=!1;b=this.Sa||"NONE"!==this.ub;if("NONE"!==this.Da||b){for(;a-this.Cg>=this.Ke;){this.Cg+=this.Ke,this.Sd++,(!this.Ia||1<this.Ma)&&this.EPa++,s_9_c(this),c=!0}}else{this.Cg=a,c=!0}b=(a-this.Cg)/this.Ke;this.Ia&&this.Yj&&(b=0);this.Ba.clearRect(0,0,this.Ba.canvas.width,this.Ba.canvas.height);this.La.clearRect(0,0,this.La.canvas.width,this.La.canvas.height);this.Oa.fillStyle="${settings.shadows}";this.Oa.fillRect(0,0,this.Oa.canvas.width,this.Oa.canvas.height);s_oD(this,4)&&(this.Ba.save(),this.Ba.translate(2*this.oa,2*this.oa));d=!1;for(var e=s_oD(this,4)||s_oD(this,6)||s_oD(this,7),f=s_b(this.wa),g=f.next();!g.done;g=f.next()){g=g.value;!d&&(this.ka[0].y<=g.uc.y||"UP"===this.Da||e)&&(s_$_c(this,b,c),d=!0);var h=b,k=g.uc.clone();k.x=k.x*this.oa+this.oa/2;k.y=k.y*this.oa+this.oa/2;if(s_oD(this,6)&&!g.xo&&!this.Ia){var l=g.uc.clone();l.x+=0<g.EK.x?g.Ed.x:0;l.y+=0<g.EK.y?g.Ed.y:0;l.x=l.x*this.oa+this.oa/2;l.y=l.y*this.oa+this.oa/2;k.x=k.x*(1-h)+l.x*h;k.y=k.y*(1-h)+l.y*h;l=this.oa/10*(2*Math.abs(2*(h+.25-Math.floor(h+.75)))-1);0===g.EK.x&&(k.x+=l*Math.sign(g.Ed.x));0===g.EK.y&&(k.y+=l*Math.sign(g.Ed.y))}l=this.oa*(s_oD(this,6)?1.65:1.2)*(g.xo?h:1);var m=this.Sa||"NONE"!==this.ub;g.xo||"NONE"===this.Da&&!m||s_oD(this,6)||(h=(g.NB+(this.Ia?0:h))/6,m= -h*Math.log2(h)-(1-h)*Math.log2(1-h),0===h&&(m=0),l*=1+m*this.dU,l=Math.round(l));this.Ba.drawImage(s_P_c(this.S3[0<g.type&&g.type<this.S3.length?g.type:0]),0,0,128,128,k.x-l/2,k.y-l/2,l,l)}d||s_$_c(this,b,c);if(s_oD(this,8)){for(c=s_b(this.Qa),d=c.next();!d.done;d=c.next()){g=b,d=d.value,e=d.uc.clone(),e.x=e.x*this.oa+this.oa/2,e.y=e.y*this.oa+this.oa/2,f=1.2*this.oa*(d.xo&&!this.Ia?g:1),d.xo||"NONE"===this.Da||(g=(d.NB+(this.Ia?0:g))/6,k= -g*Math.log2(g)-(1-g)*Math.log2(1-g),0===g&&(k=0),f*=1+k*this.dU,f=Math.round(f)),this.Ba.drawImage(s_P_c(this.O9b),128*d.type,0,128,128,e.x-f/2,e.y-f/2,f,f)}}s_oD(this,4)||s_a0c(this);c=s_b(this.Pc);for(d=c.next();!d.done;d=c.next()){k=d.value,d=new s_Nf(k.uc.x*this.oa+this.oa/2,k.uc.y*this.oa+this.oa/2),g=(k.NB+(this.Ia?0:b))/6,e=(Math.sin(g*Math.PI*2)+1)/2,0===g&&(e=0),f=.5*this.oa*(k.iX?Math.sqrt(1-b):1)*(k.xo?.3+.7*b:1),f=Math.round(f*(1+.4*e)),k=s_Vr(k.color),h=s_Wr(s_Yr(k,.15*e)),k=s_Wr(s_Yr(k,.05*(1-e))),this.La.fillStyle=h,this.La.beginPath(),this.La.arc(d.x,d.y,f,0,2*Math.PI),this.La.fill(),h=f/8*e,g=new s_Nf(h*Math.cos(2*g*Math.PI),h*Math.sin(2*g*Math.PI)),e=f*(.5+.25*e),this.La.fillStyle=k,this.La.beginPath(),this.La.arc(d.x+g.x,d.y+g.y,e,0,2*Math.PI),this.La.fill()}if(s_oD(this,1)||s_oD(this,8)){for(c=s_b(this.Ic),d=c.next();!d.done;d=c.next()){d=d.value,e=new s_Nf(d.uc.x*this.oa+this.oa/2,d.uc.y*this.oa+this.oa/2),f=this.oa*(d.xo?b:1),this.Ba.fillStyle="${settings.shadows}",this.Ba.fillRect(e.x-f/2,e.y-f/2,f,f),s_oD(this,8)&&this.Ba.drawImage(s_P_c(this.tib),128*d.UW,0,128,128,e.x-f/2,e.y-f/2,f,f)}}0<this.Eu&&(c=this.oa/30,d=Math.floor((this.xPa-this.Eu+b)/this.xPa*this.Du.oa)%this.Du.oa,e=new s_Nf(this.Dc.x*this.oa+this.oa/2,this.Dc.y*this.oa+this.oa/2),f=new s_Nf(-this.Du.zd(),-this.Du.Zc()/2),this.Du.render(d,e,f,this.wk,c),s_oD(this,7)&&this.Du.render(d,new s_Nf(this.Ba.canvas.width-e.x,this.Ba.canvas.height-e.y),f,this.wk+Math.PI,c));if(s_oD(this,8)){for(c=s_b(this.Jo),d=c.next();!d.done;d=c.next()){d=d.value,e=Math.round(d.uc.x+this.oa/2),f=Math.round(d.uc.y+this.oa/2),g=d.angle*Math.PI/180,this.Ba.save(),this.Ba.translate(e,f),this.Ba.rotate(g),e=Math.min(1,d.size),this.Ba.fillStyle="${settings.shadows}",this.Ba.fillRect(-(this.oa/2)*e,-(this.oa/2)*e,this.oa*e,this.oa*e),this.Ba.drawImage(s_P_c(this.tib),128*d.UW,0,128,128,-(this.oa/2)*e,-(this.oa/2)*e,this.oa*e,this.oa*e),this.Ba.restore()}}d=c=0;1<this.Ma&&(c=8*Math.random()-4,d=8*Math.random()-4);if(s_oD(this,4)){e=0===b;this.Oa.fillStyle="${settings.lightSquares}";this.Oa.fillRect(0,0,this.Oa.canvas.width,this.Oa.canvas.height);this.Oa.fillStyle="${settings.darkSquares}";b=new s_Nf(this.Oa.canvas.width/2%this.oa,this.Oa.canvas.height/2%this.oa);e=(e&&!this.Ia||this.Ia&&2<this.Ma)&&("LEFT"===this.Da||"UP"===this.Da);f=new s_Nf(this.xI.x%this.oa,this.xI.y%this.oa);for(g=-1;g<this.Aa.width+3;g+=1){for(k=-1;k<this.Aa.height+3;k+=1){Math.abs((g+k)%2)!==(this.EPa+(e?1:0))%2&&this.Oa.fillRect(g*this.oa-f.x+b.x,k*this.oa-f.y+b.y,this.oa,this.oa)}}this.Ba.restore();this.hb.clearRect(0,0,this.hb.canvas.width,this.hb.canvas.height);this.hb.drawImage(this.Ba.canvas,0,0);this.Ba.clearRect(0,0,this.Ba.canvas.width,this.Ba.canvas.height);b=Math.round(this.Ba.canvas.width/2-this.xI.x-2*this.oa);e=Math.round(this.Ba.canvas.height/2-this.xI.y-2*this.oa);f=2*this.oa;g=b>= -f;k=b<=f;h=e<=f;l=this.Aa.width*this.oa;m=this.Aa.height*this.oa;e>= -f&&(g&&this.Ba.drawImage(this.hb.canvas,b-l,e-m),k&&this.Ba.drawImage(this.hb.canvas,b+l,e-m),this.Ba.drawImage(this.hb.canvas,b,e-m));g&&this.Ba.drawImage(this.hb.canvas,b-l,e);k&&this.Ba.drawImage(this.hb.canvas,b+l,e);h&&(g&&this.Ba.drawImage(this.hb.canvas,b-l,e+m),k&&this.Ba.drawImage(this.hb.canvas,b+l,e+m),this.Ba.drawImage(this.hb.canvas,b,e+m));this.Ba.drawImage(this.hb.canvas,b,e);s_a0c(this);b=(this.Ba.canvas.width-this.Oa.canvas.width)/2;e=(this.Ba.canvas.height-this.Oa.canvas.height)/2;this.Oa.drawImage(this.La.canvas,c-b,d-e);this.Oa.drawImage(this.Ba.canvas,c-b,d-e)}else{b=(this.Oa.canvas.width-this.jf.canvas.width)/2,e=(this.Oa.canvas.height-this.jf.canvas.height)/2,this.jf.drawImage(this.Gk.canvas,c,d),this.jf.drawImage(this.La.canvas,c,d),this.jf.drawImage(this.Ba.canvas,c,d),this.Oa.drawImage(this.jf.canvas,b,e)}s_H(this.Pa("UEI8qf").el(),"visibility",this.H0a?"visible":"hidden");s_H(this.Pa("E5ziSe").el(),"visibility",this.H0a?"visible":"hidden");s_ng(this.Pa("A0kWCf").el(),this.Hb);s_ng(this.Pa("E5ziSe").el(),this.Of.has(s_3_c(this))?this.Of.get(s_3_c(this)):0);s_ng(this.Pa("LOtDEe").el(),this.Hb);s_ng(this.Pa("Vp6PHf").el(),this.Of.has(s_3_c(this,!0))?this.Of.get(s_3_c(this,!0)):0);if(this.xd){if(this.Qg){for(b=s_7h(this.Ea("akczce").el()),c=0<=this.Ca.IAa?s_b0c:new s_Nf(0,0),d=s_b(this.Ca.rows),e=d.next();!e.done;e=d.next()){e=e.value,f=s_Mh(e).x,g=this.Ca.IKa.get(e.id),this.Ca.h1.x>=c.x&&void 0!==g&&(f=.25*g+.75*f,g=s_Yh(e).width,k=b.width/2,s_Lh(e,Math.max(k-g,Math.min(k,f)),0))}}}else{s_c0c(this)}this.Ki&&(a=s_d0c(this.Ia&&0<this.Fu&&"NONE"!==this.Da?this.Fu*this.Ke:this.Sd*this.Ke+(a-this.Cg)),s_ng(this.Ea("yddQF").el(),a))}};`);
  eval(`s_qD.prototype.P0=function(){var a=this,b=s_7a();s_Mg(function(){a.Ue=s_7h(a.lp);if(0!=a.Ue.width){var c=a.Ue.width,d=a.Ue.height,e=!s_4_c(a)&&!a.p$a;c-=e?40:0;d-=e?40:0;a:switch(a.Zd){case 2:e=512;break a;case 1:e=96;break a;default:e=256};e=c*d/e;a.oa?a.oa=Math.min(Math.floor(c/a.Aa.width),Math.floor(d/a.Aa.height)):(a.oa=Math.floor(Math.sqrt(e)),a.Aa=new s_Rf(Math.floor(c/a.oa),Math.floor(d/a.oa)));a.dU=a.oa/128;a.lp.width=a.Ue.width;a.lp.height=a.Ue.height;a.Gk.canvas.width=a.Aa.width*a.oa;a.Gk.canvas.height=a.Aa.height*a.oa;c=s_oD(a,4)?4:0;a.Ba.canvas.width=(a.Aa.width+c)*a.oa;a.Ba.canvas.height=(a.Aa.height+c)*a.oa;a.hb.canvas.width=a.Ba.canvas.width;a.hb.canvas.height=a.Ba.canvas.height;a.La.canvas.width=(a.Aa.width+c)*a.oa;a.La.canvas.height=(a.Aa.height+c)*a.oa;a.jf.canvas.width=a.Aa.width*a.oa;a.jf.canvas.height=a.Aa.height*a.oa;c=s_7h(a.Og);0<c.width&&0<c.height&&(a.ue.canvas.width=c.width,a.ue.canvas.height=c.height);s_e0c(a);a.Gk.fillStyle="${settings.darkSquares}";a.Gk.fillRect(0,0,a.Ue.width,a.Ue.height);for(c=0;c<a.Aa.width;c+=1){for(d=0;d<a.Aa.height;d+=1){0!==(c+d)%2&&(a.Gk.fillStyle="${settings.lightSquares}",a.Gk.fillRect(c*a.oa,d*a.oa,a.oa,a.oa))}}}b.resolve()});return b.promise};`);
  eval(`s_qD.prototype.Lj=function(a){if(this.cZb&&!this.uB){if(s_oD(this,8)&&0<this.Jo.length){for(var b=.0035*(a-this.Cg)*(0===this.As?1:1===this.As?1.33:.66),c=0;c<this.Jo.length;c+=1){var d=this.Jo[c];d.Ed.y+=4*b;d.uc.x+=d.Ed.x*b;d.uc.y+=d.Ed.y*b;d.angle+=d.ddc*b;d.size=Math.max(0,d.size-.025*b);0>=d.size&&(this.Jo.splice(c,1),c--)}}c=!1;b=this.Sa||"NONE"!==this.ub;if("NONE"!==this.Da||b){for(;a-this.Cg>=this.Ke;){this.Cg+=this.Ke,this.Sd++,(!this.Ia||1<this.Ma)&&this.EPa++,s_9_c(this),c=!0}}else{this.Cg=a,c=!0}b=(a-this.Cg)/this.Ke;this.Ia&&this.Yj&&(b=0);this.Ba.clearRect(0,0,this.Ba.canvas.width,this.Ba.canvas.height);this.La.clearRect(0,0,this.La.canvas.width,this.La.canvas.height);this.Oa.fillStyle="${settings.shados}";this.Oa.fillRect(0,0,this.Oa.canvas.width,this.Oa.canvas.height);s_oD(this,4)&&(this.Ba.save(),this.Ba.translate(2*this.oa,2*this.oa));d=!1;for(var e=s_oD(this,4)||s_oD(this,6)||s_oD(this,7),f=s_b(this.wa),g=f.next();!g.done;g=f.next()){g=g.value;!d&&(this.ka[0].y<=g.uc.y||"UP"===this.Da||e)&&(s_$_c(this,b,c),d=!0);var h=b,k=g.uc.clone();k.x=k.x*this.oa+this.oa/2;k.y=k.y*this.oa+this.oa/2;if(s_oD(this,6)&&!g.xo&&!this.Ia){var l=g.uc.clone();l.x+=0<g.EK.x?g.Ed.x:0;l.y+=0<g.EK.y?g.Ed.y:0;l.x=l.x*this.oa+this.oa/2;l.y=l.y*this.oa+this.oa/2;k.x=k.x*(1-h)+l.x*h;k.y=k.y*(1-h)+l.y*h;l=this.oa/10*(2*Math.abs(2*(h+.25-Math.floor(h+.75)))-1);0===g.EK.x&&(k.x+=l*Math.sign(g.Ed.x));0===g.EK.y&&(k.y+=l*Math.sign(g.Ed.y))}l=this.oa*(s_oD(this,6)?1.65:1.2)*(g.xo?h:1);var m=this.Sa||"NONE"!==this.ub;g.xo||"NONE"===this.Da&&!m||s_oD(this,6)||(h=(g.NB+(this.Ia?0:h))/6,m= -h*Math.log2(h)-(1-h)*Math.log2(1-h),0===h&&(m=0),l*=1+m*this.dU,l=Math.round(l));this.Ba.drawImage(s_P_c(this.S3[0<g.type&&g.type<this.S3.length?g.type:0]),0,0,128,128,k.x-l/2,k.y-l/2,l,l)}d||s_$_c(this,b,c);if(s_oD(this,8)){for(c=s_b(this.Qa),d=c.next();!d.done;d=c.next()){g=b,d=d.value,e=d.uc.clone(),e.x=e.x*this.oa+this.oa/2,e.y=e.y*this.oa+this.oa/2,f=1.2*this.oa*(d.xo&&!this.Ia?g:1),d.xo||"NONE"===this.Da||(g=(d.NB+(this.Ia?0:g))/6,k= -g*Math.log2(g)-(1-g)*Math.log2(1-g),0===g&&(k=0),f*=1+k*this.dU,f=Math.round(f)),this.Ba.drawImage(s_P_c(this.O9b),128*d.type,0,128,128,e.x-f/2,e.y-f/2,f,f)}}s_oD(this,4)||s_a0c(this);c=s_b(this.Pc);for(d=c.next();!d.done;d=c.next()){k=d.value,d=new s_Nf(k.uc.x*this.oa+this.oa/2,k.uc.y*this.oa+this.oa/2),g=(k.NB+(this.Ia?0:b))/6,e=(Math.sin(g*Math.PI*2)+1)/2,0===g&&(e=0),f=.5*this.oa*(k.iX?Math.sqrt(1-b):1)*(k.xo?.3+.7*b:1),f=Math.round(f*(1+.4*e)),k=s_Vr(k.color),h=s_Wr(s_Yr(k,.15*e)),k=s_Wr(s_Yr(k,.05*(1-e))),this.La.fillStyle=h,this.La.beginPath(),this.La.arc(d.x,d.y,f,0,2*Math.PI),this.La.fill(),h=f/8*e,g=new s_Nf(h*Math.cos(2*g*Math.PI),h*Math.sin(2*g*Math.PI)),e=f*(.5+.25*e),this.La.fillStyle=k,this.La.beginPath(),this.La.arc(d.x+g.x,d.y+g.y,e,0,2*Math.PI),this.La.fill()}if(s_oD(this,1)||s_oD(this,8)){for(c=s_b(this.Ic),d=c.next();!d.done;d=c.next()){d=d.value,e=new s_Nf(d.uc.x*this.oa+this.oa/2,d.uc.y*this.oa+this.oa/2),f=this.oa*(d.xo?b:1),this.Ba.fillStyle="${settings.shadows}",this.Ba.fillRect(e.x-f/2,e.y-f/2,f,f),s_oD(this,8)&&this.Ba.drawImage(s_P_c(this.tib),128*d.UW,0,128,128,e.x-f/2,e.y-f/2,f,f)}}0<this.Eu&&(c=this.oa/30,d=Math.floor((this.xPa-this.Eu+b)/this.xPa*this.Du.oa)%this.Du.oa,e=new s_Nf(this.Dc.x*this.oa+this.oa/2,this.Dc.y*this.oa+this.oa/2),f=new s_Nf(-this.Du.zd(),-this.Du.Zc()/2),this.Du.render(d,e,f,this.wk,c),s_oD(this,7)&&this.Du.render(d,new s_Nf(this.Ba.canvas.width-e.x,this.Ba.canvas.height-e.y),f,this.wk+Math.PI,c));if(s_oD(this,8)){for(c=s_b(this.Jo),d=c.next();!d.done;d=c.next()){d=d.value,e=Math.round(d.uc.x+this.oa/2),f=Math.round(d.uc.y+this.oa/2),g=d.angle*Math.PI/180,this.Ba.save(),this.Ba.translate(e,f),this.Ba.rotate(g),e=Math.min(1,d.size),this.Ba.fillStyle="${settings.shadows}",this.Ba.fillRect(-(this.oa/2)*e,-(this.oa/2)*e,this.oa*e,this.oa*e),this.Ba.drawImage(s_P_c(this.tib),128*d.UW,0,128,128,-(this.oa/2)*e,-(this.oa/2)*e,this.oa*e,this.oa*e),this.Ba.restore()}}d=c=0;1<this.Ma&&(c=8*Math.random()-4,d=8*Math.random()-4);if(s_oD(this,4)){e=0===b;this.Oa.fillStyle="${settings.darkSquares}";this.Oa.fillRect(0,0,this.Oa.canvas.width,this.Oa.canvas.height);this.Oa.fillStyle="${settings.darkSquares}";b=new s_Nf(this.Oa.canvas.width/2%this.oa,this.Oa.canvas.height/2%this.oa);e=(e&&!this.Ia||this.Ia&&2<this.Ma)&&("LEFT"===this.Da||"UP"===this.Da);f=new s_Nf(this.xI.x%this.oa,this.xI.y%this.oa);for(g=-1;g<this.Aa.width+3;g+=1){for(k=-1;k<this.Aa.height+3;k+=1){Math.abs((g+k)%2)!==(this.EPa+(e?1:0))%2&&this.Oa.fillRect(g*this.oa-f.x+b.x,k*this.oa-f.y+b.y,this.oa,this.oa)}}this.Ba.restore();this.hb.clearRect(0,0,this.hb.canvas.width,this.hb.canvas.height);this.hb.drawImage(this.Ba.canvas,0,0);this.Ba.clearRect(0,0,this.Ba.canvas.width,this.Ba.canvas.height);b=Math.round(this.Ba.canvas.width/2-this.xI.x-2*this.oa);e=Math.round(this.Ba.canvas.height/2-this.xI.y-2*this.oa);f=2*this.oa;g=b>= -f;k=b<=f;h=e<=f;l=this.Aa.width*this.oa;m=this.Aa.height*this.oa;e>= -f&&(g&&this.Ba.drawImage(this.hb.canvas,b-l,e-m),k&&this.Ba.drawImage(this.hb.canvas,b+l,e-m),this.Ba.drawImage(this.hb.canvas,b,e-m));g&&this.Ba.drawImage(this.hb.canvas,b-l,e);k&&this.Ba.drawImage(this.hb.canvas,b+l,e);h&&(g&&this.Ba.drawImage(this.hb.canvas,b-l,e+m),k&&this.Ba.drawImage(this.hb.canvas,b+l,e+m),this.Ba.drawImage(this.hb.canvas,b,e+m));this.Ba.drawImage(this.hb.canvas,b,e);s_a0c(this);b=(this.Ba.canvas.width-this.Oa.canvas.width)/2;e=(this.Ba.canvas.height-this.Oa.canvas.height)/2;this.Oa.drawImage(this.La.canvas,c-b,d-e);this.Oa.drawImage(this.Ba.canvas,c-b,d-e)}else{b=(this.Oa.canvas.width-this.jf.canvas.width)/2,e=(this.Oa.canvas.height-this.jf.canvas.height)/2,this.jf.drawImage(this.Gk.canvas,c,d),this.jf.drawImage(this.La.canvas,c,d),this.jf.drawImage(this.Ba.canvas,c,d),this.Oa.drawImage(this.jf.canvas,b,e)}s_H(this.Pa("UEI8qf").el(),"visibility",this.H0a?"visible":"hidden");s_H(this.Pa("E5ziSe").el(),"visibility",this.H0a?"visible":"hidden");s_ng(this.Pa("A0kWCf").el(),this.Hb);s_ng(this.Pa("E5ziSe").el(),this.Of.has(s_3_c(this))?this.Of.get(s_3_c(this)):0);s_ng(this.Pa("LOtDEe").el(),this.Hb);s_ng(this.Pa("Vp6PHf").el(),this.Of.has(s_3_c(this,!0))?this.Of.get(s_3_c(this,!0)):0);if(this.xd){if(this.Qg){for(b=s_7h(this.Ea("akczce").el()),c=0<=this.Ca.IAa?s_b0c:new s_Nf(0,0),d=s_b(this.Ca.rows),e=d.next();!e.done;e=d.next()){e=e.value,f=s_Mh(e).x,g=this.Ca.IKa.get(e.id),this.Ca.h1.x>=c.x&&void 0!==g&&(f=.25*g+.75*f,g=s_Yh(e).width,k=b.width/2,s_Lh(e,Math.max(k-g,Math.min(k,f)),0))}}}else{s_c0c(this)}this.Ki&&(a=s_d0c(this.Ia&&0<this.Fu&&"NONE"!==this.Da?this.Fu*this.Ke:this.Sd*this.Ke+(a-this.Cg)),s_ng(this.Ea("yddQF").el(),a))}};`);
  document.body.bgColor = settings.background;
  document.body.getElementsByClassName('sEOCsb')[0].style.backgroundColor = settings.background;

}


window.snake.darkMode = function() {
	eval(`
		var s_N_c = function(a) {
			if(a.Ca == '00')
				a.wa.src = 'https://i.postimg.cc/w7f6jyZx/burger-00.png';
			if(a.Ca == '01')
				a.wa.src = 'https://i.postimg.cc/t7DbBnXd/burger-01.png';
			if(a.Ca == '02')
				a.wa.src = 'https://i.postimg.cc/cgSWbQgh/burger-02.png';
			if(a.Ca == '03')
				a.wa.src = 'https://i.postimg.cc/DSS7Jf3r/burger-03.png';
			if(a.Ca == '04')
				a.wa.src = 'https://i.postimg.cc/BjR4xWJd/burger-04.png';
			if(a.Ca == '05')
				a.wa.src = 'https://i.postimg.cc/yJ9BjfdW/burger-05.png';
			if(a.Ca == '06')
				a.wa.src = 'https://i.postimg.cc/QKN3XhqW/burger-06.png';
			if(a.Ca == '07')
				a.wa.src = 'https://i.postimg.cc/yJ9BjfdW/burger-05.png';
			if(a.Ca == '08')
				a.wa.src = 'https://i.postimg.cc/yJ9BjfdW/burger-05.png';
			if(a.Ca == '09')
				a.wa.src = 'https://i.postimg.cc/BjR4xWJd/burger-04.png';
			if(a.Ca == '10')
				a.wa.src = 'https://i.postimg.cc/BjR4xWJd/burger-04.png';
			if(a.Ca == '11')
				a.wa.src = 'https://i.postimg.cc/BjR4xWJd/burger-04.png';
			if(a.Ca == '12')
				a.wa.src = 'https://i.postimg.cc/DSS7Jf3r/burger-03.png';
			if(a.Ca == '13')
				a.wa.src = 'https://i.postimg.cc/w7f6jyZx/burger-00.png';

			s_Ig(a.wa, "load", function() {
				a.Ba = !0;
				s_O_c(a)
			})
		}
	`);

	eval(`
	var s_mD = function(a, b, c) {
		this.wa = new Image;
		this.wa.crossOrigin = "Anyonymous";
		this.Ba = !1;
		this.oa = b;
		this.Ca = a;
		this.Aa = c;
		this.ka = document.createElement("canvas").getContext("2d");
		s_N_c(this)
	}
		, s_N_c = function(a) {
			if(a.Ca == '00')
				a.wa.src = 'https://i.postimg.cc/w7f6jyZx/burger-00.png';
			if(a.Ca == '01')
				a.wa.src = 'https://i.postimg.cc/t7DbBnXd/burger-01.png';
			if(a.Ca == '02')
				a.wa.src = 'https://i.postimg.cc/cgSWbQgh/burger-02.png';
			if(a.Ca == '03')
				a.wa.src = 'https://i.postimg.cc/DSS7Jf3r/burger-03.png';
			if(a.Ca == '04')
				a.wa.src = 'https://i.postimg.cc/BjR4xWJd/burger-04.png';
			if(a.Ca == '05')
				a.wa.src = 'https://i.postimg.cc/yJ9BjfdW/burger-05.png';
			if(a.Ca == '06')
				a.wa.src = 'https://i.postimg.cc/QKN3XhqW/burger-06.png';
			if(a.Ca == '07')
				a.wa.src = 'https://i.postimg.cc/yJ9BjfdW/burger-05.png';
			if(a.Ca == '08')
				a.wa.src = 'https://i.postimg.cc/yJ9BjfdW/burger-05.png';
			if(a.Ca == '09')
				a.wa.src = 'https://i.postimg.cc/BjR4xWJd/burger-04.png';
			if(a.Ca == '10')
				a.wa.src = 'https://i.postimg.cc/BjR4xWJd/burger-04.png';
			if(a.Ca == '11')
				a.wa.src = 'https://i.postimg.cc/BjR4xWJd/burger-04.png';
			if(a.Ca == '12')
				a.wa.src = 'https://i.postimg.cc/DSS7Jf3r/burger-03.png';
			if(a.Ca == '13')
				a.wa.src = 'https://i.postimg.cc/w7f6jyZx/burger-00.png';

			s_Ig(a.wa, "load", function() {
				a.Ba = !0;
				s_O_c(a)
			})
		}
		, s_O_c = function(a) {
			a.ka.canvas.width = a.wa.width;
			a.ka.canvas.height = a.wa.height;
			a.ka.clearRect(0, 0, a.ka.canvas.width, a.ka.canvas.height);
			a.ka.drawImage(a.wa, 0, 0)
	}
		, s_nD = function(a, b, c) {
			if (a.Ba) {
					s_O_c(a);
					b = s_6sb(b);
					c = s_6sb(c);
					b = 0 === b[2] ? 1 : c[2] / b[2];
					for (var d = a.ka.getImageData(0, 0, a.ka.canvas.width, a.ka.canvas.height), e = d.data, f = 0; f < e.length; f += 4)
							if (0 < e[f + 3]) {
									var g = s_3sb(e[f], e[f + 1], e[f + 2]);
									1 > g[2] && (g[0] = c[0],
									g[1] = c[1],
									g[2] *= b);
									g = s_5sb(g[0], g[1], g[2]);
									e[f] = g[0];
									e[f + 1] = g[1];
									e[f + 2] = g[2]
							}
					a.ka.putImageData(d, 0, 0)
			}
	};
	`);
}