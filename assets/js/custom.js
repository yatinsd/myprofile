// import myAlljs from "./functions-min.js";
//Set of function known as a class
class myComponent{
    constructor(){
        this.url = "./Component/";
        this.alldata = [];
        this.browserClass = null;
    }
    loadFile(){
        this.getAllComponents();
        this.elems.map((key,ele)=>{
            this.alldata.push(this.getData($(ele)));
        });
    }
    loadFileInOldBrowser(){
        this.getAllComponents();
            // $(".DS-CenterAlign.loader-container").remove();
        this.elems.map((key,ele)=>{
           const URI = `${this.url}${$(ele).attr("data-component")}.html`;
        // console.log(URI);
           $.get(URI)
                .done((result)=>{
                    ele.innerHTML = result;    
                    // console.log($(ele));
                })
                .fail( err => console.error(err)  )
        });
    }
    grabResult(){
        Promise.all(this.alldata).then(this.sucess,this.error);
    }
    getData(input){
        const URI = `${this.url}${input.attr("data-component")}.html`
        return new Promise((resolve,reject) => {
             $.get(URI)
                .done(  res => resolve({res:res,ele:input})  )
                .fail( err => reject(err)  )
         })
    }
    getAllComponents(){
        this.elems = $("[data-component]");
    }
    sucess(r){
        // console.log(r);
        console.log("Load Files");
        $.each(r,function(key,e){
            e.ele.append(e.res); 
        });
    }
    error(r){
        console.log(r);
    }
    addBrowserClass(){
        if(/mozilla/.test(navigator.userAgent.toLowerCase()))
            this.browserClass = "moz";
        if(/opera/.test(navigator.userAgent.toLowerCase()))
            this.browserClass = "opera";
        if(/safari/.test(navigator.userAgent.toLowerCase()))
            this.browserClass = "saf";
        if(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)
            this.browserClass = "iOS";
        if(/chrome/.test(navigator.userAgent.toLowerCase()))
            this.browserClass = "chrome";
        const CHECKIE =  /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent)
        if(CHECKIE !== null )
            this.browserClass = "ie"+Math.round(CHECKIE[1]);
        if(/edge/.test(navigator.userAgent.toLowerCase()))
            this.browserClass = "edge"; 
        $("html").addClass(this.browserClass)
    }
}
const loadFiles = new myComponent();
loadFiles.addBrowserClass();
if(loadFiles.browserClass !== "saf")
{   
    loadFiles.loadFile();
    loadFiles.grabResult();
}
else{
    console.log("this is safari b");
    loadFiles.loadFileInOldBrowser();
}