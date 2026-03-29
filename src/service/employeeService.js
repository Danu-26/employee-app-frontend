import AxiosInstance from "../utils/axiosInstance";

// Get all employees
export async function getEmployees() {
    try {
        const res = await AxiosInstance.get("/Employee");
        return res.data;
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
    }
}

// Add employee
export async function addEmployee(emp) {
    try {
        const res = await AxiosInstance.post("/Employee", emp);
        return res.data;
    } catch (error) {
        console.error("Error adding employee:", error);
        throw error;
    }
}

// Update employee
export async function updateEmployee(id, emp) {
    try {
        const res = await AxiosInstance.put(`/Employee/${id}`, emp);
        return res.data;
    } catch (error) {
        console.error(`Error updating employee ${id}:`, error);
        throw error;
    }
}

// Delete employee
export async function deleteEmployee(id) {
    try {
        const res = await AxiosInstance.delete(`/Employee/${id}`);
        return res.data;
    } catch (error) {
        console.error(`Error deleting employee ${id}:`, error);
        throw error;
    }
}