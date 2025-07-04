import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUser = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { _id: { $nin: currentUser.friends } },
        { isOnboarded: true },
      ],
    });
    res.status(200).json({ success: true, recommendedUser });
  } catch (error) {
    console.error("Error in getRecommendedUsers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );
    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "You cannot send a friend request to yourself" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "User not found" });
    }
    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });
    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });
    res.status(200).json(friendRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "your not authorized to accept this request" });
    }
    friendRequest.status = "accepted";
    await friendRequest.save();
    res.status(200).json(friendRequest);

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error) {
    console.error("Error in acceptFriendRequest:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getFriendRequest(req, res) {
  try {
    const incomingRequests = await FriendRequest.find({
        recipient: req.user.id,
        status: "pending",
    }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

    const acceptedRequests = await FriendRequest.find({
        sender: req.user.id,
        status: "accepted",
    }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");
    res.status(200).json({ incomingRequests, acceptedRequests });
  } catch (error) {
    console.error("Error in getFriendRequest:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getOutgoingFriendRequests (req,res){
    try {
        const outgoingRequests = await FriendRequest.find({
            sender: req.user.id,
            status: "pending",
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");
        res.status(200).json({ outgoingRequests });
    } catch (error) {
        console.error("Error in getOutgoingFriendRequests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
