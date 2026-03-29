import AxiosInstance from "../utils/axiosInstance";

// Get all departments
export async function getDepartments() {
    try {
        const response = await AxiosInstance.get("/Department");
        return response.data; 
    } catch (error) {
        console.error("Error fetching departments:", error);
        return []; 
    }
}

// Add a new department
export async function addDepartment(dept) {
    try {
        const response = await AxiosInstance.post("/Department", dept);
        return response.data;
    } catch (error) {
        console.error("Error adding department:", error);
        throw error;
    }
}

// Update an existing department
export async function updateDepartment(code, dept) {
    try {
        const response = await AxiosInstance.put(`/Department/${code}`, dept);
        return response.data;
    } catch (error) {
        console.error(`Error updating department ${code}:`, error);
        throw error;
    }
}

// Delete a department
export async function deleteDepartment(code) {
    try {
        await AxiosInstance.delete(`/Department/${code}`);
        return true;
    } catch (error) {
        console.error(`Error deleting department ${code}:`, error);
        throw error;
    }
}