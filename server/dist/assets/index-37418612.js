import{u as x,r as a,A as w,j as e,E as j,a as b,S as _,b as y,c as S,B as v,L as I,s as q}from"./index-63495004.js";import{v as C}from"./v4-a960c1f4.js";const k="_sign-in-form_1hi1q_1",F="_forgot-password_1hi1q_85",E="_google-sign-in_1hi1q_105",i={"sign-in-form":"_sign-in-form_1hi1q_1",signInForm:k,"forgot-password":"_forgot-password_1hi1q_85",forgotPassword:F,"google-sign-in":"_google-sign-in_1hi1q_105",googleSignIn:E},c={email$alias:"",password:"",rememberMe:!1},N=()=>{const d=x(),{dispatch:p}=a.useContext(w),[n,o]=a.useState(c),[l,g]=a.useState({verifying:!1}),[t,h]=a.useState(!1);async function u(r){g(s=>({...s,verifying:!0})),r.preventDefault();try{const s=await q(n);localStorage.setItem("bloglist",JSON.stringify(s)),o(c),d("/")}catch({message:s}){p(m=>({...m,notifs:m.notifs.concat({message:s,color:"error",id:C()})}))}g(s=>({...s,verifying:!1}))}function f(){}return e.jsxs(e.Fragment,{children:[e.jsxs("form",{className:i.signInForm,action:"/sign-in",method:"post",onSubmit:u,children:[e.jsx("h1",{children:"welcome back"}),e.jsx("p",{children:"please enter your details."}),e.jsxs("label",{htmlFor:"user-id",children:[e.jsx("input",{type:"text",name:"username_email",id:"user-id",onChange:r=>o(s=>({...s,email$alias:r.target.value})),value:n.email$alias,required:!n.email$alias.trim(),autoComplete:"username"}),e.jsx("span",{children:"email | alias"})]}),e.jsxs("label",{htmlFor:"user-password",children:[e.jsx("input",{type:t?"text":"password",name:"user_password",id:"user-password",onChange:r=>o(s=>({...s,password:r.target.value})),value:n.password,required:!n.password.trim(),autoComplete:"current-password"}),e.jsx("span",{children:"password"}),e.jsx("button",{type:"button",onClick:()=>h(r=>!r),"aria-label":t?"hide password":"show password",children:t?e.jsx(j,{}):e.jsx(b,{})})]}),e.jsxs("label",{htmlFor:"remember-me",children:[e.jsx("input",{type:"checkbox",name:"remember_me",id:"remember-me",checked:n.rememberMe,onChange:r=>o(s=>({...s,rememberMe:r.target.checked}))}),n.rememberMe?e.jsx(_,{}):e.jsx(y,{}),e.jsx("span",{children:"Remember me for 30 days"})]}),e.jsx("a",{href:"/forgot-password",target:"_blank",rel:"noopener noreferrer",className:i.forgotPassword,children:"Forgot password"}),e.jsx("button",{type:"submit",disabled:l.verifying,children:l.verifying?e.jsx(S,{width:18}):"sign in"}),e.jsxs("button",{type:"button",onClick:f,className:i.googleSignIn,children:[e.jsx(v,{}),e.jsx("span",{children:"Sign in with Google"})]})]}),e.jsxs("p",{children:["Don't have an account? ",e.jsx(I,{to:"/sign-up",children:"sign up"})]})]})},M=N;export{M as SignIn};
