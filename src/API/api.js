import axios from "axios";

const API_BASE_URL = "https://localhost:7210";
//const API_BASE_URL = "https://example.com/api";

/**This function gets the training week for a given user and selected date.
@param {string} userId - The ID of the user.
@param {string} selectedDate - The selected date in the format of 'YYYY-MM-DD'.
@returns {Object} - An object containing the data for the training week.
*/
export const getTrainingWeek = async (userId, selectedDate) => {
    var response = await axios.get(`${API_BASE_URL}/get-Training-Week?id=${userId}&date=${selectedDate}`);
    return response.data;
}

/**
This function creates a new training for a given user and date.
@param {string} userId - The ID of the user.
@param {string} newDate - The date for the new training in the format of 'YYYY-MM-DD'.
@param {Object} data - An object containing the data for the new training.
*/
export const createNewTraining = async (userId, newDate, data) => {
    await axios.post(`${API_BASE_URL}/create-Training?userId=${userId}&date=${newDate}&type=1`, data);
}

/**
This function edits an existing training for a given training ID.
@param {string} treninkId - The ID of the training to edit.
@param {Object} data - An object containing the updated data for the training.
*/
export const editTraining = async (treninkId, data) => {
    await axios.put(`${API_BASE_URL}/update-Training?treninkId=${treninkId}&type=1`, data);
}

/**
Creates a new activity with the given form data.
@param {Object} form - The form data to create the activity with.
@param {string} form.name - The name of the activity.
@param {string} form.color - The color of the activity.
@param {string} form.description - The description of the activity.
@param {Array} form.selectedUsers - The list of users selected for the activity.
*/
export const createActivity = async (form) => {
    await axios.post(`${API_BASE_URL}/create-New-Activity`, form);
}

/**
Retrieves the description of an activity with the given ID.
@param {string} id - The ID of the activity to retrieve description for.
@returns {Promise} A promise that resolves with the activity description.
*/
export const getActivityDescription = async (id) => {
    return await axios.get(`${API_BASE_URL}/activities/${id}/description`);
}

/**
Retrieves the detail of an activity with the given ID.
@param {string} id - The ID of the activity to retrieve detail for.
@returns {Promise} A promise that resolves with the activity detail.
*/
export const getActivityDetail = async (id) => {
    return await axios.get(`${API_BASE_URL}/activities/${id}/detail`);
}

/**
Retrieves a list of sub-activities associated with a given tag association ID and user ID.
@param {string} tagAssociationId - The ID of the tag association.
@param {number} userId - The ID of the user.
@returns {Promise} A promise that resolves to the response data of the API request.
*/
export const getActivitySubActivities = async (tagAssociationId, userId) => {
    return await axios.get(`${API_BASE_URL}/activities/definition/tagAsociaiton/${tagAssociationId}/user/${userId}`);
}

/**
 * Logs in a user by sending a POST request to the specified API endpoint with the provided credentials.
 * @param {string} name - The username of the user to log in.
 * @param {string} password - The password of the user to log in.
 * @returns {Promise} A promise that resolves to the response data of the login request.
 */
export const LoginUser = async (name, password) => {
    return axios.post(`${API_BASE_URL}/user-Login`, {
        userName: name,
        userPassword: password});
}