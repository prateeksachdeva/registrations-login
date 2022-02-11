const express=require('express');
const path=require('path');
const hbs=require('hbs');
const Users=require('./utils/users.js');
const bodyParser=require('body-parser');
const {v4 : uuidv4} = require('uuid');
const jwt=require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const bcrypt=require('bcryptjs');
const port=process.env.PORT || 3000;

const app=express();

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// Parse JSON bodies
app.set('view engine','hbs');
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.get('/',(req,res)=>{
  session=req.session;
  if(session.userid){
    res.render('welcome.hbs',{
      name:session.userid
    });
    return;
  }
  res.render('index.hbs');
});

app.get('/registration',(req,res)=>{
  session=req.session;
  if(session.userid){
    res.render('welcome.hbs',{
      name:session.userid
    });
    return;
  }
  res.render('registration.hbs');
});

app.get('/login',(req,res)=>{
  session=req.session;
  if(session.userid){
    res.render('welcome.hbs',{
      name:session.userid
    });
    return;
  }
  res.render('login.hbs');
});

app.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/');
});
app.post('/welcome',(req,res)=>{
  session=req.session;
  if(session.userid){
    res.render('welcome.hbs',{
      name:session.userid
    });
    return;
  }

  var user=Users.getUser(req.body.email,req.body.password);
    if(user=='e'){
      res.render('login',{
        msg:'*Email is invalid'
      })
      return;
    }
    else if(user=='p'){
          res.render('login',{
            msg:'*Password is invalid'
          })
          return;
        }
    else{
      if(user==undefined){
            res.render('login',{
              msg:'*Something is wrong'
            })
            return;
          }
        else{
      console.log(user);
        session=req.session;
        session.userid=user.name;
        console.log('session');
        console.log(JSON.stringify(session,undefined,2));
        res.render('welcome.hbs',{
          name:user.name
        });
        return;}}

  // if(user.length!=0){
  //   console.log('welcome');

  // return;}
  //   else{
  //         console.log('login');
  //     res.redirect('login');
  //   }

});

app.post('/registration',(req,res)=>{
  session=req.session;
  if(session.userid){
    res.render('welcome.hbs',{
      name:session.userid
    });
    return;
  }

  console.log(req.body);
  const user=req.body;
  user.id=uuidv4();
  var access='auth';
  var token=jwt.sign({id:user.id},'abc123');
  var tokens=[];
  var a={
    access,
    token,
    id:user.id
  }
  tokens.push(a);
  user.tokens=tokens;
  console.log(user);
    var dup=Users.addUser(user);
    console.log(dup);
    if(dup){
      res.render('registration.hbs',{
        msg:'*Sorry this email is already exist '
      });
      return;
    }
    req.session.userid=user.name
    console.log(req.session);
    res.render('welcome.hbs',{
      name:user.name
    });
    return;

});


app.use((req,res,next)=>{//for wrong url
  session=req.session;
  if(session.userid){
    res.render('welcome.hbs',{
      name:session.userid
    });
    return;
  }
  res.status(404).json({
    message:'bad request'
  })

})
app.listen(port,()=>{
  console.log("app is running");
})
