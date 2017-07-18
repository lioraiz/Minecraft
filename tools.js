// Create the tools
Minecraft.tools = function(toolType, image, targetBlock){
	this.toolType = toolType;
	this.image = image;
	this.targetBlock = [];
	for(i=0; i<targetBlock.length; i++){
		this.targetBlock[i] = targetBlock[i];
	}
	this.element = $("<div/>"); 
	this.element.addClass(this.toolType)
	var self = this;
	this.element.on("click", function(){
		Minecraft.selectedTool = self;
		Minecraft.selectedBlock = "";
	});
	this.element.css({"background-image":"url("+this.image+")", "height":"120px", "width":"120px", "background-size":"cover"});
	$("#sidemenu").append(this.element);
}

var axe = new Minecraft.tools("axe", "./images/axe.png", ['tree', 'leaf']);
var pickaxe = new Minecraft.tools("pickaxe", "./images/pickaxe.png", ['rock']);
var shovel = new Minecraft.tools("shovel", "./images/shovel.png", ['grass', 'dirt']);