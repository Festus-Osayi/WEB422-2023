let data = require('./data/students-data.json');

module.exports = {
    // CRUD methods for Student 
    // Get All Students
    getAllStudents: function() {
        var c = data.map(p => p); // shalowcopy of the students data array
        
       return c
    },

    // Get one Employee
    getStudentsById: function(id) {
        console.log("id in get one: " , id);
        
        // return data.find(i => i.employeeId == id);
        return new Promise(function (resolve, reject) {
            resolve(data.find(i => i.sid == id));
        });
    },

    // Add new student
    AddNewStudents: function(newItem) {
       newItem.sid = data.length + 1
        return data.push(newItem);
       
    },

    // Edit existing studenet
    // EditStudent: function(newItem) {
    EditStudents: function(id) {
        // Get the matching array index
        let index = data.findIndex(stu => stu.sid === Number(id)); 
        
        // If found, replace, otherwise return undefined
        data.splice(index, 1, index)
    },

    // Delete student
    deleteStudents: function(id) {
        // Get the matching array index
        let index = data.findIndex(i => i.employeeId == id);
        // If found, delete, otherwise return undefined
        if (data[index]) {
            data.splice(index, 1);
        }        
    }
}