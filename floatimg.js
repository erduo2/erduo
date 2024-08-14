function floatimage(type) {
	this.type=type;
	var thedate=new Date();
	var olympicdate=new Date("2008","7","8");
	this.dateNumber=Math.ceil((olympicdate-thedate)/(3600*24*1000));
}
floatimage.prototype.show = function (container) {
	var html = "";
	if(this.type=="login"){
		if (this.dateNumber >= 1)
			html = "<img src=\"../skins/default/images/olympic1.png\"><div style=\"position:absolute;top:103;right:76;font-size:30;font-weight:bold;color:red;font-family:Arial\">"+this.dateNumber.toString()+"</div>";
		else if(this.dateNumber>-17)
			html = "<img src=\"../skins/default/images/olympic3.png\">";
	}else{
		html = "<img src=\"../skins/default/images/olympic2.png\">";
	}
	var oContainer = null
	if (container != null)
		oContainer = document.all(container);
	if (oContainer != null)
		oContainer.innerHTML = html;
	else
		document.write (html);
}