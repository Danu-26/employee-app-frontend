import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
} from "../service/employeeService";

function EmployeePage() {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editEmp, setEditEmp] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [salary, setSalary] = useState("");
    const [departmentCode, setDepartmentCode] = useState("");

    // Fetch employees
    const fetchEmployees = async () => {
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching employees", error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Open modal for add/edit
    const handleOpenModal = (emp = null) => {
        if (emp) {
            setEditEmp(emp);
            setFirstName(emp.firstName);
            setLastName(emp.lastName);
            setEmail(emp.email);
            setDateOfBirth(emp.dateOfBirth.split("T")[0]); 
            setSalary(emp.salary);
            setDepartmentCode(emp.departmentCode);
        } else {
            setEditEmp(null);
            setFirstName("");
            setLastName("");
            setEmail("");
            setDateOfBirth("");
            setSalary("");
            setDepartmentCode("");
        }
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    // Save employee
    const handleSave = async () => {
        const empData = {
            firstName,
            lastName,
            email,
            dateOfBirth,
            salary,
            departmentCode,
        };

        try {
            if (editEmp) {
                await updateEmployee(editEmp.employeeId, empData);
            } else {
                await addEmployee(empData);
            }
            fetchEmployees();
            handleCloseModal();
        } catch (error) {
            console.error("Error saving employee", error);
            alert(error.response?.data?.message || "Error saving employee");
        }
    };

    // Delete employee
    const handleDelete = async (id) => {
        if (!Number.isInteger(id)) {
            console.error("Employee ID must be an integer:", id);
            return;
        }
            try {
                await deleteEmployee(id);
                fetchEmployees();
            } catch (error) {
                console.error("Error deleting employee", error);
                alert(error.response?.data?.message || "Error deleting employee");
            }
    };

    return (
        <div>
            <h2 className="my-4">Employees</h2>
            <Button className="mb-3" onClick={() => handleOpenModal()}>
                Add Employee
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>DOB</th>
                        <th>Salary</th>
                        <th>Dept Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.firstName}</td>
                            <td>{emp.lastName}</td>
                            <td>{emp.email}</td>
                            <td>{emp.dateOfBirth.split("T")[0]}</td>
                            <td>{emp.salary}</td>
                            <td>{emp.departmentCode}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => handleOpenModal(emp)}
                                >
                                    Edit
                                </Button>{" "}
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(emp.employeeId)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editEmp ? "Edit Employee" : "Add Employee"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Enter first name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter last name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control
                                type="number"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                placeholder="Enter salary"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Department Code</Form.Label>
                            <Form.Control
                                type="text"
                                value={departmentCode}
                                onChange={(e) => setDepartmentCode(e.target.value)}
                                placeholder="Enter department code"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EmployeePage;