const express=require('express');
const app=express();
const routes=require('./routes')
routeComponents.forEach((routeComponents)=>{
    const {path:parentpath,routes}=routeComponents
    routes.forEach((routes)=>{
        const{method,path,handler}=route
        app[method](parentpath+path,handler)
    })
})

const routes=[{
    method:'get',
    path:'/users',
    handler:(req,res)=>res.send('users')
},{
    method:'get',
    path:'/users/:id',
    handler:(req,res)=>res.send('users')
    
}
    

    
]
routes.forEach((route)=>{
    const {method,path,handler}=router
    app[method](path,handler)
})
app.listen(3000)