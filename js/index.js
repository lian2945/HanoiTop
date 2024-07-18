var moveLable=undefined;
var discCount=0;
var complete=false;
var move=0;

function addDisk()
{
    if(discCount>12) return;
    let tower=document.getElementById("towerA");
    const disc=document.createElement("div");
    disc.classList.add("disc");
    tower.appendChild(disc);
    let width=200-(discCount*10);
    disc.style.width=width.toString() + 'px';
    disc.ondragstart=dragStart;
    disc.ondragend=dragEnd;
    if(discCount>=10)
    {
        disc.id="disc"+discCount.toString();
    }
    else
    {
        disc.id="disc0"+discCount.toString();
    }
    discCount++;
}

function reset()
{
    let towers=document.querySelectorAll(".tower");
    towers.forEach((tower) => {
        tower.innerHTML="";
    });
    move=discCount=0;
    let msgSuccess = document.getElementById('msgSuccess');
    msgSuccess.style.display='none';
    complete=false;
}

function dragStart(e)
{
    e.dataTransfer.setData('text/plain', this.id);
    this.classList.add("dragging");
    setTimeout(() => {
        this.style.display='none';
    }, 0);
}

function dragEnd(e)
{
    this.classList.remove("dragging");
    setTimeout(() => {
        this.style.display='block';
    }, 0);
}

function isSuccess()
{
    let towerA=document.getElementById('towerA');
    let towerB=document.getElementById('towerB');
    let Succmsg=document.getElementById('msgSuccess');
    if(towerA.childElementCount+towerB.childElementCount===0)
    {
        Succmsg.style.display='block';
    }
    complete=true;
}

function towerReset()
{
    const towers=document.querySelectorAll('.tower');

    towers.forEach((tower) => {
        tower.forEach((disc) => {
            disc.setAttribute('draggable', 'false');
        });

        if(tower.lastElementChild !== null && !complete)
            tower.lastElementChild.setAttribute('draggable', 'true');
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    let towers = document.querySelectorAll('.tower');
    moveLabel=document.getElementById('moveCount');
    moveLabel.textContent=move.toString();
    towers.forEach((tower) => {
        tower.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        tower.addEventListener('drop', (e) => {
            e.preventDefault();
            const id=e.dataTransfer.getData('text');
            const disc=document.getElementById(id);

            if(tower.lastElementChild===null || tower.lastElementChild.id < disc.id)
            {
                tower.appendChild(disc);
                disc.style.display='block';
                move++;
                moveLabel.textContent = move.toString();
                isSuccess();
                towerReset();
            }
        });
    });
})