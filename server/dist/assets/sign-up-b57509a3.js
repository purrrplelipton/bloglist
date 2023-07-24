import{u as g,r as l,A as f,j as e,m as w,E as j,a as v,S,b as _,c as b,L as y}from"./index-e42751e5.js";import{c as C}from"./user-73273acf.js";import{v as d}from"./v4-a960c1f4.js";const F="_sign-up-form_5ljzx_1",P="_name-section_5ljzx_6",A="_show-password-toggle_5ljzx_22",o={"sign-up-form":"_sign-up-form_5ljzx_1",signUpForm:F,"name-section":"_name-section_5ljzx_6",nameSection:P,"show-password-toggle":"_show-password-toggle_5ljzx_22",showPasswordToggle:A},p={name:{first:"",last:""},email:"",password:""},q=()=>{const u=g(),{dispatch:c}=l.useContext(f),[t,r]=l.useState(p),[n,i]=l.useState({showPassword:!1,termsOfServiceAccepted:!1,creating:!1});function h(a){i(s=>({...s,creating:!0})),a.preventDefault(),C(t).then(()=>{r(p),c(s=>({...s,notifs:s.notifs.concat({message:"Account created successfully",color:"success",id:d()})})),u("/",{replace:!0})}).catch(({message:s})=>c(m=>({...m,notifs:m.notifs.concat({message:s,color:"error",id:d()})}))).finally(()=>i(s=>({...s,creating:!1})))}const x={hidden:{x:"100%",opacity:0},visible:{x:0,opacity:1},exit:{x:"-100%",opacity:0}};return e.jsxs(w.main,{variants:x,initial:"hidden",animate:"visible",exit:"exit",children:[e.jsxs("form",{className:o.signUpForm,action:"/sign-up",method:"post",onSubmit:h,children:[e.jsxs("section",{className:o.nameSection,children:[e.jsxs("label",{htmlFor:"user-firstname",children:[e.jsx("input",{type:"text",name:"firstname-user",id:"user-firstname",value:t.name.first,onChange:a=>r(s=>({...s,name:{...s.name,first:a.target.value}})),required:!t.name.first.trim(),autoComplete:"given-name"}),e.jsx("span",{children:"First Name"})]}),e.jsxs("label",{htmlFor:"user-lastname",children:[e.jsx("input",{type:"text",name:"lastname-field",id:"user-lastname",value:t.name.last,onChange:a=>r(s=>({...s,name:{...s.name,last:a.target.value}})),required:!t.name.last.trim(),autoComplete:"family-name"}),e.jsx("span",{children:"Last Name"})]})]}),e.jsxs("label",{htmlFor:"user-email",children:[e.jsx("input",{type:"email",name:"email-input",id:"user-email",value:t.email,onChange:a=>r(s=>({...s,email:a.target.value})),required:!t.email.trim(),autoComplete:"username"}),e.jsx("span",{children:"Email"})]}),e.jsxs("label",{htmlFor:"user-password",children:[e.jsx("input",{type:n.showPassword?"text":"password",name:"password-input",id:"user-password",value:t.password,onChange:a=>r(s=>({...s,password:a.target.value})),required:!t.password.trim(),autoComplete:"new-password"}),e.jsx("button",{type:"button",onClick:()=>i(a=>({...a,showPassword:!a.showPassword})),"aria-label":n.showPassword?"hide password":"show password",className:o.showPasswordToggle,children:n.showPassword?e.jsx(j,{}):e.jsx(v,{})}),e.jsx("span",{children:"Password"})]}),e.jsxs("label",{htmlFor:"terms-of-service",children:[e.jsx("input",{type:"checkbox",name:"terms_of_service",id:"terms-of-service",checked:n.termsOfServiceAccepted,onChange:a=>i(s=>({...s,termsOfServiceAccepted:a.target.checked}))}),n.termsOfServiceAccepted?e.jsx(S,{}):e.jsx(_,{}),e.jsx("span",{children:"I agree to the Tobi Terms of Service"})]}),e.jsx("button",{type:"submit",disabled:!n.termsOfServiceAccepted,children:n.creating?e.jsx(b,{width:18}):"Sign Up"})]}),e.jsxs("p",{className:o.signInRedirect,children:["Already have an account? ",e.jsx(y,{to:"/sign-in",children:"Sign In"})]})]})};export{q as default};
