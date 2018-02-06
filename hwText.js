function HwText(p)
{
	this.p = p;
	
	this.lett = [];
	
	this.lineChar = -1;
	this.rowChar = 0;
	
	this.textAdvance = 0.0;
	this.lineCursor = 0;
	this.rowCursor = 0;
	
	this.setText = function(text)
	{
		this.p.text = text;
		
		this.lineChar = -1;
		this.rowChar = 0;
		
		this.textAdvance = 0;
		
		this.lineCursor = this.p.startX;
		this.rowCursor = this.p.startY;
	}
	
	this.init = function()
	{
		this.setText(this.p.text);

		var _self = this;

		var addLetter = function(ch, path)
		{
			_self.lett[ch] = (new Image());
			_self.lett[ch].src = 'img/hw/'+path+'.png';
		}
		
		var alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		for(var i in alphabet) 
		{
			addLetter(alphabet[i], alphabet[i].toLowerCase());
		}
		
		addLetter('ş', 's_');
		addLetter('ă', 'a_');
		addLetter('â', 'aa');
		addLetter('î', 'i_');
		addLetter('ț', 't_');
		
		this.p.textSpeed = (this.p.text[0].length ) / this.p.textInitialSpeed;
	}
	
	this.loop = function(delta)
	{

		
		this.textAdvance += delta*this.p.textSpeed;
		
		this.p.textSpeed  -= this.p.textAcceleration * delta;
		
		if(this.p.textSpeed <= this.p.textMinSpeed)
			this.p.textSpeed = this.p.textMinSpeed;
		
		
		if(this.textAdvance > 1.0)
		{
			this.textAdvance = 0;
			this.lineChar++;
			
			if(this.rowChar < this.p.text.length)
			{
				if(this.lineChar < this.p.text[this.rowChar].length)
				{
					this.drawChar(this.p.text[this.rowChar][this.lineChar], this.rowCursor);
					//cubeMat.map.needsUpdate = true;
				}
				else
				{
					this.lineChar = -1;
					this.rowChar++;
					
					if(this.rowChar < this.p.text.length)
						this.p.textSpeed = (this.p.text[this.rowChar].length ) / this.p.textInitialSpeed;
					
					this.lineCursor = this.p.startX;
					this.rowCursor += this.p.letterHeight;
				}
			}
		}
	}
	
	this.drawChar = function(ch, y)
	{
		var img;
		if(ch === ' ')
		{
			this.lineCursor += this.lett['a'].width;
			return;
		}
		else
		{
			img = this.lett[ch];
		}
		
		this.p.ctx.drawImage(img, this.lineCursor, y);
		this.lineCursor += img.width;
	}

	this.init();	
}