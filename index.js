


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
var px,py;
canvas.on('mouse:wheel',(opt)=>{
    console.log(opt);
    var delta=opt.e.deltaX;
    console.log("prev",zoomPrev)
    var zoom = canvas.getZoom();
   
    zoom *= 0.999 ** delta;
    console.log("after",zoom);
    if(zoom>=zoomPrev){
            
        if(zoom!=zoomPrev){
            px=opt.e.offsetX;
            py=opt.e.offsetY;
        }
        zoomPrev=zoom;
        if (zoom < 0.01) zoom = 0.01;
        canvas.zoomToPoint({ x: opt.e.offsetX,y: opt.e.offsetY}, zoom);
        console.log(opt.e.offsetX,opt.e.offsetY,px,py);
    }else{
        zoom=1;
        zoomPrev=1;
        canvas.zoomToPoint({ x:px,y: py}, zoom);
        console.log(px,py);
    }
   
    //canvas.setZoom(zoom);
   
     opt.e.preventDefault();
     opt.e.stopPropagation();


})