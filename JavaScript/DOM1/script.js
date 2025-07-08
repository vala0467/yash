 function incr ()
{
    const c = document.getElementById('count')
    let x = c.textContent;
     
}
function add(){
    const c = document.getElementById('count')
    let x = c.textContent;
    x++;
    let rnum = Math.round(Math.random() * 255);
    c.textContent = x;
    console.log(`rgb(${rnum},${rnum},${rnum})`)
    document.body.style.background=`rgb(${rnum},${rnum},${rnum})`
}
function fun(){
    const c=document.getElementById('count')
    let x=c.textContent;
    x--;
     c.textContent = x;
    console.log(`rgb(${rnum},${rnum},${rnum})`)
    document.body.style.background=`rgb(${rnum},${rnum},${rnum})`
}