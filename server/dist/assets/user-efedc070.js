import{d as r}from"./index-63495004.js";const o=r.create({baseURL:"http://localhost:3000/api/users"});async function c(){const t=localStorage.getItem("bloglist");if(t){const{token:a}=JSON.parse(t),{data:e}=await o.get("/",{headers:{Authorization:`Bearer ${a}`}});return e}}async function i(t){const{data:a}=await o.post("/",t);return a}async function l(t){const a=localStorage.getItem("bloglist");if(a){const{token:e}=JSON.parse(a),{data:s}=await o.patch("/",t,{headers:{Authorization:`Bearer ${e}`}});return s}}export{i as c,c as g,l as u};