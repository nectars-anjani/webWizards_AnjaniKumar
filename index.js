


const canvas= new fabric.Canvas('canvas',{
    width:1000,
    height:600,
    selection:true,

});

canvas.renderAll();
const reader = new FileReader()
const uploadImg=document.getElementById('imgUpload');
uploadImg.addEventListener('change',(e)=>{
  
    const file=uploadImg.files[0];
    reader.readAsDataURL(file);
    console.log(e,file);
});

reader.addEventListener('load',(e)=>{
    fabric.Image.fromURL(reader.result,img=>{
        canvas.add(img);
        canvas.renderAll();
    })
})
var zoomPrev=canvas.getZoom()-1;
var px,py,cx,cy,i=0,pz,prev;let arr=[];
canvas.on('mouse:wheel',(opt)=>{
   // console.log(opt);
    var delta=opt.e.deltaY;
  //  console.log("prev",zoomPrev)
    var zoom = canvas.getZoom();
    cx=opt.e.offsetX;cy=opt.e.offsetY;
    zoom *= 0.999 ** delta;
   // console.log("after",zoom);
    if(zoom>zoomPrev){
      
        if(cx!=px || cy!=py){
            arr.push({in:i++,x:cx,y:cy,zm:zoom});
            px=cx;
            py=cy;
        }
        console.log("i",i);
        if(arr.length>0){
            arr[arr.length-1].zm=zoom;
            console.log("more",arr.length,zoom,zoomPrev,arr[arr.length-1].zm);
        }
       
        zoomPrev=zoom;
        canvas.zoomToPoint({ x: opt.e.offsetX,y: opt.e.offsetY}, zoom);
        // console.log(opt.e.offsetX,opt.e.offsetY,px,py);


    }else{
        if((cx!=px || cy!=py) && arr.length>1){
            prev=arr.pop();i--;
            pz=arr[prev.in-1].zm
            px=cx;
            py=cy;
            console.log("less",arr.length,zoom,pz);
           // canvas.zoomToPoint({ x: prev.x,y: prev.y},prev.zm);
            // console.log(prev.x,prev.y,arr);
          
        }else{
            if(((cx!=px || cy!=py))&& arr.length>0){
               prev=arr.pop();i--;
                px=cx;
                py=cy;
                pz=1;
                console.log("less ese ",arr.length,zoom,pz);
                //canvas.zoomToPoint({ x: prev.x,y: prev.y}, 1);
                // console.log(prev.x,prev.y,arr);
               
            }
          if(zoom>pz)canvas.zoomToPoint({ x: prev.x,y: prev.y},zoom);
          else if(zoom<pz && zoom<1){canvas.zoomToPoint({ x: prev.x,y: prev.y},1);  zoomPrev=1;i=0}
            console.log("less",zoom,pz,"arr length",arr.length);
        }
       
       

    }
   
    //canvas.setZoom(zoom);
   
     opt.e.preventDefault();
     opt.e.stopPropagation();


})