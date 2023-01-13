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
    users.forEach(user => {
        userResult.push({
            name: user.name,
            id: user._id,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus
        });
    });
    return userResult;
}

exports.ticketResponse = (ticket) => {
    return {
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        reporter: ticket.reporter,
        assignee: ticket.assignee,
        id: ticket._id,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt
    };
}

exports.ticketListResponse = (tickets) => {
    const ticketResult = [];
    tickets.forEach(ticket => {
        ticketResult.push({
            title: ticket.title,
            description: ticket.description,
            status: ticket.status,
            reporter: ticket.reporter,
            assignee: ticket.assignee,
            id: ticket._id,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt
        });
    });
    return ticketResult;
}