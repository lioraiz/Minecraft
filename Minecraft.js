
var Minecraft = {};

Minecraft.numOfRows = 13;
Minecraft.numOfCols = 24;
Minecraft.blockArr = [];
Minecraft.inventoryList = {};
Minecraft.toolArr = ['theme','axe','shovel','pickaxe','shears'];
Minecraft.selectedTool;
Minecraft.selectedBlock = '';
////////////////////////////////////////////////////////constructor for block object
function Block(type){
    this.block = $('<div/>',{'class': type} );
    this.type = type;
    this.tool = '';
    var self = this;
    this.block.on('click', function(){
         if(self.tool == Minecraft.selectedTool.type){
            if(Minecraft.inventoryList.hasOwnProperty(self.type)){
                Minecraft.inventoryList[self.type] += 1;
                console.log(Minecraft.inventoryList);
            }
            else{
                var inventory = new Inventory(self.type);
                Minecraft.inventoryList[self.type] = 1;

                console.log(Minecraft.inventoryList);
                inventory.inventory.addClass ('inventory');
                $('#header').append(inventory.inventory);
             }
            self.changeType('sky');
         }
         else if(self.type == 'sky' && Minecraft.selectedBlock.type != ''){
            self.changeType(Minecraft.selectedBlock.type);
            Minecraft.inventoryList[self.type] -= 1;
            if(Minecraft.inventoryList[self.type] == 0){
                Minecraft.selectedBlock.type = '';
                console.log(Minecraft.selectedBlock.type);
                Minecraft.selectedBlock.inventory.css('display','none');
            }

         }
    });
    this.changeType = function(newType,newTool){
        this.block.removeClass(this.type);
        this.block.addClass(newType);
        this.type = newType;
        this.tool = newTool;
    }
}
/////////////////////////////////////////////////creates all the block object in the map and places then in a nested array
 Minecraft.createBlocks = function(row,col){
    for(i=0 ; i<row ; i++){
        Minecraft.blockArr[i] = Array(col);
        for(j=0;j<col;j++){
            var blockDiv = Minecraft.blockArr[i][j] = new Block('sky');
            blockDiv.block.addClass ('block');
            $('#map').append(blockDiv.block);
        }
    }
 };
////////////////////////////////////////////randomly creates the ground and grass
Minecraft.createGround = function(){
    for(i=0;i<Minecraft.numOfCols;i++){
        var y = Math.floor((Math.random() * (Math.floor(Minecraft.numOfRows/3)))+((Minecraft.numOfRows-(Math.ceil(Minecraft.numOfRows/3)))+1));
        Minecraft.blockArr[y][i].changeType('grass','shovel');
        for(j=(y+1);j<Minecraft.numOfRows;j++){
            Minecraft.blockArr[j][i].changeType('ground','shovel');
        }
    }
};
////////////////////////////////////////finds a free grass block for elements
Minecraft.findFreeGrass = function(){

    do{
        var x = Math.floor((Math.random() *Minecraft.numOfCols ));
        for(i=Minecraft.numOfRows-1;i>8;i--){
            if(Minecraft.blockArr[i][x].type == 'grass' && Minecraft.blockArr[i-1][x].type == 'sky'){
                var coorArr = [x,i-1];
                return coorArr;
            }
        }
    }
    while (true);
};
/////////////////////////////////////////////randomly creates tree
  Minecraft.createTree = function(){
      var coorArr = Minecraft.findFreeGrass();
      Minecraft.createTexturedTile (coorArr[0],coorArr[1]-2,coorArr[0],coorArr[1],'tree','axe');
      Minecraft.createTexturedTile (coorArr[0]-1,coorArr[1]-5,coorArr[0]+1,coorArr[1]-3,'leaf','axe');

   };
////////////////////////////////////////////////////////////////////get coordinates and creates elements
Minecraft.createTexturedTile = function(startRow,startCol,endRow,endCol,type,tool){
    for(i=startRow ; i<=endRow ; i++){
        for(j=startCol;j<=endCol;j++){
            Minecraft.blockArr[j][i].changeType(type,tool);
        }
    }
    return;
};
////////////////////////////////////////////////////////////////////////create rock
Minecraft.createRocks = function(){
     var coorArr =Minecraft.findFreeGrass();
     Minecraft.createTexturedTile (coorArr[0],coorArr[1],coorArr[0],coorArr[1],'rock','pickaxe');
};
////////////////////////////////////////////////////////////////////////create flower
Minecraft.createflower = function(){
     var coorArr =Minecraft.findFreeGrass();
     Minecraft.createTexturedTile (coorArr[0],coorArr[1],coorArr[0],coorArr[1],'flower','shears');
};
//////////////////////////////////////////////////////////////////////////craete bush
Minecraft.createBush = function(){
    var coorArr =Minecraft.findFreeGrass();
    Minecraft.createTexturedTile (coorArr[0],coorArr[1],coorArr[0],coorArr[1],'leaf','axe');
};
/////////////////////////////////////////////////////////////////////////////////create map
 Minecraft.createMap = function(){
     Minecraft.createBlocks(Minecraft.numOfRows,Minecraft.numOfCols);
     Minecraft.createGround();
     Minecraft.createTree();
     Minecraft.createRocks();
     Minecraft.createflower();
     Minecraft.createBush();
 }
///////////////////////////////////////////////////////////////////////////create toolbar
function Tools(type){
    this.tool = $('<div/>',{'class': type} );
    this.type = type;
    var self = this;
    this.tool.on('click' ,function(){
                Minecraft.selectedTool = self;
                console.log(Minecraft.selectedTool);
                if (self.type == 'theme'){
                    Minecraft.toggleTheme();    
                }
            });
}

Minecraft.createToolbar = function(){
   for(i=0 ; i<Minecraft.toolArr.length ; i++){
        var tool = new Tools(Minecraft.toolArr[i]);
        tool.tool.addClass ('tools');
        $('#header').append(tool.tool);
   }
};
function Inventory(type){
    this.inventory = $('<div/>',{'class': type} );
    this.type = type;
    var self = this;
    this.inventory.on('click' , function(){
                Minecraft.selectedBlock = self;
                console.log(Minecraft.selectedBlock);
            });
}
///////////////////////////////////////////////////////////////////////////show landingpage + start game
$("#start").click(function(){
    $("#wrapper").css("display", "block");
    $("#landingpage").css("display", "none");
    Minecraft.createMap();
    Minecraft.createToolbar();       
})
///////////////////////////////////////////////////////////////////////////toggle themes
Minecraft.toggleTheme = function(){
   $(".block").toggleClass("snow");
};
///////////////////////////////////////////////////////////////////////////play music
$(document).ready(function() {    
    var song = new Audio("./audio/minecraft.mp3");
    song.play();
});