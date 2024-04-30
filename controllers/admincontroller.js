const Admin = require("../models/Admin");

const Customer = require("../models/Customer");
const RestaurantOwner = require("../models/RestaurantOwner")

 const viewcustomer = async (request, response) => 
 {
    try 
    {
      const customers = await Customer.find();
      if(customers.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(customers);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };
  
  const deletecustomer = async (request, response) => 
 {
    try 
    {
      const email = request.params.email
      const customer = await Customer.findOne({"email":email})
      if(customer!=null)
      {
        await customer.deleteOne({"email":email})
        response.send("Deleted Successfully")
      }
      else
      {
        response.send("Email ID Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const checkadminlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       console.log(input)
       const admin = await Admin.findOne(input)
       response.json(admin)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const addrestaurantowner = async (request, response) => {
    try 
    {
      const input = request.body;
      const gmailTransporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'foodbuddy.org@gmail.com', //gmail id
          pass: 'nlge sckb ooeo bhzf'  // app password
        }
    });
    
    
    const mailOptions = {
        from: 'foodbuddy.org@gmail.com',
        to: input.email,
        subject: 'Welcome to FoodBuddy',
        html: `It is great to have you ${input.fullname} as a Restaurant owner. <br/> Your default password is 123456.<br/>Ensure to change your password after logging in to FoodBuddy and clicking on this link https://foodbuddy1012.netlify.app/forgotpassword`
    };
    gmailTransporter.sendMail(mailOptions, function(error, info) {
      if (error) {
          console.error('Error sending email through Gmail:', error.message);
      } else {
          console.log('Email Sent Successfully');
      }
  });
      const restaurantowner = new RestaurantOwner(input);
      await restaurantowner.save();
      response.send('Added Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };

  const viewrestaurantowner = async (request, response) => 
 {
    try 
    {
      const restaurantowner = await RestaurantOwner.find();
      if(restaurantowner.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(restaurantowner);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const deleterestaurantowner = async (request, response) => 
 {
    try 
    {
      const uname = request.params.email
      const restaurantowner = await RestaurantOwner.findOne({"email":uname})
      if(restaurantowner!=null)
      {
        await RestaurantOwner.deleteOne({"email":uname})
        response.send("Deleted Successfully")
      }
      else
      {
        response.send("Email Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  module.exports = {viewcustomer,deletecustomer,checkadminlogin,deleterestaurantowner,addrestaurantowner,viewrestaurantowner}
