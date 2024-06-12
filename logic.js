

function addTask()
{
    let title = document.querySelector("#input1").value;
    let date = document.querySelector("#input2").value;
    let time = document.querySelector("#input3").value;

    localStorage.setItem("title" , title);
    localStorage.setItem("date" , date);
    localStorage.setItem("time" , time);
}
