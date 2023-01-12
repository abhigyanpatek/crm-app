exports.userResponse = (user) => {
    return {
        name: user.name,
        id: user._id,
        email: user.email,
        userType: user.userType,
        userStatus: user.userStatus
    };
}

exports.userListResponse = (users) => {
    const userResult = [];
    users.forEach(doc => {
        userResult.push({
            name: doc.name,
            id: doc._id,
            email: doc.email,
            userType: doc.userType,
            userStatus: doc.userStatus
        });
    });
    return userResult;
}