import React, { Component } from "react";

export default class Todos extends Component {
  constructor() {
    super();
    this.state = {
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      PhoneNumber: "",
      data: [],
      updateItem: null,     
      isOpen: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { FirstName, LastName, Email, Password, PhoneNumber, updateItem, data } = this.state;
  
    if (updateItem) {
      this.setState({
        data: this.state.data.map((item) =>
          item.id === this.state.updateItem
            ? { ...item, FirstName, LastName, Email, Password, PhoneNumber }
            : item
        ),
        updateItem: null,
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        PhoneNumber: "",
        isOpen: false
      });
    } else {
      const newItem = { 
        id: Date.now(),
        FirstName,
        LastName, 
        Email, 
        Password, 
        PhoneNumber 
      };
      this.setState({
        data: [...data, newItem],
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        PhoneNumber: "",
        isOpen: false
      });
    }
  };
  

  handleEdit = (item) => {
    this.setState({
      updateItem: item.id,
      FirstName: item.FirstName,
      LastName: item.LastName,
      Email: item.Email,
      Password: item.Password,
      PhoneNumber: item.PhoneNumber,
      isOpen: true
    });
  };

  handleDelete = (id) => {
    this.setState({ data: this.state.data.filter((item) => item.id !== id) });
  };

  render() {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between">
          <h2 className="text-2xl">Todo</h2>
          <button onClick={() => this.setState({ isOpen: true})} className="mb-4 px-4 py-2 bg-green-600 text-white rounded">+</button>
        </div>
        {this.state.isOpen && (
          <div className="fixed inset-0 bg-black opacity-90 flex justify-center items-center z-50">
            <div className="bg-blue-400 w-[450px] p-20 px-7">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                <h2 className="text-xl font-bold mb-2">
                  {this.state.updateItem ? "Edit User" : "Create User"}
                </h2>
                <form onSubmit={this.handleSubmit} className="space-y-3">
                  <div className="flex gap-2">
                    <input required value={this.state.FirstName} onChange={(e) => this.setState({ FirstName: e.target.value })} placeholder="First Name" type="text" className="w-full px-3 py-2 border rounded"/>
                    <input required value={this.state.LastName} onChange={(e) => this.setState({ LastName: e.target.value })} placeholder="Last Name" type="text" className="w-full px-3 py-2 border rounded"/>
                  </div>
                  <input required value={this.state.Email} onChange={(e) => this.setState({ Email: e.target.value })}  placeholder="Email" type="email" className="w-full px-3 py-2 border rounded"/>
                  <input required value={this.state.Password} onChange={(e) => this.setState({ Password: e.target.value })} placeholder="Password" type="password" className="w-full px-3 py-2 border rounded"/>
                  <input required value={this.state.PhoneNumber} onChange={(e) => this.setState({ PhoneNumber: e.target.value })} placeholder="Phone Number" type="tel" className="w-full px-3 py-2 border rounded"/>
                  <div className="flex gap-2">
                    <button type="submit" className="flex-1 px-4 py-2 bg-blue-400 text-white rounded">
                      {this.state.updateItem ? "Update" : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <table className="w-full bg-white rounded">
          <thead>
            <tr className="bg-blue-400 text-white h-14 text-sm whitespace-nowrap">
              <th className="py-2 px-3">First Name</th>
              <th className="py-2 px-3">Last Name</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Password</th>
              <th className="py-2 px-3">Phone Number</th>
              <th className="py-2 px-3">Delete</th>
              <th className="py-2 px-3">Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-3">{item.FirstName}</td>
                <td className="py-2 px-3">{item.LastName}</td>
                <td className="py-2 px-3">{item.Email}</td>
                <td className="py-2 px-3">{item.Password}</td>
                <td className="py-2 px-3">{item.PhoneNumber}</td>
                <td className="py-2 px-3">
                  <button onClick={() => this.handleDelete(item.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                </td>
                <td className="py-2 px-3">
                  <button onClick={() => this.handleEdit(item)} className="px-2 py-1 bg-blue-400 text-white rounded">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
