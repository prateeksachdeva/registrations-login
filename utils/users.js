const fs = require('fs');
var crypto = require('crypto');

var fetchUsers=()=>{
  try{
    var userString=fs.readFileSync('users-data.json');
    return JSON.parse(userString);
  }
  catch(e){
    return [];
  }
};

var saveUsers=(users)=>{
    fs.writeFileSync('users-data.json',JSON.stringify(users));
};
var addUser=(userr)=>{
  var users=fetchUsers();
  var hash = crypto.createHash('md5').update(userr.password).digest('hex');

    var user={
      name:userr.name,
      mobileNumber:userr.mobileNumber,
      pwd:userr.pwd,
      email:userr.email,
      panno:userr.panno,
      fname:userr.fname,
      dob:userr.dob,
      password:hash,
      id:userr.id,
      tokens:userr.tokens
    };

    var duplicateUsers=users.filter((user)=> user.email==userr.email);
    if(duplicateUsers.length>0){
      return true;}
    if(duplicateUsers.length===0){
      users.push(user);
      saveUsers(users);
      return false;
    }


};


var getUser=(email,password)=>{

  var users=fetchUsers();
  var filteredUser=users.filter((user)=>user.email==email);
  if(filteredUser[0]===undefined)return 'e';
    var hash = crypto.createHash('md5').update(password).digest('hex');
  var filteredUserp=filteredUser.filter((user)=>user.password==hash);
    if(filteredUserp[0]===undefined)return 'p';

  return filteredUserp[0];
};



module.exports = {
  addUser,
  getUser
};
