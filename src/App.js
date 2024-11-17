import React, { useState, useEffect } from "react";
import './App.css'; // Include custom CSS for styling

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [view, setView] = useState("status"); // Default grouping
  const [sortOption, setSortOption] = useState(null);

  // The mock data from the JSON you provided
  const mockData = {
    tickets: [
      { id: "CAM-1", title: "Update User Profile Page UI", tag: ["Feature request"], userId: "usr-1", status: "Todo", priority: 4 },
      { id: "CAM-2", title: "Add Multi-Language Support", tag: ["Feature Request"], userId: "usr-2", status: "In progress", priority: 3 },
      { id: "CAM-3", title: "Optimize Database Queries", tag: ["Feature Request"], userId: "usr-2", status: "In progress", priority: 1 },
      { id: "CAM-4", title: "Implement Email Notification System", tag: ["Feature Request"], userId: "usr-1", status: "In progress", priority: 3 },
      { id: "CAM-5", title: "Enhance Search Functionality", tag: ["Feature Request"], userId: "usr-5", status: "In progress", priority: 0 },
      { id: "CAM-6", title: "Third-Party Payment Gateway", tag: ["Feature Request"], userId: "usr-2", status: "Todo", priority: 1 },
      { id: "CAM-7", title: "Create Onboarding Tutorial", tag: ["Feature Request"], userId: "usr-1", status: "Backlog", priority: 2 },
      { id: "CAM-8", title: "Implement Role-Based Access Control", tag: ["Feature Request"], userId: "usr-3", status: "In progress", priority: 3 },
      { id: "CAM-9", title: "Upgrade Server Infrastructure", tag: ["Feature Request"], userId: "usr-5", status: "Todo", priority: 2 },
      { id: "CAM-10", title: "Conduct Security Assessment", tag: ["Feature Request"], userId: "usr-4", status: "Backlog", priority: 1 }
    ],
    users: [
      { id: "usr-1", name: "Anoop Sharma", available: false },
      { id: "usr-2", name: "Yogesh", available: true },
      { id: "usr-3", name: "Shankar Kumar", available: true },
      { id: "usr-4", name: "Ramesh", available: true },
      { id: "usr-5", name: "Suresh", available: true }
    ]
  };

  useEffect(() => {
    setTickets(mockData.tickets);
  }, []);

  const groupTickets = () => {
    const groupedData = {};
    if (!Array.isArray(tickets)) return groupedData;

    if (view === "status") {
      tickets.forEach((ticket) => {
        if (!groupedData[ticket.status]) groupedData[ticket.status] = [];
        groupedData[ticket.status].push(ticket);
      });
    } else if (view === "user") {
      tickets.forEach((ticket) => {
        const assignedUser = ticket.userId;
        if (!groupedData[assignedUser]) groupedData[assignedUser] = [];
        groupedData[assignedUser].push(ticket);
      });
    } else if (view === "priority") {
      tickets.forEach((ticket) => {
        if (!groupedData[ticket.priority]) groupedData[ticket.priority] = [];
        groupedData[ticket.priority].push(ticket);
      });
    }

    return groupedData;
  };

  const sortedTickets = (groupedTickets) => {
    if (!sortOption) return groupedTickets;

    Object.keys(groupedTickets).forEach((group) => {
      groupedTickets[group].sort((a, b) => {
        if (sortOption === "priority") {
          return b.priority - a.priority; // Descending order of priority
        } else if (sortOption === "title") {
          return a.title.localeCompare(b.title); // Ascending order of title
        }
        return 0;
      });
    });

    return groupedTickets;
  };

  // Get the name of the user based on userId
  const getUserName = (userId) => {
    const user = mockData.users.find(user => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  // Get priority label based on priority number
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4: return "Urgent";
      case 3: return "High";
      case 2: return "Medium";
      case 1: return "Low";
      case 0: return "No priority";
      default: return "Unknown";
    }
  };

  const groupedTickets = sortedTickets(groupTickets());

  return (
    <div className="kanban-container">
      <h1>Interactive Kanban Board</h1>

      <div className="controls">
        <button onClick={() => setView("status")}>Group by Status</button>
        <button onClick={() => setView("user")}>Group by User</button>
        <button onClick={() => setView("priority")}>Group by Priority</button>
        <button onClick={() => setSortOption("priority")}>Sort by Priority</button>
        <button onClick={() => setSortOption("title")}>Sort by Title</button>
      </div>

      <div className="kanban-board">
        {Object.keys(groupedTickets).map((group) => (
          <div key={group} className="kanban-column">
            <h3>{group.toUpperCase()}</h3>
            {groupedTickets[group].map((ticket) => (
              <div key={ticket.id} className="kanban-card">
                <strong>{ticket.title}</strong>
                <p>Priority: {getPriorityLabel(ticket.priority)}</p>
                <p>User: {getUserName(ticket.userId)}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
