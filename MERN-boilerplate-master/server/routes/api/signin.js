const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {

  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const {
      firstName,
      lastName,
      password
    }  = body;

    let {email} = body;
    if(!firstName){
      return res.send({
        sucess: false,
        message: 'Error: Frist name cannot be blank'
      })
    }
    if(!lastName){
      return res.send({
        sucess: false,
        message: 'Error: Lase name cannot be blank'
      })
    }
    if(!email){
      return res.send({
        sucess: false,
        message: 'Error: Email name cannot be blank'
      })
    }
    if(!password){
      return res.send({
        sucess: false,
        message: 'Error: Password name cannot be blank'
      })
    }
    email = email.toLowerCase();
    User.find({
      email: email
    }, (err, previousUsers) => {
      if(err){
        return res.send({
          sucess: false,
          message: 'Error: Server error'
        })
      } else if(previousUsers.length > 0){
        return res.send({
          sucess: false,
          message: 'Error: Account already exist'
        })
      }
      //save user
      const newUser = new User();

      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if(err){
          return res.send({
            sucess: false,
            message: 'Error: Server error'
          })
        }
        return res.send({
          sucess: true,
          message: 'Signed up'
        })
      });
    });
  })



  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const {
      password
    }  = body;

    let {email} = body;

    if(!email){
      return res.send({
        sucess: false,
        message: 'Error: Email name cannot be blank'
      })
    }
    if(!password){
      return res.send({
        sucess: false,
        message: 'Error: Password name cannot be blank'
      })
    }
    email = email.toLowerCase();
    User.find({
      email: email
    }, (err, users) => {
      console.log(users);
      if(err){
        return res.send({
          sucess: false,
          message: 'Error: Server error'
        })
      }
      if(users.length != 1)
      {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        })
      }
        const user = users[0];
        if(!user.validPassword(password)){
          return res.send({
            success: false,
            message: 'Error: Invalid'
          })
        }

        var userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
          if(err){
            return res.send({
              success: false,
              message: 'Error: server error'
            })
          }
          return res.send({
            success: true,
            message: 'Valid sign in',
            token: doc._id
          })
        })
    });
  })

  app.get('/api/account/verify', (req, res, next) => {
      const { query } = req;
      const { token } = query;
      console.log(query);
      UserSession.find({
        _id: token,
        isDeleted: false
      }, (err, sessions) => {
      if (err) {

        return res.send({
          success: false,
          message: 'Error: ' + err
        })
      }
      console.log(sessions);
      if(sessions.length != 1){
        return res.send({
          success: false,
          mesage: 'Eror: Invalid'
        });
      }else
      {
        return res.send({
          success: true,
          mesage: 'Valid'
        });
      }
  });
})


  app.get('/api/account/logout', (req, res, next) => {
      const { query } = req;
      const { token } = query;

      UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
      }, {
        $set:{
          isDeleted:true
        }
      }, null, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: ' + err
        })
      }
      if(sessions)
      {
        return res.send({
          success: true,
          mesage: 'Oke'
        });
      }else {
        return res.send({
          success: false,
          mesage: 'Invalid'
        });
      }

    })
  });

};
