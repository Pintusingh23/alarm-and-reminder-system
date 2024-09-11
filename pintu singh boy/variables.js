// for (let i=0; i<10;i++){
//     console.log(i);
// }
// {
//     let i=0;
//     console.log(i);

// }
// {
//     let i=1;
//     console.log(i);
// }

// for (var i=0; i<2;i++){
//     setTimeout(()=>{
//         console.log(i)
//     },1000)
// }
// var i
// {
//     i=0
//     if(i<2){
//         setTimeout(()=>{
//             console.log(i);
//         },1000)
//     }

//     1++;
// }
// {

//     // i=1
//     if(i<2){
//         setTimeout(()=>{
//             console.log(i);
//         },1000)
//     }

    
// }

// function sayHi(){
//     var name ;
//     console.log(name);
//     console.log(age);
//     name='Lydia';
//     let age=21;
// }
// sayHi();
// for (let i=1;i<5;i++){
//     if (i==3)continue;
//     console.log(i);
// }
// console.log(String)
// let str="abcd"
// str.charAt(2);
// (new String(str)).charAt(2);

// let arr=[1,2,3,4];
// let obj={
//     0:1,1:2,2:3,3:4
// }

let c={
    greeting:'hey!',
    key2 :{
        1: 2
    }
};
let d;
d=c;
c.hreeting='Hello';
console.log(d.greeting)


let e={
    ...c
}
e.key[1]='one'
JSON.parse(JSON.stringify(c))
