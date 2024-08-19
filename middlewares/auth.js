import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    //Check if session has user
    if(req.session.user) {
        next();
    }else if(req.headers.authorization) {
      try {
         //Extract token from headers
         const token = req.headers.authorization.split(' ')[1];
         //Verify the token to get user and append to request 
         req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
         //all next function
         next()
      } catch (error) {
        return res.status(401).json({error: "Token Expired"})
        
      }
    }else{
        res.status(401).json('User not authenticated');

    }
}


export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json('Access denied');
  }
};




// export const isAuthenticated = (req, res, next) => {
//     console.log("isAuthenticated middleware called");

//     // Check if session has user
//     if (req.session.user) {
//         console.log("Session user found:", req.session.user);
//         next();
//     } else if (req.headers.authorization) {
//         console.log("Authorization header found:", req.headers.authorization);
//         try {
//             // Extract token from headers
//             const token = req.headers.authorization.split(' ')[1];
//             console.log("Extracted token:", token);

//             // Verify the token to get user and append to request 
//             req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
//             console.log("Verified user from token:", req.user);

//             // Call next function
//             next();
//         } catch (error) {
//             console.error("Error verifying token:", error.message);
//             return res.status(401).json({ error: "Token Expired" });
//         }
//     } else {
//         console.log("No session user or authorization header found");
//         res.status(401).json('User not authenticated');
//     }
// };
