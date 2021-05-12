
        var interval;

        var zoomIntensity = 0.1; 
  
        var canvas = document.getElementById("canvas"); 
        var context = canvas.getContext("2d"); 
        var width = 600; 
        var height = 200; 
  
        var scale = 1; 
        var orgnx = 0; 
        var orgny = 0; 
        
        var visibleWidth = width; // ??
        var visibleHeight = height; // ??
        
        
        // define a rectangle to rotate
        var rect={ x:100, y:50, width:400, height:100 };     //posisi x,y ukuran  w,h   //ukuran awal kotak canvas - berlaku untuk DRAG+ROTATE+SCALE 
        //x= 100+400+100 = 600
        //x= 50 +100+50  = 200
        var derajat;
        
        
        
        function updateColorAlpha (alpha) {
            document.getElementById('myColor').style.opacity = alpha;
        }

        
        
        function draw() {   // melakukan pengulangan untuk menggambar
            
            //fungsi ModeScale - dieksekusi ketika keadaan ModeScale=True & onwhell 
            
            //fungsi ModeRotate - dieksekusi ketika keadaan ModeRotate=True & saat menekan tombol 
            
            //fungsi ModeDrag -
            setTransformFunc(Tx,Ty);  //mendapatkan fungsi SetTransformFun() dengan variabel terbaru
            
            
            var kuning = "yellow";

            context.fillRect( rect.x, rect.y, rect.width, rect.height );  // kotak yg diputar
            
            context.fillStyle = "white"; 
            context.fillRect(orgnx, orgny, 800 / scale, 800 / scale); 
            context.fillStyle = "green"; 
            context.fillRect(250,50,100,100); //membuat gambar di posisi x=250,y=50 , 200=rataKiri 300-rataKanan , 0=rataAtas 100=rataBawah
            context.fillStyle = kuning; 
            context.fillRect(125,25,100,100); 
            context.fillStyle = "red"; 
            context.fillRect(500,75,100,100);
            context.fillStyle = "yellow"; 
            context.fillRect(375,25,100,100);
            
            
            //ditempatkan paling bawah supaya tidak ketiban gambar atasnya
            writeMessage(context, message); //mendapatkan fungsi WriteMassage() dengan variabel terbaru
            // selama fungsinya teruss diPanggil - maka akan ter ke update
            
        } 
        
        
        interval = setInterval(draw, 800 / 60);  // pengulangan teruss
          
          
        //untuk menghilangkan pengulangan
        function BtnStop() {
            clearInterval(interval);
        }  
          
        
        
        
        
        //buttom click Warna
        function myColorFun() {
            document.getElementById("myColor").click()
        }
        
          
          
        // Scroll effect function ------------------------------------------------------------------------------------  (   )
        
        var modeScale = false ;
        
        if (modeScale !== true) {  // pasang Mode Disetiap Tombol -> save url img -> ganti mode
        
            canvas.onwheel = function(event) { 
                event.preventDefault(); 
                //var x = event.clientX - canvas.offsetLeft;   (X-BLOM)
                //var y = event.clientY - canvas.offsetTop;
                
                //var x = event.clientX; 
                //var y = event.clientY;
                
                //WORK (setengah dari ukuran canvas)
                var x = 300 ;
                var y = 100 ;
                 
                var scroll = event.deltaY < 0 ? 1 : -2; 
      
                var zoom = Math.exp(scroll * zoomIntensity); 
  
                context.translate(orgnx, orgny); 
      
                orgnx -= x / (scale * zoom) - x / scale; 
                orgny -= y / (scale * zoom) - y / scale; 
      
                context.scale(zoom, zoom); 
                context.translate(-orgnx, -orgny); 
      
                // Updating scale and visisble width and height 
                scale *= zoom; 
                visibleWidth = width / scale; // ??
                visibleHeight = height / scale; // ??
            } 
     
        }    
            
        
        
        
        
        //-----------------------------------------------------------
        //https://cssdeck.com/labs/cbpb6qqm

        
        //mouse click rotate terus ################################################################################ ( V )
        
        var intervalMouse;
        
        var result = document.getElementById('result');
        
        var ButRL = document.getElementById('BRL');
        var ButRR = document.getElementById('BRR');
        
        
        var modeRotate = false ;
        
        if (modeRotate !== true) {  // pasang Mode Disetiap Tombol -> save url img -> ganti mode
        
            ButRL.addEventListener('mousedown', function() {
              document.getElementById("pRotateSatu").innerHTML = "The mouse button is held down.";
              intervalMouse = setInterval(rotateLeft, 20);   //tandakurung () dihilangkan untuk    function rotateLeft
            });
            ButRL.addEventListener('mouseup', function () {
              document.getElementById("pRotateSatu").innerHTML = "You released the mouse button.";
              clearInterval(intervalMouse);
            });
            
            
            ButRR.addEventListener('mousedown', function() {
              intervalMouse = setInterval(rotateRight, 20);   //tandakurung () dihilangkan untuk    function rotateRight
            });
            ButRR.addEventListener('mouseup', function () {
              clearInterval(intervalMouse);
            });
        
        }
        
        
        //function Rotate ------------------------------------------------------------------------------------
        function rotateLeft(){
          derajat = -50;
          result.innerText += 'd';
          document.querySelector('#NumRot').value = derajat;
	  
	  // draw the rectangle rotated by 45 degrees (==PI/4 radians)
          context.translate( rect.x+rect.width/2, rect.y+rect.height/2 );
          context.rotate( Math.PI/derajat ); // 1 -> 150  // -4/4 min/plus
          context.translate( -rect.x-rect.width/2, -rect.y-rect.height/2 );
          //i++;
        }
        
        function rotateRight(){
          derajat = 50;
          result.innerText += 'd';
          document.querySelector('#NumRot').value = derajat;
	  
	  // draw the rectangle rotated by 45 degrees (==PI/4 radians)
          context.translate( rect.x+rect.width/2, rect.y+rect.height/2 );
          context.rotate( Math.PI/derajat ); // 1 -> 150  // -4/4 min/plus
          context.translate( -rect.x-rect.width/2, -rect.y-rect.height/2 );
          //i++;
        }
        
        
        //buttom Slider Warna ################################################################################
        function outputUpdate(Rot) {
	  
	  //Rot += Rot;
	  
	  if (Rot > 150) {
            derajat = Rot-150;
            derajat = derajat*-1;
          } else {
            derajat = Rot*1;
          }
          
          document.querySelector('#NumRot').value = derajat;
	  
	  // draw the rectangle rotated by 45 degrees (==PI/4 radians)
          context.translate( rect.x+rect.width/2, rect.y+rect.height/2 );
          context.rotate( Math.PI/derajat ); // 1 -> 150  // -4/4 min/plus
          context.translate( -rect.x-rect.width/2, -rect.y-rect.height/2 );
        }
        
        
        //mouse click=true terus Drag ################################################################################ ( V )
        
        //var canvas = events.getCanvas();
        //var context = events.getContext();
        
        //var intervalMouseDrag;
        //var message;  //function langsung mengindikasi bahwa itu variabel
        //var WS;
        
        var mousePos;
        
        var DragStatus = undefined;
        var Tx=0;
        var Ty=0;
        
        var intervalMouseDrag;
        
        
        
        var modeDrag = false ;
        
        if (modeDrag !== true) {  // pasang Mode Disetiap Tombol -> save url img -> ganti mode
        
          canvas.addEventListener("mouseout", function(){
              message = "Mouse-over me!";
          }, false);
                  
          canvas.addEventListener("mousemove", function(){
              var Posx = event.offsetX;
              var Posy = event.offsetY;
              mousePos = {"x":Posx,"y":Posy};
              
              DragStatus;
            
              if (mousePos !== null) {
                  message = "Mouse position x: " + mousePos.x + ", Mouse position y: " + mousePos.y + " Status Mouse Drag : " + DragStatus;
                  //WS = writeMessage(context, message);
                  //intervalMouseDrag = setInterval( WS , 20);  //pakai interval yg draw()
              } else {
                  message = "Mouse position x: " + mousePos.x + ", Mouse position y: " + mousePos.y + " Status Mouse Drag : " + DragStatus;
              } 
              
              
              if (DragStatus === true){
                      Tx = mousePos.x;
                      Ty = mousePos.y;
              } else {}
            
          }, false);
        
        
          canvas.addEventListener("mousedown", function(){  //akan menjalankan function jika event berlangsung 
              DragStatus = true;
          }, false);
          
          /*
          canvas.onmousedown = function(event) {  
              writeMessage(context, message);
              setTransformFunc(Tx,Ty);
          }
          */
        
          canvas.addEventListener("mouseup", function(){
              DragStatus = false;
          }, false);
          
          
          
          function setTransformFunc(Tx,Ty){
              if (DragStatus === true){
                  context.translate( -rect.x-rect.width/2, -rect.y-rect.height/2 );
                  context.setTransform(1,0,0,1,Tx,Ty);
                  //(Scales-Horizontally,Skew-Horizontally,Skew-Vertically,Scales-Vertically,Moves-Horizontally,Moves-Vertically);
                  context.translate( -rect.x-rect.width/2, -rect.y-rect.height/2 );
              }
              else {}
          }
        
        
        
          function writeMessage(context, message){
                  context.fillStyle = "black"; 
                  context.font = "10pt Calibri";
                  context.fillText(message, 10, 25);
          }
          
          
          
        
        }
        
    