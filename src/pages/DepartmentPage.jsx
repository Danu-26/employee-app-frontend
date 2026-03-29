import React, { useState, useEffect } from "react";
import { getDepartments, addDepartment, updateDepartment, deleteDepartment } from "../service/departmentService";
import { Modal, Button, Form, Table } from "react-bootstrap";

function DepartmentPage() {
    const [departments, setDepartments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editDept, setEditDept] = useState(null);
    const [deptCode, setDeptCode] = useState("");
    const [deptName, setDeptName] = useState("");

    // Fetch departments
    const fetchDepartments = async () => {
        try {
            const data = await getDepartments();
            setDepartments(data);
        } catch (error) {
            console.error("Error fetching departments", error);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    // Open modal for add or edit
    const handleOpenModal = (dept = null) => {
        if (dept) {
            setEditDept(dept);
            setDeptCode(dept.departmentCode);
            setDeptName(dept.departmentName);
        } else {
            setEditDept(null);
            setDeptCode("");
            setDeptName("");
        }
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    // Save department
    const handleSave = async () => {
        console.log("Save clicked"); 
        try {
            if (editDept) {
                await updateDepartment(editDept.departmentCode, { departmentCode: deptCode, departmentName: deptName });
            } else {
                await addDepartment({ departmentCode: deptCode, departmentName: deptName });
            }
            fetchDepartments();
            handleCloseModal();
        } catch (error) {
            console.error("Error saving department", error);
        }
    };

    // Delete department
    const handleDelete = async (code) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            try {
                await deleteDepartment(code);
                fetchDepartments();
            } catch (error) {
                console.error("Error deleting department", error);
            }
        }
    };

    return (
        <div>
            <h2 className="my-4">Departments</h2>
            <Button className="mb-3" onClick={() => handleOpenModal()}>Add Department</Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Department Code</th>
                        <th>Department Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((dept) => (
                        <tr key={dept.departmentCode}>
                            <td>{dept.departmentCode}</td>
                            <td>{dept.departmentName}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleOpenModal(dept)}>Edit</Button>{" "}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(dept.departmentCode)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editDept ? "Edit Department" : "Add Department"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Department Code</Form.Label>
                            <Form.Control
                                type="text"
                                value={deptCode}
                                onChange={(e) => setDeptCode(e.target.value)}
                                placeholder="Enter department code"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Department Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={deptName}
                                onChange={(e) => setDeptName(e.target.value)}
                                placeholder="Enter department name"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DepartmentPage;