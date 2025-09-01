let boxes=document.querySelector('.boxes')
let value=4;
let imgeC=7,random;
let selectArr=[],pass=false
const pass_play=new Audio('/sound/game-start-317318.mp3')
const final=new Audio('/sound/pass.mp3')
function createBox(val){
    let index=[]
    for(let i=0;i<val*val/2;i++){
        let a={
            'val':i,
            'first_add':false,
            'second_add':false
        }
        index.push(a)
    }
    boxes.innerHTML=''
    for(let i=0;i<val;i++){
        let column=document.createElement('div')
        column.className=`column${i}`
        for(let j=0;j<val;j++){
            let parent=document.createElement('div')
            parent.className='game-block'
            let frontFace=document.createElement('div')
            frontFace.className='front-face'
            parent.appendChild(frontFace)
            let box=document.createElement('div')
            box.className='box'
            box.classList.add('evil')
            while(true){
                random=Math.floor(Math.random()*index.length)
                if(!index[random].first_add){
                    box.innerHTML=
                    `<img src="img/img${index[random].val}.jpg" alt="img${index[random].val}">`
                    index[random].first_add=true
                    break
                }else if(!index[random].second_add) {
                    box.innerHTML=
                    `<img src="img/img${index[random].val}.jpg" alt="img${index[random].val}">`
                    index[random].second_add=true
                    break
                }
            }
        parent.appendChild(box)
        column.appendChild(parent)
        }
        boxes.appendChild(column)
    }
    boxes.style.width=`calc(val*100px) !important`
}
createBox(value)
function checkpass(selectArr){
    if(selectArr.length>=2){
        return selectArr[0][1]===selectArr[1][1]
    }
    else return false
}
function finalResult(){
    let result=[]
    for(let i=0;i<value;i++){
        result[i]=Array.from(boxes.children[i].children).every((e)=>e.classList.contains('pass'))
    }
    if(result.every(e=>e===true))
        final.play()
}
function selectNum(){
    selectArr=[]
    for(let i=0;i<value;i++){
        Array.from(boxes.children[i].children).forEach((e,ind)=>{
            if(e.classList.contains('select')&&!e.classList.contains('pass')){
                selectArr.push([[i,ind],e.children[1].children[0].alt])
            }
        })
    }
    pass=checkpass(selectArr)
    if(pass){
        pass_play.play()
        boxes.children[selectArr[0][0][0]].children[selectArr[0][0][1]].classList.add('pass')
        boxes.children[selectArr[1][0][0]].children[selectArr[1][0][1]].classList.add('pass')
        finalResult()
    }
    return selectArr.length+1
}
function removeSelect(){
    if(!pass){
        boxes.children[selectArr[0][0][0]].children[selectArr[0][0][1]].classList.remove('select')
        boxes.children[selectArr[0][0][0]].children[selectArr[0][0][1]].children[0].classList.remove('select')

        boxes.children[selectArr[1][0][0]].children[selectArr[1][0][1]].classList.remove('select')
        boxes.children[selectArr[1][0][0]].children[selectArr[1][0][1]].children[0].classList.remove('select')
   } 
   selectArr=[]
}
boxes.onclick=(e)=>{
    if(selectArr.length<2){
        if(e.target.classList.contains('front-face')){
            e.target.parentElement.classList.add('select')
            e.target.classList.add('select')
            selectNum()
        }
    }else if(selectArr.length===2&&(e.target.classList.contains('front-face')||e.target.tagName==="IMG")){
        removeSelect()
        let target=e.target
        if(target.tagName==="IMG"){
            target=target.parentElement
            target=target.parentElement

            target.classList.add('select')
            target.children[0].classList.add('select')
        }
        else{
            e.target.parentElement.classList.add('select')
            e.target.classList.add('select')
    }}
}