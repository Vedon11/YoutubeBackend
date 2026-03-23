/*import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/api.error.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend

  const { fullName, email, username, password } = req.body;
  //console.log("email: ", email);
  // validation - not empty
  /*if (fullname===""){
    throw new ApiError(400,"fullname is required")} else if ye chalta jayega for everyfield so manually writing instead  we will write directly**********************

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  // check if user already exists: username, email

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  //console.log(req.files);
  // check for images, check for avatar

  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  // upload them to cloudinary, avatar

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  // create user object - create entry in db

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  // remove password and refresh token field from response

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  // check for user creation

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  // return res

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});
// Handle accessToken and RefreshToken 
const loginUser = asyncHandler(async (req, res) =>{
// req body -> data
// username or email
//find the user
//password check
//access and referesh token
//send cookie

// req body -> data  ****take email,username,password from user in request body
    const {email, username, password} = req.body
    console.log(email);
//either you have username or email nahi mila toh error  denge 
    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }
    //abhi dekho ye email ya username hai kya exist karta hai kya kisme dekhoge to "User" ye hamne  banaya hai jo models me hai udhar se and findOne ye database ka function hai 
  const user = wait User.findOne({
    $or:[{username},{email}]
   })
   if(!user){
    throw ApiError(404,"User does not exist!")
   }
   //find the user , isPasswordCorrect ye bcrypt ka function hai 
 const isPasswordValid =  await user.isPasswordCorrect(password)
 if (!isPasswordValid){
  throw ApiError(401,"Invalid user credentials")
 }
 // ******************This is refresh token code use it from here*******************
 
const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
//adding refresh token to database 
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })// koi validation ki jaroorat nahi while saving refesh token in db time lagega isiliye await 

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }


       const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)
       //remove password and refresh token  
       const loggedInUser = await User.findById(user._id).select("-password -refreshToken")


//making cookies and cookies only modified by server by this not from frontend
    const options ={
      httpOnly:true,
      secure:true
    }
//jitni chahiye utni cookies daal sakte hai and sending json request 
return res.status.cookie("accessToken",accessToken, options).cookie("refreshToken",refreshToken,options).json(new ApiResponse(200,{
  user:loggedInUser,accessToken,refreshToken
},"User logged in successfully!"))
//this is how we logout hame token bhi refresh karne honge beacuse hum logout hote hai toh hame cookies bhi clear karni hongi 
 const logoutUser = asyncHandler(async (req,res) =>{
  req.user._id
 })
}

const loggedInUser = await User.findById(user._id).select("-Password -refreshToken")

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})
}

//refesh token 
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }
// validate token
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})





export { registerUser,loginUser,logoutUser };
*/

//________________________________________________________________________________________________________________________________

/*import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/api.error.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

// generate tokens
const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// REGISTER
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if ([fullName, email, username, password].some((f) => f?.trim() === "")) {
    throw new ApiError(400, "All fields required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered"));
});

// LOGIN
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) throw new ApiError(404, "User not found");

  const isValid = await user.isPasswordCorrect(password);
  if (!isValid) throw new ApiError(401, "Invalid credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { user: loggedInUser }, "Login successful"));
});

// LOGOUT
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $unset: { refreshToken: 1 },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Logged out"));
});

const changeCurrentPassword = qsyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  const isOldPasswordValid = await user.isPasswordCorrect(oldPassword);
  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old and new password required");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user retrieved"));
});
 const UpdateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, username, email } = req.body;
  if(!fullName ===!email){
    throw new ApiError(400, "Fullname and email are required")
  }
  const user =User.findByIdAndUpdate(req.user._id,{
    $set:{fullName:fullName,email:email}
  },{new:true})
res.status(200).json(new ApiResponse(200,user,"Account details updated successfully"))



const updateUserAvatar = asyncHandler(async(req, res) => {
    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }

    //TODO: delete old image - assignment

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar")
        
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Avatar image updated successfully")
    )
})





// creating pipeline aggregation for channel profile


const getUserChannelProfile = asyncHandler(async(req, res) => {
    const {username} = req.params

    if (!username?.trim()) {
        throw new ApiError(400, "username is missing")
    }

    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase()
            }
        },
         // next stage of pipeline
        {
            $lookup: { // to check how many subscribers hai channel ke 
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",//uske channel ko dekho 
                as: "subscribers"
            }
        },
         // next stage of pipeline
        // and is channel ne kitne channels ko subscribe kiya hai
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",//iske basis pe hum dekhenge ki isne kisko subscribe kiya hai
                as: "subscribedTo" //channel ne kisko subscribe kiya hai uska data aayega isme 
            }
        },
         // next stage of pipeline
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"//size is used to count the number of subscribers in subscribers array jo pehle lookup me banaya tha
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo"//size is used to count the number of channels in subscribedTo array jo pehle lookup me banaya tha
                },
                //following ahi ya nahi or subscribed hai ya nahi ye  check karne ke liye hum $in operator use karenge ki kya is channel ke subscribers me se koi bhi subscriber ka id req.user._id ke barabar hai ya nahi agar hai toh iska matlab hai ki user ne is channel ko subscribe kiya hai
                isSubscribed: {
                    $cond: {
                        if: {$in: [req.user?._id, "$subscribers.subscriber"]},
                        then: true,
                        else: false
                    }
                }
            }
        },
        // next stage of pipeline
        {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1

            }
        }
    ])

//


    const getWatchHistory = asyncHandler(async(req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)//yaha par ek string milti hai mongod se vo apne aap id me convert ho jati hai lekin aggregate pipeline me hame manually convert karna padta hai isliye new mongoose.Types.ObjectId(req.user._id) likhna padta hai taki string ko object id me convert kar sake aur match kar sake
            }
        },
        { // lookup for watch history videos
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",// id se match karna hota hai watch history me jo video id hai usse videos collection ke _id se match karna hai
                as: "watchHistory",
                pipeline: [//nested pipeline for owner details in watch history videos
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [//further nested pipeline to get only required details of owner in watch history videos
                                {
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields:{
                            owner:{
                                $first: "$owner"// field me see nikalkane ke liye $ lagaya owner ke idhar 
                            }
                        }
                    }
                ]
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user[0].watchHistory,
            "Watch history fetched successfully"
        )
    )
})

export { registerUser, loginUser, logoutUser, changeCurrentPassword, getCurrentUser, UpdateAccountDetails,updateUserAvatar };
*/
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/api.error.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";

// ================= TOKEN GENERATION =================
const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// ================= REGISTER =================
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if ([fullName, email, username, password].some((f) => f?.trim() === "")) {
    throw new ApiError(400, "All fields required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered"));
});

// ================= LOGIN =================
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) throw new ApiError(404, "User not found");

  const isValid = await user.isPasswordCorrect(password);
  if (!isValid) throw new ApiError(401, "Invalid credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { user: loggedInUser }, "Login successful"));
});

// ================= LOGOUT =================
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $unset: { refreshToken: 1 },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Logged out"));
});

// ================= CHANGE PASSWORD =================
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old and new password required");
  }

  const user = await User.findById(req.user._id);

  const isOldPasswordValid = await user.isPasswordCorrect(oldPassword);
  if (!isOldPasswordValid) {
    throw new ApiError(401, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

// ================= GET CURRENT USER =================
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user retrieved"));
});

// ================= UPDATE ACCOUNT =================
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    throw new ApiError(400, "Fullname and email are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { fullName, email },
    },
    { new: true },
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account updated successfully"));
});

// ================= UPDATE AVATAR =================
const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Error uploading avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { avatar: avatar.url },
    },
    { new: true },
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar updated successfully"));
});

// ================= GET USER CHANNEL PROFILE =================
const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) {
    throw new ApiError(400, "Username is missing");
  }

  const channel = await User.aggregate([
    {
      $match: {
        username: username.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $addFields: {
        subscribersCount: {
          $size: "$subscribers",
        },
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        subscribersCount: 1,
        avatar: 1,
        coverImage: 1,
        email: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, channel[0], "Channel fetched"));
});

// ================= GET WATCH HISTORY =================
const getWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user[0].watchHistory,
        "Watch history fetched successfully",
      ),
    );
});

// ================= EXPORT =================
export {
  registerUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  getUserChannelProfile,
  getWatchHistory,
};
